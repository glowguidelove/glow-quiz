import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function isGaConfigured(): boolean {
  return Boolean(GA_ID && GA_ID.startsWith("G-"));
}

/** Fire a GA4 event only if analytics cookies were accepted and gtag is loaded */
export function trackGaEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== "accepted") return;
  } catch {
    return;
  }
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
