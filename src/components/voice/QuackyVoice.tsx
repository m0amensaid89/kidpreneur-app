'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface QuackyVoiceProps {
  lessonId?: string
  lessonContext?: string
  locale?: 'en' | 'ar'
  onOpen?: () => void
  onClose?: () => void
}

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking'

export function QuackyVoice({
  lessonId,
  lessonContext,
  locale = 'en',
  onOpen,
  onClose,
}: QuackyVoiceProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [transcript, setTranscript] = useState('')
  const [reply, setReply] = useState('')
  const [supported, setSupported] = useState(false)
  const [permissionError, setPermissionError] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'quacky'; text: string }[]>([])

  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Labels
  const L = locale === 'ar'
    ? {
        title: 'كواكي صاحبك',
        tap: 'اضغط للتحدث مع كواكي',
        listening: 'بسمعك...',
        thinking: 'كواكي بيفكر...',
        speaking: 'كواكي بيتكلم...',
        error: 'مش قادر أوصل للمايك',
        placeholder: 'اضغط واتكلم...',
      }
    : {
        title: 'Quacky Voice',
        tap: 'Tap to talk to Quacky',
        listening: 'Listening...',
        thinking: 'Quacky is thinking...',
        speaking: 'Quacky is speaking...',
        error: "Can't access microphone",
        placeholder: 'Tap and speak...',
      }

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setSupported(!!SR)
  }, [])

  const speakReply = useCallback(async (text: string) => {
    setVoiceState('speaking')
    setReply(text)

    try {
      const res = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      })
      const data = await res.json()

      if (data.audioContent) {
        // Gemini TTS audio
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`)
        audioRef.current = audio
        audio.onended = () => setVoiceState('idle')
        audio.onerror = () => {
          browserSpeak(text)
        }
        await audio.play()
      } else {
        // Browser TTS fallback
        browserSpeak(text)
      }
    } catch {
      browserSpeak(text)
    }
  }, [locale])

  const browserSpeak = (text: string) => {
    const synth = window.speechSynthesis
    synth.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = locale === 'ar' ? 'ar-SA' : 'en-US'
    utt.rate = 0.95
    utt.pitch = 1.2
    utt.onend = () => setVoiceState('idle')
    synth.speak(utt)
  }

  const getReply = useCallback(async (userMessage: string) => {
    setVoiceState('thinking')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])

    try {
      const res = await fetch('/api/voice/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, lessonContext, locale }),
      })
      const data = await res.json()
      const quackyReply = data.reply ?? (locale === 'ar' ? 'عظيم! استمر!' : 'Keep going! 🦆')
      setMessages(prev => [...prev, { role: 'quacky', text: quackyReply }])
      await speakReply(quackyReply)
    } catch {
      const fallback = locale === 'ar' ? 'عظيم! استمر!' : 'Great job! 🦆'
      setMessages(prev => [...prev, { role: 'quacky', text: fallback }])
      await speakReply(fallback)
    }
  }, [lessonContext, locale, speakReply])

  const startListening = useCallback(() => {
    if (!supported || voiceState !== 'idle') return

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = locale === 'ar' ? 'ar-EG' : 'en-US'

    recognition.onstart = () => {
      setVoiceState('listening')
      setTranscript('')
      setPermissionError(false)
    }

    recognition.onresult = (e: any) => {
      const t = Array.from(e.results).map((r: any) => r[0].transcript).join('')
      setTranscript(t)
    }

    recognition.onend = () => {
      setTranscript(prev => {
        if (prev.trim()) {
          getReply(prev.trim())
        } else {
          setVoiceState('idle')
        }
        return prev
      })
    }

    recognition.onerror = (e: any) => {
      if (e.error === 'not-allowed') setPermissionError(true)
      setVoiceState('idle')
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [supported, voiceState, locale, getReply])

  const stopListening = () => {
    recognitionRef.current?.stop()
    audioRef.current?.pause()
    window.speechSynthesis?.cancel()
    setVoiceState('idle')
  }

  const toggleOpen = () => {
    if (isOpen) {
      stopListening()
      setIsOpen(false)
      onClose?.()
    } else {
      setIsOpen(true)
      onOpen?.()
    }
  }

  const stateLabel = voiceState === 'listening' ? L.listening
    : voiceState === 'thinking' ? L.thinking
    : voiceState === 'speaking' ? L.speaking
    : L.placeholder

  const pulseClass = voiceState === 'listening' ? 'animate-ping' : ''
  const bgClass = voiceState === 'listening' ? 'bg-red-400'
    : voiceState === 'thinking' ? 'bg-amber-400'
    : voiceState === 'speaking' ? 'bg-green-400'
    : 'bg-yellow-400'

  if (!supported) return null

  return (
    <div
      className={`fixed ${locale === 'ar' ? 'left-4' : 'right-4'} bottom-24 z-40 flex flex-col items-${locale === 'ar' ? 'start' : 'end'} gap-2`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Chat bubble panel */}
      {isOpen && (
        <div className="bg-[#FFF8E7] rounded-3xl shadow-2xl w-72 max-h-80 flex flex-col overflow-hidden border-2 border-yellow-300">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-yellow-400 rounded-t-3xl">
            <span className="text-2xl">🦆</span>
            <span className="font-black text-amber-900 text-sm">{L.title}</span>
            <button onClick={toggleOpen} className="ml-auto text-amber-700 text-lg">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2">
            {messages.length === 0 && (
              <p className="text-amber-500 text-xs text-center py-4">{L.tap}</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs font-medium ${
                  m.role === 'user'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-white text-amber-800 border border-yellow-200'
                }`}>
                  {m.role === 'quacky' && <span className="mr-1">🦆</span>}
                  {m.text}
                </div>
              </div>
            ))}
            {voiceState === 'listening' && transcript && (
              <div className="flex justify-end">
                <div className="max-w-[80%] px-3 py-2 rounded-2xl text-xs bg-amber-100 text-amber-700 italic">
                  {transcript}...
                </div>
              </div>
            )}
          </div>

          {/* State label */}
          <div className="px-3 py-2 text-center text-xs text-amber-500">{stateLabel}</div>

          {/* Mic button */}
          {permissionError ? (
            <div className="px-3 pb-3 text-center text-xs text-red-400">{L.error}</div>
          ) : (
            <div className="px-3 pb-3 flex justify-center">
              <button
                onClick={voiceState === 'idle' ? startListening : stopListening}
                className={`w-14 h-14 rounded-full ${bgClass} flex items-center justify-center shadow-lg active:scale-95 transition-transform relative`}
              >
                {voiceState === 'listening' && (
                  <span className={`absolute inset-0 rounded-full ${bgClass} ${pulseClass} opacity-75`} />
                )}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  {voiceState === 'speaking'
                    ? <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                    : <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-6 10a6 6 0 0 0 12 0h2a8 8 0 0 1-7 7.93V21h2v2H9v-2h2v-2.07A8 8 0 0 1 4 11h2z"/>
                  }
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Float button (when closed) */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl text-2xl active:scale-95 transition-transform border-2 border-yellow-500"
          title={L.tap}
        >
          🦆
        </button>
      )}
    </div>
  )
}
