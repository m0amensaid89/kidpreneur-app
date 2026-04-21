'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from '@/components/LocaleProvider'

interface LessonVideoPlayerProps {
  videoUrlEn?: string | null
  videoUrlAr?: string | null
  lessonTitle?: string
  onComplete?: () => void
  autoPlay?: boolean
}

export function LessonVideoPlayer({ videoUrlEn, videoUrlAr, lessonTitle, onComplete, autoPlay = false }: LessonVideoPlayerProps) {
  const { locale, isRTL } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [hasWatched70, setHasWatched70] = useState(false)

  const videoUrl = locale === 'ar' ? (videoUrlAr ?? videoUrlEn) : (videoUrlEn ?? videoUrlAr)
  const t = locale === 'ar'
    ? { watch: 'شاهد الدرس', play: 'تشغيل', pause: 'إيقاف', completed: 'أحسنت! شاهدت الدرس', skip: 'تخطي للمهام' }
    : { watch: 'Watch Lesson', play: 'Play', pause: 'Pause', completed: 'Great! Lesson watched', skip: 'Skip to Missions' }

  // If no video URL — render nothing (graceful skip)
  if (!videoUrl) return null

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(pct)
    if (pct >= 70 && !hasWatched70) {
      setHasWatched70(true)
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setCompleted(true)
    onComplete?.()
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-amber-100 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Label */}
      <div className="bg-amber-400 px-4 py-2 flex items-center gap-2">
        <span className="text-lg">🎬</span>
        <span className="font-black text-amber-900 text-sm">{lessonTitle ?? t.watch}</span>
        {locale === 'ar' && videoUrlAr && (
          <span className="mr-auto bg-white rounded-full px-2 py-0.5 text-xs font-bold text-amber-800">عربي</span>
        )}
      </div>

      {/* Video */}
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          playsInline
          autoPlay={autoPlay}
        />

        {/* Play/pause overlay */}
        {!playing && !completed && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#92400E">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </button>
        )}

        {playing && (
          <button onClick={togglePlay} className="absolute bottom-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-amber-100">
        <div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Completion state */}
      {completed && (
        <div className="px-4 py-3 bg-green-50 flex items-center gap-2">
          <span className="text-green-500 text-lg">✅</span>
          <span className="text-green-700 font-bold text-sm">{t.completed}</span>
          <button onClick={() => onComplete?.()} className="mr-auto text-xs text-amber-600 underline">{t.skip}</button>
        </div>
      )}
    </div>
  )
}
