import { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "skinType",
    question: "What's your skin type?",
    subtitle: "If you're unsure, think about how your skin feels by midday.",
    options: [
      {
        value: "oily",
        label: "Oily",
        emoji: "✨",
        description: "Shiny by noon, visible pores",
      },
      {
        value: "dry",
        label: "Dry",
        emoji: "🏜️",
        description: "Tight, flaky, or rough patches",
      },
      {
        value: "combination",
        label: "Combination",
        emoji: "🔀",
        description: "Oily T-zone, dry cheeks",
      },
      {
        value: "normal",
        label: "Normal",
        emoji: "😊",
        description: "Balanced, rarely problematic",
      },
      {
        value: "sensitive",
        label: "Sensitive",
        emoji: "🌸",
        description: "Reacts easily, often irritated",
      },
    ],
  },
  {
    id: "concern",
    question: "What's your biggest skin concern?",
    subtitle: "Pick the one that bothers you the most.",
    options: [
      {
        value: "acne",
        label: "Acne & Breakouts",
        emoji: "🎯",
        description: "Pimples, clogged pores, blackheads",
      },
      {
        value: "aging",
        label: "Aging & Wrinkles",
        emoji: "⏳",
        description: "Fine lines, loss of firmness",
      },
      {
        value: "dark-spots",
        label: "Dark Spots",
        emoji: "🔵",
        description: "Hyperpigmentation, uneven tone",
      },
      {
        value: "redness",
        label: "Redness & Irritation",
        emoji: "🌹",
        description: "Flushing, rosacea, reactive skin",
      },
      {
        value: "dullness",
        label: "Dullness",
        emoji: "💫",
        description: "Lackluster, tired-looking skin",
      },
    ],
  },
  {
    id: "sensitivity",
    question: "How sensitive is your skin?",
    subtitle: "Think about how your skin reacts to new products.",
    options: [
      {
        value: "very",
        label: "Very Sensitive",
        emoji: "⚠️",
        description: "Burns, stings, or breaks out with most new products",
      },
      {
        value: "somewhat",
        label: "Somewhat Sensitive",
        emoji: "🤔",
        description: "Occasional reactions, usually fine with most products",
      },
      {
        value: "not",
        label: "Not Sensitive",
        emoji: "💪",
        description: "Can handle pretty much anything",
      },
    ],
  },
  {
    id: "ageRange",
    question: "What's your age range?",
    subtitle: "This helps us recommend age-appropriate ingredients.",
    options: [
      { value: "18-24", label: "18–24", emoji: "🌱" },
      { value: "25-34", label: "25–34", emoji: "🌿" },
      { value: "35-44", label: "35–44", emoji: "🌳" },
      { value: "45-54", label: "45–54", emoji: "🍂" },
      { value: "55+", label: "55+", emoji: "🌺" },
    ],
  },
  {
    id: "routineLevel",
    question: "What's your current skincare routine?",
    subtitle: "Be honest — no judgment here!",
    options: [
      {
        value: "minimal",
        label: "Barely anything",
        emoji: "🫧",
        description: "Water and maybe some moisturizer",
      },
      {
        value: "basic",
        label: "The basics",
        emoji: "🧴",
        description: "Cleanser + moisturizer",
      },
      {
        value: "multi-step",
        label: "Multi-step routine",
        emoji: "✅",
        description: "Several products, consistent routine",
      },
      {
        value: "not-working",
        label: "Full routine, not working",
        emoji: "😤",
        description: "I have products but they're not cutting it",
      },
    ],
  },
  {
    id: "ingredientPref",
    question: "What's your ingredient philosophy?",
    subtitle: "This helps us match you with the right brands.",
    options: [
      {
        value: "clean",
        label: "Clean & Natural",
        emoji: "🌿",
        description: "Minimal ingredients, plant-based, fragrance-free",
      },
      {
        value: "clinical",
        label: "Science-backed & Clinical",
        emoji: "🔬",
        description: "Proven actives like retinol, AHAs, vitamin C",
      },
      {
        value: "no-preference",
        label: "No preference",
        emoji: "🤷",
        description: "If it works, I'm in",
      },
    ],
  },
  {
    id: "budget",
    question: "What's your monthly skincare budget?",
    subtitle: "For your full routine, not just one product.",
    options: [
      { value: "under-30", label: "Under $30", emoji: "💰" },
      { value: "30-75", label: "$30–$75", emoji: "💵" },
      { value: "75-150", label: "$75–$150", emoji: "💎" },
      { value: "150-plus", label: "$150+", emoji: "👑" },
    ],
  },
];
