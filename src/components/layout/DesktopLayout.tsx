'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import { ReactNode } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'

interface DesktopLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  showSidebar?: boolean
}

export function DesktopLayout({ children, sidebar, showSidebar = true }: DesktopLayoutProps) {
  const { isDesktop, isTablet } = useBreakpoint()

  // Mobile: render children as-is (existing mobile layout handles it)
  if (!isTablet && !isDesktop) {
    return <>{children}</>
  }

  return (
    <div
      className="min-h-screen bg-[#FFF8E7] flex"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      {/* Desktop sidebar */}
      {isDesktop && showSidebar && (
        <aside className="w-64 min-h-screen bg-white border-r-2 border-amber-100 flex flex-col sticky top-0 shrink-0">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-amber-100">
            <div className="text-xl font-black text-amber-800">🦆 KidPreneur</div>
            <div className="text-xs text-amber-500 font-medium mt-0.5">AI Learning Platform</div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-amber-800 hover:bg-amber-50 transition group"
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Language toggle + bottom */}
          <div className="px-4 py-4 border-t border-amber-100 flex items-center justify-between">
            <LanguageToggle />
            <span className="text-xs text-amber-300">v2.0</span>
          </div>
        </aside>
      )}

      {/* Main content area */}
      <main className={`flex-1 ${isDesktop ? 'max-w-3xl' : 'max-w-full'} mx-auto`}>
        {/* Tablet top bar */}
        {isTablet && !isDesktop && (
          <div className="sticky top-0 z-30 bg-[#FFF8E7] border-b-2 border-amber-100 px-4 py-3 flex items-center justify-between">
            <div className="text-lg font-black text-amber-800">🦆 KidPreneur</div>
            <div className="flex items-center gap-3">
              <LanguageToggle />
            </div>
          </div>
        )}
        <div className={`${isTablet ? 'px-6 py-4' : 'px-8 py-6'}`}>
          {children}
        </div>
      </main>

      {/* Desktop right panel — QuackyVoice + quick stats */}
      {isDesktop && (
        <aside className="w-72 min-h-screen bg-white border-l-2 border-amber-100 px-4 py-6 sticky top-0 shrink-0">
          <div className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4">Quick Access</div>
          <div className="bg-[#FFF8E7] rounded-2xl p-4 mb-4 border border-amber-100">
            <div className="text-sm font-bold text-amber-800 mb-1">🎙️ Talk to Quacky</div>
            <div className="text-xs text-amber-500">Click the duck button to start a voice session</div>
          </div>
          <div className="bg-yellow-400 rounded-2xl p-4 mb-4">
            <div className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2">Daily Tip</div>
            <div className="text-sm font-medium text-amber-900">Every great business started with one good idea. What is yours today?</div>
          </div>
        </aside>
      )}
    </div>
  )
}
