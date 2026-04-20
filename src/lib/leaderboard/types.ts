export type AgeGroup = '8-11' | '12-15'
export type LeaderboardScope = 'all-time' | 'weekly'

export interface LeaderboardEntry {
  rank: number
  user_id: string
  display_name: string
  avatar_emoji: string
  total_xp: number
  weekly_xp: number
  age_group: AgeGroup
  is_current_user: boolean
}

export interface LeaderboardData {
  scope: LeaderboardScope
  age_group: AgeGroup
  entries: LeaderboardEntry[]
  current_user_rank: number | null
  current_user_entry: LeaderboardEntry | null
  updated_at: string
}
