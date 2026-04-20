'use client'

import type { Certificate } from '@/lib/certificates/types'

interface CertModalProps {
  cert: Certificate
  onClose: () => void
  locale?: 'en' | 'ar'
}

export function CertModal({ cert, onClose, locale = 'en' }: CertModalProps) {
  const t =
    locale === 'ar'
      ? {
          title: 'لقد حصلت على شهادة!',
          download: 'تحميل PDF',
          share: 'اطلب من والديك المشاركة',
          cont: 'استمر',
        }
      : {
          title: 'You earned a certificate!',
          download: 'Download PDF',
          share: 'Ask parent to share',
          cont: 'Continue',
        }

  const handleDownload = async () => {
    const res = await fetch(`/api/certificates/download/${cert.id}`)
    const { url } = await res.json()
    if (url) window.open(url, '_blank')
  }

  const handleShare = () => {
    const text =
      locale === 'ar'
        ? `حصل على شهادة KidPreneur! تحقق: kidpreneur.i-gamify.net/verify/${cert.verification_code}`
        : `Just earned a KidPreneur certificate! Verify at: kidpreneur.i-gamify.net/verify/${cert.verification_code}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FFF8E7] rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
        <div className="text-5xl mb-3">🏆</div>
        <h2 className="text-xl font-bold text-amber-900 mb-1">{t.title}</h2>
        <p className="text-amber-700 mb-4 font-medium">{cert.reference_name}</p>

        {cert.cert_png_url && (
          <img
            src={cert.cert_png_url}
            alt="Certificate"
            className="w-full rounded-xl mb-4 shadow"
          />
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="bg-amber-700 text-white py-3 rounded-2xl font-bold hover:bg-amber-600 transition"
          >
            {t.download}
          </button>
          <button
            onClick={handleShare}
            className="bg-yellow-400 text-amber-900 py-3 rounded-2xl font-bold hover:bg-yellow-300 transition"
          >
            {t.share}
          </button>
          <button onClick={onClose} className="text-amber-700 py-2 text-sm underline">
            {t.cont}
          </button>
        </div>
      </div>
    </div>
  )
}
