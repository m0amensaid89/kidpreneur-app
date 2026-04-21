import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') ?? 'Kid'
  const xp = searchParams.get('xp') ?? '0'
  const achievement = searchParams.get('achievement') ?? ''
  const world = searchParams.get('world') ?? ''
  const locale = searchParams.get('locale') ?? 'en'

  // Return share metadata (used by ShareCardModal)
  return NextResponse.json({
    name,
    xp: parseInt(xp),
    achievement,
    world,
    locale,
    shareUrl: `https://kidpreneur.i-gamify.net`,
    whatsappText: locale === 'ar'
      ? `🦆 ${name} كسب ${xp} نقطة في KidPreneur!\n${achievement}\nانضم على kidpreneur.i-gamify.net`
      : `🦆 ${name} just earned ${xp} XP on KidPreneur!\n${achievement}\nJoin at kidpreneur.i-gamify.net`,
  })
}
