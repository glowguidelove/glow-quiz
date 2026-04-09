export type SkinType = "oily" | "dry" | "combination" | "normal" | "sensitive";

export type SkinConcern =
  | "acne"
  | "aging"
  | "dark-spots"
  | "redness"
  | "dullness";

export type Sensitivity = "very" | "somewhat" | "not";
export type AgeRange = "18-24" | "25-34" | "35-44" | "45-54" | "55+";
export type RoutineLevel = "minimal" | "basic" | "multi-step" | "not-working";
export type IngredientPref = "clean" | "clinical" | "no-preference";
export type Budget = "under-30" | "30-75" | "75-150" | "150-plus";

export interface QuizAnswers {
  skinType: SkinType;
  concern: SkinConcern;
  sensitivity: Sensitivity;
  ageRange: AgeRange;
  routineLevel: RoutineLevel;
  ingredientPref: IngredientPref;
  budget: Budget;
}

export interface QuizQuestion {
  id: keyof QuizAnswers;
  question: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    emoji: string;
    description?: string;
  }[];
}

export interface Product {
  step: string;
  name: string;
  brand: string;
  price: string;
  affiliateUrl: string;
  imageUrl: string;
  whyThisProduct: string;
}

export interface RoutineProfile {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  products: Product[];
  tags: string[];
}

export interface QuizSubmission {
  answers: QuizAnswers;
  email: string;
  routineId: string;
  timestamp: string;
}
