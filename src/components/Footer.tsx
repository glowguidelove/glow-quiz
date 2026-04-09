import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto py-8 bg-white/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium text-foreground">
              GlowGuide
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            <Link href="/quiz" className="hover:text-primary transition-colors">
              Skin Quiz
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} GlowGuide. Affiliate disclosure: we
            earn commissions on qualifying purchases. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
