'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { LanguageToggle } from '@/components/LanguageToggle'

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop, isTablet } = useBreakpoint()

  if (!isTablet && !isDesktop) return <>{children}</>

  return (
    <>
      {/* Fixed sidebar — desktop only */}
      {isDesktop && (
        <aside
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 220,
            height: '100vh',
            background: '#FFFFFF',
            borderRight: '2px solid #FDE68A',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 40,
            overflowY: 'auto',
          }}
        >
          <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #FEF3C7' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#92400E', fontFamily: 'Roboto, sans-serif' }}>
              🦆 KidPreneur
            </div>
            <div style={{ fontSize: 11, color: '#D97706', fontWeight: 600, marginTop: 2 }}>
              AI Learning Platform
            </div>
          </div>

          <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { emoji: '🏠', label: 'Home', href: '/home' },
              { emoji: '🌍', label: 'My Worlds', href: '/home' },
              { emoji: '🏆', label: 'Leaderboard', href: '/home' },
              { emoji: '📜', label: 'Certificates', href: '/profile' },
              { emoji: '👤', label: 'Profile', href: '/profile' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 16,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#92400E',
                  textDecoration: 'none',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div style={{ padding: '12px 16px', borderTop: '1px solid #FEF3C7' }}>
            <LanguageToggle />
          </div>
        </aside>
      )}

      {/* Tablet sticky top bar */}
      {isTablet && !isDesktop && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: '#FFF8E7',
            borderBottom: '2px solid #FDE68A',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 900, color: '#92400E' }}>🦆 KidPreneur</div>
          <LanguageToggle />
        </div>
      )}

      {/* Push content right of sidebar on desktop */}
      <div style={isDesktop ? { marginLeft: 220 } : {}}>
        {children}
      </div>
    </>
  )
}
