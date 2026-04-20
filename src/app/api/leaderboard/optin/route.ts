import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PATCH(req: NextRequest) {
  try {
    const { user_id, opt_in } = await req.json()
    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })
    await supabase
      .from('leaderboard_entries')
      .upsert({ user_id, opt_in, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
