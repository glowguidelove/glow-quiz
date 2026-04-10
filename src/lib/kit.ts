// Kit (ConvertKit) API integration
// Setup: see docs/kit-email-setup.md
// API key: https://app.kit.com/account/edit

import type { QuizAnswers, SkinConcern, SkinType } from "@/types";

const KIT_API_KEY = process.env.KIT_API_KEY ?? "";
const KIT_FORM_ID = process.env.KIT_FORM_ID ?? "";

interface SubscribeParams {
  email: string;
  firstName?: string;
  fields?: Record<string, string>;
  tags?: number[];
}

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

async function postKitSubscribe(
  body: Record<string, unknown>
): Promise<{ ok: boolean; status: number; text: string }> {
  const url = `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text };
}

export async function subscribeToKit(params: SubscribeParams): Promise<boolean> {
  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.warn("Kit: Missing API key or form ID. Skipping subscription.");
    return false;
  }

  const fields = sanitizeFields(params.fields);
  const tags =
    params.tags && params.tags.length > 0 ? params.tags : undefined;

  const withFields: Record<string, unknown> = {
    api_key: KIT_API_KEY,
    email: params.email,
    ...(params.firstName ? { first_name: params.firstName } : {}),
    ...(fields ? { fields } : {}),
    ...(tags ? { tags } : {}),
  };

  const emailOnly: Record<string, unknown> = {
    api_key: KIT_API_KEY,
    email: params.email,
  };

  try {
    let { ok, status, text } = await postKitSubscribe(withFields);

    if (!ok && fields) {
      console.warn(
        "Kit: subscribe with quiz fields failed; retrying email-only. Status:",
        status,
        text
      );
      ({ ok, status, text } = await postKitSubscribe(emailOnly));
    }

    if (!ok) {
      console.error("Kit subscription error:", status, text);
      return false;
    }

    try {
      const data = JSON.parse(text) as { subscription?: unknown };
      if (!data.subscription) {
        console.error("Kit: unexpected response (no subscription):", text);
        return false;
      }
    } catch {
      console.error("Kit: invalid JSON response:", text);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Kit subscription failed:", error);
    return false;
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
