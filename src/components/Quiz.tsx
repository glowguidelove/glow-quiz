"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/data/questions";
import { matchRoutine } from "@/lib/scoring";
import { trackEvent, trackCustomEvent, generateEventId } from "@/lib/pixel";
import { getUtmParams, buildFbc, getFbp } from "@/lib/utm";
import type { QuizAnswers } from "@/types";
import ProgressBar from "./ProgressBar";
import EmailCapture from "./EmailCapture";
import AnalyzingScreen from "./AnalyzingScreen";

type Phase = "quiz" | "email" | "submitting" | "analyzing";

const STORAGE_KEY = "gq_quiz_progress";

function loadSavedProgress(): { step: number; answers: Partial<QuizAnswers> } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.step === "number" && parsed.answers) {
      return parsed;
    }
  } catch { /* ignore corrupt data */ }
  return null;
}

function saveProgress(step: number, answers: Partial<QuizAnswers>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers, ts: Date.now() }));
  } catch { /* quota errors, etc */ }
}

function clearProgress() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

export default function Quiz() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [pendingRoutineId, setPendingRoutineId] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const saved = loadSavedProgress();
    if (saved && saved.step > 0 && saved.step < quizQuestions.length) {
      setCurrentStep(saved.step);
      setAnswers(saved.answers);
    }
    setRestored(true);
  }, []);

  const totalSteps = quizQuestions.length;
  const question = quizQuestions[currentStep];

  const handleSelect = useCallback(
    (value: string) => {
      if (animating) return;
      setSelectedValue(value);

      setTimeout(() => {
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);
        setSelectedValue(null);

        if (currentStep === 0) {
          trackCustomEvent("QuizStart");
        }

        if (currentStep < totalSteps - 1) {
          const nextStep = currentStep + 1;
          saveProgress(nextStep, newAnswers);
          setAnimating(true);
          setTimeout(() => {
            setCurrentStep(nextStep);
            setAnimating(false);
          }, 150);
        } else {
          clearProgress();
          setPhase("email");
          const quizCompleteEventId = generateEventId();
          trackCustomEvent(
            "QuizComplete",
            {
              skin_type: newAnswers.skinType,
              concern: newAnswers.concern,
            },
            { eventID: quizCompleteEventId }
          );
          // CAPI duplicate so Meta can attribute quiz completes to ads (fbc/fbp + dedupe with Pixel).
          void fetch("/api/pixel/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event_name: "QuizComplete",
              event_id: quizCompleteEventId,
              event_source_url:
                typeof window !== "undefined" ? window.location.href : "",
              custom_data: {
                skin_type: newAnswers.skinType,
                concern: newAnswers.concern,
              },
              user_data: {
                fbc: buildFbc(),
                fbp: getFbp(),
              },
            }),
          }).catch(() => {});
        }
      }, 250);
    },
    [animating, answers, currentStep, question.id, totalSteps]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep((s) => s - 1);
        setSelectedValue(null);
        setAnimating(false);
      }, 150);
    }
  }, [currentStep, animating]);

  const handleEmailSubmit = useCallback(
    async (email: string, firstName?: string) => {
      setPhase("submitting");

      const fullAnswers = answers as QuizAnswers;
      const routine = matchRoutine(fullAnswers);
      const eventId = generateEventId();

      trackEvent("Lead", { content_name: "quiz_email_capture" }, { eventID: eventId });

      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: fullAnswers,
            email,
            firstName: firstName ?? undefined,
            routineId: routine.id,
            eventId,
            utm: getUtmParams(),
            fbc: buildFbc(),
            fbp: getFbp(),
          }),
        });
        const data = (await res.json()) as {
          kitSubscribed?: boolean;
          kitError?: string;
          kitDetail?: string;
          kitHttpStatus?: number;
        };
        if (data.kitSubscribed === false) {
          console.warn(
            "GlowGuide: Kit subscribe failed.",
            data.kitError ?? "?",
            data.kitHttpStatus != null ? `HTTP ${data.kitHttpStatus}` : "",
            data.kitDetail ?? ""
          );
        }
      } catch {
        // Non-blocking — still show results even if API call fails
      }

      setPendingRoutineId(routine.id);
      setPhase("analyzing");
    },
    [answers]
  );

  const handleSkipEmail = useCallback(() => {
    const fullAnswers = answers as QuizAnswers;
    const routine = matchRoutine(fullAnswers);
    setPendingRoutineId(routine.id);
    setPhase("analyzing");
  }, [answers]);

  const handleAnalysisComplete = useCallback(() => {
    if (pendingRoutineId) {
      clearProgress();
      router.push(`/quiz/results?r=${pendingRoutineId}`);
    }
  }, [pendingRoutineId, router]);

  if (!restored) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (phase === "analyzing") {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16">
        <AnalyzingScreen onComplete={handleAnalysisComplete} />
      </div>
    );
  }

  if (phase === "email" || phase === "submitting") {
    return (
      <div className="w-full max-w-xl mx-auto px-4">
        <ProgressBar current={totalSteps} total={totalSteps} />
        <EmailCapture
          onSubmit={handleEmailSubmit}
          onSkip={handleSkipEmail}
          isLoading={phase === "submitting"}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <ProgressBar current={currentStep} total={totalSteps} />

      <div
        key={currentStep}
        className={`transition-all duration-300 ease-out ${animating ? "opacity-0 scale-[0.98]" : "animate-fade-in"}`}
      >
        <div className="mt-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {question.question}
          </h2>
          <p className="mt-2 text-muted text-sm sm:text-base">
            {question.subtitle}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {question.options.map((option, i) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                disabled={animating}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`
                  w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 animate-slide-up
                  ${
                    isSelected
                      ? "border-primary bg-primary-light scale-[1.02] shadow-md"
                      : "border-border bg-card hover:border-primary/40 hover:bg-card-hover hover:shadow-sm"
                  }
                  disabled:pointer-events-none
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                  <div>
                    <span className="font-semibold text-foreground">
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-sm text-muted mt-0.5">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {currentStep > 0 && (
        <button
          onClick={handleBack}
          disabled={animating}
          className="mt-6 mx-auto block text-sm text-muted hover:text-primary transition-colors disabled:opacity-40"
        >
          &larr; Back
        </button>
      )}
    </div>
  );
}
