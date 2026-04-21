'use client'

import { useState, useRef, useCallback } from 'react'

interface LessonVideoPlayerProps {
  videoUrlEn?: string
  videoUrlAr?: string
  locale?: 'en' | 'ar'
  lessonTitle?: string
  onComplete?: () => void
  completionThreshold?: number  // % watched to trigger onComplete (default 0.7)
}

export function LessonVideoPlayer({
  videoUrlEn,
  videoUrlAr,
  locale = 'en',
  lessonTitle,
  onComplete,
  completionThreshold = 0.7,
}: LessonVideoPlayerProps) {
  const videoUrl = locale === 'ar' ? (videoUrlAr ?? videoUrlEn) : (videoUrlEn ?? videoUrlAr)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(false)

  const t = locale === 'ar'
    ? { play: 'تشغيل', pause: 'إيقاف', completed: '✅ أنهيت الفيديو!', noVideo: 'لا يوجد فيديو بعد' }
    : { play: 'Play', pause: 'Pause', completed: '✅ Video complete!', noVideo: 'Video coming soon' }

  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current
    if (!vid || vid.duration === 0) return
    const pct = vid.currentTime / vid.duration
    setProgress(Math.round(pct * 100))
    if (!completed && pct >= completionThreshold) {
      setCompleted(true)
      onComplete?.()
    }
  }, [completed, completionThreshold, onComplete])

  const togglePlay = () => {
    const vid = videoRef.current
    if (!vid) return
    if (vid.paused) { vid.play(); setPlaying(true) }
    else { vid.pause(); setPlaying(false) }
  }

  if (!videoUrl) {
    return (
      <div
        className="rounded-2xl flex flex-col items-center justify-center gap-2 py-10"
        style={{ background: '#FEF3C7', border: '2px dashed #FDE68A' }}
      >
        <span className="text-4xl">🎬</span>
        <p className="text-sm font-bold text-amber-500">{t.noVideo}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Video */}
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full max-h-64 object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => { setPlaying(false); setCompleted(true); onComplete?.() }}
          onError={() => setError(true)}
          playsInline
        />
        {/* Play overlay */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.35)' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#D97706' }}
            >
              <span style={{ fontSize: 28, color: '#fff', marginLeft: 4 }}>▶</span>
            </div>
          </button>
        )}
        {/* Pause tap area when playing */}
        {playing && (
          <button onClick={togglePlay} className="absolute inset-0" />
        )}
      </div>

      {/* Progress bar + controls */}
      <div className="px-4 py-3">
        {lessonTitle && (
          <p className="text-xs font-bold text-amber-400 mb-2 truncate">{lessonTitle}</p>
        )}
        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: completed ? '#10B981' : '#D97706' }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-white/40">{progress}%</span>
          {completed && (
            <span className="text-xs font-black text-emerald-400">{t.completed}</span>
          )}
        </div>
      </div>
    </div>
  )
}
