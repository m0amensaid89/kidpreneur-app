import { NextRequest, NextResponse } from 'next/server'
import { syncLeaderboardEntry } from '@/lib/leaderboard/leaderboard-utils'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json()
    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })
    await syncLeaderboardEntry(user_id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Leaderboard sync error:', err)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
