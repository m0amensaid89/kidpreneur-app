import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { ALL_BADGES } from "@/lib/badges";
import { getLevelData } from "@/lib/xp";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    const { childId } = await params;

    // Fetch profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("name, streak, last_active")
      .eq("id", childId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Fetch total XP (xp_amount is the actual column, not "amount")
    const { data: xpData } = await supabaseAdmin
      .from("xp_log")
      .select("xp_amount")
      .eq("user_id", childId);

    const totalXp = xpData?.reduce((sum, record) => sum + (record.xp_amount || 0), 0) || 0;
    const levelData = getLevelData(totalXp);

    // Fetch missions completed
    const { count: missionCount } = await supabaseAdmin
      .from("mission_completions")
      .select("*", { count: 'exact', head: true })
      .eq("user_id", childId);

    // Fetch badges with earned_at timestamps
    const { data: earnedBadgesData } = await supabaseAdmin
      .from("user_badges")
      .select("badge_id, earned_at")
      .eq("user_id", childId)
      .order("earned_at", { ascending: false });

    const earnedBadgeIds = earnedBadgesData?.map(b => b.badge_id) || [];
    const earnedBadges = ALL_BADGES.filter(b => earnedBadgeIds.includes(b.id));

    // Sort badges by earned_at (newest first)
    const earnedAtMap = new Map(
      (earnedBadgesData || []).map(b => [b.badge_id, b.earned_at])
    );
    earnedBadges.sort((a, b) => {
      const aTime = earnedAtMap.get(a.id) || "";
      const bTime = earnedAtMap.get(b.id) || "";
      return bTime.localeCompare(aTime);
    });

    // Recent missions (last 5)
    const { data: recentMissions } = await supabaseAdmin
      .from("mission_completions")
      .select("mission_id, lesson_id, completed_at")
      .eq("user_id", childId)
      .order("completed_at", { ascending: false })
      .limit(5);

    return NextResponse.json({
      name: profile.name,
      streak: profile.streak,
      lastActive: profile.last_active,
      totalXp,
      level: levelData.level,
      currentLevelXpStart: levelData.currentLevelXpStart,
      nextLevelXpStart: levelData.nextLevelXpStart,
      missionCount: missionCount || 0,
      badges: earnedBadges,
      recentMissions: recentMissions || [],
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
