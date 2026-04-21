'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/components/LocaleProvider'

const TABS = {
  en: [
    { name: 'Home', href: '/home' },
    { name: 'Learn', href: '/world/w1' },
    { name: 'Badges', href: '/profile' },
    { name: 'Me', href: '/profile' },
  ],
  ar: [
    { name: 'الرئيسية', href: '/home' },
    { name: 'تعلم', href: '/world/w1' },
    { name: 'شاراتي', href: '/profile' },
    { name: 'أنا', href: '/profile' },
  ],
}

const MATCHERS = [
  /^\/home/,
  /^\/(world|lesson|mission|quiz|chat)/,
  /^\/profile/,
  /^\/settings/,
]

const ICON_PATHS = [
  'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
  'M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.9l-6.18 3.12L7 13.14 2 8.27l6.91-1.01z',
  'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
]

export function BottomNav() {
  const pathname = usePathname()
  const { locale } = useLocale()
  const tabs = locale === 'ar' ? TABS.ar : TABS.en
  const isRTL = locale === 'ar'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-amber-100"
      style={{ background: '#FFF8E7', direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="flex items-center justify-around h-16 max-w-[430px] mx-auto px-2">
        {tabs.map((tab, i) => {
          const active = MATCHERS[i].test(pathname ?? '')
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition"
              style={{ color: active ? '#D97706' : '#9CA3AF', minWidth: 56 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: active ? 1 : 0.6 }}>
                <path d={ICON_PATHS[i]} />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Roboto, sans-serif' }}>
                {tab.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
