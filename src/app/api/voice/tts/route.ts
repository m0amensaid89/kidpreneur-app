import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { text, locale } = await req.json()
    if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 })

    const lang = locale === 'ar' ? 'ar-XA' : 'en-US'
    const voiceName = locale === 'ar' ? 'ar-XA-Wavenet-B' : 'en-US-Neural2-D'

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_AI_STUDIO_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: lang, name: voiceName, ssmlGender: 'NEUTRAL' },
          audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95, pitch: 2.0 },
        }),
      }
    )

    if (!response.ok) {
      // Fallback: return signal to use browser TTS
      return NextResponse.json({ fallback: true, text, locale })
    }

    const data = await response.json()
    return NextResponse.json({ audioContent: data.audioContent })
  } catch {
    return NextResponse.json({ fallback: true })
  }
}
