'use client'
import { useState, useEffect } from 'react'
import { useLocale } from '@/components/LocaleProvider'
import { useTranslations } from '@/lib/i18n/useTranslations'
import type { Lesson } from '@/lib/data/lessons'

interface LessonReadingSectionProps {
  lesson: Lesson
  worldColor: string
  onReadingComplete?: () => void
}

interface FlipCardProps {
  front: { icon: string; title: string; subtitle: string }
  back: { description: string; example: string }
  accent: string
  index: number
  isFlipped: boolean
  onFlip: () => void
  isRTL: boolean
}

function FlipCard({ front, back, accent, index, isFlipped, onFlip, isRTL }: FlipCardProps) {
  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ height: 160, perspective: 1000 }}
      onClick={onFlip}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 16,
            border: `2px solid ${accent}30`,
            background: isFlipped ? '#fff' : `linear-gradient(135deg, ${accent}15, ${accent}05)`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: 16, gap: 8,
            fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit',
          }}
        >
          <div style={{ fontSize: 32 }}>{front.icon}</div>
          <div style={{ fontWeight: 900, fontSize: 15, color: accent, textAlign: 'center', lineHeight: 1.3 }}>
            {front.title}
          </div>
          <div style={{ fontSize: 11, color: '#888', textAlign: 'center' }}>
            {front.subtitle}
          </div>
          {!isFlipped && (
            <div style={{
              position: 'absolute', bottom: 8, right: isRTL ? 'auto' : 8, left: isRTL ? 8 : 'auto',
              fontSize: 10, color: accent, fontWeight: 700, opacity: 0.7,
            }}>
              {isRTL ? 'اضغط للقلب ↩' : 'Tap to flip ↩'}
            </div>
          )}
        </div>

        {/* BACK */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 16,
            border: `2px solid ${accent}60`,
            background: '#fff',
            padding: 14, overflow: 'hidden',
            fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit',
          }}
        >
          <div style={{
            position: 'absolute', top: 8, right: isRTL ? 'auto' : 10, left: isRTL ? 10 : 'auto',
            width: 8, height: 8, borderRadius: '50%', background: accent,
          }} />
          <div style={{ fontWeight: 800, fontSize: 13, color: accent, marginBottom: 6, paddingRight: isRTL ? 0 : 16, paddingLeft: isRTL ? 16 : 0, direction: isRTL ? 'rtl' : 'ltr' }}>
            {front.title}
          </div>
          <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5, marginBottom: 6, direction: isRTL ? 'rtl' : 'ltr' }}>
            {back.description}
          </div>
          {back.example && (
            <div style={{
              fontSize: 11, color: '#666', background: `${accent}10`,
              borderRadius: 8, padding: '4px 8px',
              borderLeft: isRTL ? 'none' : `3px solid ${accent}`,
              borderRight: isRTL ? `3px solid ${accent}` : 'none',
              direction: isRTL ? 'rtl' : 'ltr',
            }}>
              💡 {back.example}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FEATURE_ICONS = ['✨', '🎨', '⚡', '🔮', '🎯', '🚀', '💎', '🌟']

export function LessonReadingSection({ lesson, worldColor, onReadingComplete }: LessonReadingSectionProps) {
  const { locale, isRTL } = useLocale()
  const isAr = locale === 'ar'
  const t = useTranslations('lesson')

  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [revealedPoints, setRevealedPoints] = useState(0)
  const [empireUnlocked, setEmpireUnlocked] = useState(false)
  const [readingDone, setReadingDone] = useState(false)
  const [xpPulse, setXpPulse] = useState(false)

  const features = lesson.features || []
  const learningPoints = lesson.learningPoints || []
  const totalCards = features.length

  const allFlipped = flippedCards.size >= totalCards
  const allPointsRevealed = revealedPoints >= learningPoints.length

  // Auto-unlock empire tip when all cards flipped
  useEffect(() => {
    if (allFlipped && allPointsRevealed) {
      setTimeout(() => setEmpireUnlocked(true), 400)
    }
  }, [allFlipped, allPointsRevealed])

  const handleFlip = (idx: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
    setXpPulse(true)
    setTimeout(() => setXpPulse(false), 600)
  }

  const handleRevealPoint = () => {
    if (revealedPoints < learningPoints.length) {
      setRevealedPoints(p => p + 1)
    }
  }

  const handleReady = () => {
    setReadingDone(true)
    onReadingComplete?.()
  }

  const t = isAr
    ? {
        intro: 'ما هي هذه الأداة؟',
        features: 'المميزات الأساسية',
        flipHint: t('flipHint'),
        cardsLeft: (n: number) => `${n} كروت متبقية`,
        allFlipped: t('allFlipped'),
        learn: t('readingSection'),
        tapReveal: t('tapReveal'),
        empireTip: 'نصيحة المستثمر 💰',
        locked: t('empireLocked'),
        ready: t('readingReady'),
        skip: t('skipReading'),
        progress: (done: number, total: number) => `${done} / ${total} مكتمل`,
      }
    : {
        intro: t('whatIsTool'),
        features: t('flipCards'),
        flipHint: t('flipHint'),
        cardsLeft: (n: number) => `${n} card${n !== 1 ? 's' : ''} left`,
        allFlipped: t('allFlipped'),
        learn: t('readingSection'),
        tapReveal: t('tapReveal'),
        empireTip: t('empireTipTitle'),
        locked: t('empireLocked'),
        ready: t('readingReady'),
        skip: t('skipReading'),
        progress: (done: number, total: number) => `${done} / ${total} complete`,
      }

  const cardsRemaining = totalCards - flippedCards.size

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        fontFamily: isAr ? 'Cairo, sans-serif' : 'inherit',
        padding: '0 0 16px 0',
      }}
    >
      {/* ── HERO LINE ── */}
      <div style={{
        background: `linear-gradient(135deg, ${worldColor}20, ${worldColor}08)`,
        border: `2px solid ${worldColor}30`,
        borderRadius: 20, padding: '16px 20px', marginBottom: 16,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: worldColor, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
          {t.intro}
        </div>
        <div style={{ fontSize: 16, fontWeight: 900, color: '#2C2C2A', lineHeight: 1.4 }}>
          {lesson.heroLine}
        </div>
        {lesson.warmUpChallenge && (
          <div style={{ fontSize: 12, color: '#666', marginTop: 8, lineHeight: 1.5 }}>
            {lesson.warmUpChallenge.length > 100 ? lesson.warmUpChallenge.slice(0, 100) + '...' : lesson.warmUpChallenge}
          </div>
        )}
      </div>

      {/* ── FLIP CARDS SECTION ── */}
      {features.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#2C2C2A' }}>
              {t.features}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: allFlipped ? '#00A878' : worldColor,
              background: allFlipped ? '#00A87815' : `${worldColor}15`,
              padding: '3px 10px', borderRadius: 20,
              transition: 'all 0.3s',
            }}>
              {allFlipped ? t.allFlipped : t.cardsLeft(cardsRemaining)}
            </div>
          </div>

          <div style={{ fontSize: 11, color: '#999', marginBottom: 10, textAlign: isRTL ? 'right' : 'left' }}>
            {t.flipHint}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {features.map((feature, idx) => (
              <FlipCard
                key={idx}
                index={idx}
                accent={worldColor}
                isFlipped={flippedCards.has(idx)}
                onFlip={() => handleFlip(idx)}
                isRTL={isRTL}
                front={{
                  icon: FEATURE_ICONS[idx % FEATURE_ICONS.length],
                  title: feature.feature,
                  subtitle: isAr ? 'اضغط لتعرف أكتر' : 'Tap to learn',
                }}
                back={{
                  description: feature.description,
                  example: feature.example,
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 10, height: 4, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: worldColor, borderRadius: 4,
              width: `${(flippedCards.size / Math.max(totalCards, 1)) * 100}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}

      {/* ── LEARNING POINTS REVEAL ── */}
      {learningPoints.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#2C2C2A', marginBottom: 10 }}>
            {t.learn}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {learningPoints.map((point, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  opacity: idx < revealedPoints ? 1 : 0,
                  transform: idx < revealedPoints ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 0.4s ease',
                  background: '#f9f9f7',
                  borderRadius: 12, padding: '10px 14px',
                  direction: isRTL ? 'rtl' : 'ltr',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: worldColor, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 900, flexShrink: 0,
                }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: 13, color: '#333', lineHeight: 1.5, fontWeight: 500 }}>
                  {point}
                </div>
              </div>
            ))}
          </div>

          {revealedPoints < learningPoints.length && (
            <button
              onClick={handleRevealPoint}
              style={{
                marginTop: 10, width: '100%', padding: '10px 16px',
                background: `${worldColor}15`, border: `2px dashed ${worldColor}50`,
                borderRadius: 12, color: worldColor, fontWeight: 800, fontSize: 13,
                cursor: 'pointer', fontFamily: isAr ? 'Cairo, sans-serif' : 'inherit',
              }}
            >
              👆 {t.tapReveal}
            </button>
          )}
        </div>
      )}

      {/* ── EMPIRE TIP (LOCKED/UNLOCKED) ── */}
      {lesson.empireBuilderTip && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              borderRadius: 16,
              border: `2px solid ${empireUnlocked ? '#D4AF37' : '#ddd'}`,
              background: empireUnlocked ? 'linear-gradient(135deg, #FFF8E1, #FFFDE7)' : '#f5f5f5',
              padding: 16, position: 'relative',
              transition: 'all 0.5s ease',
              overflow: 'hidden',
            }}
          >
            {!empireUnlocked && (
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(245,245,245,0.92)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                borderRadius: 14, zIndex: 2, gap: 6,
              }}>
                <div style={{ fontSize: 28 }}>🔒</div>
                <div style={{ fontSize: 12, color: '#999', fontWeight: 700, textAlign: 'center', padding: '0 20px' }}>
                  {t.locked}
                </div>
              </div>
            )}
            <div style={{ fontSize: 12, fontWeight: 900, color: '#D4AF37', marginBottom: 6 }}>
              {t.empireTip}
            </div>
            <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6, direction: isRTL ? 'rtl' : 'ltr' }}>
              {lesson.empireBuilderTip}
            </div>
          </div>
        </div>
      )}

      {/* ── READY BUTTON ── */}
      {!readingDone ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={handleReady}
            disabled={!empireUnlocked && features.length > 0}
            style={{
              width: '100%', padding: '14px 16px',
              background: empireUnlocked || features.length === 0 ? worldColor : '#ddd',
              border: 'none', borderRadius: 16,
              color: '#fff', fontWeight: 900, fontSize: 15,
              cursor: empireUnlocked || features.length === 0 ? 'pointer' : 'not-allowed',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'inherit',
              boxShadow: empireUnlocked ? `0 4px 0 ${worldColor}80` : 'none',
              transition: 'all 0.3s',
            }}
          >
            {t.ready}
          </button>
          <button
            onClick={handleReady}
            style={{
              width: '100%', padding: '8px 16px',
              background: 'transparent', border: 'none',
              color: '#bbb', fontSize: 12, cursor: 'pointer',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            {t.skip}
          </button>
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '16px',
          background: `${worldColor}15`, borderRadius: 16,
          border: `2px solid ${worldColor}30`,
        }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: worldColor }}>
            {t('readingComplete')}
          </div>
        </div>
      )}
    </div>
  )
}
