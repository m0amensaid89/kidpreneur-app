import { createClient } from "@/lib/supabase/server";
import { getUserProfile, getUserTotalXp, updateStreakAndActivity } from "@/lib/user";
import { HomeClient } from "./HomeClient";
import { redirect } from "next/navigation";
import { getLevelData } from "@/lib/xp";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no auth, we'll provide mock data for the visual build, or redirect.
  // Assuming middleware handles hard auth redirects if needed.
  let userProfile = null;
  let totalXp = 0;
  let currentStreak = 0;
  let levelData = { level: 1, currentLevelXpStart: 0, nextLevelXpStart: 100 };

  if (session) {
    userProfile = await getUserProfile(supabase, session.user.id);

    // If profile exists but name is null, they haven't finished onboarding
    if (userProfile && !userProfile.name) {
      redirect("/onboarding");
    } else if (!userProfile) {
      redirect("/onboarding");
    }

    totalXp = await getUserTotalXp(supabase, session.user.id);
    currentStreak = await updateStreakAndActivity(supabase, session.user.id, userProfile?.streak || 0, userProfile?.last_active || null);
    levelData = getLevelData(totalXp);
  } else {
    // Mock data for unauthenticated visual testing during build
    userProfile = { name: "KidPreneur" };
    totalXp = 450;
    currentStreak = 3;
    levelData = getLevelData(totalXp);
  }

  return (
    <HomeClient
      name={userProfile?.name || "Friend"}
      totalXp={totalXp}
      currentStreak={currentStreak}
      level={levelData.level}
      levelXpStart={levelData.currentLevelXpStart}
      nextLevelXpStart={levelData.nextLevelXpStart}
    />
  );
}