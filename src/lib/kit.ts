// Kit (ConvertKit) API integration
// Setup: see docs/kit-email-setup.md
// API key: https://app.kit.com/account/edit

import type { QuizAnswers, SkinConcern, SkinType } from "@/types";

function envTrim(key: string): string {
  const v = process.env[key];
  return typeof v === "string" ? v.trim() : "";
}

const KIT_API_KEY = () => envTrim("KIT_API_KEY");
const KIT_FORM_ID = () => envTrim("KIT_FORM_ID");

interface SubscribeParams {
  email: string;
  firstName?: string;
  fields?: Record<string, string>;
  tags?: number[];
}

/** Safe to return to the client (no secrets). */
export type KitSubscribeError =
  | "missing_env"
  | "network"
  | "http"
  | "bad_json"
  | "no_subscription";

export type KitSubscribeResult =
  | { ok: true }
  | {
      ok: false;
      error: KitSubscribeError;
      /** HTTP status when error is `http` */
      status?: number;
      /** Short API message (truncated), for debugging */
      detail?: string;
    };

function sanitizeFields(
  fields?: Record<string, string>
): Record<string, string> | undefined {
  if (!fields) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v != null && String(v).trim() !== "") out[k] = String(v);
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function truncateDetail(s: string, max = 180): string {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

async function postKitSubscribe(
  formId: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; status: number; text: string }> {
  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text };
}

export async function subscribeToKit(
  params: SubscribeParams
): Promise<KitSubscribeResult> {
  const apiKey = KIT_API_KEY();
  const formId = KIT_FORM_ID();

  if (!apiKey || !formId) {
    console.warn("Kit: Missing API key or form ID. Skipping subscription.");
    return { ok: false, error: "missing_env" };
  }

  const fields = sanitizeFields(params.fields);
  const tags =
    params.tags && params.tags.length > 0 ? params.tags : undefined;

  const fullPayload: Record<string, unknown> = {
    api_key: apiKey,
    email: params.email,
    ...(params.firstName ? { first_name: params.firstName } : {}),
    ...(fields ? { fields } : {}),
    ...(tags ? { tags } : {}),
  };

  const emailOnly: Record<string, unknown> = {
    api_key: apiKey,
    email: params.email,
  };

  const hadExtras = !!(fields || tags);

  try {
    let { ok, status, text } = await postKitSubscribe(formId, fullPayload);

    if (!ok && hadExtras) {
      console.warn(
        "Kit: full subscribe failed; retrying email-only. Status:",
        status,
        text
      );
      ({ ok, status, text } = await postKitSubscribe(formId, emailOnly));
    }

    if (!ok) {
      console.error("Kit subscription error:", status, text);
      return {
        ok: false,
        error: "http",
        status,
        detail: truncateDetail(text),
      };
    }

    let data: { subscription?: unknown };
    try {
      data = JSON.parse(text) as { subscription?: unknown };
    } catch {
      return {
        ok: false,
        error: "bad_json",
        detail: truncateDetail(text),
      };
    }

    if (!data.subscription) {
      console.error("Kit: unexpected response (no subscription):", text);
      return {
        ok: false,
        error: "no_subscription",
        detail: truncateDetail(text),
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Kit subscription failed:", error);
    return { ok: false, error: "network" };
  }
}

/**
 * Tag IDs from Kit: Settings → Tags → open tag → ID is in the URL or use
 * GET https://api.convertkit.com/v3/tags?api_key=YOUR_KEY
 * Replace `0` with real IDs; zeros are skipped (feature off until you configure).
 */
export const KIT_TAGS = {
  quizCompleter: 0,
  skinTypeOily: 0,
  skinTypeDry: 0,
  skinTypeCombination: 0,
  skinTypeSensitive: 0,
  skinTypeNormal: 0,
  concernAcne: 0,
  concernAging: 0,
  concernDarkSpots: 0,
  concernRedness: 0,
  concernDullness: 0,
} as const;

const SKIN_TAG_KEY: Record<SkinType, keyof typeof KIT_TAGS> = {
  oily: "skinTypeOily",
  dry: "skinTypeDry",
  combination: "skinTypeCombination",
  sensitive: "skinTypeSensitive",
  normal: "skinTypeNormal",
};

const CONCERN_TAG_KEY: Record<SkinConcern, keyof typeof KIT_TAGS> = {
  acne: "concernAcne",
  aging: "concernAging",
  "dark-spots": "concernDarkSpots",
  redness: "concernRedness",
  dullness: "concernDullness",
};

/** Resolves quiz answers to Kit tag IDs (deduped). Only IDs greater than 0 are applied. */
export function tagsForQuizAnswers(answers: QuizAnswers): number[] {
  const out: number[] = [];

  const push = (id: number) => {
    if (id > 0) out.push(id);
  };

  push(KIT_TAGS.quizCompleter);
  push(KIT_TAGS[SKIN_TAG_KEY[answers.skinType]]);
  push(KIT_TAGS[CONCERN_TAG_KEY[answers.concern]]);

  return [...new Set(out)];
}
