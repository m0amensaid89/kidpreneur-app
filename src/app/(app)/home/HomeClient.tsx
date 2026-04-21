"use client";

import { useLocale } from "@/components/LocaleProvider";
import { useTranslations } from "@/lib/i18n/useTranslations";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { WORLDS } from "@/lib/data/lessons";
import { WorldCard } from "@/components/ui/WorldCard";
import { createClient } from "@/lib/supabase/client";

interface HomeClientProps {
  name: string;
  totalXp: number;
  currentStreak: number;
  level: number;
  levelXpStart: number;
  nextLevelXpStart: number;
}

// KidPreneur brand colors — mapped to each world's locked identity.
const WORLD_COLORS: Record<string, { color: string; dark: string; emoji: string; number: number }> = {
  w1: { color: "#FF6340", dark: "#D85A30", emoji: "🎨", number: 1 },
  w2: { color: "#7B52EE", dark: "#534AB7", emoji: "✍️", number: 2 },
  w3: { color: "#2E8CE6", dark: "#1a6fc4", emoji: "📣", number: 3 },
  w4: { color: "#00A878", dark: "#0F6E56", emoji: "⚡", number: 4 },
  w5: { color: "#6B35FF", dark: "#3C3489", emoji: "🧠", number: 5 },
};

export function HomeClient({
  name,
  totalXp,
  currentStreak,
  level,
  levelXpStart,
  nextLevelXpStart,
}: HomeClientProps) {
  const router = useRouter();
  const { locale, isRTL } = useLocale();
  const t = useTranslations();

  // Arabic world names
  const WORLD_NAMES: Record<string, string> = {
    w1: locale === 'ar' ? 'مملكة اللوحات' : t('worlds.w1'),
    w2: locale === 'ar' ? 'مصنع القصص' : t('worlds.w2'),
    w3: locale === 'ar' ? 'ميدان الجماهير' : t('worlds.w3'),
    w4: locale === 'ar' ? 'شبكة القوة' : t('worlds.w4'),
    w5: locale === 'ar' ? 'عصر الذكاء' : t('worlds.w5'),
  };
  const supabase = createClient();

  const [completedByWorld, setCompletedByWorld] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const loadProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("mission_completions")
        .select("lesson_id")
        .eq("user_id", session.user.id);

      if (!data) return;

      const byWorld: Record<string, Set<string>> = {};
      for (const world of WORLDS) {
        byWorld[world.id] = new Set();
      }
      for (const row of data) {
        const lessonId = row.lesson_id as string | null;
        if (!lessonId) continue;
        const lesson = WORLDS.flatMap(w => w.lessons).find(l => l.id === lessonId);
        if (!lesson) continue;
        const set = byWorld[lesson.worldId];
        if (set) set.add(lessonId);
      }
      setCompletedByWorld(byWorld);
    };
    loadProgress();
  }, [supabase]);

  const currentBracketXp = totalXp - levelXpStart;
  const bracketTotalXp = nextLevelXpStart - levelXpStart;
  const progressPct = bracketTotalXp > 0
    ? Math.min(100, Math.max(0, (currentBracketXp / bracketTotalXp) * 100))
    : 100;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"} className="flex flex-col min-h-full relative overflow-hidden pb-10 animate-in fade-in duration-500"
      style={{ color: "#2C2C2A" }}
    >
      {/* Decorative floating circles — Quacky's world */}
      <div className="absolute top-10 right-6 w-14 h-14 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.5 }} aria-hidden="true" />
      <div className="absolute top-44 left-4 w-10 h-10 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.4 }} aria-hidden="true" />
      <div className="absolute top-80 right-10 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#B3E5FC", opacity: 0.45 }} aria-hidden="true" />

      {/* Header : greeting + streak bubble */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { window.location.href = "/home"; }}
            className="flex items-center gap-2 active:scale-95 transition-transform"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            aria-label="KidPreneur Home"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: "#FFC43D",
                border: "3px solid #FFC43D",
                boxShadow: "0 3px 0 #BA7517",
              }}
            >
              <Image
                src="/quacky/quacky-happy.png"
                alt="Quacky"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#1a6fc4", letterSpacing: "-0.3px" }}>
              KidPreneur
            </span>
          </button>
          <div>
            <p className="text-xs" style={{ color: "#5F5E5A", fontWeight: 700 }}>
              {locale === "ar" ? "أهلاً،" : "Hey there,"}
            </p>
            <h1 className="text-xl leading-tight" style={{ color: "#1a6fc4", fontWeight: 900 }}>
              {name}!
            </h1>
          </div>
        </div>

        {/* Streak flame bubble */}
        <div
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full"
          style={{
            backgroundColor: "#FFFFFF",
            border: "3px solid #FFC43D",
            boxShadow: "0 3px 0 #BA7517",
          }}
        >
          <span style={{ fontSize: 16 }}>🔥</span>
          <span style={{ color: "#854F0B", fontWeight: 900, fontSize: 14 }}>
            {currentStreak}
          </span>
        </div>
      </div>

      {/* Hero XP Card : yellow chunky badge */}
      <div
        className="relative z-10 mx-5 mt-2 p-5"
        style={{
          backgroundColor: "#FFC43D",
          borderRadius: "28px",
          boxShadow: "0 6px 0 #BA7517",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "#FFFFFF",
              border: "3px solid #854F0B",
            }}
          >
            <span style={{ fontSize: 22, color: "#854F0B", fontWeight: 900 }}>
              {level}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1.5">
              <span style={{ fontSize: 11, color: "#854F0B", fontWeight: 900, letterSpacing: "1.5px" }}>
                LEVEL {level}
              </span>
              <span style={{ fontSize: 12, color: "#854F0B", fontWeight: 800 }}>
                {currentBracketXp} / {bracketTotalXp > 0 ? bracketTotalXp : totalXp} XP
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", border: "2px solid #854F0B" }}
            >
              <div
                className="h-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: "#2E8CE6",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Journey section label */}
      <div className="relative z-10 mt-7 mb-3 px-5">
        <p style={{ fontSize: 12, fontWeight: 900, color: "#378ADD", letterSpacing: "2px" }}>
          YOUR JOURNEY ✨
        </p>
        <p style={{ fontSize: 13, color: "#5F5E5A", fontWeight: 600, marginTop: 2 }}>
          Pick a world and let&apos;s go!
        </p>
      </div>

      {/* World cards */}
      <div className="relative z-10 px-5 space-y-3">
        {WORLDS.map((world, index) => {
          const meta = WORLD_COLORS[world.id] || {
            color: "#2E8CE6",
            dark: "#1a6fc4",
            emoji: "✦",
            number: index + 1,
          };

          const xpThreshold = world.unlockRequirement?.minXP ?? 0;
          const isLocked = index > 0 && totalXp < xpThreshold;

          const completedCount = completedByWorld[world.id]?.size ?? 0;
          const progress = world.lessonCount > 0
            ? (completedCount / world.lessonCount) * 100
            : 0;

          const unlockLabel = isLocked && xpThreshold > 0
            ? `Unlocks at ${xpThreshold.toLocaleString()} XP`
            : undefined;

          return (
            <WorldCard
              key={world.id}
              id={world.id}
              name={locale === "ar" ? (WORLD_NAMES[world.id] || world.name) : world.name}
              description={world.description}
              progress={progress}
              lessonCount={world.lessonCount}
              completedLessons={completedCount}
              isLocked={isLocked}
              color={meta.color}
              darkColor={meta.dark}
              emoji={meta.emoji}
              worldNumber={meta.number}
              unlockLabel={unlockLabel}
              onClick={() => router.push(`/world/${world.id}`)}
            />
          );
        })}
      </div>

    </div>
  );
}
