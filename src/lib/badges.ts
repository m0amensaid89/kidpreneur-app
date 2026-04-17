export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const BADGE_FIRST_QUIZ: Badge = {
  id: "first_quiz",
  name: "First Steps",
  emoji: "🎯", // Using target as emoji target was suggested, but string literal works
  description: "Completed your first quiz."
};

export const BADGE_PERFECT_QUIZ: Badge = {
  id: "perfect_quiz",
  name: "Quiz Master",
  emoji: "⭐",
  description: "Got all 3 correct."
};

export const BADGE_FIRST_MISSION: Badge = {
  id: "first_mission",
  name: "Mission Ready",
  emoji: "🚀",
  description: "Completed your first mission."
};

export const ALL_BADGES: Badge[] = [
  BADGE_FIRST_QUIZ,
  BADGE_PERFECT_QUIZ,
  BADGE_FIRST_MISSION
];
