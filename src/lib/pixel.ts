// Meta Pixel / Conversions API helpers
// Replace PIXEL_ID and ACCESS_TOKEN with your actual values from Meta Business Suite.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const META_ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN ?? "";
/** When set, CAPI requests include Meta’s test_event_code (Events Manager → Test events → server instructions). Remove after testing. */
export const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE ?? "";

// ── Client-side helpers (call from browser) ──

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

export function trackCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params);
  }
}

// ── Server-side CAPI helper (call from API routes) ──

interface ServerEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: "website";
  user_data: {
    em?: string[];
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: Record<string, unknown>;
}

export async function sendServerEvent(event: ServerEvent): Promise<boolean> {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    console.warn("Meta CAPI: Missing pixel ID or access token");
    return false;
  }

  const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`;

  try {
    const payload: Record<string, unknown> = {
      data: [event],
      access_token: META_ACCESS_TOKEN,
    };
    if (META_TEST_EVENT_CODE) {
      payload.test_event_code = META_TEST_EVENT_CODE;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Meta CAPI error:", text);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Meta CAPI request failed:", error);
    return false;
  }
}

export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
