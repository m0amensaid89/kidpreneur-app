"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { XPCounter } from "@/components/ui/XPCounter";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { Badge } from "@/lib/badges";
import { awardBadge } from "@/lib/badgeDispatcher";
import { createClient } from "@/lib/supabase/client";
import { WORLDS } from "@/lib/data/lessons";
import { Star, ArrowRight } from "lucide-react";

const WORLD_COLORS: Record<string, { color: string; colorDark: string; softBg: string; confetti: string[] }> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", softBg: "#FFE4DC", confetti: ["#FF6340", "#FFC43D", "#FFFFFF", "#F0997B", "#FFB3BA"] },
  w2: { color: "#7B52EE", colorDark: "#534AB7", softBg: "#E8E2FF", confetti: ["#7B52EE", "#FFC43D", "#FFFFFF", "#AFA9EC", "#FFB3BA"] },
  w3: { color: "#2E8CE6", colorDark: "#1a6fc4", softBg: "#D6EAFB", confetti: ["#2E8CE6", "#FFC43D", "#FFFFFF", "#85B7EB", "#FFB3BA"] },
  w4: { color: "#00A878", colorDark: "#0F6E56", softBg: "#D3F0E3", confetti: ["#00A878", "#FFC43D", "#FFFFFF", "#5DCAA5", "#FFB3BA"] },
  w5: { color: "#6B35FF", colorDark: "#3C3489", softBg: "#DFD4FF", confetti: ["#6B35FF", "#FFC43D", "#FFFFFF", "#AFA9EC", "#FFB3BA"] },
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

      // 1. Log the mission's XP
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

      // 3. Collect ALL possible badges from this one event cascade
      const awardedQueue: Badge[] = [];

      const pushIfBadge = (b: Badge | null) => {
        if (b) awardedQueue.push(b);
      };

      // 3a. mission_complete itself (first_mission, mission_trio)
      pushIfBadge(await awardBadge(supabase, userId, {
        type: "mission_complete",
        missionId,
        lessonId,
      }));

      // 3b. If this mission was the LAST one in its lesson → fire lesson_complete
      if (lesson) {
        const { count: completedInLesson } = await supabase
          .from("mission_completions")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("lesson_id", lessonId);

        if ((completedInLesson || 0) >= lesson.missions.length) {
          pushIfBadge(await awardBadge(supabase, userId, {
            type: "lesson_complete",
            lessonId,
            worldId: world?.id || "",
          }));

          // 3c. If this lesson was the LAST lesson in its world → fire world_complete
          if (world) {
            // A world is complete when every lesson in it has at least one mission_completion
            const { data: worldProgress } = await supabase
              .from("mission_completions")
              .select("lesson_id")
              .eq("user_id", userId)
              .in("lesson_id", world.lessons.map(l => l.id));

            const completedLessons = new Set((worldProgress || []).map(r => r.lesson_id));
            if (completedLessons.size >= world.lessons.length) {
              pushIfBadge(await awardBadge(supabase, userId, {
                type: "world_complete",
                worldId: world.id,
              }));
            }
          }
        }
      }

      // 3d. XP milestone check — recompute total XP and see if 1000/10000 crossed
      const { data: xpRows } = await supabase
        .from("xp_log")
        .select("xp_amount")
        .eq("user_id", userId);
      const totalXp = (xpRows || []).reduce((s, r) => s + (r.xp_amount || 0), 0);

      pushIfBadge(await awardBadge(supabase, userId, {
        type: "xp_milestone",
        totalXp,
      }));

      // 4. Reveal the best badge (queue is ordered by cascade priority)
      // Prefer rarest-tier if multiple: legendary > rare > common
      const rarityRank = { legendary: 3, rare: 2, common: 1 };
      awardedQueue.sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity]);

      if (awardedQueue[0]) setRevealedBadge(awardedQueue[0]);

      setHasAwarded(true);
    };
    award();
  }, [hasAwarded, supabase, missionId, lessonId, xpReward, lesson, world]);

  const handleNextMission = () => {
    if (!lesson || !mission) {
      router.push("/home");
      return;
    }
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
      style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}
    >
      {/* Confetti particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-0 animate-confetti"
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
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

      {/* Decorative pastel circles */}
      <div className="absolute top-16 right-8 w-16 h-16 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.4 }} aria-hidden="true" />
      <div className="absolute top-40 left-6 w-14 h-14 rounded-full pointer-events-none"
        style={{ backgroundColor: meta.softBg, opacity: 0.7 }} aria-hidden="true" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 w-full max-w-sm z-10 text-center animate-in zoom-in-95 duration-500 space-y-5">

        {/* World breadcrumb chip */}
        {world && lesson && (
          <div
            className="flex items-center gap-1.5 px-3.5 py-1.5"
            style={{
              backgroundColor: "#FFFFFF",
              border: `2.5px solid ${meta.color}`,
              boxShadow: `0 3px 0 ${meta.colorDark}`,
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "1.2px",
              color: meta.colorDark,
            }}
          >
            <span>📍</span>
            <span>{world.name.toUpperCase()} · {lesson.title.toUpperCase()}</span>
          </div>
        )}

        {/* Cheering Quacky in a chunky circle */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center animate-bounce"
          style={{
            backgroundColor: "#FFFFFF",
            border: `6px solid ${meta.color}`,
            boxShadow: `0 8px 0 ${meta.colorDark}`,
            animationDuration: "1.5s",
          }}
        >
          <Image
            src="/quacky/quacky-cheering.png"
            alt="Quacky is cheering"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <div className="space-y-1.5 pt-1">
          <h1 style={{ fontSize: 32, fontWeight: 900, color: meta.colorDark, letterSpacing: "0.5px", lineHeight: 1.05 }}>
            Mission Complete! 🎉
          </h1>
          {mission && (
            <p style={{ fontSize: 14, fontWeight: 700, color: "#5F5E5A", lineHeight: 1.3 }}>
              {mission.title}
            </p>
          )}
        </div>

        {/* 3-star row */}
        <div className="flex justify-center gap-3 py-1">
          {[1, 2, 3].map((star, idx) => (
            <Star
              key={star}
              className="w-12 h-12 animate-in zoom-in spin-in-12"
              style={{
                fill: "#FFC43D",
                color: "#BA7517",
                strokeWidth: 2,
                filter: "drop-shadow(0 3px 0 #BA7517)",
                animationDuration: "700ms",
                animationDelay: `${300 + idx * 150}ms`,
                animationFillMode: "both",
              }}
            />
          ))}
        </div>

        {/* XP card — chunky yellow */}
        <div
          className="w-full animate-in slide-in-from-bottom-4 fade-in"
          style={{
            backgroundColor: "#FFC43D",
            border: "3px solid #BA7517",
            borderRadius: 24,
            padding: "18px",
            boxShadow: "0 5px 0 #854F0B",
            animationDuration: "500ms",
            animationDelay: "800ms",
            animationFillMode: "both",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "2px", color: "#854F0B", textAlign: "center" }}>
            🏆 XP EARNED
          </p>
          <p
            className="tabular-nums mt-1 text-center"
            style={{ fontSize: 44, fontWeight: 900, color: "#854F0B", lineHeight: 1.1 }}
          >
            +<XPCounter from={0} to={xpReward} duration={1000} />
          </p>
        </div>

      </div>

      {/* Action buttons */}
      <div
        className="w-full max-w-sm px-6 space-y-3 z-10 animate-in slide-in-from-bottom-8 fade-in"
        style={{
          animationDuration: "500ms",
          animationDelay: "1000ms",
          animationFillMode: "both",
        }}
      >
        <button
          onClick={handleNextMission}
          className="w-full flex items-center justify-center gap-2 transition-transform active:translate-y-1"
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
          Next mission <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => router.push("/home")}
          className="w-full h-12 transition"
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#5F5E5A",
            background: "transparent",
            border: "none",
            letterSpacing: "0.3px",
          }}
        >
          ← Back to map
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
