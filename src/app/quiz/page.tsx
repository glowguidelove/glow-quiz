import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Skin Quiz — GlowGuide",
  description:
    "Answer 7 quick questions and get a personalized skincare routine matched to your skin type, concerns, and budget.",
};

export default function QuizPage() {
  return (
    <section className="py-12 sm:py-16">
      <Quiz />
    </section>
  );
}
