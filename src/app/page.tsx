import Link from "next/link";
import Script from "next/script";

const stats = [
  { value: "50,000+", label: "Routines Created" },
  { value: "60 sec", label: "Quick Quiz" },
  { value: "100%", label: "Free Forever" },
];

const steps = [
  {
    number: "01",
    title: "Take the Quiz",
    description: "Answer 7 quick questions about your skin type, concerns, and goals.",
  },
  {
    number: "02",
    title: "Get Matched",
    description: "Our algorithm analyzes your profile and matches you with the right products.",
  },
  {
    number: "03",
    title: "Glow Up",
    description: "Follow your personalized routine and watch your skin transform.",
  },
];

const brands = [
  "Paula's Choice",
  "The Ordinary",
  "CeraVe",
  "La Roche-Posay",
  "EltaMD",
  "TULA",
];

const testimonials = [
  {
    quote: "I've spent hundreds on products that didn't work. GlowGuide recommended a routine that actually cleared my skin in 3 weeks.",
    name: "Sarah M.",
    detail: "Oily / Acne-prone",
    initials: "SM",
    color: "bg-rose-100 text-rose-600",
  },
  {
    quote: "As someone with super sensitive skin, I was scared to try new products. Every recommendation was gentle and perfect for me.",
    name: "Jessica L.",
    detail: "Sensitive / Redness",
    initials: "JL",
    color: "bg-violet-100 text-violet-600",
  },
  {
    quote: "The quiz took 60 seconds and saved me hours of research. My dark spots have visibly faded after 6 weeks.",
    name: "Priya K.",
    detail: "Combination / Dark Spots",
    initials: "PK",
    color: "bg-amber-100 text-amber-600",
  },
];

const faqs = [
  {
    q: "Is this really free?",
    a: "Yes, 100% free. You take the quiz, we show you product recommendations. We earn a small affiliate commission if you purchase through our links, but you never pay extra.",
  },
  {
    q: "How do you choose the products you recommend?",
    a: "We curate products based on dermatologist-backed ingredients, thousands of verified reviews, and real-world testing data. We match them to your specific skin type, concerns, sensitivity level, and budget.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account required. You can take the quiz and see your results immediately. We only ask for an email if you want your routine saved and weekly skincare tips — and you can skip that too.",
  },
  {
    q: "How is this different from other skincare quizzes?",
    a: "Most quizzes are made by single brands to sell their own products. We're brand-independent and recommend across 10+ trusted brands to find what actually works best for your skin, not what makes one company the most money.",
  },
  {
    q: "Can I retake the quiz if my skin changes?",
    a: "Absolutely. Your skin changes with seasons, age, and lifestyle. Retake the quiz anytime to get updated recommendations.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-primary bg-primary-light/60 px-4 py-1.5 rounded-full mb-6">
            Personalized skincare in 60 seconds
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Find Your Perfect{" "}
            <span className="text-primary">Skincare Routine</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Stop guessing which products to buy. Take our quick skin quiz and get
            a dermatologist-informed routine tailored to your skin type, concerns,
            and budget.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white text-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Take the Free Quiz
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <span className="text-sm text-muted">
              No signup required to start
            </span>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-8 border-y border-border bg-white/50">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-10 px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-6">
          We recommend products from trusted brands
        </p>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-semibold text-foreground/30 whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            How It Works
          </h2>
          <p className="mt-3 text-center text-muted text-lg">
            Three simple steps to your best skin ever.
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-4xl font-black text-primary/20">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/50 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            Real Results
          </h2>
          <p className="mt-3 text-center text-muted text-lg">
            Join thousands who found their glow.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex gap-1 text-accent mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-center text-muted text-lg">
            Everything you need to know before you start.
          </p>

          <div className="mt-14 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 rounded-2xl bg-card border border-border hover:shadow-sm transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer text-foreground font-semibold list-none">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-muted flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to Find Your Routine?
          </h2>
          <p className="mt-4 text-lg text-muted">
            It takes 60 seconds and it&apos;s completely free. No signup required.
          </p>
          <Link
            href="/quiz"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white text-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Start the Quiz
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
