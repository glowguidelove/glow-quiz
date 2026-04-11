import type { SkinConcern } from "@/types";

/** Display strings for Kit merge tags (e.g. `{{ subscriber.skin_concern_label }}`). */
export const SKIN_CONCERN_LABEL: Record<SkinConcern, string> = {
  acne: "Acne",
  aging: "Aging",
  "dark-spots": "Dark spots",
  redness: "Redness",
  dullness: "Dullness",
};
