'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/components/LocaleProvider'

interface PushNotificationSetupProps {
  userId: string
  kidName: string
}

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushNotificationSetup({ userId, kidName }: PushNotificationSetupProps) {
  const { locale } = useLocale()
  const [status, setStatus] = useState<'idle' | 'asking' | 'subscribed' | 'denied' | 'unsupported'>('idle')

  const t = locale === 'ar'
    ? {
        title: 'تنبيهات التقدم',
        desc: 'وصّل والدك على إنجازاتك الجديدة',
        btn: 'فعّل التنبيهات',
        subscribed: 'التنبيهات فعّالة ✅',
        denied: 'تنبيهات مرفوضة',
        unsupported: 'المتصفح لا يدعم التنبيهات',
      }
    : {
        title: 'Parent Milestone Alerts',
        desc: 'Notify your parent when you earn badges and complete worlds',
        btn: 'Enable Notifications',
        subscribed: 'Notifications active ✅',
        denied: 'Notifications blocked',
        unsupported: 'Browser not supported',
      }

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported')
      return
    }
    if (Notification.permission === 'granted') setStatus('subscribed')
    else if (Notification.permission === 'denied') setStatus('denied')
  }, [])

  const subscribe = async () => {
    if (!('serviceWorker' in navigator)) return
    setStatus('asking')
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') { setStatus('denied'); return }

      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription, user_id: userId, kid_name: kidName }),
      })
      setStatus('subscribed')
    } catch (err) {
      console.error('Push subscribe error:', err)
      setStatus('idle')
    }
  }

  if (status === 'unsupported') return null

  return (
    <div
      className="rounded-2xl border-2 border-amber-100 bg-white p-4"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">🔔</span>
        <div className="flex-1">
          <div className="font-black text-amber-900 text-sm">{t.title}</div>
          <div className="text-xs text-amber-600 mt-0.5">{t.desc}</div>
        </div>
      </div>
      <div className="mt-3">
        {status === 'subscribed' && (
          <div className="text-sm font-bold text-green-600">{t.subscribed}</div>
        )}
        {status === 'denied' && (
          <div className="text-sm font-bold text-red-500">{t.denied}</div>
        )}
        {(status === 'idle' || status === 'asking') && (
          <button
            onClick={subscribe}
            disabled={status === 'asking'}
            className="w-full py-2.5 rounded-xl text-sm font-black text-white"
            style={{ background: '#D97706', opacity: status === 'asking' ? 0.6 : 1 }}
          >
            {t.btn}
          </button>
        )}
      </div>
    </div>
  )
}
