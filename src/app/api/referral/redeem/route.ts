import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { code, new_user_id } = await req.json()
    if (!code || !new_user_id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })
    const { data: ref } = await supabase
      .from('referrals')
      .select('referrer_user_id, times_used')
      .eq('referral_code', code.toUpperCase())
      .single()
    if (!ref) return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
    if (ref.referrer_user_id === new_user_id) return NextResponse.json({ error: 'Cannot self-refer' }, { status: 400 })
    await supabase.from('referrals').update({
      times_used: (ref.times_used ?? 0) + 1,
      last_used_at: new Date().toISOString(),
    }).eq('referral_code', code.toUpperCase())
    return NextResponse.json({ success: true, referrer_id: ref.referrer_user_id, credit_months: 1 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
