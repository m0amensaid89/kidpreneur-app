import { ImageResponse } from 'next/og'
import type { CertGeneratePayload } from './types'
import { safeName, formatCertDate } from './cert-utils'

export async function generateCertPNG(
  payload: CertGeneratePayload,
  verificationCode: string
): Promise<Buffer> {
  const isAR = payload.locale === 'ar'
  const kidName = safeName(payload.kid_name)
  const certDate = formatCertDate(new Date(), payload.locale ?? 'en')

  const C = {
    lesson:  { bg: '#FFF8E7', border: '#CD7F32', text: '#2D1B00', accent: '#CD7F32' },
    world:   { bg: '#0A0A0A', border: '#C0C0C0', text: '#FFFFFF', accent: '#C0C0C0' },
    founder: { bg: '#0A0A0A', border: '#D4AF37', text: '#D4AF37', accent: '#D4AF37' },
    empire:  { bg: '#0F3460', border: '#22d3ee', text: '#FFFFFF', accent: '#22d3ee' },
  }[payload.cert_type]

  const LABELS: Record<string, { en: string; ar: string }> = {
    lesson:  { en: 'Certificate of Completion', ar: 'شهادة إتمام' },
    world:   { en: 'World Mastery Certificate',  ar: 'شهادة إتقان العالم' },
    founder: { en: 'KidPreneur Founder',         ar: 'مؤسس كيدبرينور' },
    empire:  { en: 'Empire Builder',             ar: 'بناء الامبراطورية' },
  }
  const label = LABELS[payload.cert_type]?.[payload.locale ?? 'en'] ?? ''

  const response = new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: C.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `8px solid ${C.border}`,
          padding: 60,
          position: 'relative',
          direction: isAR ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ position: 'absolute', inset: 16, border: `2px solid ${C.border}`, opacity: 0.4 }} />
        <div style={{ fontSize: 20, color: C.border, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 12 }}>
          {label}
        </div>
        <div style={{ fontSize: 18, color: C.text, opacity: 0.55, marginBottom: 8 }}>
          {isAR ? 'نشهد بأن' : 'This certifies that'}
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, color: C.text, letterSpacing: 4, marginBottom: 12, textAlign: 'center' }}>
          {kidName}
        </div>
        <div style={{ fontSize: 22, color: C.accent, marginBottom: 6 }}>
          {isAR ? 'قد أتم بنجاح' : 'has successfully completed'}
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.text, textAlign: 'center', marginBottom: 40 }}>
          {payload.reference_name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 14, color: C.text, opacity: 0.5 }}>{certDate}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.border }}>KidPreneur</div>
          <div style={{ fontSize: 14, color: C.border, letterSpacing: 2 }}>{verificationCode}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )

  const ab = await response.arrayBuffer()
  return Buffer.from(ab)
}
