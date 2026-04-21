import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Send Web Push notification using VAPID
async function sendPush(subscription: any, payload: object) {
  // We use the web-push compatible format via fetch to a push service
  // For production, integrate web-push npm package via Edge Function or Supabase function
  // This route stores the notification queue — actual delivery via Supabase Edge Function
  const { error } = await supabase
    .from('push_notifications_queue')
    .insert({
      endpoint: subscription.endpoint,
      p256dh: subscription.p256dh,
      auth: subscription.auth,
      payload: JSON.stringify(payload),
      created_at: new Date().toISOString(),
    })
  return !error
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, title, body, icon, url } = await req.json()
    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

    // Get subscription for this user
    const { data: sub } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (!sub) return NextResponse.json({ error: 'No subscription found' }, { status: 404 })

    const payload = {
      title: title ?? 'KidPreneur Update',
      body: body ?? 'Your kid achieved something great!',
      icon: icon ?? '/icon-192x192.png',
      badge: '/icon-192x192.png',
      url: url ?? '/',
      timestamp: Date.now(),
    }

    await sendPush(sub, payload)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Push notify error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
