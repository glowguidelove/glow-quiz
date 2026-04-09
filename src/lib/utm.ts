const UTM_KEY = "gq_utm";
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type UtmParams = Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

/**
 * Capture UTM/fbclid params from the current URL and persist them in
 * sessionStorage so they survive page navigation within the quiz funnel.
 * Only captures once per session (first touch attribution).
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(UTM_KEY)) return;

    const url = new URL(window.location.href);
    const params: UtmParams = {};
    let found = false;

    for (const key of TRACKED_PARAMS) {
      const val = url.searchParams.get(key);
      if (val) {
        params[key] = val;
        found = true;
      }
    }

    if (found) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(params));
    }
  } catch { /* private browsing, etc */ }
}

export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Build the Meta fbc parameter from fbclid.
 * Format: fb.1.{timestamp}.{fbclid}
 */
export function buildFbc(): string | undefined {
  const params = getUtmParams();
  if (!params.fbclid) return undefined;
  return `fb.1.${Date.now()}.${params.fbclid}`;
}

/**
 * Read the _fbp cookie if present (set by Meta Pixel).
 */
export function getFbp(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)_fbp=([^;]*)/);
  return match?.[1] || undefined;
}
