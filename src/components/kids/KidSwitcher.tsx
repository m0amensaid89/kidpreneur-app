'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/components/LocaleProvider'

interface KidProfile {
  id: string
  name: string
  age_range: string
  avatar_index: number
  color: string
  xp: number
  level: number
  streak_days: number
}

interface KidSwitcherProps {
  parentUserId: string
  onSwitch?: (kid: KidProfile) => void
}

const AVATARS = ['🦆', '🐯', '🦁', '🐺', '🦊', '🐸', '🐧', '🦅']
const COLORS = ['#FF6340', '#7B52EE', '#2E8CE6', '#00A878', '#6B35FF', '#F59E0B', '#EC4899', '#06B6D4']

export function KidSwitcher({ parentUserId, onSwitch }: KidSwitcherProps) {
  const { locale } = useLocale()
  const isAr = locale === 'ar'
  const [kids, setKids] = useState<KidProfile[]>([])
  const [activeKid, setActiveKid] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState<'8-11' | '12-15'>('8-11')
  const [newAvatar, setNewAvatar] = useState(0)
  const [newColor, setNewColor] = useState(0)
  const [loading, setLoading] = useState(false)

  const t = isAr
    ? { title: 'اختر الطفل', add: 'إضافة طفل جديد', name: 'الاسم', age1: '٨-١١ سنة', age2: '١٢-١٥ سنة', save: 'حفظ', cancel: 'إلغاء', maxKids: 'وصلت للحد الأقصى (٦ أطفال)', level: 'مستوى', xp: 'نقطة', choose: 'اختار الشخصية', chooseColor: 'اختار اللون' }
    : { title: 'Choose Player', add: 'Add New Kid', name: 'Name', age1: '8-11 years', age2: '12-15 years', save: 'Save', cancel: 'Cancel', maxKids: 'Max 6 kids reached', level: 'Level', xp: 'XP', choose: 'Choose Avatar', chooseColor: 'Choose Color' }

  useEffect(() => {
    if (!parentUserId) return
    fetch('/api/kids', { headers: { 'x-user-id': parentUserId } })
      .then(r => r.json())
      .then(d => { if (d.kids) setKids(d.kids) })
  }, [parentUserId])

  const switchKid = async (kid: KidProfile) => {
    setActiveKid(kid.id)
    await fetch('/api/kids/switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': parentUserId },
      body: JSON.stringify({ kid_id: kid.id }),
    })
    onSwitch?.(kid)
  }

  const addKid = async () => {
    if (!newName.trim() || loading) return
    setLoading(true)
    const res = await fetch('/api/kids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': parentUserId },
      body: JSON.stringify({
        name: newName.trim(),
        age_range: newAge,
        avatar_index: newAvatar,
        color: COLORS[newColor],
      }),
    })
    const data = await res.json()
    if (data.kid) {
      setKids(prev => [...prev, data.kid])
      setShowAdd(false)
      setNewName('')
      setNewAvatar(0)
      setNewColor(0)
    }
    setLoading(false)
  }

  return (
    <div className="p-4" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-amber-900 text-lg">{t.title}</h2>
        {kids.length < 6 && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-400 text-amber-900 text-sm font-black"
          >
            <span>+</span>{t.add}
          </button>
        )}
      </div>

      {/* Kid profiles grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-3">
        {kids.map(kid => (
          <button
            key={kid.id}
            onClick={() => switchKid(kid)}
            className="relative rounded-2xl p-3 text-center border-2 transition active:scale-95"
            style={{
              borderColor: activeKid === kid.id ? kid.color : '#FDE68A',
              background: activeKid === kid.id ? kid.color + '15' : 'white',
              boxShadow: activeKid === kid.id ? `0 4px 0 ${kid.color}44` : 'none',
            }}
          >
            {activeKid === kid.id && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: kid.color }}>
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <div className="text-4xl mb-2">{AVATARS[kid.avatar_index ?? 0]}</div>
            <div className="font-black text-amber-900 text-sm mb-1">{kid.name}</div>
            <div className="text-xs text-amber-500">{t.level} {kid.level} · {kid.xp} {t.xp}</div>
            {kid.streak_days > 0 && (
              <div className="text-xs text-amber-600 font-bold mt-1">🔥 {kid.streak_days}</div>
            )}
          </button>
        ))}

        {/* Empty slots */}
        {kids.length < 6 && Array.from({ length: Math.min(1, 6 - kids.length) }).map((_, i) => (
          <button
            key={`empty-${i}`}
            onClick={() => setShowAdd(true)}
            className="rounded-2xl p-3 text-center border-2 border-dashed border-amber-200 text-amber-300 flex flex-col items-center justify-center gap-2 min-h-[120px]"
          >
            <span className="text-3xl">+</span>
            <span className="text-xs font-bold">{t.add}</span>
          </button>
        ))}
      </div>

      {/* Add kid modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-[#FFF8E7] rounded-3xl p-5 w-full max-w-sm shadow-2xl">
            <h3 className="font-black text-amber-900 text-lg mb-4">{t.add}</h3>

            {/* Name */}
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder={t.name}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 text-sm font-medium mb-3 outline-none"
              style={{ fontFamily: isAr ? 'Cairo, sans-serif' : 'Roboto, sans-serif' }}
            />

            {/* Age range */}
            <div className="flex gap-2 mb-3">
              {(['8-11', '12-15'] as const).map((age, i) => (
                <button
                  key={age}
                  onClick={() => setNewAge(age)}
                  className="flex-1 py-2 rounded-xl text-sm font-black transition"
                  style={{
                    background: newAge === age ? '#D97706' : '#FEF3C7',
                    color: newAge === age ? 'white' : '#92400E',
                  }}
                >
                  {i === 0 ? t.age1 : t.age2}
                </button>
              ))}
            </div>

            {/* Avatar picker */}
            <div className="mb-2 text-xs font-bold text-amber-600">{t.choose}</div>
            <div className="flex gap-2 mb-3 flex-wrap">
              {AVATARS.map((av, i) => (
                <button
                  key={i}
                  onClick={() => setNewAvatar(i)}
                  className="w-10 h-10 rounded-full text-xl flex items-center justify-center transition"
                  style={{ background: newAvatar === i ? '#FDE68A' : '#FEF3C7', border: newAvatar === i ? '2px solid #D97706' : '2px solid transparent' }}
                >
                  {av}
                </button>
              ))}
            </div>

            {/* Color picker */}
            <div className="mb-2 text-xs font-bold text-amber-600">{t.chooseColor}</div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setNewColor(i)}
                  className="w-8 h-8 rounded-full transition"
                  style={{ background: c, border: newColor === i ? '3px solid #92400E' : '3px solid transparent' }}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-black bg-amber-100 text-amber-700"
              >
                {t.cancel}
              </button>
              <button
                onClick={addKid}
                disabled={!newName.trim() || loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: '#D97706', opacity: !newName.trim() || loading ? 0.5 : 1 }}
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
