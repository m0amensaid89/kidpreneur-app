// src/lib/badgeDispatcher.ts
// Central badge awarding logic. Call awardBadge() from any completion event.
// Returns the badge to reveal (or null if already earned / no badge triggered).

import { SupabaseClient } from "@supabase/supabase-js";
import {
  Badge,
  BADGE_FIRST_LOGIN,
  BADGE_FIRST_QUIZ,
  BADGE_FIRST_MISSION,
  BADGE_FIRST_SANDBOX,
  BADGE_FIRST_REFLECTION,
  BADGE_FIRST_LESSON,
  BADGE_PERFECT_QUIZ,
  BADGE_PERFECT_QUIZ_5,
  BADGE_MISSION_TRIO,
  BADGE_PROMPT_WIZARD,
  BADGE_REFLECTION_SAGE,
  BADGE_STREAK_3,
  BADGE_STREAK_7,
  BADGE_STREAK_14,
  BADGE_STREAK_30,
  BADGE_XP_1000,
  BADGE_XP_10000,
  BADGE_KIDPRENEUR_FOUNDER,
  getWorldChampionBadge,
  getWorldCapstoneBadge,
  getEmpireBuilderBadge
} from "./badges";

export type BadgeEvent =
  | { type: "first_login" }
  | { type: "quiz_complete"; lessonId: string; perfect: boolean }
  | { type: "mission_complete"; missionId: string; lessonId: string }
  | { type: "sandbox_prompt_sent" }
  | { type: "reflection_submitted" }
  | { type: "lesson_complete"; lessonId: string; worldId: string }
  | { type: "world_complete"; worldId: string }
  | { type: "capstone_submitted"; worldId: string }
  | { type: "empire_builder_complete"; worldId: string }
  | { type: "xp_milestone"; totalXp: number };

async function alreadyEarned(
  supabase: SupabaseClient,
  userId: string,
  badgeId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", userId)
    .eq("badge_id", badgeId)
    .maybeSingle();
  return !!data;
}

async function grantBadge(
  supabase: SupabaseClient,
  userId: string,
  badge: Badge
): Promise<Badge | null> {
  const earned = await alreadyEarned(supabase, userId, badge.id);
  if (earned) return null;

  await supabase.from("user_badges").upsert(
    {
      user_id: userId,
      badge_id: badge.id,
      earned_at: new Date().toISOString()
    },
    { onConflict: "user_id,badge_id" }
  );

  // XP bonus from the badge
  if (badge.xpBonus > 0) {
    await supabase.from("xp_log").insert({
      user_id: userId,
      xp_amount: badge.xpBonus,
      source: `badge_${badge.id}`
    });
  }

  return badge;
}

// Utility: count rows in a table matching a filter
async function countRows(
  supabase: SupabaseClient,
  table: string,
  filter: Record<string, unknown>
): Promise<number> {
  let q = supabase.from(table).select("*", { count: "exact", head: true });
  for (const [key, value] of Object.entries(filter)) {
    q = q.eq(key, value);
  }
  const { count } = await q;
  return count || 0;
}


async function triggerCertIfEligible(
  userId: string,
  kidName: string,
  eventId: string
): Promise<void> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://kidpreneur.i-gamify.net";
  const worldNames: Record<string, string> = {
    w1: "Canvas Kingdom", w2: "Story Forge", w3: "Crowd Plaza",
    w4: "Power Grid", w5: "Neural Nexus",
  };
  const lessonMatch = eventId.match(/^lesson_complete_(l\d+)$/);
  if (lessonMatch) {
    fetch(`${base}/api/certificates/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, kid_name: kidName, cert_type: "lesson", reference_id: lessonMatch[1], reference_name: `Lesson ${lessonMatch[1].toUpperCase()}`, locale: "en" }),
    }).catch(() => {});
  }
  const worldMatch = eventId.match(/^world_complete_(w\d+)$/);
  if (worldMatch) {
    fetch(`${base}/api/certificates/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, kid_name: kidName, cert_type: "world", reference_id: worldMatch[1], reference_name: worldNames[worldMatch[1]] ?? worldMatch[1], locale: "en" }),
    }).catch(() => {});
  }
  if (eventId === "kidpreneur_founder") {
    fetch(`${base}/api/certificates/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, kid_name: kidName, cert_type: "founder", reference_name: "KidPreneur Complete Journey", locale: "en" }),
    }).catch(() => {});
  }
}

function syncLeaderboard(userId: string): void {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://kidpreneur.i-gamify.net";
  fetch(`${base}/api/leaderboard/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  }).catch(() => {});
}

// Main dispatcher. Returns the HIGHEST-priority badge to reveal (or null).
// We intentionally return ONE badge at a time so the UI reveal flow stays clean.
export async function awardBadge(
  supabase: SupabaseClient,
  userId: string,
  event: BadgeEvent
): Promise<Badge | null> {
  const candidates: Badge[] = [];

  switch (event.type) {
    case "first_login":
      candidates.push(BADGE_FIRST_LOGIN);
      break;

    case "quiz_complete": {
      candidates.push(BADGE_FIRST_QUIZ);
      if (event.perfect) {
        candidates.push(BADGE_PERFECT_QUIZ);
        // Count user's perfect quizzes
        const perfectCount = await countRows(supabase, "perfect_quizzes", {
          user_id: userId
        });
        if (perfectCount >= 5) candidates.push(BADGE_PERFECT_QUIZ_5);
      }
      break;
    }

    case "mission_complete": {
      candidates.push(BADGE_FIRST_MISSION);
      // Triple threat: all 3 missions of the same lesson completed
      const completedInLesson = await countRows(supabase, "mission_completions", {
        user_id: userId,
        lesson_id: event.lessonId
      });
      if (completedInLesson >= 3) candidates.push(BADGE_MISSION_TRIO);
      break;
    }

    case "sandbox_prompt_sent": {
      candidates.push(BADGE_FIRST_SANDBOX);
      const promptCount = await countRows(supabase, "sandbox_sessions", {
        user_id: userId
      });
      if (promptCount >= 25) candidates.push(BADGE_PROMPT_WIZARD);
      break;
    }

    case "reflection_submitted": {
      candidates.push(BADGE_FIRST_REFLECTION);
      const reflectionCount = await countRows(supabase, "reflections", {
        user_id: userId
      });
      if (reflectionCount >= 25) candidates.push(BADGE_REFLECTION_SAGE);
      break;
    }

    case "lesson_complete": {
      candidates.push(BADGE_FIRST_LESSON);
      break;
    }

    case "world_complete": {
      const champion = getWorldChampionBadge(event.worldId);
      if (champion) candidates.push(champion);
      break;
    }

    case "capstone_submitted": {
      const capstone = getWorldCapstoneBadge(event.worldId);
      if (capstone) candidates.push(capstone);

      // Check founder badge: all 5 capstones earned
      const { data: capstones } = await supabase
        .from("user_badges")
        .select("badge_id")
        .eq("user_id", userId)
        .in("badge_id", [
          "canvas_kingdom_capstone",
          "story_forge_capstone",
          "crowd_plaza_capstone",
          "power_grid_capstone",
          "neural_nexus_capstone"
        ]);
      if ((capstones?.length || 0) >= 4) {
        // Current capstone + 4 prior = 5 total after the current event awards
        candidates.push(BADGE_KIDPRENEUR_FOUNDER);
      }
      break;
    }

    case "empire_builder_complete": {
      const eb = getEmpireBuilderBadge(event.worldId);
      if (eb) candidates.push(eb);
      break;
    }

    case "xp_milestone": {
      if (event.totalXp >= 1000) candidates.push(BADGE_XP_1000);
      if (event.totalXp >= 10000) candidates.push(BADGE_XP_10000);
      break;
    }
  }

  // Streaks (can fire alongside any event)
  if (event.type !== "first_login") {
    const streakDays = await getCurrentStreakDays(supabase, userId);
    if (streakDays >= 30) candidates.push(BADGE_STREAK_30);
    else if (streakDays >= 14) candidates.push(BADGE_STREAK_14);
    else if (streakDays >= 7) candidates.push(BADGE_STREAK_7);
    else if (streakDays >= 3) candidates.push(BADGE_STREAK_3);
  }

  // Try to grant each candidate in REVERSE priority (best first).
  // Reverse because higher-tier badges were pushed later.
  const ordered = [...candidates].reverse();
  for (const badge of ordered) {
    const granted = await grantBadge(supabase, userId, badge);
    if (granted) return granted;
  }

  // Fire cert trigger and leaderboard sync as background tasks
  const eventId = event.type === "lesson_complete"
    ? `lesson_complete_${(event as any).lessonId ?? ""}`
    : event.type === "world_complete"
    ? `world_complete_${(event as any).worldId ?? ""}`
    : event.type === "capstone_submitted" || event.type === "empire_builder_complete"
    ? `world_complete_${(event as any).worldId ?? ""}`
    : event.type;
  triggerCertIfEligible(userId, "KidPreneur", eventId).catch(() => {});
  syncLeaderboard(userId);

  return null;
}

// Compute current consecutive-day learning streak from xp_log or activity_log.
// Graceful fallback: returns 0 if the supporting table is missing.
async function getCurrentStreakDays(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("xp_log")
      .select("created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error || !data || data.length === 0) return 0;

    const uniqueDays = new Set<string>();
    for (const row of data) {
      const date = new Date(row.created_at as string).toISOString().slice(0, 10);
      uniqueDays.add(date);
    }

    const sortedDays = [...uniqueDays].sort().reverse();
    let streak = 0;
    const today = new Date().toISOString().slice(0, 10);
    let cursor = new Date();

    for (const day of sortedDays) {
      const cursorStr = cursor.toISOString().slice(0, 10);
      if (day === cursorStr || (streak === 0 && day === today)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  } catch {
    return 0;
  }
}
