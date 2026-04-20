import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export function generateVerificationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const p1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  const p2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `KP-${p1}-${p2}`
}

export function safeName(name: string): string {
  if (!name?.trim()) return 'Young KidPreneur'
  return name.trim().length > 30 ? name.trim().slice(0, 27) + '...' : name.trim()
}

export function formatCertDate(date: Date, locale: 'en' | 'ar'): string {
  return date.toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

export async function uploadCertFile(
  buffer: Buffer,
  bucket: string,
  path: string,
  contentType: string
): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, { contentType, upsert: true })
  if (error) throw error
  if (bucket === 'certificates-png') {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }
  return path
}

export async function awardCertXP(
  userId: string,
  certType: string,
  referenceId?: string
) {
  const xpMap: Record<string, number> = {
    lesson: 50,
    world: 200,
    founder: 500,
    empire: 100,
  }
  const xp = xpMap[certType] ?? 50
  const source = referenceId
    ? `cert_${certType}_${referenceId}`
    : `cert_${certType}`
  await supabase.from('xp_log').insert({ user_id: userId, xp_amount: xp, source })
  await supabase.rpc('increment_xp', { user_id_input: userId, xp_input: xp })
}
