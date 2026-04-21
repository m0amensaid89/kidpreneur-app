import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

const GEMINI_KEY = process.env.GOOGLE_AI_STUDIO_KEY

export async function POST(req: NextRequest) {
  let locale = 'en'
  try {
    const body = await req.json()
    const { message, lessonContext } = body
    locale = body.locale ?? 'en'

    if (!message) return NextResponse.json({ error: 'message required' }, { status: 400 })

    const systemPrompt = locale === 'ar'
      ? `أنت كواكي، بطة ذكاء اصطناعي صديقة ومشجعة للأطفال من عمر 8 إلى 15 سنة. بتساعدهم يتعلموا ريادة الأعمال والذكاء الاصطناعي. كلامك قصير وممتع وسهل. استخدم كلمة تشجيعية واحدة في كل رد. السياق: ${lessonContext ?? 'تعلم عام'}.`
      : `You are Quacky, a friendly AI duck who helps kids aged 8-15 learn entrepreneurship and AI tools. Keep answers SHORT, fun, and encouraging. Max 2 sentences. Add one emoji. Always be positive. Context: ${lessonContext ?? 'general learning'}.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }], role: 'user' }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { maxOutputTokens: 150, temperature: 0.8 },
        }),
      }
    )

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? (
      locale === 'ar' ? 'عظيم! استمر! 🦆' : 'Great job! Keep going! 🦆'
    )

    return NextResponse.json({ reply })
  } catch {
    const fallback = locale === 'ar' ? 'عظيم! استمر! 🦆' : 'Great job! Keep going! 🦆'
    return NextResponse.json({ reply: fallback })
  }
}
