"use client";

import { useState } from "react";

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  onSkip: () => void;
  isLoading: boolean;
}

export default function EmailCapture({
  onSubmit,
  onSkip,
  isLoading,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onSubmit(trimmed);
  };

  return (
    <div className="mt-8 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
        Your routine is ready!
      </h2>
      <p className="mt-3 text-muted max-w-md mx-auto">
        Enter your email to see your personalized skincare routine and get
        expert tips delivered weekly.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-sm mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
          disabled={isLoading}
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Building your routine...
            </span>
          ) : (
            "See My Routine"
          )}
        </button>
      </form>

      <button
        onClick={onSkip}
        disabled={isLoading}
        className="mt-4 text-sm text-muted hover:text-primary transition-colors disabled:opacity-40"
      >
        Skip for now
      </button>

      <p className="mt-6 text-xs text-muted/60 max-w-xs mx-auto">
        We respect your privacy. Unsubscribe anytime. No spam, ever.
      </p>
    </div>
  );
}
