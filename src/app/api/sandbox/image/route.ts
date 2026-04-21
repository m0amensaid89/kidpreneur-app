import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const FAL_KEY = process.env.FAL_API_KEY

export async function POST(req: NextRequest) {
  try {
    const { prompt, style } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })

    // Enhance prompt for kids-appropriate results
    const safePrompt = `${prompt}, child-friendly, colorful, vibrant, professional quality`

    // fal.ai FLUX model — fast, high quality
    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: safePrompt,
        image_size: 'square',
        num_images: 1,
        num_inference_steps: 4,
        enable_safety_checker: true,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('fal.ai error:', err)
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

    const data = await response.json()
    const imageUrl = data.images?.[0]?.url

    if (!imageUrl) return NextResponse.json({ error: 'No image returned' }, { status: 500 })

    return NextResponse.json({ imageUrl, prompt: safePrompt })
  } catch (err) {
    console.error('Sandbox image error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
