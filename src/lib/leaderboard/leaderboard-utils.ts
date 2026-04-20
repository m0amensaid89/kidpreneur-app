import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function syncLeaderboardEntry(userId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, xp, age')
    .eq('id', userId)
    .single()

  if (!profile) return

  const ageGroup = profile.age && profile.age >= 12 ? '12-15' : '8-11'
  const weekStart = getWeekStart()

  const { data: weeklyLogs } = await supabase
    .from('xp_log')
    .select('xp_amount')
    .eq('user_id', userId)
    .gte('created_at', weekStart.toISOString())

  const weeklyXp = (weeklyLogs ?? []).reduce(
    (sum: number, row: { xp_amount: number }) => sum + (row.xp_amount ?? 0),
    0
  )

  await supabase.from('leaderboard_entries').upsert(
    {
      user_id: userId,
      display_name: profile.username ?? 'Young KidPreneur',
      avatar_emoji: '🦆',
      total_xp: profile.xp ?? 0,
      weekly_xp: weeklyXp,
      period_start: weekStart.toISOString(),
      period_end: getWeekEnd().toISOString(),
      age_group: ageGroup,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id', ignoreDuplicates: false }
  )
}

export function getWeekStart(): Date {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - d.getUTCDay())
  d.setUTCHours(0, 0, 0, 0)
  return d
}

export function getWeekEnd(): Date {
  const d = getWeekStart()
  d.setUTCDate(d.getUTCDate() + 6)
  d.setUTCHours(23, 59, 59, 999)
  return d
}
