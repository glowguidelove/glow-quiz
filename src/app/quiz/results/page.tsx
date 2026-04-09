import type { Metadata } from "next";
import { getRoutineById } from "@/lib/scoring";
import { routineProfiles } from "@/data/products";
import ResultsDisplay from "@/components/ResultsDisplay";
import Link from "next/link";

interface ResultsPageProps {
  searchParams: Promise<{ r?: string }>;
}

export async function generateMetadata({ searchParams }: ResultsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const routine = params.r ? getRoutineById(params.r) : undefined;

  if (!routine) {
    return {
      title: "Your Personalized Routine — GlowGuide",
      description: "Take the quiz to get your personalized skincare routine.",
    };
  }

  const title = `${routine.title} — Your GlowGuide Routine`;
  const description = routine.subtitle + ". " + routine.description.slice(0, 120) + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "GlowGuide",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const routineId = params.r;
  const routine = routineId ? getRoutineById(routineId) : undefined;

  if (!routine) {
    return (
      <section className="py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Routine not found
        </h1>
        <p className="mt-3 text-muted">
          Take the quiz to get your personalized routine.
        </p>
        <Link
          href="/quiz"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          Take the Quiz
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <ResultsDisplay routine={routine} />
    </section>
  );
}

export async function generateStaticParams() {
  return routineProfiles.map((profile) => ({
    r: profile.id,
  }));
}
