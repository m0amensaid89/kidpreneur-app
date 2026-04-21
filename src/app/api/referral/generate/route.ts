import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateReferralCode } from '@/lib/referral/referral-utils'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json()
    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })
    const code = generateReferralCode(user_id)
    const { data, error } = await supabase
      .from('referrals')
      .upsert({ referrer_user_id: user_id, referral_code: code }, { onConflict: 'referrer_user_id' })
      .select('referral_code').single()
    if (error) throw error
    return NextResponse.json({ code: data?.referral_code ?? code })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
