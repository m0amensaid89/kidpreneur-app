import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserProfile(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  return data;
}

export async function getUserTotalXp(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("xp_log")
    .select("xp_amount")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching total xp:", error);
    return 0;
  }

  return data.reduce((total, log) => total + (log.xp_amount || 0), 0);
}

export async function updateStreakAndActivity(supabase: SupabaseClient, userId: string, currentStreak: number, lastActive: string | null) {
  const now = new Date();
  let newStreak = currentStreak || 0;

  // Set time components to 0 for date comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (lastActive) {
    const lastDate = new Date(lastActive);
    const lastActiveDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

    // Difference in days
    const diffTime = Math.abs(today.getTime() - lastActiveDay.getTime());
    // Use Math.round to avoid DST issues
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    // First time active
    newStreak = 1;
  }

  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        streak: newStreak,
        last_active: now.toISOString(),
        updated_at: now.toISOString()
      },
      { onConflict: 'id' }
    );

  if (error) {
    console.error("Error updating streak and activity:", error);
  }

  return newStreak;
}