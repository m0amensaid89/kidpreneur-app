"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flame } from "lucide-react";
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
const WORLD_COLORS: Record<string, { color: string; emoji: string; number: number }> = {
  w1: { color: "#FF6340", emoji: "🎨", number: 1 },
  w2: { color: "#7B52EE", emoji: "✍️", number: 2 },
  w3: { color: "#2E8CE6", emoji: "📣", number: 3 },
  w4: { color: "#00A878", emoji: "⚡", number: 4 },
  w5: { color: "#6B35FF", emoji: "🧠", number: 5 },
};

const QUACKY_BLUE = "#2E8CE6";

export function HomeClient({
  name,
  totalXp,
  currentStreak,
  level,
  levelXpStart,
  nextLevelXpStart,
}: HomeClientProps) {
  const router = useRouter();
  const supabase = createClient();

  // Real per-world progress pulled from mission_completions (lesson_id).
  // Shape : { w1: Set<lessonId>, w2: Set<lessonId>, ... }
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

  // XP bar math relative to current level bracket.
  const currentBracketXp = totalXp - levelXpStart;
  const bracketTotalXp = nextLevelXpStart - levelXpStart;
  const progressPct = bracketTotalXp > 0
    ? Math.min(100, Math.max(0, (currentBracketXp / bracketTotalXp) * 100))
    : 100;

  return (
    <div className="flex flex-col min-h-full pb-24 animate-in fade-in duration-500">

      {/* Header : greeting + streak badge */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div>
          <p className="text-xs text-muted-foreground font-semibold">Hey there</p>
          <h1 className="text-2xl font-black mt-0.5 flex items-center gap-2">
            {name}
            <span className="inline-block" aria-hidden>👋</span>
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 px-3 py-2 rounded-full">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span className="text-sm font-black text-orange-500">{currentStreak}</span>
        </div>
      </div>

      {/* Hero XP card : Quacky-blue gradient, level badge inline, XP progress */}
      <div
        className="mx-5 rounded-3xl p-5 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${QUACKY_BLUE} 0%, #1a6fc4 100%)`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-[3px] border-white/90 shadow-sm shrink-0"
            style={{ backgroundColor: "#FFD700" }}
          >
            <span className="text-xl font-black" style={{ color: "#854F0B" }}>
              {level}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-white/90">
              <span className="tracking-wider">LEVEL {level}</span>
              <span>{currentBracketXp} / {bracketTotalXp > 0 ? bracketTotalXp : totalXp} XP</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden bg-white/25">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: "#FFD700",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Journey section */}
      <p className="text-xs font-bold tracking-widest text-muted-foreground mt-6 mb-3 px-5">
        YOUR JOURNEY
      </p>

      <div className="px-5 space-y-3">
        {WORLDS.map((world, index) => {
          const meta = WORLD_COLORS[world.id] || {
            color: QUACKY_BLUE,
            emoji: "✦",
            number: index + 1,
          };

          // World 1 always unlocked. Subsequent worlds use the data file's XP threshold.
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
              name={world.name}
              description={world.description}
              progress={progress}
              lessonCount={world.lessonCount}
              completedLessons={completedCount}
              isLocked={isLocked}
              color={meta.color}
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
