'use client'

import { useState, useEffect } from 'react'
import { LeaderboardCard } from './LeaderboardCard'
import type { LeaderboardData, LeaderboardScope, AgeGroup } from '@/lib/leaderboard/types'

interface Props {
  userId: string
  userAge?: number
  onClose: () => void
  locale?: 'en' | 'ar'
}

export function LeaderboardModal({ userId, userAge, onClose, locale = 'en' }: Props) {
  const [scope, setScope] = useState<LeaderboardScope>('all-time')
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const ageGroup: AgeGroup = userAge && userAge >= 12 ? '12-15' : '8-11'

  const t =
    locale === 'ar'
      ? {
          title: 'المتصدرون',
          allTime: 'الكل',
          weekly: 'هذا الأسبوع',
          rank: 'مرتبتك',
          empty: 'لا أحد هنا بعد. كن الأول!',
        }
      : {
          title: 'Leaderboard',
          allTime: 'All Time',
          weekly: 'This Week',
          rank: 'Your Rank',
          empty: 'No one here yet. Be the first!',
        }

  useEffect(() => {
    setLoading(true)
    fetch(`/api/leaderboard?scope=${scope}&age_group=${ageGroup}&user_id=${userId}`)
      .then(r => r.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [scope, ageGroup, userId])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50">
      <div className="bg-[#FFF8E7] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold text-amber-900">🏆 {t.title}</h2>
          <button onClick={onClose} className="text-amber-400 text-2xl leading-none">
            &times;
          </button>
        </div>

        {/* Scope tabs */}
        <div className="flex gap-2 px-5 pb-3">
          {(['all-time', 'weekly'] as LeaderboardScope[]).map(s => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={`flex-1 py-2 rounded-2xl text-sm font-bold transition ${
                scope === s
                  ? 'bg-yellow-400 text-amber-900'
                  : 'bg-amber-100 text-amber-500'
              }`}
            >
              {s === 'all-time' ? t.allTime : t.weekly}
            </button>
          ))}
        </div>

        {/* Current user rank strip */}
        {data?.current_user_rank && (
          <div className="mx-5 mb-3 bg-yellow-400 rounded-2xl px-4 py-2 flex items-center justify-between">
            <span className="text-amber-900 font-bold text-sm">{t.rank}</span>
            <span className="text-amber-900 font-black text-lg">
              #{data.current_user_rank}
            </span>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col gap-2">
          {loading && (
            <div className="text-center text-amber-400 py-8 text-sm">Loading...</div>
          )}
          {!loading && (data?.entries.length ?? 0) === 0 && (
            <div className="text-center text-amber-400 py-8 text-sm">{t.empty}</div>
          )}
          {!loading &&
            data?.entries.map(entry => (
              <LeaderboardCard
                key={entry.user_id}
                entry={entry}
                scope={scope}
                locale={locale}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
