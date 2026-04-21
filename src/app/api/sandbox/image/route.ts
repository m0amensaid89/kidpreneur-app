import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })

    // Kid-safe prompt enhancement
    const safePrompt = `${prompt}, colorful, vibrant, high quality, detailed art`
    const encoded = encodeURIComponent(safePrompt)
    const seed = Math.floor(Math.random() * 999999)

    // Pollinations.ai — free, no API key, generates on-demand at URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&seed=${seed}&nologo=true&safe=true`

    return NextResponse.json({ imageUrl })
  } catch (err) {
    console.error('Sandbox image error:', err)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
