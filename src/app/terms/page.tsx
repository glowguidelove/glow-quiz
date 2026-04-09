import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — GlowGuide",
  description: "Terms and conditions for using GlowGuide.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
        <p className="text-sm text-muted mt-1">Last updated: April 2026</p>

        <div className="mt-8 space-y-6 text-foreground/80 leading-relaxed text-[15px]">
          <p>
            By accessing and using GlowGuide (&quot;the Site&quot;), you agree to these
            Terms of Use. If you do not agree, please do not use the Site.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Nature of Service</h2>
          <p>
            GlowGuide provides a free skincare quiz that generates personalized
            product recommendations based on your responses. Our recommendations
            are for informational purposes only and do not constitute medical
            advice.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Not Medical Advice</h2>
          <p>
            GlowGuide is not a dermatologist, esthetician, or medical
            professional. Our recommendations are based on general skincare
            principles and product research. Always consult a qualified
            dermatologist or healthcare provider for skin conditions, allergies,
            or medical concerns.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Affiliate Relationships</h2>
          <p>
            Product links on GlowGuide are affiliate links. When you click a link
            and make a purchase, we may earn a commission from the retailer. This
            does not affect the price you pay. We recommend products based on
            suitability for your skin profile, not commission rates.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Third-Party Products</h2>
          <p>
            We do not manufacture, sell, or ship any products. All purchases are
            made directly through third-party retailer websites (e.g., Paula&apos;s
            Choice, TULA, Sephora, Dermstore). Product availability, pricing,
            return policies, and customer service are governed by those retailers.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Accuracy of Information</h2>
          <p>
            We strive to keep product information, pricing, and availability
            accurate. However, this information can change without notice. We are
            not responsible for discrepancies between our site and retailer
            websites.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to scrape, copy, or reverse-engineer the quiz algorithm</li>
            <li>Submit false information or multiple quiz submissions to manipulate results</li>
            <li>Interfere with the Site&apos;s operation or infrastructure</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-2">Limitation of Liability</h2>
          <p>
            GlowGuide is provided &quot;as is&quot; without warranties of any kind. We are
            not liable for any adverse skin reactions, allergic responses, or
            dissatisfaction resulting from products you purchase through our
            affiliate links.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Site
            after changes constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:hello@glowguide.love" className="text-primary hover:underline">
              hello@glowguide.love
            </a>.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </article>
    </section>
  );
}
