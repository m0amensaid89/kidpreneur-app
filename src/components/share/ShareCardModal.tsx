'use client'

import { useState } from 'react'
import { useLocale } from '@/components/LocaleProvider'

interface Props {
  kidName: string
  achievement: string
  xp: number
  worldColor: string
  worldEmoji: string
  onClose: () => void
}

export function ShareCardModal({ kidName, achievement, xp, worldColor, worldEmoji, onClose }: Props) {
  const { locale } = useLocale()
  const [copied, setCopied] = useState(false)
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kidpreneur.i-gamify.net'
  const params = `name=${encodeURIComponent(kidName)}&achievement=${encodeURIComponent(achievement)}&xp=${xp}&color=${encodeURIComponent(worldColor)}&emoji=${encodeURIComponent(worldEmoji)}&locale=${locale}`
  const squareUrl = `${base}/api/share/card?${params}&format=square`
  const storyUrl = `${base}/api/share/card?${params}&format=story`
  const waText = locale === 'ar'
    ? `${kidName} حقق إنجازاً في KidPreneur! ${base}`
    : `${kidName} just unlocked "${achievement}" on KidPreneur! ${base}`
  const t = locale === 'ar'
    ? { title: 'شارك الإنجاز', wa: 'واتساب', square: 'صورة مربعة', story: 'ستوري', copy: 'نسخ', copied: 'تم!', close: 'إغلاق' }
    : { title: 'Share Achievement', wa: 'WhatsApp', square: 'Square', story: 'Story', copy: 'Copy Link', copied: 'Copied!', close: 'Close' }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 p-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-[#FFF8E7] rounded-3xl p-5 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-amber-900">🎉 {t.title}</h2>
          <button onClick={onClose} className="text-amber-400 text-2xl">&times;</button>
        </div>
        <div className="rounded-2xl overflow-hidden mb-4 border-2 border-amber-100">
          <img src={squareUrl} alt="Share card" className="w-full" loading="lazy" />
        </div>
        <div className="flex flex-col gap-3">
          <a href={`https://wa.me/?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-black text-sm" style={{ background: '#25D366' }}>
            <span>📱</span>{t.wa}
          </a>
          <a href={squareUrl} download className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm text-white" style={{ background: worldColor }}>
            <span>{worldEmoji}</span>{t.square}
          </a>
          <a href={storyUrl} download className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm bg-amber-100 text-amber-800">
            <span>📲</span>{t.story}
          </a>
          <button onClick={() => { navigator.clipboard.writeText(squareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="py-2.5 rounded-2xl text-sm font-bold text-amber-600 border-2 border-amber-200">
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </div>
    </div>
  )
}
