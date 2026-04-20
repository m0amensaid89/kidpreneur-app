'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LocaleContextType {
  locale: 'en' | 'ar'
  isRTL: boolean
  setLocale: (locale: 'en' | 'ar') => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  isRTL: false,
  setLocale: () => {},
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/)
    const saved = match?.[1] as 'en' | 'ar' | undefined
    if (saved && ['en', 'ar'].includes(saved)) {
      setLocaleState(saved)
      document.documentElement.lang = saved
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
    }
  }, [])

  const setLocale = (newLocale: 'en' | 'ar') => {
    setLocaleState(newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    window.location.reload()
  }

  return (
    <LocaleContext.Provider value={{ locale, isRTL: locale === 'ar', setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
