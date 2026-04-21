'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { KidSwitcher } from '@/components/kids/KidSwitcher'
import { useLocale } from '@/components/LocaleProvider'

export default function KidsPage() {
  const router = useRouter()
  const { locale } = useLocale()
  const [userId, setUserId] = useState<string | null>(null)
  const isAr = locale === 'ar'

  const t = isAr
    ? { title: 'ملفات الأطفال', subtitle: 'مين هيلعب النهارده؟', goHome: 'ابدأ اللعب' }
    : { title: 'Kid Profiles', subtitle: 'Who is playing today?', goHome: 'Start Playing' }

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
      else router.push('/auth/login')
    })
  }, [router])

  const handleSwitch = (kid: any) => {
    // Store active kid in localStorage for the session
    localStorage.setItem('active_kid_id', kid.id)
    localStorage.setItem('active_kid_name', kid.name)
    localStorage.setItem('active_kid_color', kid.color)
    router.push('/home')
  }

  if (!userId) return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
      <div className="text-4xl animate-bounce">🦆</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FFF8E7]" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-yellow-400 px-4 pt-12 pb-6 text-center">
        <div className="text-5xl mb-3">🦆</div>
        <h1 className="font-black text-amber-900 text-2xl">{t.title}</h1>
        <p className="text-amber-700 text-sm mt-1">{t.subtitle}</p>
      </div>

      {/* Switcher */}
      <div className="max-w-lg mx-auto">
        <KidSwitcher
          parentUserId={userId}
          onSwitch={handleSwitch}
        />
      </div>
    </div>
  )
}
