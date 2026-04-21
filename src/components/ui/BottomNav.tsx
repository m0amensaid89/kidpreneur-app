'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/i18n/useTranslations'

export function BottomNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const tabs = [
    { key: 'home', href: '/home', emoji: '🏠' },
    { key: 'learn', href: '/world/w1', emoji: '📚', label: 'Learn' },
    { key: 'badges', href: '/profile', emoji: '🏅', label: 'Badges' },
    { key: 'profile', href: '/profile', emoji: '👤' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFF8E7] border-t-2 border-amber-100 flex items-stretch justify-around h-16 max-w-[430px] mx-auto">
      {tabs.map(tab => {
        const active = pathname === tab.href || pathname?.startsWith(tab.href + '/')
        const label = tab.key === 'learn' ? 'Learn'
          : tab.key === 'badges' ? 'Badges'
          : t(tab.key)
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 transition"
          >
            <span className="text-xl">{tab.emoji}</span>
            <span
              className="text-[10px] font-black tracking-wide uppercase"
              style={{ color: active ? '#D97706' : '#9CA3AF' }}
            >
              {label}
            </span>
            {active && (
              <span className="absolute bottom-1 w-1 h-1 bg-amber-500 rounded-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
