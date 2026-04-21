import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const GEMINI_KEY = process.env.GOOGLE_AI_STUDIO_KEY

export async function POST(req: NextRequest) {
  let locale = 'en'
  try {
    const body = await req.json()
    const { prompt, toolName } = body
    locale = body.locale ?? 'en'

    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })

    const systemPrompt = locale === 'ar'
      ? `أنت باحث خبير بيساعد طفل من ٨-١٥ سنة يفهم أي موضوع. قدّم إجاباتك بشكل واضح ومبسّط مع أدلة ومصادر حيثما أمكن. استخدم نقاط مرتبة وملخص في النهاية.`
      : `You are an expert researcher helping a kid aged 8-15 understand any topic. Present your findings clearly with evidence and sources where possible. Use bullet points and end with a clear summary. Tool context: ${toolName}.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }], role: 'user' }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          tools: [{ googleSearch: {} }],
          generationConfig: { maxOutputTokens: 1200, temperature: 0.3 },
        }),
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    const sources = data.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web?.title)
      .filter(Boolean)
      .slice(0, 3) ?? []

    if (!text) return NextResponse.json({ error: 'No research results' }, { status: 500 })

    return NextResponse.json({ text, sources })
  } catch (err) {
    console.error('Sandbox research error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
