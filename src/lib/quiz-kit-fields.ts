import type { SkinConcern, SkinType } from "@/types";

/** Display strings for Kit merge tags (e.g. `{{ subscriber.skin_concern_label }}`). */
export const SKIN_CONCERN_LABEL: Record<SkinConcern, string> = {
  acne: "Acne",
  aging: "Aging",
  "dark-spots": "Dark spots",
  redness: "Redness",
  dullness: "Dullness",
};

/** Display strings for Kit merge tags (e.g. `{{ subscriber.skin_type_label }}`). */
export const SKIN_TYPE_LABEL: Record<SkinType, string> = {
  oily: "Oily",
  dry: "Dry",
  combination: "Combination",
  sensitive: "Sensitive",
  normal: "Normal",
};
