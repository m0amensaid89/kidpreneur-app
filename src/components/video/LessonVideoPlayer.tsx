"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useLocale } from "@/components/LocaleProvider"

interface LessonVideoPlayerProps {
  // Mode A: pass lessonId — component fetches signed URL automatically
  lessonId?: string
  // Mode B: pass direct URLs (legacy, still supported)
  videoUrlEn?: string
  videoUrlAr?: string
  // Shared props
  lessonTitle?: string
  onComplete?: () => void
  completionThreshold?: number  // 0-1, default 0.7 (70% watched)
}

export function LessonVideoPlayer({
  lessonId,
  videoUrlEn,
  videoUrlAr,
  lessonTitle,
  onComplete,
  completionThreshold = 0.7,
}: LessonVideoPlayerProps) {
  const { locale, isRTL } = useLocale()
  const isAr = locale === "ar"
  const videoRef = useRef<HTMLVideoElement>(null)

  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  // Signed URL state (used when lessonId prop is provided)
  const [signedUrl, setSignedUrl]     = useState<string | null>(null)
  const [urlLoading, setUrlLoading]   = useState(false)
  const [urlError, setUrlError]       = useState(false)

  const t = isAr
    ? {
        play: "تشغيل",
        pause: "إيقاف مؤقت",
        completed: "✅ أنهيت الفيديو!",
        noVideo: "الفيديو قريباً 🎬",
        loading: "جاري التحميل...",
        error: "تعذّر تحميل الفيديو",
      }
    : {
        play: "Play",
        pause: "Pause",
        completed: "✅ Video complete!",
        noVideo: "Video coming soon 🎬",
        loading: "Loading video...",
        error: "Failed to load video",
      }

  // ── Fetch signed URL from API when lessonId provided ──────────
  useEffect(() => {
    if (!lessonId) return
    let cancelled = false
    setUrlLoading(true)
    setUrlError(false)
    setSignedUrl(null)

    fetch(`/api/video/url?lessonId=${lessonId}&locale=${locale}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        setSignedUrl(data.url ?? null)  // null = no video uploaded yet
        setUrlLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setUrlError(true)
        setUrlLoading(false)
      })

    return () => { cancelled = true }
  }, [lessonId, locale])

  // ── Resolve final video URL ───────────────────────────────────
  const videoUrl: string | null = lessonId
    ? signedUrl  // Mode A: use signed URL from API
    : (isAr ? (videoUrlAr ?? videoUrlEn ?? null) : (videoUrlEn ?? videoUrlAr ?? null))  // Mode B: direct

  // ── Playback handlers ─────────────────────────────────────────
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

  // ── Render: Loading state ─────────────────────────────────────
  if (urlLoading) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="rounded-2xl flex flex-col items-center justify-center gap-3 py-10"
        style={{ background: "#1a1a1a", border: "2px solid #333" }}
      >
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-amber-400">{t.loading}</p>
      </div>
    )
  }

  // ── Render: No video (not uploaded yet) ───────────────────────
  if (!videoUrl) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="rounded-2xl flex flex-col items-center justify-center gap-2 py-10"
        style={{ background: "#FEF3C7", border: "2px dashed #FDE68A" }}
      >
        <span className="text-4xl">🎬</span>
        <p className="text-sm font-bold text-amber-600">{t.noVideo}</p>
      </div>
    )
  }

  // ── Render: Error ─────────────────────────────────────────────
  if (urlError) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="rounded-2xl flex flex-col items-center justify-center gap-2 py-8"
        style={{ background: "#FEF2F2", border: "2px dashed #FCA5A5" }}
      >
        <span className="text-3xl">⚠️</span>
        <p className="text-sm font-bold text-red-500">{t.error}</p>
      </div>
    )
  }

  // ── Render: Video player ──────────────────────────────────────
  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Video element */}
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full max-h-72 object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => { setPlaying(false); setCompleted(true); onComplete?.() }}
          onError={() => setUrlError(true)}
          playsInline
          controlsList="nodownload nofullscreen noremoteplayback"
          onContextMenu={e => e.preventDefault()}  // block right-click save
        />

        {/* Play overlay */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)" }}
            aria-label={t.play}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{ background: "#D97706" }}
            >
              <span style={{ fontSize: 28, color: "#fff", marginLeft: 4 }}>▶</span>
            </div>
          </button>
        )}

        {/* Tap to pause when playing */}
        {playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0"
            aria-label={t.pause}
          />
        )}
      </div>

      {/* Progress bar + controls */}
      <div className="px-4 py-3">
        {lessonTitle && (
          <p className="text-xs font-bold text-amber-400 mb-2 truncate">{lessonTitle}</p>
        )}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: completed ? "#10B981" : "#D97706"
            }}
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
