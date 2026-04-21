'use client'

import { useLocale } from '@/components/LocaleProvider'

interface Props {
  kidName: string
  xpThisWeek: number
  totalXp: number
  level: number
  missionsCompleted: number
  parentEmail?: string
  userId: string
}

export function WeeklyDigestPreview({ kidName, xpThisWeek, totalXp, level, missionsCompleted, parentEmail, userId }: Props) {
  const { locale } = useLocale()
  const isAr = locale === 'ar'

  const t = isAr
    ? { title: 'التقرير الأسبوعي', desc: 'يوصل لوالدك كل يوم اثنين', send: 'إرسال الآن', sent: 'تم الإرسال!', noEmail: 'أضف إيميل الوالدين في الملف الشخصي' }
    : { title: 'Weekly Parent Report', desc: 'Sent to your parent every Monday', send: 'Send Now', sent: 'Sent!', noEmail: 'Add parent email in Profile settings' }

  const [sent, setSent] = React.useState(false)

  const handleSend = async () => {
    if (!parentEmail) return
    await fetch('/api/email/weekly-digest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, parent_email: parentEmail, kid_name: kidName, locale }),
    })
    setSent(true)
  }

  return (
    <div className="rounded-2xl border-2 border-amber-100 bg-white p-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📧</span>
        <div>
          <div className="font-black text-amber-900 text-sm">{t.title}</div>
          <div className="text-xs text-amber-500">{t.desc}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { v: '+' + xpThisWeek, l: isAr ? 'نقاط هذا الأسبوع' : 'XP This Week' },
          { v: level, l: isAr ? 'المستوى' : 'Level' },
          { v: totalXp, l: isAr ? 'إجمالي النقاط' : 'Total XP' },
          { v: missionsCompleted, l: isAr ? 'مهام' : 'Missions' },
        ].map((s, i) => (
          <div key={i} className="bg-amber-50 rounded-xl p-2 text-center">
            <div className="font-black text-amber-900 text-lg">{s.v}</div>
            <div className="text-xs text-amber-500">{s.l}</div>
          </div>
        ))}
      </div>
      {parentEmail ? (
        <button
          onClick={handleSend}
          disabled={sent}
          className="w-full py-2.5 rounded-xl text-sm font-black text-white"
          style={{ background: sent ? '#9CA3AF' : '#D97706' }}
        >
          {sent ? t.sent : t.send}
        </button>
      ) : (
        <p className="text-xs text-center text-amber-400">{t.noEmail}</p>
      )}
    </div>
  )
}

import React from 'react'
