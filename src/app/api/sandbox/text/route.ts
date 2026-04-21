import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const GEMINI_KEY = process.env.GOOGLE_AI_STUDIO_KEY

export async function POST(req: NextRequest) {
  let locale = 'en'
  try {
    const body = await req.json()
    const { prompt, lessonContext, toolName } = body
    locale = body.locale ?? 'en'

    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })

    const systemPrompt = locale === 'ar'
      ? `أنت مساعد ذكي في KidPreneur يساعد الأطفال من ٨-١٥ سنة يتعلموا ${toolName ?? 'أدوات الذكاء الاصطناعي'}. ردودك قصيرة وممتعة وعملية. استخدم أمثلة بسيطة ومناسبة للأطفال. السياق: ${lessonContext ?? 'تعلم عام'}.`
      : `You are a helpful KidPreneur AI assistant helping kids aged 8-15 learn ${toolName ?? 'AI tools'}. Your responses are practical, engaging, and age-appropriate. Give concrete examples and actionable output. Context: ${lessonContext ?? 'general learning'}.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }], role: 'user' }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) return NextResponse.json({ error: 'No response generated' }, { status: 500 })

    return NextResponse.json({ text })
  } catch (err) {
    console.error('Sandbox text error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
