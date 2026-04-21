'use client'

// @ts-nocheck
import { useState } from 'react'
import { useLocale } from '@/components/LocaleProvider'
import type { SandboxConfig } from '@/lib/sandbox/sandbox-config'

interface ToolSandboxProps {
  lessonId: string
  config: SandboxConfig
  onComplete?: () => void
}

type SandboxState = 'idle' | 'loading' | 'done' | 'error'

export function ToolSandbox({ lessonId, config, onComplete }: ToolSandboxProps) {
  const { locale, isRTL } = useLocale()
  const [input, setInput] = useState('')
  const [state, setState] = useState<SandboxState>('idle')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [textOutput, setTextOutput] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [sources, setSources] = useState<string[]>([])
  const [hasPracticed, setHasPracticed] = useState(false)

  const isAr = locale === 'ar'
  const label = isAr ? config.promptLabel.ar : config.promptLabel.en
  const placeholder = isAr ? config.placeholderAr : config.placeholderEn
  const tip = isAr ? config.quackyTipAr : config.quackyTipEn

  const t = isAr
    ? { generate: 'اعمل', tryAgain: 'جرب تاني', save: 'احفظ في بورتفوليو', loading: 'بيشتغل...', done: 'خلصت', error: 'حصل خطأ، جرب تاني', openTool: `افتح ${config.toolName}`, completeMission: 'المهمة اكتملت ✅', tip: 'نصيحة كواكي' }
    : { generate: 'Generate', tryAgain: 'Try Again', save: 'Save to Portfolio', loading: 'Working...', done: 'Done', error: 'Something went wrong, try again', openTool: `Open ${config.toolName}`, completeMission: 'Mission Complete ✅', tip: "Quacky's Tip" }

  const handleGenerate = async () => {
    if (!input.trim() && config.mode !== 'GUIDE_ONLY') return
    setState('loading')
    setImageUrl(null)
    setTextOutput(null)
    setAudioUrl(null)
    setSources([])

    try {
      if (config.mode === 'IMAGE_GEN') {
        const res = await fetch('/api/sandbox/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input }),
        })
        const data = await res.json()
        if (data.imageUrl) { setImageUrl(data.imageUrl); setState('done'); setHasPracticed(true) }
        else setState('error')

      } else if (config.mode === 'TEXT_GEN') {
        const res = await fetch('/api/sandbox/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input, toolName: config.toolName, locale }),
        })
        const data = await res.json()
        if (data.text) { setTextOutput(data.text); setState('done'); setHasPracticed(true) }
        else setState('error')

      } else if (config.mode === 'RESEARCH') {
        const res = await fetch('/api/sandbox/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input, toolName: config.toolName, locale }),
        })
        const data = await res.json()
        if (data.text) { setTextOutput(data.text); setSources(data.sources ?? []); setState('done'); setHasPracticed(true) }
        else setState('error')

      } else if (config.mode === 'VOICE_GEN') {
        const res = await fetch('/api/voice/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input, locale }),
        })
        const data = await res.json()
        if (data.audioContent) {
          const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`)
          audio.play()
          setState('done')
          setHasPracticed(true)
        } else {
          // Browser TTS fallback
          const utt = new SpeechSynthesisUtterance(input)
          utt.lang = isAr ? 'ar-SA' : 'en-US'
          window.speechSynthesis.speak(utt)
          setState('done')
          setHasPracticed(true)
        }
      }
    } catch {
      setState('error')
    }
  }

  const worldColors: Record<string, string> = {
    w1: '#FF6340', w2: '#7B52EE', w3: '#2E8CE6', w4: '#00A878', w5: '#6B35FF',
  }
  const worldId = lessonId.replace(/l(\d+).*/, (_, n) => {
    const num = parseInt(n)
    if (num <= 10) return 'w1'
    if (num <= 20) return 'w2'
    if (num <= 28) return 'w3'
    return 'w4'
  })
  const accent = worldColors[worldId] ?? '#D97706'

  return (
    <div
      className="rounded-2xl border-2 overflow-hidden mb-4"
      style={{ borderColor: accent + '40', fontFamily: isAr ? 'Cairo, sans-serif' : 'Roboto, sans-serif' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ background: accent + '15' }}
      >
        <span className="text-xl">🎮</span>
        <div className="flex-1">
          <div className="font-black text-sm" style={{ color: accent }}>
            {isAr ? 'جرّبه دلوقتي' : 'Try It Now'}
          </div>
          <div className="text-xs text-amber-600">{config.toolName}</div>
        </div>
        {config.toolDeepLink && (
          <a
            href={config.toolDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ color: accent, border: `1px solid ${accent}40` }}
          >
            ↗ {isAr ? 'الموقع' : 'Site'}
          </a>
        )}
      </div>

      <div className="p-4 bg-white">
        {/* GUIDE_ONLY mode */}
        {config.mode === 'GUIDE_ONLY' ? (
          <div className="flex flex-col gap-3">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <div className="text-xs font-black text-amber-700 mb-1">🦆 {t.tip}</div>
              <div className="text-sm text-amber-800">{tip}</div>
            </div>
            {config.toolDeepLink && (
              <a
                href={config.toolDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm text-white w-full"
                style={{ background: accent }}
                onClick={() => setHasPracticed(true)}
              >
                <span>🚀</span>{t.openTool}
              </a>
            )}
            {hasPracticed && (
              <button
                onClick={onComplete}
                className="py-2.5 rounded-xl font-black text-sm text-white w-full"
                style={{ background: '#00A878' }}
              >
                {t.completeMission}
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Input */}
            <div>
              <label className="text-xs font-black text-amber-700 mb-1 block">{label}</label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder}
                rows={3}
                disabled={state === 'loading'}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                style={{
                  border: `2px solid ${accent}30`,
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Roboto, sans-serif',
                  direction: isRTL ? 'rtl' : 'ltr',
                }}
              />
            </div>

            {/* Quacky tip */}
            <div className="bg-yellow-50 rounded-xl p-2.5 border border-yellow-100 flex gap-2">
              <span className="text-base shrink-0">🦆</span>
              <div className="text-xs text-amber-700">{tip}</div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={!input.trim() || state === 'loading'}
              className="py-3 rounded-xl font-black text-sm text-white transition active:scale-95"
              style={{
                background: accent,
                opacity: (!input.trim() || state === 'loading') ? 0.6 : 1,
              }}
            >
              {state === 'loading' ? `⏳ ${t.loading}` : `✨ ${t.generate}`}
            </button>

            {/* Error */}
            {state === 'error' && (
              <div className="text-sm text-red-500 text-center">{t.error}</div>
            )}

            {/* Image output */}
            {imageUrl && (
              <div className="flex flex-col gap-2">
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="w-full rounded-xl border-2"
                  style={{ borderColor: accent + '40' }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setInput(''); setState('idle'); setImageUrl(null) }}
                    className="flex-1 py-2 rounded-xl text-sm font-bold bg-amber-50 text-amber-700"
                  >
                    {t.tryAgain}
                  </button>
                  <a
                    href={imageUrl}
                    download="kidpreneur-creation.png"
                    className="flex-1 py-2 rounded-xl text-sm font-bold text-center text-white"
                    style={{ background: accent }}
                  >
                    ⬇️ {isAr ? 'تحميل' : 'Download'}
                  </a>
                </div>
                <button
                  onClick={onComplete}
                  className="py-2.5 rounded-xl font-black text-sm text-white w-full"
                  style={{ background: '#00A878' }}
                >
                  {t.completeMission}
                </button>
              </div>
            )}

            {/* Text output */}
            {textOutput && (
              <div className="flex flex-col gap-2">
                <div
                  className="p-3 rounded-xl text-sm bg-amber-50 border border-amber-100 whitespace-pre-wrap leading-relaxed"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                >
                  {textOutput}
                </div>
                {sources.length > 0 && (
                  <div className="text-xs text-amber-500">
                    {isAr ? 'المصادر:' : 'Sources:'} {sources.join(' · ')}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setInput(''); setState('idle'); setTextOutput(null) }}
                    className="flex-1 py-2 rounded-xl text-sm font-bold bg-amber-50 text-amber-700"
                  >
                    {t.tryAgain}
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(textOutput) }}
                    className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
                    style={{ background: accent }}
                  >
                    📋 {isAr ? 'نسخ' : 'Copy'}
                  </button>
                </div>
                <button
                  onClick={onComplete}
                  className="py-2.5 rounded-xl font-black text-sm text-white w-full"
                  style={{ background: '#00A878' }}
                >
                  {t.completeMission}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
