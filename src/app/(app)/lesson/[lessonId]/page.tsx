"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { WORLDS } from "@/lib/data/lessons";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Zap,
  Clock,
  Award,
  Target,
  MessageCircle,
  Trophy,
  ExternalLink,
  Lightbulb,
} from "lucide-react";

// Per-world identity (same mapping as HomeClient Phase 1)
const WORLD_COLORS: Record<
  string,
  { color: string; colorDark: string; bg: string; emoji: string; number: number; textDark: string; chipBg: string }
> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", bg: "#FFF7F2", emoji: "🎨", number: 1, textDark: "#4A1B0C", chipBg: "rgba(216,90,48,0.15)" },
  w2: { color: "#7B52EE", colorDark: "#534AB7", bg: "#F3F0FF", emoji: "✍️", number: 2, textDark: "#26215C", chipBg: "rgba(123,82,238,0.15)" },
  w3: { color: "#2E8CE6", colorDark: "#185FA5", bg: "#E6F1FB", emoji: "📣", number: 3, textDark: "#042C53", chipBg: "rgba(46,140,230,0.15)" },
  w4: { color: "#00A878", colorDark: "#0F6E56", bg: "#E6F6F0", emoji: "⚡", number: 4, textDark: "#04342C", chipBg: "rgba(0,168,120,0.15)" },
  w5: { color: "#6B35FF", colorDark: "#3C3489", bg: "#EEEBFF", emoji: "🧠", number: 5, textDark: "#26215C", chipBg: "rgba(107,53,255,0.15)" },
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Challenging",
};

export default function LessonIntroPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);

  // Find the lesson and its world
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
      <div className="flex flex-col min-h-full">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold">Lesson Not Found</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">This lesson doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const meta = WORLD_COLORS[currentWorld.id] || WORLD_COLORS.w1;

  // Compute total XP available in this lesson (quiz + 3 missions)
  const totalXp = 30 + currentLesson.missions.reduce((sum, m) => sum + (m.xpReward || 0), 0);

  return (
    <div className="flex flex-col min-h-full pb-24 animate-in fade-in duration-500">

      {/* === HERO HEADER : world-color gradient === */}
      <div
        className="text-white relative"
        style={{
          background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.colorDark} 100%)`,
          padding: "20px 20px 28px",
        }}
      >
        {/* Back button + breadcrumb */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/35 flex items-center justify-center transition"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-[11px] font-bold tracking-widest text-white/90">
            WORLD {meta.number} · {currentWorld.name.toUpperCase()}
          </span>
        </div>

        {/* Tool icon tile + title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center text-2xl shrink-0">
            {meta.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold text-white/90">LESSON {currentLesson.lessonNumber}</p>
            <h1 className="text-2xl font-black leading-tight">{currentLesson.title}</h1>
          </div>
        </div>

        {/* Hero line */}
        <p className="text-sm leading-snug mt-3 text-white/95 font-medium">
          {currentLesson.heroLine}
        </p>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full text-[11px] font-bold">
            <Zap className="w-3.5 h-3.5" />
            {DIFFICULTY_LABEL[currentLesson.difficulty] || currentLesson.difficulty}
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5" />
            {currentLesson.estimatedMinutes} min
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full text-[11px] font-bold">
            <Award className="w-3.5 h-3.5" />
            +{totalXp} XP
          </div>
        </div>
      </div>

      {/* === BODY CONTENT === */}
      <div className="flex-1 px-5 pt-5 space-y-5">

        {/* Quacky speech bubble with warm-up challenge */}
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <QuackyAvatar state="neutral" size="md" />
          </div>
          <div className="flex-1 relative bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
            {/* Speech bubble pointer */}
            <div
              className="absolute -left-2 top-3 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "8px solid hsl(var(--card))",
              }}
            />
            <p className="text-sm leading-relaxed">
              {currentLesson.warmUpChallenge}
            </p>
          </div>
        </div>

        {/* What you will learn */}
        <div>
          <div
            className="text-[11px] font-bold tracking-widest mb-2.5 flex items-center gap-1.5"
            style={{ color: meta.color }}
          >
            <Target className="w-3.5 h-3.5" />
            WHAT YOU&apos;LL LEARN
          </div>
          <div className="space-y-2">
            {currentLesson.learningPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={{
                  backgroundColor: meta.bg,
                  border: `0.5px solid ${meta.chipBg}`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0"
                  style={{ backgroundColor: meta.color }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-[13px] font-semibold leading-snug"
                  style={{ color: meta.textDark }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey preview : 3 tiles */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted/50 rounded-xl py-3 flex flex-col items-center justify-center border border-border/30">
            <MessageCircle className="w-5 h-5 mb-1" style={{ color: meta.color }} />
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground">QUACKY CHAT</p>
          </div>
          <div className="bg-muted/50 rounded-xl py-3 flex flex-col items-center justify-center border border-border/30">
            <Target className="w-5 h-5 mb-1" style={{ color: meta.color }} />
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground">3 MISSIONS</p>
          </div>
          <div className="bg-muted/50 rounded-xl py-3 flex flex-col items-center justify-center border border-border/30">
            <Trophy className="w-5 h-5 mb-1" style={{ color: meta.color }} />
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground">EARN BADGE</p>
          </div>
        </div>

        {/* Parent tip : collapsible */}
        <details className="group rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-3">
          <summary className="cursor-pointer list-none flex items-center gap-2 text-[13px] font-bold text-amber-400">
            <Lightbulb className="w-4 h-4" />
            Parent tip
            <span className="ml-auto text-xs transition-transform group-open:rotate-180">▾</span>
          </summary>
          <p className="text-[12px] leading-relaxed mt-2 text-foreground/80">
            {currentLesson.parentTip}
          </p>
        </details>

        {/* Cost info : quiet footnote */}
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <span className="font-bold">💰 Cost: </span>
          {currentLesson.costInfo}
        </p>

      </div>

      {/* === CTA BUTTONS (sticky-bottom spacing reserved by pb-24) === */}
      <div className="px-5 mt-6 space-y-2">
        <Button
          onClick={() => router.push(`/quiz/${currentLesson!.id}`)}
          className="w-full h-14 rounded-2xl text-base font-black text-white transition-transform active:translate-y-0.5"
          style={{
            backgroundColor: meta.color,
            boxShadow: `0 4px 0 ${meta.colorDark}`,
          }}
        >
          Start the quiz →
        </Button>

        <a
          href={currentLesson.toolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-3 text-xs font-bold text-muted-foreground hover:text-foreground transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open {currentLesson.toolName}
        </a>
      </div>
    </div>
  );
}
