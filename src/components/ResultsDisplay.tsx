"use client";

import { useEffect } from "react";
import { trackCustomEvent } from "@/lib/pixel";
import type { RoutineProfile } from "@/types";
import ProductCard from "./ProductCard";
import ShareButtons from "./ShareButtons";

interface ResultsDisplayProps {
  routine: RoutineProfile;
}

const trustBadges = [
  { icon: "🔬", label: "Science-backed picks" },
  { icon: "🧴", label: "Tested & reviewed" },
  { icon: "💸", label: "No hidden costs" },
  { icon: "🔒", label: "No data sold" },
];

export default function ResultsDisplay({ routine }: ResultsDisplayProps) {
  useEffect(() => {
    trackCustomEvent("ViewResults", {
      routine_id: routine.id,
      routine_title: routine.title,
    });
  }, [routine.id, routine.title]);

  const totalPrice = routine.products.reduce((sum, p) => {
    const num = parseFloat(p.price.replace("$", ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const firstProductUrl = routine.products[0]?.affiliateUrl ?? "#";

  return (
    <>
      <div className="w-full max-w-3xl mx-auto px-4 pb-24 sm:pb-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <span className="inline-block text-sm font-semibold text-primary bg-primary-light px-4 py-1.5 rounded-full mb-4">
            Your Personalized Routine
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {routine.title}
          </h1>
          <p className="mt-2 text-lg text-muted">{routine.subtitle}</p>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 leading-relaxed">
            {routine.description}
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/60 bg-card border border-border rounded-full px-3 py-1.5"
            >
              <span>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>

        {/* Product cards */}
        <div className="flex flex-col gap-4">
          {routine.products.map((product, index) => (
            <div key={product.name} className="animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
              <ProductCard
                product={product}
                stepNumber={index + 1}
                routineId={routine.id}
              />
            </div>
          ))}
        </div>

        {/* Cost summary */}
        <div className="mt-8 p-5 bg-card rounded-2xl border border-border text-center">
          <p className="text-sm text-muted">Estimated routine cost</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            ${totalPrice.toFixed(0)}
            <span className="text-base font-normal text-muted"> total</span>
          </p>
          <p className="text-xs text-muted mt-2">
            Products last 2–3 months on average, so your per-month cost is
            around ${Math.round(totalPrice / 2.5)}.
          </p>
        </div>

        {/* Share section */}
        <div className="mt-10 p-6 bg-card rounded-2xl border border-border">
          <ShareButtons routineTitle={routine.title} routineId={routine.id} />
        </div>

        {/* Retake */}
        <div className="mt-8 text-center">
          <a
            href="/quiz"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            &larr; Retake the quiz
          </a>
        </div>
      </div>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-sm border-t border-border p-3">
        <a
          href={firstProductUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackCustomEvent("StickyBarClick", { routine_id: routine.id })
          }
          className="block w-full text-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg"
        >
          Shop Your Routine — ${totalPrice.toFixed(0)}
        </a>
      </div>
    </>
  );
}
