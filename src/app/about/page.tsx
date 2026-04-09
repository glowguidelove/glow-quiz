import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — GlowGuide",
  description:
    "GlowGuide helps you find the perfect skincare routine matched to your unique skin. Free, personalized, science-backed.",
};

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          About GlowGuide
        </h1>

        <div className="mt-8 space-y-6 text-foreground/80 leading-relaxed">
          <p>
            Skincare shouldn&apos;t be overwhelming. With thousands of products,
            conflicting advice, and endless marketing claims, finding the right
            routine feels impossible.
          </p>
          <p>
            GlowGuide was built to solve that. Our skin quiz uses a
            dermatologist-informed algorithm to match you with products that
            actually work for{" "}
            <em>your</em> skin type, concerns, sensitivity, and budget.
          </p>
          <p>
            We research and recommend products from trusted brands — from
            affordable options like The Ordinary to clinical-grade lines like
            Obagi and Paula&apos;s Choice. Every recommendation is based on
            ingredient efficacy, not hype.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">
            How We Make Money
          </h2>
          <p>
            GlowGuide is free to use. When you purchase a product through one of
            our links, we may earn a small affiliate commission at no extra cost
            to you. This supports the site and allows us to keep the quiz free.
          </p>
          <p>
            We only recommend products we&apos;ve researched and believe in.
            Affiliate commissions never influence our recommendations — your skin
            comes first.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">
            Our Promise
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Honest, research-backed recommendations</li>
            <li>No sponsored placements or pay-to-play</li>
            <li>Free quiz, forever</li>
            <li>Your data stays private</li>
          </ul>
        </div>

        <div className="mt-12">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
          >
            Take the Skin Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}
