'use client'
import { useLocale } from '@/components/LocaleProvider'

import { useState, useRef, useEffect } from 'react'
import type { InvestorPersona } from '@/lib/empire/investors'

interface Message {
  role: 'user' | 'investor'
  text: string
}

interface EmpireBuilderChatProps {
  investor: InvestorPersona
  locale?: 'en' | 'ar'
  onComplete?: (score: number) => void
}

export function EmpireBuilderChat({
  investor,
  locale = 'en',
  onComplete,
}: EmpireBuilderChatProps) {
  const { locale, isRTL } = useLocale()
  const isAr = locale === "ar"
  const [messages, setMessages] = useState<Message[]>([
    { role: 'investor', text: locale === 'ar' ? investor.greetingAr : investor.greeting },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const t = locale === 'ar'
    ? { placeholder: 'اشرح فكرتك...', send: 'إرسال', thinking: 'بيفكر...', pitch: 'ابدأ العرض', done: 'عرضك اتقيّم!' }
    : { placeholder: 'Pitch your idea...', send: {isAr ? 'إرسال' : 'Send'}, thinking: 'Thinking...', pitch: 'Start Pitch', done: 'Pitch evaluated!' }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading || done) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const history = messages.slice(1) // skip greeting
      const res = await fetch('/api/empire/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worldId: investor.worldId,
          message: userMsg,
          history: history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
          locale,
        }),
      })
      const data = await res.json()
      const reply = data.reply ?? (locale === 'ar' ? 'وريني أكتر.' : 'Tell me more.')

      setMessages(prev => [...prev, { role: 'investor', text: reply }])

      // Check if score is in the reply (investor gave final verdict)
      const scoreMatch = reply.match(/(?:SCORE|النتيجة).*?(\d+)\s*\/\s*10/i)
      if (scoreMatch) {
        setDone(true)
        onComplete?.(parseInt(scoreMatch[1]))
      }
    } catch {
      setMessages(prev => [...prev, { role: 'investor', text: locale === 'ar' ? 'حاول تاني.' : 'Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"} className="flex flex-col h-full"
      style={{ fontFamily: 'Roboto, sans-serif' }}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Investor header */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-t-2xl"
        style={{ background: investor.color }}
      >
        <div className="text-3xl">{investor.emoji}</div>
        <div>
          <div className="text-white font-black text-sm">{investor.name}</div>
          <div className="text-white text-xs opacity-80">{investor.title}</div>
        </div>
        {done && (
          <div className="ml-auto bg-white rounded-full px-3 py-1 text-xs font-black" style={{ color: investor.color }}>
            {t.done}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-[#FFF8E7]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'investor' && (
              <span className="text-xl mr-2 mt-1 shrink-0">{investor.emoji}</span>
            )}
            <div
              className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed"
              style={
                msg.role === 'user'
                  ? { background: investor.color, color: '#fff' }
                  : { background: '#fff', color: '#2C2C2A', border: '1.5px solid #FDE68A' }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start items-center gap-2">
            <span className="text-xl">{investor.emoji}</span>
            <div className="bg-white border border-amber-100 rounded-2xl px-4 py-2 text-sm text-amber-400">
              {t.thinking}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done && (
        <div className="px-4 pb-4 pt-2 bg-[#FFF8E7] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={t.placeholder}
            disabled={loading}
            className="flex-1 rounded-2xl px-4 py-2.5 text-sm font-medium outline-none"
            style={{
              background: '#fff',
              border: `2px solid ${investor.color}40`,
              color: '#2C2C2A',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-2xl text-sm font-black text-white transition active:scale-95"
            style={{
              background: investor.color,
              opacity: loading || !input.trim() ? 0.5 : 1,
            }}
          >
            {t.send}
          </button>
        </div>
      )}
    </div>
  )
}
