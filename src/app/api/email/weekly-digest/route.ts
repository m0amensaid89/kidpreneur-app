import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function buildEmailHtml(data: {
  kidName: string
  parentName: string
  xpThisWeek: number
  totalXp: number
  level: number
  missionsCompleted: number
  badgesEarned: string[]
  worldProgress: { world: string; pct: number }[]
  locale: string
}) {
  const { kidName, parentName, xpThisWeek, totalXp, level, missionsCompleted, badgesEarned, locale } = data
  const isAr = locale === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'
  const font = isAr ? 'Cairo, Arial, sans-serif' : 'Roboto, Arial, sans-serif'

  const t = isAr
    ? {
        subject: `تقرير ${kidName} الأسبوعي`,
        greeting: `مرحباً ${parentName}`,
        intro: `هذا تقرير ${kidName} الأسبوعي على KidPreneur`,
        xpWeek: 'نقاط هذا الأسبوع',
        xpTotal: 'إجمالي النقاط',
        level: 'المستوى',
        missions: 'مهام مكتملة',
        badges: 'شارات جديدة',
        cta: 'شاهد التقرير الكامل',
        footer: 'KidPreneur — حيث الأطفال يبنون مستقبلهم',
      }
    : {
        subject: `${kidName}'s Weekly KidPreneur Report`,
        greeting: `Hi ${parentName}`,
        intro: `Here is ${kidName}'s weekly progress on KidPreneur`,
        xpWeek: 'XP This Week',
        xpTotal: 'Total XP',
        level: 'Level',
        missions: 'Missions Done',
        badges: 'New Badges',
        cta: 'View Full Dashboard',
        footer: 'KidPreneur — Where Kids Build Their Future',
      }

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${isAr ? 'ar' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${t.subject}</title></head>
<body style="margin:0;padding:0;background:#FFF8E7;font-family:${font}">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px">
    <div style="text-align:center;margin-bottom:24px">
      <img src="https://kidpreneur.i-gamify.net/quacky-avatar.png" alt="Quacky" width="80" height="80" style="border-radius:50%">
      <h1 style="color:#92400E;font-size:22px;margin:8px 0 4px">KidPreneur</h1>
    </div>
    <div style="background:white;border-radius:20px;padding:24px;margin-bottom:16px;border:2px solid #FDE68A">
      <p style="color:#92400E;font-size:18px;font-weight:900;margin:0 0 4px">${t.greeting} 👋</p>
      <p style="color:#B45309;font-size:14px;margin:0 0 20px">${t.intro}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        ${[
          { v: '+' + xpThisWeek, l: t.xpWeek, c: '#FF6340' },
          { v: totalXp, l: t.xpTotal, c: '#7B52EE' },
          { v: level, l: t.level, c: '#00A878' },
          { v: missionsCompleted, l: t.missions, c: '#2E8CE6' },
        ].map(s => `
        <div style="background:#FFF8E7;border-radius:12px;padding:12px;text-align:center">
          <div style="font-size:28px;font-weight:900;color:${s.c}">${s.v}</div>
          <div style="font-size:11px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:1px">${s.l}</div>
        </div>`).join('')}
      </div>
      ${badgesEarned.length > 0 ? `
      <div style="background:#FEF3C7;border-radius:12px;padding:12px;margin-bottom:16px">
        <div style="font-size:12px;font-weight:900;color:#92400E;margin-bottom:6px">${t.badges}</div>
        <div style="font-size:20px">${badgesEarned.join(' ')}</div>
      </div>` : ''}
      <a href="https://kidpreneur.i-gamify.net/profile"
        style="display:block;background:#D97706;color:white;text-align:center;padding:14px;border-radius:14px;font-weight:900;text-decoration:none;font-size:14px">
        ${t.cta} →
      </a>
    </div>
    <p style="text-align:center;color:#9CA3AF;font-size:12px">${t.footer}</p>
  </div>
</body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, parent_email, parent_name, kid_name, locale } = await req.json()
    if (!user_id || !parent_email) {
      return NextResponse.json({ error: 'user_id and parent_email required' }, { status: 400 })
    }

    // Get this week's stats from Supabase
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const [profileRes, missionsRes] = await Promise.all([
      supabase.from('user_profiles').select('total_xp, level').eq('id', user_id).single(),
      supabase.from('user_progress').select('xp_earned, created_at').eq('user_id', user_id).gte('created_at', oneWeekAgo),
    ])

    const totalXp = profileRes.data?.total_xp ?? 0
    const level = profileRes.data?.level ?? 1
    const xpThisWeek = missionsRes.data?.reduce((sum, m) => sum + (m.xp_earned ?? 0), 0) ?? 0
    const missionsCompleted = missionsRes.data?.length ?? 0

    const html = buildEmailHtml({
      kidName: kid_name ?? 'Your Kid',
      parentName: parent_name ?? 'Parent',
      xpThisWeek,
      totalXp,
      level,
      missionsCompleted,
      badgesEarned: [],
      worldProgress: [],
      locale: locale ?? 'en',
    })

    // Send via Resend (or any email service) — store in queue for now
    await supabase.from('email_queue').insert({
      to_email: parent_email,
      subject: locale === 'ar' ? `تقرير ${kid_name} الأسبوعي` : `${kid_name}'s Weekly KidPreneur Report`,
      html_body: html,
      user_id,
      created_at: new Date().toISOString(),
      status: 'queued',
    })

    return NextResponse.json({ success: true, queued: true })
  } catch (err) {
    console.error('Weekly digest error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
