import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { user_id, lesson_id, world_id, locale, action, session_id, message_count } = await req.json()

    if (action === 'start') {
      const { data } = await supabase
        .from('voice_sessions')
        .insert({ user_id, lesson_id, world_id, locale, message_count: 0 })
        .select('id')
        .single()
      return NextResponse.json({ session_id: data?.id })
    }

    if (action === 'end' && session_id) {
      await supabase
        .from('voice_sessions')
        .update({
          session_end: new Date().toISOString(),
          message_count: message_count ?? 0,
        })
        .eq('id', session_id)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
