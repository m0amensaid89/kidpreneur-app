import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const scope = searchParams.get('scope') ?? 'all-time'
    const ageGroup = searchParams.get('age_group') ?? '8-11'
    const currentUserId = searchParams.get('user_id') ?? ''
    const orderCol = scope === 'weekly' ? 'weekly_xp' : 'total_xp'

    const { data: entries } = await supabase
      .from('leaderboard_entries')
      .select('user_id, display_name, avatar_emoji, total_xp, weekly_xp, age_group')
      .eq('opt_in', true)
      .eq('age_group', ageGroup)
      .order(orderCol, { ascending: false })
      .limit(50)

    const ranked = (entries ?? []).map((e, i) => ({
      rank: i + 1,
      ...e,
      is_current_user: e.user_id === currentUserId,
    }))

    const currentUserEntry = ranked.find(e => e.user_id === currentUserId) ?? null
    const currentUserRank = currentUserEntry?.rank ?? null

    return NextResponse.json({
      scope,
      age_group: ageGroup,
      entries: ranked,
      current_user_rank: currentUserRank,
      current_user_entry: currentUserEntry,
      updated_at: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Leaderboard fetch error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
