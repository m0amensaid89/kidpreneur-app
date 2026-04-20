import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  const { data: cert } = await supabase
    .from('certificates')
    .select('*')
    .eq('verification_code', code.toUpperCase())
    .maybeSingle()

  if (!cert) return notFound()

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', cert.user_id)
    .single()

  const kidName = profile?.username ?? 'A Young KidPreneur'
  const issueDate = new Date(cert.issued_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <span className="text-2xl font-bold text-yellow-400">KidPreneur</span>
        <p className="text-gray-400 text-sm mt-1">Certificate Verification</p>
      </div>

      {cert.cert_png_url && (
        <div className="mb-6 rounded-xl overflow-hidden shadow-2xl max-w-lg w-full">
          <Image
            src={cert.cert_png_url}
            alt="KidPreneur Certificate"
            width={1200}
            height={630}
            className="w-full"
          />
        </div>
      )}

      <div className="bg-[#111] border border-yellow-400/30 rounded-xl p-6 max-w-lg w-full text-center">
        <div className="text-green-400 text-lg mb-2">Authentic Certificate</div>
        <div className="text-white text-xl font-bold mb-1">{kidName}</div>
        <div className="text-gray-300 mb-1">{cert.reference_name}</div>
        <div className="text-gray-500 text-sm mb-4">{issueDate}</div>
        <div className="text-yellow-400 font-mono text-sm mb-4">
          {cert.verification_code}
        </div>
        <p className="text-gray-400 text-xs">
          This is a verified certificate issued by KidPreneur.
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm mb-3">
          Want your child to earn certificates like this?
        </p>
        <a
          href="https://kidpreneur.i-gamify.net"
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-yellow-300 transition"
        >
          Start Learning Free
        </a>
      </div>
    </main>
  )
}
