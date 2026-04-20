import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { renderToBuffer } from '@react-pdf/renderer'
import { generateCertPDF } from '@/lib/certificates/generate-pdf'
import { generateCertPNG } from '@/lib/certificates/generate-png'
import { generateVerificationCode, uploadCertFile, awardCertXP } from '@/lib/certificates/cert-utils'
import type { CertGeneratePayload } from '@/lib/certificates/types'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const payload: CertGeneratePayload = await req.json()
    const locale = payload.locale ?? 'en'

    const { data: existing } = await supabase
      .from('certificates')
      .select('id, cert_png_url, cert_pdf_url, verification_code')
      .eq('user_id', payload.user_id)
      .eq('cert_type', payload.cert_type)
      .eq('reference_id', payload.reference_id ?? '')
      .eq('locale', locale)
      .maybeSingle()

    if (existing) return NextResponse.json({ success: true, certificate: existing })

    const verificationCode = generateVerificationCode()

    const pdfElement = generateCertPDF({ ...payload, locale }, verificationCode)
    const pdfBuffer = await renderToBuffer(pdfElement as any)
    const pdfPath = `${payload.user_id}/${payload.cert_type}_${payload.reference_id ?? 'main'}_${locale}.pdf`
    await uploadCertFile(Buffer.from(pdfBuffer), 'certificates-pdf', pdfPath, 'application/pdf')

    const pngBuffer = await generateCertPNG({ ...payload, locale }, verificationCode)
    const pngPath = `${payload.user_id}/${payload.cert_type}_${payload.reference_id ?? 'main'}_${locale}.png`
    const pngUrl = await uploadCertFile(pngBuffer, 'certificates-png', pngPath, 'image/png')

    const { data: cert, error } = await supabase
      .from('certificates')
      .insert({
        user_id: payload.user_id,
        cert_type: payload.cert_type,
        reference_id: payload.reference_id ?? null,
        reference_name: payload.reference_name,
        verification_code: verificationCode,
        cert_pdf_url: pdfPath,
        cert_png_url: pngUrl,
        locale,
      })
      .select()
      .single()

    if (error) throw error

    await awardCertXP(payload.user_id, payload.cert_type, payload.reference_id)

    return NextResponse.json({ success: true, certificate: cert })
  } catch (err) {
    console.error('Certificate generation error:', err)
    return NextResponse.json({ success: false, error: 'Generation failed' }, { status: 500 })
  }
}
