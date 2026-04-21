'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { INVESTORS } from '@/lib/empire/investors'
import { EmpireBuilderChat } from '@/components/empire/EmpireBuilderChat'

export default function EmpirePitchPage({
  params,
}: {
  params: Promise<{ worldId: string }>
}) {
  const { worldId } = use(params)
  const router = useRouter()
  const investor = INVESTORS[worldId]
  const [score, setScore] = useState<number | null>(null)

  if (!investor) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <p className="text-amber-500 font-bold">World not found.</p>
      </div>
    )
  }

  const handleComplete = (s: number) => {
    setScore(s)
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col">
      {/* Back button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-amber-700"
        >
          <span className="text-lg">‹</span>
          Back
        </button>
      </div>

      {/* Header */}
      <div className="px-4 pb-3">
        <div className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">
          Empire Builder
        </div>
        <h1 className="text-xl font-black text-amber-900">
          Pitch to {investor.name} {investor.emoji}
        </h1>
        <p className="text-sm text-amber-600 mt-0.5">
          Focus: {investor.focus}
        </p>
      </div>

      {/* Score banner */}
      {score !== null && (
        <div
          className="mx-4 mb-3 rounded-2xl px-4 py-3 text-center"
          style={{ background: investor.color }}
        >
          <div className="text-white font-black text-2xl">{score}/10</div>
          <div className="text-white text-sm opacity-90">Investment Score</div>
          <button
            onClick={() => router.back()}
            className="mt-2 bg-white rounded-full px-4 py-1.5 text-sm font-black"
            style={{ color: investor.color }}
          >
            Back to World
          </button>
        </div>
      )}

      {/* Chat — takes remaining height */}
      <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg border border-amber-100 flex flex-col">
        <EmpireBuilderChat
          investor={investor}
          locale="en"
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
