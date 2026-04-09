import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">✨</span>
          <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            GlowGuide
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/quiz"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Take the Quiz
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
