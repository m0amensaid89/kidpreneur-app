'use client'

import { useLocale } from '@/components/LocaleProvider'
import enMessages from '../../../messages/en.json'
import arMessages from '../../../messages/ar.json'

type Messages = typeof enMessages

const messages: Record<string, Messages> = {
  en: enMessages,
  ar: arMessages,
}

// Simple dot-notation accessor — e.g. t('common.close')
export function useTranslations(namespace?: string) {
  const { locale } = useLocale()
  const dict = messages[locale] ?? messages.en

  return function t(key: string): string {
    const parts = namespace ? `${namespace}.${key}`.split('.') : key.split('.')
    let result: unknown = dict
    for (const part of parts) {
      if (result && typeof result === 'object' && part in (result as Record<string, unknown>)) {
        result = (result as Record<string, unknown>)[part]
      } else {
        // Fallback to English
        let fallback: unknown = messages.en
        for (const p of parts) {
          if (fallback && typeof fallback === 'object' && p in (fallback as Record<string, unknown>)) {
            fallback = (fallback as Record<string, unknown>)[p]
          } else {
            return key
          }
        }
        return typeof fallback === 'string' ? fallback : key
      }
    }
    return typeof result === 'string' ? result : key
  }
}
