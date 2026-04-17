import { createClient } from "@/lib/supabase/server";
import { getUserProfile, getUserTotalXp, updateStreakAndActivity } from "@/lib/user";
import { HomeClient } from "./HomeClient";
import { redirect } from "next/navigation";
import { getLevelData } from "@/lib/xp";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Hard auth : no session means the user is logged out. Send them to /login.
  // No mock fallback. The visual-build mock data was removed on April 17 2026.
  if (!session) {
    redirect("/login");
  }

  const userProfile = await getUserProfile(supabase, session.user.id);

  // No profile at all or no name means onboarding is incomplete.
  if (!userProfile || !userProfile.name) {
    redirect("/onboarding");
  }

  const totalXp = await getUserTotalXp(supabase, session.user.id);
  const currentStreak = await updateStreakAndActivity(
    supabase,
    session.user.id,
    userProfile.streak || 0,
    userProfile.last_active || null
  );
  const levelData = getLevelData(totalXp);

  return (
    <HomeClient
      name={userProfile.name || "Friend"}
      totalXp={totalXp}
      currentStreak={currentStreak}
      level={levelData.level}
      levelXpStart={levelData.currentLevelXpStart}
      nextLevelXpStart={levelData.nextLevelXpStart}
    />
  );
}
