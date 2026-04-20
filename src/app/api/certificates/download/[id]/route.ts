import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { data: cert } = await supabase
    .from('certificates')
    .select('cert_pdf_url')
    .eq('id', id)
    .single()

  if (!cert?.cert_pdf_url) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { data } = await supabase.storage
    .from('certificates-pdf')
    .createSignedUrl(cert.cert_pdf_url, 3600)

  return NextResponse.json({ url: data?.signedUrl })
}
