export function generateReferralCode(userId: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seed = userId.slice(-8)
  let code = 'KP-'
  for (let i = 0; i < 6; i++) {
    const charCode = seed.charCodeAt(i % seed.length)
    code += chars[charCode % chars.length]
  }
  return code
}

export function getReferralUrl(code: string, baseUrl?: string): string {
  const base = baseUrl ?? 'https://kidpreneur.i-gamify.net'
  return `${base}/join?ref=${code}`
}

export function getWhatsAppReferralMessage(kidName: string, code: string, locale: string): string {
  const url = getReferralUrl(code)
  if (locale === 'ar') {
    return `ابني/بنتي ${kidName} بيتعلم ريادة الأعمال والذكاء الاصطناعي على KidPreneur! 🦆

انضم معانا وهاتوا شهر مجاني لكم ولنا:
${url}`
  }
  return `${kidName} is learning AI entrepreneurship on KidPreneur! 🦆

Join us — we both get 1 month free:
${url}`
}
