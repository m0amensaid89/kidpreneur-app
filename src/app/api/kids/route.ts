import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('kid_profiles')
    .select('*')
    .eq('parent_user_id', userId)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ kids: data ?? [] })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, age_range, avatar_index, color } = await req.json()
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

  // Check 6-kid limit
  const { count } = await supabase
    .from('kid_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('parent_user_id', userId)

  if ((count ?? 0) >= 6) {
    return NextResponse.json({ error: 'Maximum 6 kid profiles reached' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('kid_profiles')
    .insert({
      parent_user_id: userId,
      name,
      age_range: age_range ?? '8-11',
      avatar_index: avatar_index ?? 0,
      color: color ?? '#FF6340',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ kid: data })
}
