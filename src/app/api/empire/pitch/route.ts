import { NextRequest, NextResponse } from 'next/server'
import { INVESTORS } from '@/lib/empire/investors'

export const dynamic = 'force-dynamic'

const GEMINI_KEY = process.env.GOOGLE_AI_STUDIO_KEY

export async function POST(req: NextRequest) {
  let locale = 'en'
  try {
    const body = await req.json()
    const { worldId, message, history } = body
    locale = body.locale ?? 'en'

    const investor = INVESTORS[worldId]
    if (!investor) {
      return NextResponse.json({ error: 'Invalid world' }, { status: 400 })
    }

    const systemPrompt = locale === 'ar' ? investor.systemPromptAr : investor.systemPromptEn

    // Build conversation history for Gemini
    const contents = [
      // Investor greeting as first assistant turn
      {
        role: 'model',
        parts: [{ text: locale === 'ar' ? investor.greetingAr : investor.greeting }],
      },
      // Full conversation history
      ...(history ?? []).map((msg: { role: string; text: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      // Current user message
      { role: 'user', parts: [{ text: message }] },
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.85,
          },
        }),
      }
    )

    const data = await response.json()
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      (locale === 'ar' ? 'فكرة مثيرة! وريني أكتر.' : 'Interesting idea! Tell me more.')

    return NextResponse.json({ reply, investor: { name: investor.name, emoji: investor.emoji } })
  } catch (err) {
    console.error('Empire pitch error:', err)
    const fallback = locale === 'ar' ? 'فكرة مثيرة! وريني أكتر.' : 'Interesting idea! Tell me more.'
    return NextResponse.json({ reply: fallback })
  }
}
