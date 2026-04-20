import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import type { CertGeneratePayload } from './types'
import { safeName, formatCertDate } from './cert-utils'

Font.register({
  family: 'Cinzel',
  src: 'https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gt79mT7.woff2',
})
Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/cairo/v28/SLXGc1nY6HkvalIhTp4mnQ.woff2',
})

const CERT_CONFIG = {
  lesson:  { bg: '#FFF8E7', border: '#CD7F32', text: '#2D1B00', size: 'A5' as const },
  world:   { bg: '#0A0A0A', border: '#C0C0C0', text: '#FFFFFF', size: 'A4' as const },
  founder: { bg: '#0A0A0A', border: '#D4AF37', text: '#D4AF37', size: 'A4' as const },
  empire:  { bg: '#0F3460', border: '#22d3ee', text: '#FFFFFF', size: 'A5' as const },
}

const CERT_LABELS: Record<string, { en: string; ar: string }> = {
  lesson:  { en: 'Certificate of Completion',     ar: 'شهادة إتمام' },
  world:   { en: 'Certificate of World Mastery',  ar: 'شهادة إتقان العالم' },
  founder: { en: 'KidPreneur Founder Certificate',ar: 'شهادة مؤسس كيدبرينور' },
  empire:  { en: 'Empire Builder Certificate',    ar: 'شهادة بناء الامبراطورية' },
}

const COMPLETED_TEXT: Record<string, { en: string; ar: string }> = {
  lesson:  { en: 'has completed all missions in',                              ar: 'أتم جميع مهام' },
  world:   { en: 'has mastered all skills in',                                 ar: 'أتقن جميع مهارات' },
  founder: { en: 'has completed the entire KidPreneur journey across all 5 worlds', ar: 'أكمل رحلة كيدبرينور الكاملة عبر جميع العوالم الخمسة' },
  empire:  { en: 'has completed the Empire Builder challenge in',              ar: 'أكمل تحدي بناء الامبراطورية في' },
}

export function generateCertPDF(
  payload: CertGeneratePayload,
  verificationCode: string
): React.ReactElement {
  const cfg = CERT_CONFIG[payload.cert_type]
  const isAR = payload.locale === 'ar'
  const font = isAR ? 'Cairo' : 'Cinzel'
  const kidName = safeName(payload.kid_name)
  const certDate = formatCertDate(new Date(), payload.locale ?? 'en')
  const label = CERT_LABELS[payload.cert_type]?.[payload.locale ?? 'en'] ?? ''
  const completedText = COMPLETED_TEXT[payload.cert_type]?.[payload.locale ?? 'en'] ?? ''
  const certifies = isAR ? 'نشهد بأن' : 'This certifies that'
  const quacky = isAR ? 'كواكي، صاحبك في رحلة الذكاء الاصطناعي' : 'Quacky, Your AI Learning Companion'

  const styles = StyleSheet.create({
    page: { backgroundColor: cfg.bg, padding: 48, flexDirection: 'column', alignItems: 'center', position: 'relative' },
    outerBorder: { position: 'absolute', top: 14, left: 14, right: 14, bottom: 14, borderWidth: 3, borderColor: cfg.border, borderStyle: 'solid' },
    innerBorder: { position: 'absolute', top: 22, left: 22, right: 22, bottom: 22, borderWidth: 1, borderColor: cfg.border, borderStyle: 'solid', opacity: 0.5 },
    header: { flexDirection: isAR ? 'row-reverse' : 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16, marginTop: 16 },
    logoText: { fontSize: 14, fontFamily: font, color: cfg.text },
    coBrandSlot: { width: 60, height: 20 },
    label: { fontSize: 10, fontFamily: font, color: cfg.border, letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 },
    certifies: { fontSize: 12, fontFamily: font, color: cfg.text, textAlign: isAR ? 'right' : 'center', opacity: 0.65, marginBottom: 8 },
    kidName: { fontSize: payload.cert_type === 'founder' ? 36 : 28, fontFamily: font, color: payload.cert_type === 'founder' ? '#D4AF37' : cfg.text, textAlign: 'center', marginBottom: 10, letterSpacing: 3 },
    completed: { fontSize: 11, fontFamily: font, color: cfg.text, textAlign: 'center', opacity: 0.65, marginBottom: 8 },
    achievement: { fontSize: 18, fontFamily: font, color: cfg.border, textAlign: 'center', marginBottom: 24 },
    footer: { flexDirection: isAR ? 'row-reverse' : 'row', justifyContent: 'space-between', width: '100%', marginTop: 'auto' },
    date: { fontSize: 9, color: cfg.text, opacity: 0.55 },
    code: { fontSize: 10, color: cfg.border, letterSpacing: 1 },
    url: { fontSize: 8, color: cfg.text, opacity: 0.45 },
    signature: { fontSize: 9, fontFamily: font, color: cfg.text, opacity: 0.6, textAlign: 'right' },
  })

  return (
    <Document>
      <Page size={cfg.size} orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder} />
        <View style={styles.innerBorder} />
        <View style={styles.header}>
          <Text style={styles.logoText}>KidPreneur</Text>
          <View style={styles.coBrandSlot} />
        </View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.certifies}>{certifies}</Text>
        <Text style={styles.kidName}>{kidName}</Text>
        <Text style={styles.completed}>{completedText}</Text>
        <Text style={styles.achievement}>{payload.reference_name}</Text>
        <View style={styles.footer}>
          <View>
            <Text style={styles.date}>{certDate}</Text>
            <Text style={styles.code}>{verificationCode}</Text>
            <Text style={styles.url}>kidpreneur.i-gamify.net/verify/{verificationCode}</Text>
          </View>
          <Text style={styles.signature}>{quacky}</Text>
        </View>
      </Page>
    </Document>
  )
}
