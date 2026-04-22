import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lessonId = searchParams.get('lessonId')
    const locale   = searchParams.get('locale') ?? 'en'

    if (!lessonId) {
      return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Verify user is authenticated — no session = no video URL
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Look up video URL for this lesson + locale
    // Uses existing table schema: video_url_en / video_url_ar
    const { data: row, error: dbError } = await supabase
      .from('lesson_videos')
      .select('video_url_en, video_url_ar')
      .eq('lesson_id', lessonId)
      .eq('is_active', true)
      .single()

    if (dbError || !row) {
      // No video uploaded yet — return null gracefully (player shows placeholder)
      return NextResponse.json({ url: null })
    }

    // Pick locale-appropriate URL, fall back to other locale if missing
    const url = locale === 'ar'
      ? (row.video_url_ar ?? row.video_url_en ?? null)
      : (row.video_url_en ?? row.video_url_ar ?? null)

    return NextResponse.json({ url })

  } catch (err) {
    console.error('Video URL route error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
