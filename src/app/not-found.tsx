import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="max-w-md mx-auto text-center">
        <span className="text-6xl mb-6 block">🧴</span>
        <h1 className="text-3xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Looks like this page doesn&apos;t exist. But since you&apos;re here,
          why not discover your perfect skincare routine?
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white text-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          Take the Skin Quiz
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
        <p className="mt-6 text-sm text-muted">
          Or go back to the{" "}
          <Link href="/" className="text-primary hover:underline">
            homepage
          </Link>
        </p>
      </div>
    </section>
  );
}
