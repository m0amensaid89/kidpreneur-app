'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

interface DesktopHomeHeroProps {
  kidName: string
  xp: number
  level: number
  streakDays: number
  locale?: 'en' | 'ar'
}

export function DesktopHomeHero({ kidName, xp, level, streakDays, locale = 'en' }: DesktopHomeHeroProps) {
  const { isTabletOrDesktop } = useBreakpoint()
  if (!isTabletOrDesktop) return null

  const t = locale === 'ar'
    ? { welcome: 'أهلاً', xpLabel: 'نقطة', levelLabel: 'المستوى', streakLabel: 'يوم متتالي' }
    : { welcome: 'Welcome back', xpLabel: 'XP', levelLabel: 'Level', streakLabel: 'Day Streak' }

  return (
    <div className="bg-yellow-400 rounded-3xl p-6 mb-6 flex items-center justify-between">
      <div>
        <div className="text-2xl font-black text-amber-900">{t.welcome}, {kidName}! 🦆</div>
        <div className="text-sm text-amber-700 font-medium mt-1">Ready to build your empire today?</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-black text-amber-900">{xp.toLocaleString()}</div>
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wide">{t.xpLabel}</div>
        </div>
        <div className="w-px h-10 bg-amber-500 opacity-30" />
        <div className="text-center">
          <div className="text-2xl font-black text-amber-900">{level}</div>
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wide">{t.levelLabel}</div>
        </div>
        <div className="w-px h-10 bg-amber-500 opacity-30" />
        <div className="text-center">
          <div className="text-2xl font-black text-amber-900">{streakDays}🔥</div>
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wide">{t.streakLabel}</div>
        </div>
      </div>
    </div>
  )
}
