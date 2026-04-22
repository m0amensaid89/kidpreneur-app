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

    // 2. Look up video path for this lesson + locale
    const { data: row, error: dbError } = await supabase
      .from('lesson_videos')
      .select('video_path_en, video_path_ar')
      .eq('lesson_id', lessonId)
      .single()

    if (dbError || !row) {
      // No video uploaded yet — return null gracefully (player will show placeholder)
      return NextResponse.json({ url: null })
    }

    const path = locale === 'ar' ? (row.video_path_ar ?? row.video_path_en) : (row.video_path_en ?? row.video_path_ar)
    if (!path) {
      return NextResponse.json({ url: null })
    }

    // 3. Generate signed URL — valid 1 hour (3600 seconds)
    // Signed URL is tied to this request and expires — cannot be shared
    const { data: signed, error: signError } = await supabase.storage
      .from('lesson-videos')
      .createSignedUrl(path, 3600)

    if (signError || !signed?.signedUrl) {
      console.error('Signed URL error:', signError)
      return NextResponse.json({ error: 'Failed to generate video URL' }, { status: 500 })
    }

    return NextResponse.json({ url: signed.signedUrl })
  } catch (err) {
    console.error('Video URL route error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
