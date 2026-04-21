import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { subscription, user_id, kid_name } = await req.json()
    if (!subscription || !user_id) {
      return NextResponse.json({ error: 'Missing subscription or user_id' }, { status: 400 })
    }
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id,
        kid_name: kid_name ?? 'Your Kid',
        endpoint: subscription.endpoint,
        p256dh: subscription.keys?.p256dh,
        auth: subscription.keys?.auth,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Push subscribe error:', err)
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 })
  }
}
