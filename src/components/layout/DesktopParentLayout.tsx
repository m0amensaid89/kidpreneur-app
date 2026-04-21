'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { ReactNode } from 'react'

interface DesktopParentLayoutProps {
  children: ReactNode
  kidName: string
  totalXp: number
  streakDays: number
  level: number
}

export function DesktopParentLayout({ children, kidName, totalXp, streakDays, level }: DesktopParentLayoutProps) {
  const { isTabletOrDesktop } = useBreakpoint()

  if (!isTabletOrDesktop) return <>{children}</>

  return (
    <div className="max-w-4xl mx-auto">
      {/* Parent dashboard header */}
      <div className="bg-[#0A0A0A] rounded-3xl p-6 mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-1">Parent Dashboard</div>
          <div className="text-2xl font-black text-white">{kidName} Progress</div>
        </div>
        <div className="flex gap-4">
          {[
            { v: totalXp.toLocaleString(), l: 'Total XP' },
            { v: `${streakDays}🔥`, l: 'Streak' },
            { v: level, l: 'Level' },
          ].map((s, i) => (
            <div key={i} className="text-center px-4 border-r last:border-r-0 border-yellow-400/20">
              <div className="text-xl font-black text-yellow-400">{s.v}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}
