'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { LanguageToggle } from '@/components/LanguageToggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home', href: '/home' },
  { label: 'Worlds', href: '/home' },
  { label: 'Leaderboard', href: '/home' },
  { label: 'Certificates', href: '/profile' },
  { label: 'Profile', href: '/profile' },
]

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  const { isTabletOrDesktop } = useBreakpoint()
  const pathname = usePathname()

  // Mobile: render children unchanged — mobile layout handles everything
  if (!isTabletOrDesktop) return <>{children}</>

  return (
    <>
      {/* Sticky top nav bar — tablet + desktop */}
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
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 22 }}>🦆</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: '#92400E', fontFamily: 'Roboto, sans-serif', letterSpacing: '-0.3px' }}>
            KidPreneur
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <a
                key={item.label}
                href={item.href}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  color: active ? '#92400E' : '#B45309',
                  background: active ? '#FDE68A' : 'transparent',
                  textDecoration: 'none',
                  fontFamily: 'Roboto, sans-serif',
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Right: Language toggle */}
        <div style={{ flexShrink: 0 }}>
          <LanguageToggle />
        </div>
      </div>

      {/* Page content — unchanged, no offset needed */}
      {children}
    </>
  )
}
