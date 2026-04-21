import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })

    // Kid-safe prompt enhancement
    const safePrompt = `${prompt}, colorful, vibrant, child-friendly, high quality, detailed`
    const encoded = encodeURIComponent(safePrompt)

    // Pollinations.ai — free, no API key, fast image generation
    // Returns the image directly at this URL
    const seed = Math.floor(Math.random() * 999999)
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&seed=${seed}&nologo=true&safe=true`

    // Verify image is accessible (HEAD check)
    const check = await fetch(imageUrl, { method: 'GET' })
    if (!check.ok) {
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

    return NextResponse.json({ imageUrl })
  } catch (err) {
    console.error('Sandbox image error:', err)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
