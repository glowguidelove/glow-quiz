import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — GlowGuide",
  description: "How GlowGuide collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <article className="max-w-2xl mx-auto prose-custom">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted mt-1">Last updated: April 2026</p>

        <div className="mt-8 space-y-6 text-foreground/80 leading-relaxed text-[15px]">
          <p>
            GlowGuide (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at
            glowguide.love. This Privacy Policy explains how we collect, use, and
            protect your personal information when you use our site.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Information We Collect</h2>

          <h3 className="text-base font-semibold text-foreground">Quiz Responses</h3>
          <p>
            When you take our skin quiz, we collect your responses (skin type,
            concerns, age range, budget preferences, etc.) to generate
            personalized product recommendations. This data is not personally
            identifiable on its own.
          </p>

          <h3 className="text-base font-semibold text-foreground">Email Address</h3>
          <p>
            If you choose to enter your email address, we store it to send your
            personalized routine and weekly skincare tips. You can unsubscribe at
            any time via the link in every email.
          </p>

          <h3 className="text-base font-semibold text-foreground">Cookies &amp; Tracking</h3>
          <p>
            We use <strong>Google Analytics 4</strong> to understand how visitors
            use our site (for example, which pages are viewed and how you navigate
            the quiz). Google processes this data according to its own privacy
            policy. Analytics runs only if you accept cookies in our banner.
          </p>
          <p>
            We use the Meta (Facebook) Pixel and Conversions API to understand
            how visitors interact with our site and to improve our advertising.
            This technology may collect:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Pages visited and actions taken (quiz started, completed, etc.)</li>
            <li>Browser type and device information</li>
            <li>IP address (anonymized)</li>
            <li>Referral source</li>
          </ul>
          <p>
            You can control cookie preferences via the consent banner on our site
            or through your browser settings.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To generate personalized skincare recommendations</li>
            <li>To send email communications you opted into</li>
            <li>To improve our quiz algorithm and product recommendations</li>
            <li>To run and optimize advertising campaigns on Meta platforms</li>
            <li>To analyze site usage and improve user experience</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-2">Affiliate Disclosure</h2>
          <p>
            GlowGuide participates in affiliate programs with skincare brands.
            When you click a product link and make a purchase, we may earn a
            commission at no additional cost to you. Affiliate relationships do
            not influence our product recommendations.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Kit (ConvertKit)</strong> — our email service provider, to
              deliver emails you opted into
            </li>
            <li>
              <strong>Meta Platforms</strong> — anonymized event data for
              advertising optimization
            </li>
            <li>
              <strong>Vercel</strong> — our hosting provider, which processes
              requests to serve the site
            </li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-2">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from emails at any time</li>
            <li>Opt out of tracking via cookie preferences or browser settings</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-2">Data Retention</h2>
          <p>
            We retain your email and quiz data for as long as you remain
            subscribed. If you unsubscribe, your email is removed from our active
            mailing list. You may request full deletion by contacting us.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-2">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:privacy@glowguide.love" className="text-primary hover:underline">
              privacy@glowguide.love
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
