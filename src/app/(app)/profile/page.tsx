import { createClient } from "@/lib/supabase/server";
import { ProfileClient } from "./ProfileClient";
import { getUserProfile, getUserTotalXp } from "@/lib/user";
import { getLevelData } from "@/lib/xp";
import { ALL_BADGES } from "@/lib/badges";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const profile = await getUserProfile(supabase, user.id);
  const totalXp = await getUserTotalXp(supabase, user.id);
  const levelData = getLevelData(totalXp);

  // Fetch badges
  const { data: earnedBadgesData } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", user.id);

  const earnedBadgeIds = earnedBadgesData?.map(b => b.badge_id) || [];

  const earnedBadges = ALL_BADGES.filter(b => earnedBadgeIds.includes(b.id));

  // Fetch mission completions
  const { count: missionCount } = await supabase
    .from("mission_completions")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id);

  return (
    <ProfileClient
      user={user}
      profile={profile}
      totalXp={totalXp}
      levelData={levelData}
      earnedBadges={earnedBadges}
      missionCount={missionCount || 0}
    />
  );
}
