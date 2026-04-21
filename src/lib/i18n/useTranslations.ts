'use client'

import { useLocale } from '@/components/LocaleProvider'
import arMessages from '../../../messages/ar.json'
import enMessages from '../../../messages/en.json'

type MessageKeys = typeof arMessages

function getNestedValue(obj: any, path: string): string {
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current == null) return path
    current = current[part]
  }
  return typeof current === 'string' ? current : path
}

export function useTranslations(namespace?: string) {
  const { locale } = useLocale()
  const messages = locale === 'ar' ? arMessages : enMessages

  return function t(key: string, vars?: Record<string, string>): string {
    const fullKey = namespace ? `${namespace}.${key}` : key
    let value = getNestedValue(messages, fullKey)

    // Fallback to English if key missing in Arabic
    if (value === fullKey && locale === 'ar') {
      value = getNestedValue(enMessages, fullKey)
    }

    // Variable substitution: {name} → value
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        value = value.replace(new RegExp(`\{${k}\}`, 'g'), v)
      })
    }

    return value
  }
}
