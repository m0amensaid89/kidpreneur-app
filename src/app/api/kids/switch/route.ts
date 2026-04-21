import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { kid_id } = await req.json()
  if (!kid_id) return NextResponse.json({ error: 'kid_id required' }, { status: 400 })

  // Verify kid belongs to parent
  const { data: kid } = await supabase
    .from('kid_profiles')
    .select('id, name')
    .eq('id', kid_id)
    .eq('parent_user_id', userId)
    .single()

  if (!kid) return NextResponse.json({ error: 'Kid not found' }, { status: 404 })

  // Upsert active session
  await supabase.from('active_kid_session').upsert({
    parent_user_id: userId,
    active_kid_id: kid_id,
    switched_at: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, active_kid: kid })
}
