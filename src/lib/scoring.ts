import { QuizAnswers, RoutineProfile } from "@/types";
import { routineProfiles } from "@/data/products";

export function matchRoutine(answers: QuizAnswers): RoutineProfile {
  const answerTags = buildTags(answers);

  let bestMatch: RoutineProfile = routineProfiles[0];
  let bestScore = -1;

  for (const profile of routineProfiles) {
    const score = calculateMatchScore(answerTags, profile.tags);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = profile;
    }
  }

  return bestMatch;
}

function buildTags(answers: QuizAnswers): string[] {
  const tags: string[] = [
    answers.skinType,
    answers.concern,
    answers.ingredientPref,
    answers.budget,
  ];

  if (answers.routineLevel === "minimal" || answers.routineLevel === "basic") {
    tags.push(answers.routineLevel);
  }

  if (answers.sensitivity === "very") {
    tags.push("sensitive");
    tags.push("clean");
  }

  if (answers.ageRange === "45-54" || answers.ageRange === "55+") {
    tags.push("aging");
  }

  return tags;
}

function calculateMatchScore(answerTags: string[], profileTags: string[]): number {
  let score = 0;

  const priorityWeights: Record<string, number> = {
    oily: 3,
    dry: 3,
    combination: 3,
    normal: 2,
    sensitive: 3,
    acne: 4,
    aging: 4,
    "dark-spots": 4,
    redness: 4,
    dullness: 3,
    clean: 2,
    clinical: 2,
    "no-preference": 1,
    "under-30": 2,
    "30-75": 1,
    "75-150": 1,
    "150-plus": 2,
    minimal: 1,
    basic: 1,
  };

  for (const tag of answerTags) {
    if (profileTags.includes(tag)) {
      score += priorityWeights[tag] ?? 1;
    }
  }

  return score;
}

export function getRoutineById(id: string): RoutineProfile | undefined {
  return routineProfiles.find((p) => p.id === id);
}
