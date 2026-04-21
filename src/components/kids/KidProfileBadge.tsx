'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/LocaleProvider'

interface KidProfileBadgeProps {
  kidName: string
  kidColor: string
  avatarEmoji: string
  level: number
  xp: number
}

const AVATARS = ['🦆', '🐯', '🦁', '🐺', '🦊', '🐸', '🐧', '🦅']

export function KidProfileBadge({ kidName, kidColor, avatarEmoji, level, xp }: KidProfileBadgeProps) {
  const router = useRouter()
  const { locale } = useLocale()
  const isAr = locale === 'ar'

  return (
    <button
      onClick={() => router.push('/kids')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition active:scale-95"
      style={{ borderColor: kidColor + '40', background: kidColor + '10' }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <span className="text-xl">{avatarEmoji}</span>
      <div className="text-left">
        <div className="text-xs font-black" style={{ color: '#92400E' }}>{kidName}</div>
        <div className="text-xs text-amber-500">Lv.{level} · {xp} XP</div>
      </div>
      <span className="text-amber-400 text-xs">▼</span>
    </button>
  )
}
