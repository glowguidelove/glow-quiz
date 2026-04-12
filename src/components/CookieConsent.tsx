"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_ACCEPT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
    document.dispatchEvent(new Event(COOKIE_CONSENT_ACCEPT_EVENT));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "declined");
    setVisible(false);
    // Disable Pixel tracking if user declines
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "revoke");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-slide-up">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-foreground/80">
          <p>
            We use cookies, Google Analytics, and the Meta Pixel to understand
            how you use GlowGuide and to improve our content and ads.{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-muted border border-border rounded-xl hover:bg-background transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
