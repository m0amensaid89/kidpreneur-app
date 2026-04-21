'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLocale } from '@/components/LocaleProvider'

const NAV_EN = ['Home', 'Worlds', 'Leaderboard', 'Certificates', 'Profile']
const NAV_AR = ['الرئيسية', 'عوالمي', 'المتصدرون', 'شهاداتي', 'ملفي']
const NAV_HREF = ['/home', '/home', '/home', '/profile', '/profile']

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  const { isTabletOrDesktop } = useBreakpoint()
  const { locale, isRTL } = useLocale()
  const navLabels = locale === 'ar' ? NAV_AR : NAV_EN

  if (!isTabletOrDesktop) return <>{children}</>

  return (
    <>
      {/* Sticky top nav bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#FFF8E7',
          borderBottom: '2px solid #FDE68A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 56,
          gap: 8,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 22 }}>🦆</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: '#92400E', fontFamily: 'Roboto, sans-serif' }}>
            KidPreneur
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
          {NAV_HREF.map((href, i) => (
            <a
              key={navLabels[i]}
              href={href}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                color: '#B45309',
                background: 'transparent',
                textDecoration: 'none',
                fontFamily: locale === 'ar' ? 'Cairo, sans-serif' : 'Roboto, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {navLabels[i]}
            </a>
          ))}
        </nav>

        {/* Language toggle */}
        <div style={{ flexShrink: 0 }}>
          <LanguageToggle />
        </div>
      </div>

      {children}
    </>
  )
}
