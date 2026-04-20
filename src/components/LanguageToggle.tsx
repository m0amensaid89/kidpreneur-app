'use client'

import { useLocale } from './LocaleProvider'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 hover:bg-yellow-300 transition"
      aria-label="Switch language"
    >
      {locale === 'en' ? '🇸🇦 عربي' : '🇺🇸 English'}
    </button>
  )
}
