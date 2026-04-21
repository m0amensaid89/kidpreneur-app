'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/components/LocaleProvider'
import { getReferralUrl, getWhatsAppReferralMessage } from '@/lib/referral/referral-utils'

interface Props { userId: string; kidName: string }

export function ReferralCard({ userId, kidName }: Props) {
  const { locale } = useLocale()
  const [code, setCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const t = locale === 'ar'
    ? { title: 'ادعو صديق', desc: 'كلكم تاخدوا شهر مجاني!', copy: 'نسخ', copied: 'تم!', wa: 'واتساب' }
    : { title: 'Invite a Parent', desc: 'You both get 1 month free!', copy: 'Copy Link', copied: 'Copied!', wa: 'WhatsApp' }

  useEffect(() => {
    fetch('/api/referral/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    }).then(r => r.json()).then(d => { if (d.code) setCode(d.code) })
  }, [userId])

  const url = code ? getReferralUrl(code) : ''
  const waMsg = code ? getWhatsAppReferralMessage(kidName, code, locale) : ''

  return (
    <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 p-4 shadow-lg" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎁</span>
        <div>
          <div className="font-black text-amber-900 text-sm">{t.title}</div>
          <div className="text-xs text-amber-800">{t.desc}</div>
        </div>
      </div>
      {code && (
        <div className="bg-white/60 rounded-xl px-3 py-2 mb-3 flex items-center justify-between">
          <div className="font-black text-amber-900 text-lg tracking-widest">{code}</div>
          <button
            onClick={() => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="px-3 py-1.5 bg-amber-900 text-white rounded-xl text-xs font-black"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>
      )}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(waMsg)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-black text-sm"
        style={{ background: '#25D366' }}
      >
        <span>📱</span>{t.wa}
      </a>
    </div>
  )
}
