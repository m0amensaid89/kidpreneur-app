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

    // Fetch total XP
    const { data: xpData } = await supabaseAdmin
      .from("xp_log")
      .select("amount")
      .eq("user_id", childId);

    const totalXp = xpData?.reduce((sum, record) => sum + record.amount, 0) || 0;
    const levelData = getLevelData(totalXp);

    // Fetch missions completed
    const { count: missionCount } = await supabaseAdmin
      .from("mission_completions")
      .select("*", { count: 'exact', head: true })
      .eq("user_id", childId);

    // Fetch badges
    const { data: earnedBadgesData } = await supabaseAdmin
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", childId);

    const earnedBadgeIds = earnedBadgesData?.map(b => b.badge_id) || [];
    const earnedBadges = ALL_BADGES.filter(b => earnedBadgeIds.includes(b.id));

    return NextResponse.json({
      name: profile.name,
      streak: profile.streak,
      lastActive: profile.last_active,
      totalXp,
      level: levelData.level,
      missionCount: missionCount || 0,
      badges: earnedBadges,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
