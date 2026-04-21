'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

interface DesktopProfileBarProps {
  kidName: string
  xp: number
  level: number
  badgeCount: number
  certCount: number
  locale?: 'en' | 'ar'
}

export function DesktopProfileBar({ kidName, xp, level, badgeCount, certCount, locale = 'en' }: DesktopProfileBarProps) {
  const { isTabletOrDesktop } = useBreakpoint()
  if (!isTabletOrDesktop) return null

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 mb-6 flex items-center gap-6">
      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shrink-0">
        🦆
      </div>
      <div className="flex-1">
        <div className="text-lg font-black text-amber-900">{kidName}</div>
        <div className="text-xs text-amber-500 font-medium">{locale === 'ar' ? 'مستوى' : 'Level'} {level} KidPreneur</div>
      </div>
      <div className="flex items-center gap-4">
        {[
          { value: xp.toLocaleString(), label: locale === 'ar' ? 'نقطة' : 'XP' },
          { value: badgeCount, label: locale === 'ar' ? 'شارة' : 'Badges' },
          { value: certCount, label: locale === 'ar' ? 'شهادة' : 'Certs' },
        ].map((stat, i) => (
          <div key={i} className="text-center px-4 border-r last:border-r-0 border-amber-100">
            <div className="text-xl font-black text-amber-900">{stat.value}</div>
            <div className="text-xs text-amber-500 font-bold uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
