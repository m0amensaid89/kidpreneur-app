'use client'

import { useState } from 'react'

interface ShareCardModalProps {
  kidName: string
  achievement: string
  xp: number
  worldName?: string
  locale?: 'en' | 'ar'
  onClose: () => void
}

export function ShareCardModal({
  kidName,
  achievement,
  xp,
  worldName,
  locale = 'en',
  onClose,
}: ShareCardModalProps) {
  const [copied, setCopied] = useState(false)

  const t = locale === 'ar'
    ? {
        title: 'شارك إنجازك!',
        whatsapp: 'واتساب',
        copy: 'نسخ الرابط',
        copied: 'تم النسخ!',
        message: `🦆 ${kidName} كسب ${xp} نقطة في KidPreneur!\n${achievement ? `✨ ${achievement}` : ''}\n${worldName ? `🌍 ${worldName}` : ''}\n\nانضم لـ KidPreneur على kidpreneur.i-gamify.net`,
      }
    : {
        title: 'Share your achievement!',
        whatsapp: 'WhatsApp',
        copy: 'Copy link',
        copied: 'Copied!',
        message: `🦆 ${kidName} just earned ${xp} XP on KidPreneur!\n${achievement ? `✨ ${achievement}` : ''}\n${worldName ? `🌍 ${worldName}` : ''}\n\nJoin KidPreneur at kidpreneur.i-gamify.net`,
      }

  const shareUrl = 'https://kidpreneur.i-gamify.net'

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(t.message.replace(/\\n/g, '\n'))
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden"
        style={{ background: '#FFF8E7' }}
        onClick={e => e.stopPropagation()}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Achievement card preview */}
        <div
          className="px-6 py-8 text-center"
          style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}
        >
          <div className="text-5xl mb-3">🦆</div>
          <div className="text-white font-black text-2xl">{kidName}</div>
          {achievement && (
            <div className="text-amber-100 font-bold text-sm mt-1">{achievement}</div>
          )}
          <div className="mt-3 inline-block bg-white/20 rounded-full px-4 py-1.5">
            <span className="text-white font-black text-lg">{xp.toLocaleString()} XP</span>
          </div>
          {worldName && (
            <div className="text-amber-100 text-xs mt-2 font-medium">🌍 {worldName}</div>
          )}
          <div className="text-white/60 text-xs mt-3 font-medium">kidpreneur.i-gamify.net</div>
        </div>

        {/* Action buttons */}
        <div className="p-4 flex flex-col gap-3">
          <p className="text-center font-black text-amber-900 text-sm">{t.title}</p>

          <button
            onClick={shareWhatsApp}
            className="w-full py-3 rounded-2xl font-black text-white text-sm flex items-center justify-center gap-2"
            style={{ background: '#25D366' }}
          >
            <span className="text-lg">💬</span> {t.whatsapp}
          </button>

          <button
            onClick={copyLink}
            className="w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
            style={{ background: copied ? '#D1FAE5' : '#FDE68A', color: '#92400E' }}
          >
            <span>{copied ? '✅' : '🔗'}</span>
            {copied ? t.copied : t.copy}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl text-sm font-bold text-amber-500"
          >
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  )
}
