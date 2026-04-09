"use client";

import { useEffect, useState } from "react";

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const analysisSteps = [
  { label: "Analyzing your skin profile", duration: 1000 },
  { label: "Matching ingredient needs", duration: 1200 },
  { label: "Selecting products for your budget", duration: 1000 },
  { label: "Building your personalized routine", duration: 800 },
];

export default function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = analysisSteps.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const stepTimeouts: NodeJS.Timeout[] = [];
    analysisSteps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index);
      }, elapsed);
      stepTimeouts.push(timeout);
      elapsed += step.duration;
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (totalDuration / 50);
        return Math.min(next, 100);
      });
    }, 50);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, totalDuration + 400);

    return () => {
      stepTimeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto px-4 text-center">
      {/* Animated pulse ring */}
      <div className="relative w-28 h-28 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="absolute inset-2 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
        <div className="relative w-28 h-28 rounded-full bg-primary-light flex items-center justify-center">
          <span className="text-4xl">🔬</span>
        </div>
      </div>

      {/* Current step label */}
      <p
        key={currentStep}
        className="text-lg font-semibold text-foreground animate-fade-in"
      >
        {analysisSteps[currentStep].label}
      </p>

      {/* Progress bar */}
      <div className="mt-6 w-full h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step checklist */}
      <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
        {analysisSteps.map((step, index) => {
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                index > currentStep ? "opacity-30" : "opacity-100"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-sage text-white"
                    : isCurrent
                      ? "bg-primary text-white scale-110"
                      : "bg-border text-muted"
                }`}
              >
                {isDone ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  isDone
                    ? "text-foreground/60 line-through"
                    : isCurrent
                      ? "text-foreground font-medium"
                      : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-muted">
        Personalizing from 40+ products across 10+ trusted brands
      </p>
    </div>
  );
}
