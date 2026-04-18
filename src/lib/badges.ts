// src/lib/badges.ts
// KidPreneur Badge Matrix v2.0
// Authored by FARIDA. April 17 2026.
// Backwards-compatible with v1: BADGE_FIRST_QUIZ, BADGE_PERFECT_QUIZ,
// BADGE_FIRST_MISSION, ALL_BADGES still exported.

export type BadgeCategory =
  | "first_time"
  | "mastery"
  | "streak"
  | "world_completion"
  | "empire";

export type BadgeRarity = "common" | "rare" | "legendary";

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpBonus: number;
  // Optional art (PNG/SVG) — falls back to emoji when absent.
  // Populated as the Quacky PNG waves ship (1, 2, 3).
  artUrl?: string;
  artUrlLocked?: string;
}

// ═════════════════════════════════════════════
// FIRST-TIME (6)
// ═════════════════════════════════════════════
export const BADGE_FIRST_LOGIN: Badge = {
  id: "first_login",
  name: "First Steps",
  emoji: "🐣",
  description: "Welcome to KidPreneur. Your empire starts here.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25,
  artUrl: "/badges/quacky_first_login_1024.png",
};

export const BADGE_FIRST_QUIZ: Badge = {
  id: "first_quiz",
  name: "Quiz Rookie",
  emoji: "🎯",
  description: "You finished your first quiz. Many more to come.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25,
  artUrl: "/badges/quacky_first_quiz_1024.png",
};

export const BADGE_FIRST_MISSION: Badge = {
  id: "first_mission",
  name: "Mission Ready",
  emoji: "🚀",
  description: "Your first mission is in the books.",
  category: "first_time",
  rarity: "common",
  xpBonus: 50,
  artUrl: "/badges/quacky_first_mission_1024.png"
};

export const BADGE_FIRST_SANDBOX: Badge = {
  artUrl: "/badges/quacky_first_sandbox_1024.png",
  id: "first_sandbox",
  name: "First Prompt",
  emoji: "💬",
  description: "You sent your first message to an AI.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25
};

export const BADGE_FIRST_REFLECTION: Badge = {
  artUrl: "/badges/quacky_first_reflection_1024.png",
  id: "first_reflection",
  name: "Deep Thinker",
  emoji: "🤔",
  description: "Reflection is where real learning happens.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25
};

export const BADGE_FIRST_LESSON: Badge = {
  artUrl: "/badges/quacky_first_lesson_1024.png",
  id: "first_lesson",
  name: "Lesson One",
  emoji: "📚",
  description: "Your first complete lesson. The empire begins.",
  category: "first_time",
  rarity: "common",
  xpBonus: 50
};

// ═════════════════════════════════════════════
// MASTERY (5)
// ═════════════════════════════════════════════
export const BADGE_PERFECT_QUIZ: Badge = {
  id: "perfect_quiz",
  name: "Quiz Master",
  emoji: "⭐",
  description: "Three out of three. Flawless.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 50,
  artUrl: "/badges/quacky_perfect_quiz_1024.png"
};

export const BADGE_PERFECT_QUIZ_5: Badge = {
  id: "perfect_quiz_5",
  name: "Triple Crown",
  emoji: "🏆",
  description: "Five perfect quizzes. Consistency is greatness.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 200
};

export const BADGE_MISSION_TRIO: Badge = {
  id: "mission_trio",
  name: "Triple Threat",
  emoji: "🎖️",
  description: "All three missions of a single lesson. Completionist mode.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 100,
  artUrl: "/badges/quacky_mission_trio_1024.png"
};

export const BADGE_PROMPT_WIZARD: Badge = {
  id: "prompt_wizard",
  name: "Prompt Wizard",
  emoji: "🪄",
  description: "25 AI prompts sent. You speak fluent AI now.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 150
};

export const BADGE_REFLECTION_SAGE: Badge = {
  id: "reflection_sage",
  name: "Reflection Sage",
  emoji: "📜",
  description: "25 reflections written. Your wisdom is compounding.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 150
};

// ═════════════════════════════════════════════
// STREAK (4)
// ═════════════════════════════════════════════
export const BADGE_STREAK_3: Badge = {
  id: "streak_3",
  name: "On Fire",
  emoji: "🔥",
  description: "3 days straight. Consistency beats intensity.",
  category: "streak",
  rarity: "common",
  xpBonus: 50,
  artUrl: "/badges/quacky_streak_3_1024.png"
};

export const BADGE_STREAK_7: Badge = {
  id: "streak_7",
  name: "Week Warrior",
  emoji: "⚔️",
  description: "7 straight days. This is how real operators work.",
  category: "streak",
  rarity: "rare",
  xpBonus: 150
};

export const BADGE_STREAK_14: Badge = {
  id: "streak_14",
  name: "Fortnight Flame",
  emoji: "💫",
  description: "14 days. Most adults cannot do this.",
  category: "streak",
  rarity: "rare",
  xpBonus: 300
};

export const BADGE_STREAK_30: Badge = {
  id: "streak_30",
  name: "Empire Legend",
  emoji: "👑",
  description: "30 days. You are officially unstoppable.",
  category: "streak",
  rarity: "legendary",
  xpBonus: 1000
};

// ═════════════════════════════════════════════
// WORLD COMPLETION (10)
// ═════════════════════════════════════════════
export const BADGE_CANVAS_KINGDOM_CHAMPION: Badge = {
  id: "canvas_kingdom_champion",
  name: "Canvas Champion",
  emoji: "🎨",
  description: "All 8 Canvas Kingdom lessons mastered.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_STORY_FORGE_CHAMPION: Badge = {
  id: "story_forge_champion",
  name: "Story Smith",
  emoji: "✍️",
  description: "All 8 Story Forge lessons mastered.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_CROWD_PLAZA_CHAMPION: Badge = {
  id: "crowd_plaza_champion",
  name: "Voice of the Plaza",
  emoji: "📣",
  description: "All 6 Crowd Plaza lessons mastered.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_POWER_GRID_CHAMPION: Badge = {
  id: "power_grid_champion",
  name: "Grid Master",
  emoji: "⚡",
  description: "All 8 Power Grid lessons mastered.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_NEURAL_NEXUS_CHAMPION: Badge = {
  id: "neural_nexus_champion",
  name: "Nexus Oracle",
  emoji: "🧠",
  description: "All 8 Neural Nexus lessons mastered.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_CANVAS_KINGDOM_CAPSTONE: Badge = {
  id: "canvas_kingdom_capstone",
  name: "Canvas Portfolio",
  emoji: "🖼️",
  description: "Canvas Kingdom capstone shipped. Designer unlocked.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000
};

export const BADGE_STORY_FORGE_CAPSTONE: Badge = {
  id: "story_forge_capstone",
  name: "Story Collection",
  emoji: "📖",
  description: "Story Forge capstone shipped. Storyteller unlocked.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000
};

export const BADGE_CROWD_PLAZA_CAPSTONE: Badge = {
  id: "crowd_plaza_capstone",
  name: "Launch Kit",
  emoji: "🎬",
  description: "Crowd Plaza capstone shipped. Creator unlocked.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000
};

export const BADGE_POWER_GRID_CAPSTONE: Badge = {
  id: "power_grid_capstone",
  name: "Power Playbook",
  emoji: "⚙️",
  description: "Power Grid capstone shipped. Operator unlocked.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000
};

export const BADGE_NEURAL_NEXUS_CAPSTONE: Badge = {
  id: "neural_nexus_capstone",
  name: "Intelligence Report",
  emoji: "💎",
  description: "Neural Nexus capstone published. Analyst unlocked.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 2000
};

// ═════════════════════════════════════════════
// EMPIRE (8)
// ═════════════════════════════════════════════
export const BADGE_EMPIRE_BUILDER_W1: Badge = {
  id: "empire_builder_w1",
  name: "First Studio",
  emoji: "🏛️",
  description: "You launched your first creative studio business.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_EMPIRE_BUILDER_W2: Badge = {
  id: "empire_builder_w2",
  name: "First Story Studio",
  emoji: "🏛️",
  description: "You launched your first storytelling business.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_EMPIRE_BUILDER_W3: Badge = {
  id: "empire_builder_w3",
  name: "First Audience",
  emoji: "🏛️",
  description: "You launched your first real content channel.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_EMPIRE_BUILDER_W4: Badge = {
  id: "empire_builder_w4",
  name: "First OS",
  emoji: "🏛️",
  description: "You built your first productivity consulting offer.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_EMPIRE_BUILDER_W5: Badge = {
  id: "empire_builder_w5",
  name: "First AI Agency",
  emoji: "🏛️",
  description: "You launched your first AI consulting agency.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_XP_1000: Badge = {
  id: "xp_1000",
  name: "Rising Star",
  emoji: "🌟",
  description: "1,000 XP earned. The foundation is real.",
  category: "empire",
  rarity: "common",
  xpBonus: 100
};

export const BADGE_XP_10000: Badge = {
  id: "xp_10000",
  name: "Shining Bright",
  emoji: "✨",
  description: "10,000 XP earned. You are running now.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500
};

export const BADGE_KIDPRENEUR_FOUNDER: Badge = {
  id: "kidpreneur_founder",
  name: "KidPreneur Founder",
  emoji: "🎓",
  description: "All 5 worlds plus 5 capstones. Empire complete.",
  category: "empire",
  rarity: "legendary",
  xpBonus: 5000
};

// ═════════════════════════════════════════════
// REGISTRY
// ═════════════════════════════════════════════
export const ALL_BADGES: Badge[] = [
  // First-time
  BADGE_FIRST_LOGIN,
  BADGE_FIRST_QUIZ,
  BADGE_FIRST_MISSION,
  BADGE_FIRST_SANDBOX,
  BADGE_FIRST_REFLECTION,
  BADGE_FIRST_LESSON,
  // Mastery
  BADGE_PERFECT_QUIZ,
  BADGE_PERFECT_QUIZ_5,
  BADGE_MISSION_TRIO,
  BADGE_PROMPT_WIZARD,
  BADGE_REFLECTION_SAGE,
  // Streak
  BADGE_STREAK_3,
  BADGE_STREAK_7,
  BADGE_STREAK_14,
  BADGE_STREAK_30,
  // World completion
  BADGE_CANVAS_KINGDOM_CHAMPION,
  BADGE_STORY_FORGE_CHAMPION,
  BADGE_CROWD_PLAZA_CHAMPION,
  BADGE_POWER_GRID_CHAMPION,
  BADGE_NEURAL_NEXUS_CHAMPION,
  BADGE_CANVAS_KINGDOM_CAPSTONE,
  BADGE_STORY_FORGE_CAPSTONE,
  BADGE_CROWD_PLAZA_CAPSTONE,
  BADGE_POWER_GRID_CAPSTONE,
  BADGE_NEURAL_NEXUS_CAPSTONE,
  // Empire
  BADGE_EMPIRE_BUILDER_W1,
  BADGE_EMPIRE_BUILDER_W2,
  BADGE_EMPIRE_BUILDER_W3,
  BADGE_EMPIRE_BUILDER_W4,
  BADGE_EMPIRE_BUILDER_W5,
  BADGE_XP_1000,
  BADGE_XP_10000,
  BADGE_KIDPRENEUR_FOUNDER
];

// Quick-lookup map for dispatcher
export const BADGE_BY_ID: Record<string, Badge> = ALL_BADGES.reduce(
  (acc, badge) => {
    acc[badge.id] = badge;
    return acc;
  },
  {} as Record<string, Badge>
);

// Helper: resolve world champion badge from worldId
export function getWorldChampionBadge(worldId: string): Badge | null {
  const map: Record<string, Badge> = {
    w1: BADGE_CANVAS_KINGDOM_CHAMPION,
    w2: BADGE_STORY_FORGE_CHAMPION,
    w3: BADGE_CROWD_PLAZA_CHAMPION,
    w4: BADGE_POWER_GRID_CHAMPION,
    w5: BADGE_NEURAL_NEXUS_CHAMPION
  };
  return map[worldId] || null;
}

// Helper: resolve world capstone badge from worldId
export function getWorldCapstoneBadge(worldId: string): Badge | null {
  const map: Record<string, Badge> = {
    w1: BADGE_CANVAS_KINGDOM_CAPSTONE,
    w2: BADGE_STORY_FORGE_CAPSTONE,
    w3: BADGE_CROWD_PLAZA_CAPSTONE,
    w4: BADGE_POWER_GRID_CAPSTONE,
    w5: BADGE_NEURAL_NEXUS_CAPSTONE
  };
  return map[worldId] || null;
}

// Helper: resolve empire-builder badge from worldId
export function getEmpireBuilderBadge(worldId: string): Badge | null {
  const map: Record<string, Badge> = {
    w1: BADGE_EMPIRE_BUILDER_W1,
    w2: BADGE_EMPIRE_BUILDER_W2,
    w3: BADGE_EMPIRE_BUILDER_W3,
    w4: BADGE_EMPIRE_BUILDER_W4,
    w5: BADGE_EMPIRE_BUILDER_W5
  };
  return map[worldId] || null;
}
