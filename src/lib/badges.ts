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
  nameAr?: string;
  emoji: string;
  description: string;
  descriptionAr?: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpBonus: number;
  artUrl?: string;
  artUrlLocked?: string;
}

// ═════════════════════════════════════════════
// FIRST-TIME (6)
// ═════════════════════════════════════════════
export const BADGE_FIRST_LOGIN: Badge = {
  id: "first_login",
  name: "First Steps",
  nameAr: "أول خطوة",
  emoji: "🐣",
  description: "Welcome to KidPreneur. Your empire starts here.",
  descriptionAr: "أهلاً في KidPreneur. إمبراطوريتك بدأت هنا.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25,
  artUrl: "/badges/quacky_first_login_1024.png",
};

export const BADGE_FIRST_QUIZ: Badge = {
  id: "first_quiz",
  name: "Quiz Rookie",
  nameAr: "أول اختبار",
  emoji: "🎯",
  description: "You finished your first quiz. Many more to come.",
  descriptionAr: "خلصت أول اختبار. في كتير جاي!",
  category: "first_time",
  rarity: "common",
  xpBonus: 25,
  artUrl: "/badges/quacky_first_quiz_1024.png",
};

export const BADGE_FIRST_MISSION: Badge = {
  id: "first_mission",
  name: "Mission Ready",
  nameAr: "جاهز للمهمة",
  emoji: "🚀",
  description: "Your first mission is in the books.",
  descriptionAr: "أول مهمة اتسجلت في تاريخك.",
  category: "first_time",
  rarity: "common",
  xpBonus: 50,
  artUrl: "/badges/quacky_first_mission_1024.png"
};

export const BADGE_FIRST_SANDBOX: Badge = {
  artUrl: "/badges/quacky_first_sandbox_1024.png",
  id: "first_sandbox",
  name: "First Prompt",
  nameAr: "أول برومبت",
  emoji: "💬",
  description: "You sent your first message to an AI.",
  descriptionAr: "بعتّ أول رسالة للذكاء الاصطناعي.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25
};

export const BADGE_FIRST_REFLECTION: Badge = {
  artUrl: "/badges/quacky_first_reflection_1024.png",
  id: "first_reflection",
  name: "Deep Thinker",
  nameAr: "مفكر عميق",
  emoji: "🤔",
  description: "Reflection is where real learning happens.",
  descriptionAr: "التأمل هو اللي بيفرق بين التعلم الحقيقي والحفظ.",
  category: "first_time",
  rarity: "common",
  xpBonus: 25
};

export const BADGE_FIRST_LESSON: Badge = {
  artUrl: "/badges/quacky_first_lesson_1024.png",
  id: "first_lesson",
  name: "Lesson One",
  nameAr: "الدرس الأول",
  emoji: "📚",
  description: "Your first complete lesson. The empire begins.",
  descriptionAr: "أول درس اكتمل. الإمبراطورية اتبنت.",
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
  nameAr: "ملك الاختبارات",
  emoji: "⭐",
  description: "Three out of three. Flawless.",
  descriptionAr: "٣ من ٣. مثالي دايماً.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 50,
  artUrl: "/badges/quacky_perfect_quiz_1024.png"
};

export const BADGE_PERFECT_QUIZ_5: Badge = {
  id: "perfect_quiz_5",
  name: "Triple Crown",
  nameAr: "التاج الثلاثي",
  emoji: "🏆",
  description: "Five perfect quizzes. Consistency is greatness.",
  descriptionAr: "٥ اختبارات مثالية. الثبات هو العظمة.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 200,
  artUrl: "/badges/quacky_perfect_quiz_5_1024.png",
};

export const BADGE_MISSION_TRIO: Badge = {
  id: "mission_trio",
  name: "Triple Threat",
  nameAr: "التهديد الثلاثي",
  emoji: "🎖️",
  description: "All three missions of a single lesson. Completionist mode.",
  descriptionAr: "كل مهام درس كامل. وضع الإتمام الكامل.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 100,
  artUrl: "/badges/quacky_mission_trio_1024.png"
};

export const BADGE_PROMPT_WIZARD: Badge = {
  id: "prompt_wizard",
  name: "Prompt Wizard",
  nameAr: "ساحر البرومبتات",
  emoji: "🪄",
  description: "25 AI prompts sent. You speak fluent AI now.",
  descriptionAr: "٢٥ برومبت اتبعتوا. بتتكلم الذكاء الاصطناعي بطلاقة.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 150,
  artUrl: "/badges/quacky_prompt_wizard_1024.png",
};

export const BADGE_REFLECTION_SAGE: Badge = {
  id: "reflection_sage",
  name: "Reflection Sage",
  nameAr: "حكيم التأمل",
  emoji: "📜",
  description: "25 reflections written. Your wisdom is compounding.",
  descriptionAr: "٢٥ تأمل اتكتبوا. حكمتك بتتراكم.",
  category: "mastery",
  rarity: "rare",
  xpBonus: 150,
  artUrl: "/badges/quacky_reflection_sage_1024.png",
};

// ═════════════════════════════════════════════
// STREAK (4)
// ═════════════════════════════════════════════
export const BADGE_STREAK_3: Badge = {
  id: "streak_3",
  name: "On Fire",
  nameAr: "في النار",
  emoji: "🔥",
  description: "3 days straight. Consistency beats intensity.",
  descriptionAr: "٣ أيام متتالية. الثبات يكسب الشدة.",
  category: "streak",
  rarity: "common",
  xpBonus: 50,
  artUrl: "/badges/quacky_streak_3_1024.png"
};

export const BADGE_STREAK_7: Badge = {
  id: "streak_7",
  name: "Week Warrior",
  nameAr: "محارب الأسبوع",
  emoji: "⚔️",
  description: "7 straight days. This is how real operators work.",
  descriptionAr: "٧ أيام متتالية. هكده بيشتغل الحراس الحقيقيون.",
  category: "streak",
  rarity: "rare",
  xpBonus: 150,
  artUrl: "/badges/quacky_streak_7_1024.png",
};

export const BADGE_STREAK_14: Badge = {
  id: "streak_14",
  name: "Fortnight Flame",
  nameAr: "لهيب أسبوعين",
  emoji: "💫",
  description: "14 days. Most adults cannot do this.",
  descriptionAr: "١٤ يوم. معظم الكبار مش قادرين يعملوا ده.",
  category: "streak",
  rarity: "rare",
  xpBonus: 300,
  artUrl: "/badges/quacky_streak_14_1024.png",
};

export const BADGE_STREAK_30: Badge = {
  id: "streak_30",
  name: "Empire Legend",
  nameAr: "أسطورة الإمبراطورية",
  emoji: "👑",
  description: "30 days. You are officially unstoppable.",
  descriptionAr: "٣٠ يوم. إنت رسمياً مستحيل إيقافك.",
  category: "streak",
  rarity: "legendary",
  xpBonus: 1000,
  artUrl: "/badges/quacky_streak_30_1024.png",
};

// ═════════════════════════════════════════════
// WORLD COMPLETION (10)
// ═════════════════════════════════════════════
export const BADGE_CANVAS_KINGDOM_CHAMPION: Badge = {
  id: "canvas_kingdom_champion",
  name: "Canvas Champion",
  nameAr: "بطل مملكة اللوحات",
  emoji: "🎨",
  description: "All 8 Canvas Kingdom lessons mastered.",
  descriptionAr: "كل دروس مملكة اللوحات اتتقنوا.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_canvas_kingdom_champion_1024.png",
};

export const BADGE_STORY_FORGE_CHAMPION: Badge = {
  id: "story_forge_champion",
  name: "Story Smith",
  nameAr: "بطل مصنع القصص",
  emoji: "✍️",
  description: "All 8 Story Forge lessons mastered.",
  descriptionAr: "كل دروس مصنع القصص اتتقنوا.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_story_forge_champion_1024.png",
};

export const BADGE_CROWD_PLAZA_CHAMPION: Badge = {
  id: "crowd_plaza_champion",
  name: "Voice of the Plaza",
  nameAr: "بطل ميدان الجماهير",
  emoji: "📣",
  description: "All 6 Crowd Plaza lessons mastered.",
  descriptionAr: "كل دروس ميدان الجماهير اتتقنوا.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_crowd_plaza_champion_1024.png",
};

export const BADGE_POWER_GRID_CHAMPION: Badge = {
  id: "power_grid_champion",
  name: "Grid Master",
  nameAr: "بطل شبكة القوة",
  emoji: "⚡",
  description: "All 8 Power Grid lessons mastered.",
  descriptionAr: "كل دروس شبكة القوة اتتقنوا.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_power_grid_champion_1024.png",
};

export const BADGE_NEURAL_NEXUS_CHAMPION: Badge = {
  id: "neural_nexus_champion",
  name: "Nexus Oracle",
  nameAr: "بطل عصر الذكاء",
  emoji: "🧠",
  description: "All 8 Neural Nexus lessons mastered.",
  descriptionAr: "كل دروس عصر الذكاء اتتقنوا.",
  category: "world_completion",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_neural_nexus_champion_1024.png",
};

export const BADGE_CANVAS_KINGDOM_CAPSTONE: Badge = {
  id: "canvas_kingdom_capstone",
  name: "Canvas Portfolio",
  nameAr: "مشروع مملكة اللوحات",
  emoji: "🖼️",
  description: "Canvas Kingdom capstone shipped. Designer unlocked.",
  descriptionAr: "المشروع اتشحن. المصمم اتفتح.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000,
  artUrl: "/badges/quacky_canvas_kingdom_capstone_1024.png",
};

export const BADGE_STORY_FORGE_CAPSTONE: Badge = {
  id: "story_forge_capstone",
  name: "Story Collection",
  nameAr: "مشروع مصنع القصص",
  emoji: "📖",
  description: "Story Forge capstone shipped. Storyteller unlocked.",
  descriptionAr: "المشروع اتشحن. القصاص اتفتح.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000,
  artUrl: "/badges/quacky_story_forge_capstone_1024.png",
};

export const BADGE_CROWD_PLAZA_CAPSTONE: Badge = {
  id: "crowd_plaza_capstone",
  name: "Launch Kit",
  nameAr: "مشروع ميدان الجماهير",
  emoji: "🎬",
  description: "Crowd Plaza capstone shipped. Creator unlocked.",
  descriptionAr: "المشروع اتشحن. المبدع اتفتح.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000,
  artUrl: "/badges/quacky_crowd_plaza_capstone_1024.png",
};

export const BADGE_POWER_GRID_CAPSTONE: Badge = {
  id: "power_grid_capstone",
  name: "Power Playbook",
  nameAr: "مشروع شبكة القوة",
  emoji: "⚙️",
  description: "Power Grid capstone shipped. Operator unlocked.",
  descriptionAr: "المشروع اتشحن. المشغّل اتفتح.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 1000,
  artUrl: "/badges/quacky_power_grid_capstone_1024.png",
};

export const BADGE_NEURAL_NEXUS_CAPSTONE: Badge = {
  id: "neural_nexus_capstone",
  name: "Intelligence Report",
  nameAr: "مشروع عصر الذكاء",
  emoji: "💎",
  description: "Neural Nexus capstone published. Analyst unlocked.",
  descriptionAr: "المشروع اتنشر. المحلل اتفتح.",
  category: "world_completion",
  rarity: "legendary",
  xpBonus: 2000,
  artUrl: "/badges/quacky_neural_nexus_capstone_1024.png",
};

// ═════════════════════════════════════════════
// EMPIRE (8)
// ═════════════════════════════════════════════
export const BADGE_EMPIRE_BUILDER_W1: Badge = {
  id: "empire_builder_w1",
  name: "First Studio",
  nameAr: "أول استوديو إبداعي",
  emoji: "🏛️",
  description: "You launched your first creative studio business.",
  descriptionAr: "أطلقت أول شغل إبداعي حقيقي.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_empire_builder_w1_1024.png",
};

export const BADGE_EMPIRE_BUILDER_W2: Badge = {
  id: "empire_builder_w2",
  name: "First Story Studio",
  nameAr: "أول استوديو قصص",
  emoji: "🏛️",
  description: "You launched your first storytelling business.",
  descriptionAr: "أطلقت أول شغل قصصي حقيقي.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_empire_builder_w2_1024.png",
};

export const BADGE_EMPIRE_BUILDER_W3: Badge = {
  id: "empire_builder_w3",
  name: "First Audience",
  nameAr: "أول جمهور حقيقي",
  emoji: "🏛️",
  description: "You launched your first real content channel.",
  descriptionAr: "أطلقت أول قناة محتوى حقيقية.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_empire_builder_w3_1024.png",
};

export const BADGE_EMPIRE_BUILDER_W4: Badge = {
  id: "empire_builder_w4",
  name: "First OS",
  nameAr: "أول نظام إنتاجي",
  emoji: "🏛️",
  description: "You built your first productivity consulting offer.",
  descriptionAr: "بنيت أول عرض استشاري إنتاجية.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_empire_builder_w4_1024.png",
};

export const BADGE_EMPIRE_BUILDER_W5: Badge = {
  id: "empire_builder_w5",
  name: "First AI Agency",
  nameAr: "أول وكالة ذكاء اصطناعي",
  emoji: "🏛️",
  description: "You launched your first AI consulting agency.",
  descriptionAr: "أطلقت أول وكالة استشارات ذكاء اصطناعي.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_empire_builder_w5_1024.png",
};

export const BADGE_XP_1000: Badge = {
  id: "xp_1000",
  name: "Rising Star",
  nameAr: "نجم صاعد",
  emoji: "🌟",
  description: "1,000 XP earned. The foundation is real.",
  descriptionAr: "١٠٠٠ نقطة. الأساس حقيقي.",
  category: "empire",
  rarity: "common",
  xpBonus: 100,
  artUrl: "/badges/quacky_xp_1000_1024.png",
};

export const BADGE_XP_10000: Badge = {
  id: "xp_10000",
  name: "Shining Bright",
  nameAr: "لامع وساطع",
  emoji: "✨",
  description: "10,000 XP earned. You are running now.",
  descriptionAr: "١٠٠٠٠ نقطة. إنت بتجري دلوقتي.",
  category: "empire",
  rarity: "rare",
  xpBonus: 500,
  artUrl: "/badges/quacky_xp_10000_1024.png",
};

export const BADGE_KIDPRENEUR_FOUNDER: Badge = {
  id: "kidpreneur_founder",
  name: "KidPreneur Founder",
  nameAr: "مؤسس KidPreneur",
  emoji: "🎓",
  description: "All 5 worlds plus 5 capstones. Empire complete.",
  descriptionAr: "كل العوالم الخمسة + ٥ مشاريع. الإمبراطورية اكتملت.",
  category: "empire",
  rarity: "legendary",
  xpBonus: 5000,
  artUrl: "/badges/quacky_kidpreneur_founder_1024.png",
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