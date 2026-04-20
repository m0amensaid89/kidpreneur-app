export type CertType = 'lesson' | 'world' | 'founder' | 'empire'

export interface Certificate {
  id: string
  user_id: string
  cert_type: CertType
  reference_id: string | null
  reference_name: string
  verification_code: string
  cert_pdf_url: string | null
  cert_png_url: string | null
  locale: 'en' | 'ar'
  shared_count: number
  issued_at: string
}

export interface CertGeneratePayload {
  user_id: string
  kid_name: string
  cert_type: CertType
  reference_id?: string
  reference_name: string
  locale?: 'en' | 'ar'
}

