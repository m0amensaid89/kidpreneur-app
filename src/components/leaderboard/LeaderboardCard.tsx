'use client'

import type { LeaderboardEntry, LeaderboardScope } from '@/lib/leaderboard/types'

interface Props {
  entry: LeaderboardEntry
  scope: LeaderboardScope
  locale?: 'en' | 'ar'
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-yellow-400 text-amber-900',
  2: 'bg-gray-200 text-gray-700',
  3: 'bg-amber-600 text-white',
}
const RANK_ICONS: Record<number, string> = { 1: '👑', 2: '🥈', 3: '🥉' }

export function LeaderboardCard({ entry, scope, locale = 'en' }: Props) {
  const xp = scope === 'weekly' ? entry.weekly_xp : entry.total_xp
  const rankStyle =
    RANK_STYLES[entry.rank] ??
    (entry.is_current_user
      ? 'bg-amber-100 border-2 border-yellow-400'
      : 'bg-white')

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-sm ${rankStyle}`}>
      <div className="w-8 text-center font-black text-sm">
        {RANK_ICONS[entry.rank] ?? `#${entry.rank}`}
      </div>
      <div className="text-2xl">{entry.avatar_emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">
          {entry.display_name}
          {entry.is_current_user && (
            <span className="ml-1 text-xs font-normal opacity-60">
              ({locale === 'ar' ? 'أنت' : 'you'})
            </span>
          )}
        </div>
      </div>
      <div className="text-sm font-black shrink-0">
        {xp.toLocaleString()}{' '}
        <span className="font-normal opacity-60 text-xs">XP</span>
      </div>
    </div>
  )
}
