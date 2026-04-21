'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useTranslations } from '@/lib/i18n/useTranslations'
import { useLocale } from '@/components/LocaleProvider'
import { usePathname } from 'next/navigation'

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  const { isTabletOrDesktop } = useBreakpoint()
  const t = useTranslations('nav')
  const { locale, isRTL } = useLocale()
  const isAr = locale === 'ar'
  const pathname = usePathname()

  const NAV_ITEMS = [
    { key: 'home', href: '/home' },
    { key: 'worlds', href: '/home', label: isAr ? 'عوالمي' : 'Worlds' },
    { key: 'leaderboard', href: '/home' },
    { key: 'certificates', href: '/profile' },
    { key: 'profile', href: '/profile' },
  ]

  if (!isTabletOrDesktop) return <>{children}</>

  return (
    <>
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 50, direction: isRTL ? 'rtl' : 'ltr',
          background: '#FFF8E7', borderBottom: '2px solid #FDE68A',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: 56, gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 22 }}>🦆</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: '#92400E', fontFamily: 'Roboto, sans-serif' }}>
            KidPreneur
          </span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || pathname?.startsWith(item.href + '/')
            const label = item.label ?? t(item.key)
            return (
              <a
                key={item.key}
                href={item.href}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700,
                  color: active ? '#92400E' : '#B45309',
                  background: active ? '#FDE68A' : 'transparent',
                  textDecoration: 'none', fontFamily: 'Roboto, sans-serif', whiteSpace: 'nowrap',
                }}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div style={{ flexShrink: 0 }}>
          <LanguageToggle />
        </div>
      </div>
      {children}
    </>
  )
}
