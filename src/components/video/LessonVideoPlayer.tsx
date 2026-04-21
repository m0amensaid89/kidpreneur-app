'use client'

import { useState, useRef } from 'react'
import { useLocale } from '@/components/LocaleProvider'

interface LessonVideoPlayerProps {
  videoUrlEn?: string | null
  videoUrlAr?: string | null
  lessonTitle?: string
  onComplete?: () => void
}

export function LessonVideoPlayer({ videoUrlEn, videoUrlAr, lessonTitle, onComplete }: LessonVideoPlayerProps) {
  const { locale, isRTL } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const videoUrl = locale === 'ar' ? (videoUrlAr ?? videoUrlEn) : (videoUrlEn ?? videoUrlAr)
  const t = locale === 'ar'
    ? { label: 'شاهد الدرس', completed: 'أحسنت! شاهدت الدرس', skip: 'تخطي' }
    : { label: 'Watch Lesson', completed: 'Lesson watched!', skip: 'Skip' }

  if (!videoUrl) return null

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const pct = (v.currentTime / v.duration) * 100
    setProgress(pct)
    if (pct >= 70 && !completed) {
      setCompleted(true)
      onComplete?.()
    }
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-amber-100 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-amber-400 px-4 py-2 flex items-center gap-2">
        <span className="text-lg">🎬</span>
        <span className="font-black text-amber-900 text-sm">{lessonTitle ?? t.label}</span>
      </div>
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => { setPlaying(false); setCompleted(true); onComplete?.() }}
          playsInline
        />
        {!playing && (
          <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#92400E"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </button>
        )}
      </div>
      <div className="h-1.5 bg-amber-100">
        <div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
      </div>
      {completed && (
        <div className="px-4 py-3 bg-green-50 flex items-center gap-2">
          <span className="text-green-500">✅</span>
          <span className="text-green-700 font-bold text-sm">{t.completed}</span>
        </div>
      )}
    </div>
  )
}
