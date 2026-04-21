"use client";

import { QuackyVoice } from "@/components/voice/QuackyVoice";

import { use } from "react";
import Image from "next/image";
import { WORLDS } from "@/lib/data/lessons";
import { useRouter } from "next/navigation";

// Per-world identity with kids-UI palette
const WORLD_COLORS: Record<
  string,
  { color: string; colorDark: string; softBg: string; emoji: string; number: number }
> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", softBg: "#FFE4DC", emoji: "🎨", number: 1 },
  w2: { color: "#7B52EE", colorDark: "#534AB7", softBg: "#E8E2FF", emoji: "✍️", number: 2 },
  w3: { color: "#2E8CE6", colorDark: "#1a6fc4", softBg: "#D6EAFB", emoji: "📣", number: 3 },
  w4: { color: "#00A878", colorDark: "#0F6E56", softBg: "#D3F0E3", emoji: "⚡", number: 4 },
  w5: { color: "#6B35FF", colorDark: "#3C3489", softBg: "#DFD4FF", emoji: "🧠", number: 5 },
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Challenging",
};

export default function LessonIntroPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);

  let currentLesson = null;
  let currentWorld = null;
  for (const world of WORLDS) {
    const lesson = world.lessons.find((l) => l.id === unwrappedParams.lessonId);
    if (lesson) {
      currentLesson = lesson;
      currentWorld = world;
      break;
    }
  }

  if (!currentLesson || !currentWorld) {
    return (
      <div
        className="flex flex-col min-h-full items-center justify-center p-6 text-center"
      >
        <div className="text-5xl mb-3">🤔</div>
        <h1 style={{ color: "#1a6fc4", fontWeight: 900, fontSize: 22 }}>Hmm, this lesson is missing!</h1>
        <p className="mt-2" style={{ color: "#5F5E5A", fontWeight: 600 }}>
          Let&apos;s go back and try another one.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-5 px-6"
          style={{
            height: 56,
            backgroundColor: "#FFC43D",
            color: "#854F0B",
            borderRadius: 20,
            fontWeight: 900,
            fontSize: 16,
            boxShadow: "0 4px 0 #BA7517",
            border: "none",
          }}
        >
          ← Go back
        </button>
      </div>
    );
  }

  const meta = WORLD_COLORS[currentWorld.id] || WORLD_COLORS.w1;
  const totalXp = 30 + currentLesson.missions.reduce((sum, m) => sum + (m.xpReward || 0), 0);

  return (
    <div
      className="flex flex-col min-h-full relative overflow-hidden pb-10 animate-in fade-in duration-500"
      style={{ color: "#2C2C2A" }}
    >
      {/* HERO — world color block, NOT gradient. Kids UI = flat bold */}
      <div
        className="relative px-5 pt-4 pb-8"
        style={{ backgroundColor: meta.color, color: "#FFFFFF" }}
      >
        {/* Back button + breadcrumb */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition active:scale-95"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: `0 3px 0 ${meta.colorDark}`,
            }}
            aria-label="Back"
          >
            <span style={{ fontSize: 20, color: meta.colorDark, lineHeight: 1, fontWeight: 900 }}>‹</span>
          </button>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#FFFFFF", opacity: 0.95 }}>
            WORLD {meta.number} · {currentWorld.name.toUpperCase()}
          </span>
        </div>

        {/* Quacky + title */}
        <div className="flex items-start gap-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "#FFFFFF",
              border: "4px solid #FFFFFF",
              boxShadow: `0 4px 0 ${meta.colorDark}`,
            }}
          >
            <Image
              src="/quacky/quacky-pointing.png"
              alt="Quacky"
              width={62}
              height={62}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#FFFFFF", opacity: 0.9 }}>
              LESSON {currentLesson.lessonNumber} {meta.emoji}
            </p>
            <h1 className="leading-tight mt-0.5" style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>
              {currentLesson.title}
            </h1>
          </div>
        </div>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Chip emoji="⚡" label={DIFFICULTY_LABEL[currentLesson.difficulty] || currentLesson.difficulty} />
          <Chip emoji="⏱️" label={`${currentLesson.estimatedMinutes} min`} />
          <Chip emoji="⭐" label={`+${totalXp} XP`} />
        </div>
      </div>

      {/* BODY — white card peeking up */}
      <div
        className="flex-1 px-5 pt-6 pb-6 -mt-4"
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* Quacky speech bubble — warm-up challenge */}
        <div
          className="p-4 mb-5"
          style={{
            backgroundColor: meta.softBg,
            borderRadius: 20,
            border: `3px solid ${meta.color}`,
            boxShadow: `0 4px 0 ${meta.colorDark}`,
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: meta.colorDark, marginBottom: 6 }}>
            QUACKY SAYS 🦆
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.45, color: "#2C2C2A", fontWeight: 600 }}>
            {currentLesson.warmUpChallenge}
          </p>
        </div>

        {/* What you'll learn */}
        <div className="mb-5">
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: "2px", color: meta.colorDark, marginBottom: 10 }}>
            🎯 WHAT YOU&apos;LL LEARN
          </p>
          <div className="space-y-2.5">
            {currentLesson.learningPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3.5 py-3"
                style={{
                  backgroundColor: meta.softBg,
                  borderRadius: 16,
                  border: `2px solid ${meta.color}`,
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0 rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: meta.color,
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 900,
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, lineHeight: 1.35, color: "#2C2C2A", fontWeight: 700 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey preview — 3 fun tiles */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <JourneyTile emoji="💬" label="CHAT" accent={meta.color} accentDark={meta.colorDark} />
          <JourneyTile emoji="🎯" label="3 MISSIONS" accent={meta.color} accentDark={meta.colorDark} />
          <JourneyTile emoji="🏆" label="BADGE" accent={meta.color} accentDark={meta.colorDark} />
        </div>

        {/* Parent tip — collapsible */}
        <details
          className="group px-4 py-3 mb-4"
          style={{
            backgroundColor: "#FFFBE6",
            borderRadius: 16,
            border: "2px solid #FFE066",
          }}
        >
          <summary
            className="cursor-pointer list-none flex items-center gap-2"
            style={{ fontSize: 13, fontWeight: 900, color: "#854F0B" }}
          >
            <span style={{ fontSize: 16 }}>💡</span>
            <span>Parent tip</span>
            <span className="ml-auto transition-transform group-open:rotate-180" style={{ fontSize: 12, color: "#854F0B" }}>▾</span>
          </summary>
          <p style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8, color: "#2C2C2A", fontWeight: 500 }}>
            {currentLesson.parentTip}
          </p>
        </details>

        {/* Cost info footnote */}
        <p style={{ fontSize: 11, color: "#888780", lineHeight: 1.5, fontWeight: 600 }}>
          <span style={{ fontWeight: 900 }}>💰 Cost: </span>
          {currentLesson.costInfo}
        </p>

        {/* CTA */}
        <div className="mt-6 space-y-2">
          <button
            onClick={() => router.push(`/quiz/${currentLesson!.id}`)}
            className="w-full transition-transform active:translate-y-1"
            style={{
              height: 64,
              backgroundColor: meta.color,
              color: "#FFFFFF",
              borderRadius: 24,
              fontSize: 18,
              fontWeight: 900,
              boxShadow: `0 5px 0 ${meta.colorDark}`,
              border: "none",
              letterSpacing: "0.3px",
            }}
          >
            Start the quiz →
          </button>

          <a
            href={currentLesson.toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-3"
            style={{ fontSize: 12, fontWeight: 800, color: "#5F5E5A" }}
          >
            🔗 Open {currentLesson.toolName}
          </a>
        </div>
      </div>
    </div>
      <QuackyVoice
        lessonContext={currentLesson?.title ?? ""}
        locale="en"
      />
  );
}

function Chip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5"
      style={{
        backgroundColor: "rgba(255,255,255,0.25)",
        border: "2px solid rgba(255,255,255,0.4)",
        borderRadius: 999,
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: 900,
      }}
    >
      <span style={{ fontSize: 13 }}>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

function JourneyTile({
  emoji,
  label,
  accent,
  accentDark,
}: {
  emoji: string;
  label: string;
  accent: string;
  accentDark: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-3"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        border: `2.5px solid ${accent}`,
        boxShadow: `0 3px 0 ${accentDark}`,
      }}
    >
      <span style={{ fontSize: 22, marginBottom: 2 }}>{emoji}</span>
      <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: "1px", color: accentDark }}>
        {label}
      </p>
    </div>
  );
}