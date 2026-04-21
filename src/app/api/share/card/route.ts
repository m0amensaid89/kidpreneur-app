import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const kidName = searchParams.get('name') ?? 'Young KidPreneur'
  const achievement = searchParams.get('achievement') ?? 'Completed a Mission'
  const xp = searchParams.get('xp') ?? '50'
  const worldColor = searchParams.get('color') ?? '#FF6340'
  const emoji = searchParams.get('emoji') ?? '🎨'
  const locale = searchParams.get('locale') ?? 'en'
  const format = searchParams.get('format') ?? 'square'

  const w = 1080
  const h = format === 'story' ? 1920 : 1080

  const label = locale === 'ar'
    ? { earned: 'حقق إنجازاً رائعاً', xpLabel: 'نقطة', cta: 'kidpreneur.i-gamify.net' }
    : { earned: 'just unlocked', xpLabel: 'XP', cta: 'kidpreneur.i-gamify.net' }

  const response = new ImageResponse(
    (
      <div style={{ width: w, height: h, background: '#FFF8E7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, fontFamily: 'sans-serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: `${worldColor}20` }} />
        <div style={{ background: worldColor, borderRadius: 20, padding: '10px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>🦆</span>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 20 }}>KidPreneur</span>
        </div>
        <div style={{ fontSize: 100, marginBottom: 24 }}>{emoji}</div>
        <div style={{ fontSize: 56, fontWeight: 900, color: '#92400E', textAlign: 'center', marginBottom: 12 }}>{kidName}</div>
        <div style={{ fontSize: 24, color: '#B45309', textAlign: 'center', marginBottom: 20, opacity: 0.8 }}>{label.earned}</div>
        <div style={{ fontSize: 40, fontWeight: 900, color: worldColor, textAlign: 'center', marginBottom: 32, maxWidth: 800 }}>{achievement}</div>
        <div style={{ background: '#FDE68A', borderRadius: 50, padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#92400E' }}>+{xp} {label.xpLabel}</span>
        </div>
        <div style={{ fontSize: 20, color: '#D97706', fontWeight: 700 }}>{label.cta}</div>
      </div>
    ),
    { width: w, height: h }
  )
  return response
}
