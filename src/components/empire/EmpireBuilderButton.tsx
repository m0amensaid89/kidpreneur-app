'use client'

import { useRouter } from 'next/navigation'

interface EmpireBuilderButtonProps {
  worldId: string
  locale?: 'en' | 'ar'
}

const WORLD_COLORS: Record<string, string> = {
  w1: '#FF6340',
  w2: '#7B52EE',
  w3: '#2E8CE6',
  w4: '#00A878',
  w5: '#6B35FF',
}

const INVESTOR_NAMES: Record<string, { en: string; ar: string }> = {
  w1: { en: 'Pitch to Maya', ar: 'اعرض على مايا' },
  w2: { en: 'Pitch to Omar', ar: 'اعرض على عمر' },
  w3: { en: 'Pitch to Sarah', ar: 'اعرض على سارة' },
  w4: { en: 'Pitch to Victor', ar: 'اعرض على فيكتور' },
  w5: { en: 'Pitch to Aria', ar: 'اعرض على آريا' },
}

export function EmpireBuilderButton({ worldId, locale = 'en' }: EmpireBuilderButtonProps) {
  const router = useRouter()
  const color = WORLD_COLORS[worldId] ?? '#D97706'
  const label = INVESTOR_NAMES[worldId]?.[locale] ?? 'Empire Pitch'

  return (
    <button
      onClick={() => router.push(`/empire/${worldId}`)}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm text-white active:scale-95 transition"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        boxShadow: `0 4px 0 ${color}88`,
      }}
    >
      <span className="text-lg">🏛️</span>
      {label}
      <span className="text-lg">→</span>
    </button>
  )
}
