"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { WORLDS } from "@/lib/data/lessons";
import { useLocale } from "@/components/LocaleProvider";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { EmpireBuilderButton } from '@/components/empire/EmpireBuilderButton'

type LessonStatus = "available" | "locked" | "completed";

// Arabic world names
const WORLD_NAMES_AR: Record<string, string> = {
  w1: 'مملكة اللوحات', w2: 'مصنع القصص', w3: 'ميدان الجماهير',
  w4: 'شبكة القوة', w5: 'عصر الذكاء',
};

const LESSON_STATUS_AR: Record<string, string> = {
  available: 'متاح', locked: 'مقفول', completed: 'مكتمل',
};

const WORLD_META: Record<string, { color: string; colorDark: string; softBg: string; emoji: string; number: number }> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", softBg: "#FFE4DC", emoji: "🎨", number: 1 },
  w2: { color: "#7B52EE", colorDark: "#534AB7", softBg: "#E8E2FF", emoji: "✍️", number: 2 },
  w3: { color: "#2E8CE6", colorDark: "#1a6fc4", softBg: "#D6EAFB", emoji: "📣", number: 3 },
  w4: { color: "#00A878", colorDark: "#0F6E56", softBg: "#D3F0E3", emoji: "⚡", number: 4 },
  w5: { color: "#6B35FF", colorDark: "#3C3489", softBg: "#DFD4FF", emoji: "🧠", number: 5 },
};

export default function WorldDetailPage({ params }: { params: Promise<{ worldId: string }> }) {
  const router = useRouter();
  const { isRTL, locale } = useLocale();
  const isAr = locale === "ar";
  const unwrappedParams = use(params);
  const supabase = createClient();
  const world = WORLDS.find(w => w.id === unwrappedParams.worldId);

  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const { data } = await supabase
        .from("mission_completions")
        .select("lesson_id")
        .eq("user_id", session.user.id);

      if (data) {
        setCompletedLessonIds(new Set(data.map(r => r.lesson_id).filter(Boolean) as string[]));
      }
      setLoading(false);
    };
    loadProgress();
  }, [supabase]);

  if (!world) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"} className="flex flex-col min-h-full items-center justify-center p-6 text-center"
      >
        <div className="text-5xl mb-3">🤔</div>
        <h1 style={{ color: "#1a6fc4", fontWeight: 900, fontSize: 22 }}>World not found!</h1>
        <button
          onClick={() => router.push("/home")}
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
          ← Back to home
        </button>
      </div>
    );
  }

  const meta = WORLD_META[world.id] || WORLD_META.w1;
  const completedCount = world.lessons.filter(l => completedLessonIds.has(l.id)).length;
  const progressPct = world.lessons.length > 0 ? (completedCount / world.lessons.length) * 100 : 0;

  return (
    <div
      className="flex flex-col min-h-full relative overflow-hidden pb-10 animate-in fade-in duration-500"
      style={{ color: "#2C2C2A" }}
    >
      {/* World hero — flat world color */}
      <div
        className="relative px-5 pt-4 pb-8"
        style={{ backgroundColor: meta.color, color: "#FFFFFF" }}
      >
        {/* Back button + breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => router.push("/home")}
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
            WORLD {meta.number} OF 5
          </span>
        </div>

        {/* Big emoji + title */}
        <div className="text-center pt-2">
          <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 8 }}>{meta.emoji}</div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>
            {worldName ?? world.name}
          </h1>
          <p className="mt-2 max-w-xs mx-auto" style={{ fontSize: 14, color: "#FFFFFF", opacity: 0.9, fontWeight: 600, lineHeight: 1.4 }}>
            {world.description}
          </p>

          {/* Progress chip */}
          <div
            className="inline-flex items-center gap-2 mt-4 px-4 py-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 999,
              boxShadow: `0 3px 0 ${meta.colorDark}`,
              color: meta.colorDark,
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            <span style={{ fontSize: 16 }}>🎯</span>
            <span>{completedCount} / {world.lessons.length} lessons</span>
          </div>
        </div>
      </div>

      {/* White body card */}
      <div
        className="flex-1 px-5 pt-6 pb-6 -mt-4"
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* World progress bar */}
        <div
          className="p-4 mb-5"
          style={{
            backgroundColor: meta.softBg,
            borderRadius: 20,
            border: `2.5px solid ${meta.color}`,
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: meta.colorDark }}>
              YOUR PROGRESS
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: meta.colorDark }}>
              {Math.round(progressPct)}%
            </span>
          </div>
          <div
            className="h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: "#FFFFFF", border: `2px solid ${meta.color}` }}
          >
            <div
              className="h-full transition-all duration-700"
              style={{ width: `${progressPct}%`, backgroundColor: meta.color }}
            />
          </div>
        </div>

        {/* Lessons list — numbered path */}
        <p className="mb-3" style={{ fontSize: 12, fontWeight: 900, letterSpacing: "2px", color: meta.colorDark }}>
          📚 LESSONS
        </p>

        {world.lessons.length > 0 ? (
          <div className="space-y-3">
            {world.lessons.map((lesson, index) => {
              const isCompleted = completedLessonIds.has(lesson.id);
              const prevLesson = index > 0 ? world.lessons[index - 1] : null;
              const prevCompleted = prevLesson ? completedLessonIds.has(prevLesson.id) : true;

              let status: LessonStatus;
              if (loading) {
                status = "locked";
              } else if (isCompleted) {
                status = "completed";
              } else if (index === 0 || prevCompleted) {
                status = "available";
              } else {
                status = "locked";
              }

              return (
                <LessonPathCard
                  key={lesson.id}
                  index={index + 1}
                  title={lesson.title}
                  status={status}
                  accent={meta.color}
                  accentDark={meta.colorDark}
                  softBg={meta.softBg}
                  onClick={() => {
                    if (status !== "locked") router.push(`/lesson/${lesson.id}`);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="text-center p-6"
            style={{
              backgroundColor: "#FFFBE6",
              borderRadius: 20,
              border: "2px dashed #FFE066",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>🚧</div>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#854F0B" }}>
              Lessons coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonPathCard({
  index,
  title,
  status,
  accent,
  accentDark,
  softBg,
  onClick,
}: {
  index: number;
  title: string;
  status: LessonStatus;
  accent: string;
  accentDark: string;
  softBg: string;
  onClick: () => void;
}) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className="w-full flex items-center gap-4 text-left transition-transform active:translate-y-1 disabled:cursor-not-allowed"
      style={{
        backgroundColor: isLocked ? "#F4F4EC" : isCompleted ? softBg : "#FFFFFF",
        padding: "14px 16px",
        borderRadius: 20,
        border: isLocked
          ? "3px solid #E6D5A8"
          : isCompleted
            ? `3px solid ${accent}`
            : `3px solid ${accent}`,
        boxShadow: isLocked
          ? "0 3px 0 #D3D1C7"
          : `0 4px 0 ${accentDark}`,
        opacity: isLocked ? 0.65 : 1,
        cursor: isLocked ? "not-allowed" : "pointer",
      }}
    >
      {/* Number / status badge */}
      <div
        className="flex items-center justify-center shrink-0 rounded-full"
        style={{
          width: 44,
          height: 44,
          backgroundColor: isLocked ? "#C4C2B9" : isCompleted ? accent : accent,
          color: "#FFFFFF",
          fontSize: isCompleted ? 18 : 16,
          fontWeight: 900,
          border: "3px solid #FFFFFF",
          boxShadow: isLocked ? "none" : `0 2px 0 ${accentDark}`,
        }}
      >
        {isLocked ? "🔒" : isCompleted ? "✓" : index}
      </div>

      {/* Title + label */}
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "1.5px",
            color: isLocked ? "#888780" : isCompleted ? accentDark : accentDark,
            marginBottom: 1,
          }}
        >
          {isLocked ? "LOCKED" : isCompleted ? "COMPLETED" : `LESSON ${index}`}
        </p>
        <h4
          className="truncate"
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: isLocked ? "#888780" : "#2C2C2A",
            lineHeight: 1.25,
          }}
        >
          {title}
        </h4>
      </div>

      {/* Action chevron */}
      {!isLocked && (
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            backgroundColor: accent,
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          {isCompleted ? "↻" : "›"}
        </div>
      )}
    </button>
  );
}