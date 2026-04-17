"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { XPCounter } from "@/components/ui/XPCounter";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { Badge } from "@/lib/badges";
import { awardBadge } from "@/lib/badgeDispatcher";
import { createClient } from "@/lib/supabase/client";
import { WORLDS } from "@/lib/data/lessons";
import { Star, Trophy, ArrowRight, MapPin } from "lucide-react";

// Per-world identity — matches Phase 1, 2, 3
const WORLD_COLORS: Record<string, { color: string; colorDark: string; confetti: string[] }> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", confetti: ["#FF6340", "#FBBF24", "#FFF", "#F0997B", "#F5C4B3"] },
  w2: { color: "#7B52EE", colorDark: "#534AB7", confetti: ["#7B52EE", "#FBBF24", "#FFF", "#AFA9EC", "#CECBF6"] },
  w3: { color: "#2E8CE6", colorDark: "#185FA5", confetti: ["#2E8CE6", "#FBBF24", "#FFF", "#85B7EB", "#B5D4F4"] },
  w4: { color: "#00A878", colorDark: "#0F6E56", confetti: ["#00A878", "#FBBF24", "#FFF", "#5DCAA5", "#9FE1CB"] },
  w5: { color: "#6B35FF", colorDark: "#3C3489", confetti: ["#6B35FF", "#FBBF24", "#FFF", "#AFA9EC", "#EEEDFE"] },
};

export default function MissionCompletePage({ params }: { params: Promise<{ missionId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const supabase = createClient();
  const [hasAwarded, setHasAwarded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [revealedBadge, setRevealedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Look up the mission details from the data file
  const missionId = unwrappedParams.missionId;
  const lessonId = missionId.split("_")[0];

  let world = null;
  let lesson = null;
  let mission = null;
  for (const w of WORLDS) {
    const l = w.lessons.find((x) => x.id === lessonId);
    if (l) {
      world = w;
      lesson = l;
      mission = l.missions.find((m) => m.id === missionId) || null;
      break;
    }
  }

  const meta = WORLD_COLORS[world?.id || "w1"] || WORLD_COLORS.w1;
  const xpReward = mission?.xpReward ?? 30;

  useEffect(() => {
    const award = async () => {
      if (hasAwarded) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // 1. Log the actual XP from the mission data
      await supabase.from("xp_log").insert({
        user_id: userId,
        xp_amount: xpReward,
        source: `mission_complete_${missionId}`,
      });

      // 2. Mark mission complete
      await supabase.from("mission_completions").upsert(
        {
          user_id: userId,
          mission_id: missionId,
          lesson_id: lessonId,
          stars: 3,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,mission_id" }
      );

      // 3. Dispatcher badge check
      const badge = await awardBadge(supabase, userId, {
        type: "mission_complete",
        missionId,
        lessonId,
      });

      if (badge) {
        setRevealedBadge(badge);
      }

      setHasAwarded(true);
    };
    award();
  }, [hasAwarded, supabase, missionId, lessonId, xpReward]);

  const handleNextMission = () => {
    if (!lesson || !mission) {
      router.push("/home");
      return;
    }
    // Find the next mission in the same lesson; if last, route to lesson's next lesson; else home
    const currentIndex = lesson.missions.findIndex((m) => m.id === missionId);
    if (currentIndex >= 0 && currentIndex < lesson.missions.length - 1) {
      router.push(`/chat?lessonId=${lessonId}`);
      return;
    }
    if (lesson.nextLesson) {
      router.push(`/lesson/${lesson.nextLesson}`);
      return;
    }
    router.push(`/world/${world?.id || ""}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-between min-h-[100dvh] pb-10 relative overflow-hidden animate-in fade-in duration-500"
      style={{
        background: `linear-gradient(180deg, ${meta.color}33 0%, hsl(var(--background)) 60%, hsl(var(--background)) 100%)`,
      }}
    >
      {/* Confetti particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm opacity-0 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: meta.confetti[Math.floor(Math.random() * meta.confetti.length)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 w-full max-w-sm z-10 text-center animate-in zoom-in-95 duration-500 space-y-6">

        {/* World breadcrumb chip */}
        {world && lesson && (
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider"
            style={{
              backgroundColor: `${meta.color}20`,
              color: meta.color,
            }}
          >
            <MapPin className="w-3 h-3" />
            {world.name.toUpperCase()} · {lesson.title.toUpperCase()}
          </div>
        )}

        {/* Quacky cheering */}
        <div className="animate-bounce">
          <QuackyAvatar state="cheering" size="xl" className="drop-shadow-2xl" />
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <h1
            className="text-3xl font-black uppercase tracking-widest"
            style={{ color: meta.color }}
          >
            Mission Complete!
          </h1>
          {mission && (
            <p className="text-sm text-foreground/80 font-semibold">
              {mission.title}
            </p>
          )}
        </div>

        {/* 3-star animated row */}
        <div className="flex justify-center gap-3 py-1">
          {[1, 2, 3].map((star, idx) => (
            <Star
              key={star}
              className="w-11 h-11 fill-amber-400 text-amber-400 animate-in zoom-in spin-in-12 drop-shadow-md"
              style={{
                animationDuration: "700ms",
                animationDelay: `${300 + idx * 150}ms`,
                animationFillMode: "both",
              }}
            />
          ))}
        </div>

        {/* XP card */}
        <div
          className="w-full rounded-3xl p-5 border-2 animate-in slide-in-from-bottom-4 fade-in"
          style={{
            backgroundColor: "hsl(var(--card))",
            borderColor: meta.color,
            animationDuration: "500ms",
            animationDelay: "800ms",
            animationFillMode: "both",
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-6 h-6" style={{ color: meta.color }} />
            <p className="text-[11px] font-black tracking-[0.2em] text-muted-foreground">
              XP EARNED
            </p>
          </div>
          <p
            className="text-5xl font-black tabular-nums mt-1"
            style={{ color: meta.color }}
          >
            +<XPCounter from={0} to={xpReward} duration={1000} />
          </p>
        </div>

      </div>

      {/* Action buttons */}
      <div
        className="w-full max-w-sm px-6 space-y-2 z-10 animate-in slide-in-from-bottom-8 fade-in"
        style={{
          animationDuration: "500ms",
          animationDelay: "1000ms",
          animationFillMode: "both",
        }}
      >
        <button
          onClick={handleNextMission}
          className="w-full h-14 rounded-2xl text-base font-black text-white flex items-center justify-center gap-2 transition-transform active:translate-y-0.5"
          style={{
            backgroundColor: meta.color,
            boxShadow: `0 4px 0 ${meta.colorDark}`,
          }}
        >
          Next mission <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => router.push("/home")}
          className="w-full h-12 rounded-2xl text-sm font-bold text-muted-foreground hover:text-foreground transition"
        >
          Back to map
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes confetti {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(110vh) rotate(720deg); }
        }
        .animate-confetti {
          animation-name: confetti;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `
      }} />

      {revealedBadge && (
        <BadgeReveal badge={revealedBadge} onDismiss={() => setRevealedBadge(null)} />
      )}
    </div>
  );
}
