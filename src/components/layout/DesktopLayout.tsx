'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { ReactNode } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'

interface DesktopLayoutProps {
  children: ReactNode
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  const { isDesktop, isTablet } = useBreakpoint()

  // Mobile: render children as-is
  if (!isTablet && !isDesktop) {
    return <>{children}</>
  }

  return (
    <div
      className="min-h-screen bg-[#FFF8E7] flex"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      {/* Left sidebar — desktop only */}
      {isDesktop && (
        <aside
          className="w-56 min-h-screen bg-white border-r-2 border-amber-100 flex flex-col sticky top-0 h-screen overflow-y-auto shrink-0"
          style={{ zIndex: 30 }}
        >
          {/* Logo */}
          <div className="px-5 py-5 border-b border-amber-100">
            <div className="text-lg font-black text-amber-800">🦆 KidPreneur</div>
            <div className="text-xs text-amber-400 font-medium mt-0.5">AI Learning Platform</div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-amber-800 hover:bg-amber-50 transition"
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom */}
          <div className="px-4 py-4 border-t border-amber-100">
            <LanguageToggle />
          </div>
        </aside>
      )}

      {/* Main content — full width on tablet, constrained on desktop */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Tablet top bar */}
        {isTablet && !isDesktop && (
          <div className="sticky top-0 z-30 bg-[#FFF8E7] border-b-2 border-amber-100 px-4 py-3 flex items-center justify-between">
            <div className="text-base font-black text-amber-800">🦆 KidPreneur</div>
            <LanguageToggle />
          </div>
        )}
        {/* Content padding */}
        <div className={isDesktop ? 'max-w-2xl mx-auto px-6 py-6' : 'px-4 py-4'}>
          {children}
        </div>
      </main>
    </div>
  )
}
