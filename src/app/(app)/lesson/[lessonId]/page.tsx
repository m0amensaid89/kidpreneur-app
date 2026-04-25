"use client";

import { QuackyVoice } from "@/components/voice/QuackyVoice";
import { ToolSandbox } from "@/components/sandbox/ToolSandbox";
import { LessonReadingSection } from "@/components/lesson/LessonReadingSection";
import { getSandboxConfig } from "@/lib/sandbox/sandbox-config";
import { LessonVideoPlayer } from "@/components/video/LessonVideoPlayer";
import { getLessonAr } from "@/lib/data/lessons-ar";

import { use } from "react";
import Image from "next/image";
import { WORLDS } from "@/lib/data/lessons";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

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

const DIFFICULTY_LABEL_EN: Record<string, string> = { easy: "Easy", medium: "Medium", hard: "Challenging" };
const DIFFICULTY_LABEL_AR: Record<string, string> = { easy: "سهل", medium: "متوسط", hard: "صعب" };

const WORLD_NAMES_AR: Record<string, string> = {
  w1: 'مملكة اللوحات', w2: 'مصنع القصص', w3: 'ميدان الجماهير',
  w4: 'شبكة القوة', w5: 'عصر الذكاء',
};

export default function LessonIntroPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const router = useRouter();
  const { isRTL, locale } = useLocale();
  const isAr = locale === "ar";
  const unwrappedParams = use(params);

  // Bilingual labels
  const lt = isAr
    ? {
        back: "رجوع",
        worldLabel: "العالم",
        lessonLabel: "الدرس",
        quackySays: "كواكي يقول 🦆",
        whatLearn: "إيه اللي هتتعلمه",
        readingPhase: "اقرأ واكتشف",
        sandboxPhase: "جرب الأداة",
        missionsPhase: "مهامك",
        mission: "المهمة",
        quizPhase: "اختبر نفسك",
        startQuiz: "ابدأ التحدي 🏆",
        openTool: "افتح",
        parentTip: "نصيحة لولي الأمر",
        cost: "التكلفة",
        chat: "محادثة",
        missions: "٣ مهام",
        badge: "شارة",
        missingSoon: "الدرس مش موجود!",
        missingBack: "← رجوع",
        xpEarn: "نقطة ستكسبها",
        minutes: "دقيقة",
      }
    : {
        back: "Back",
        worldLabel: "WORLD",
        lessonLabel: "LESSON",
        quackySays: "QUACKY SAYS 🦆",
        whatLearn: "WHAT YOU\'LL LEARN",
        readingPhase: "READ & DISCOVER",
        sandboxPhase: "TRY THE TOOL",
        missionsPhase: "YOUR MISSIONS",
        mission: "MISSION",
        quizPhase: "TEST YOURSELF",
        startQuiz: "Start the Challenge 🏆",
        openTool: "Open",
        parentTip: "Parent tip",
        cost: "Cost",
        chat: "CHAT",
        missions: "3 MISSIONS",
        badge: "BADGE",
        missingSoon: "Hmm, lesson is missing!",
        missingBack: "← Go back",
        xpEarn: "XP to earn",
        minutes: "min",
      };

  let currentLesson = null;
  let currentWorld = null;
  for (const world of WORLDS) {
    const lesson = world.lessons.find((l) => l.id === unwrappedParams.lessonId);
    if (lesson) { currentLesson = lesson; currentWorld = world; break; }
  }

  if (!currentLesson || !currentWorld) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} className="flex flex-col min-h-full items-center justify-center p-8" style={{ backgroundColor: "#FFF8E7" }}>
        <div className="text-5xl mb-3">🤔</div>
        <h1 style={{ color: "#1a6fc4", fontWeight: 900, fontSize: 22 }}>{lt.missingSoon}</h1>
        <button onClick={() => router.back()} className="mt-5 px-6"
          style={{ height: 56, backgroundColor: "#FFC43D", color: "#854F0B", borderRadius: 20, fontWeight: 900, fontSize: 16, boxShadow: "0 4px 0 #BA7517", border: "none" }}>
          {lt.missingBack}
        </button>
      </div>
    );
  }

  const lessonAr = isAr ? getLessonAr(currentLesson.id) : null;
  const meta = WORLD_COLORS[currentWorld.id] || WORLD_COLORS.w1;
  const sandboxConfig = getSandboxConfig(currentLesson.id);
  const totalXp = 30 + currentLesson.missions.reduce((sum, m) => sum + (m.xpReward || 0), 0);
  const worldName = isAr ? (WORLD_NAMES_AR[currentWorld.id] || currentWorld.name) : currentWorld.name;

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="flex flex-col min-h-full relative pb-10" style={{ backgroundColor: "#FFF8E7" }}>

      {/* ══════════════════════════════════════════
          PHASE 1: HOOK — Hero banner
          Gagné Event 1: Gain Attention
          Gagné Event 2: State Objectives
      ══════════════════════════════════════════ */}
      <div className="relative px-5 pt-4 pb-8" style={{ backgroundColor: meta.color }}>

        {/* Back + breadcrumb */}
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition active:scale-95"
            style={{ backgroundColor: "#FFFFFF", boxShadow: `0 3px 0 ${meta.colorDark}` }}
            aria-label={lt.back}>
            <span style={{ fontSize: 20, color: meta.colorDark, lineHeight: 1, fontWeight: 900 }}>
              {isRTL ? "›" : "‹"}
            </span>
          </button>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#FFFFFF", opacity: 0.85 }}>
            {lt.worldLabel} {meta.number} · {worldName.toUpperCase()}
          </span>
        </div>

        {/* Quacky + title */}
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#FFFFFF", border: "4px solid #FFFFFF", boxShadow: `0 4px 0 ${meta.colorDark}` }}>
            <Image src="/quacky/quacky-pointing.png" alt="Quacky" width={62} height={62} className="object-contain" priority />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#FFFFFF", opacity: 0.8, marginBottom: 2 }}>
              {lt.lessonLabel} {currentLesson.lessonNumber} {meta.emoji}
            </p>
            <h1 className="leading-tight mt-0.5" style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>
              {currentLesson.title}
            </h1>
          </div>
        </div>

        {/* XP + stat chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Chip emoji="⚡" label={(isAr ? DIFFICULTY_LABEL_AR : DIFFICULTY_LABEL_EN)[currentLesson.difficulty] || ""} />
          <Chip emoji="⏱️" label={`${currentLesson.estimatedMinutes} ${lt.minutes}`} />
          <Chip emoji="⭐" label={`+${totalXp} XP`} />
        </div>
      </div>

      {/* White card body */}
      <div className="flex-1 px-5 pt-6 pb-6 -mt-4" style={{ backgroundColor: "#FFFFFF", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", boxShadow: "0 -4px 20px rgba(0,0,0,0.04)" }}>

        {/* ══════════════════════════════════════════
            Quacky warmup speech bubble
        ══════════════════════════════════════════ */}
        <div className="p-4 mb-5" style={{ backgroundColor: meta.softBg, borderRadius: 20, border: `3px solid ${meta.color}`, boxShadow: `0 4px 0 ${meta.colorDark}` }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: meta.colorDark, marginBottom: 6 }}>
            {lt.quackySays}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.45, color: "#2C2C2A", fontWeight: 600 }}>
            {isAr && lessonAr ? lessonAr.warmUpChallenge : currentLesson.warmUpChallenge}
          </p>
        </div>

        {/* VIDEO PLAYER — auth-gated, shows if video uploaded for this lesson */}
        <div className="px-4 pb-2">
          <LessonVideoPlayer
            lessonId={currentLesson.id}
            lessonTitle={currentLesson.title}
          />
        </div>

        {/* ══════════════════════════════════════════
            PHASE 2: LEARN — What you'll learn
            Gagné Event 3: Recall Prior Knowledge
            Gagné Event 4: Present Content
        ══════════════════════════════════════════ */}
        <PhaseHeader emoji="🎯" label={lt.whatLearn} color={meta.colorDark} />
        <div className="space-y-2.5 mb-6">
          {(isAr && lessonAr ? lessonAr.learningPoints : currentLesson.learningPoints).map((point, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-3"
              style={{ backgroundColor: meta.softBg, borderRadius: 16, border: `2px solid ${meta.color}` }}>
              <div className="flex items-center justify-center shrink-0 rounded-full"
                style={{ width: 28, height: 28, backgroundColor: meta.color, color: "#FFFFFF", fontSize: 13, fontWeight: 900 }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 13, lineHeight: 1.35, color: "#2C2C2A", fontWeight: 700 }}>{point}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            PHASE 3: READING — Flip cards + Empire tip
            Gagné Event 5: Provide Guidance
        ══════════════════════════════════════════ */}
        <PhaseHeader emoji="📖" label={lt.readingPhase} color={meta.colorDark} />
        <div className="mb-6">
          <LessonReadingSection lesson={currentLesson} worldColor={meta.color} onReadingComplete={() => {}} />
        </div>

        {/* ══════════════════════════════════════════
            PHASE 4: TRY — Tool Sandbox
            Gagné Event 6: Elicit Performance
            Gagné Event 7: Provide Feedback
        ══════════════════════════════════════════ */}
        {sandboxConfig && (
          <>
            <PhaseHeader emoji="🛠️" label={lt.sandboxPhase} color={meta.colorDark} />
            <div className="mb-6">
              <ToolSandbox lessonId={currentLesson.id} config={sandboxConfig} onComplete={() => {}} />
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            PHASE 5: MISSIONS — 3 mission cards
            Gagné Event 6 (continued)
        ══════════════════════════════════════════ */}
        <PhaseHeader emoji="🎯" label={lt.missionsPhase} color={meta.colorDark} />
        <div className="space-y-3 mb-6">
          {currentLesson.missions.map((mission, mIdx) => (
            <div key={mission.id} className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:scale-98 transition-transform"
              onClick={() => router.push(`/mission/${mission.id}`)}
              style={{ backgroundColor: mIdx === 0 ? meta.softBg : "#F7F7F7", borderRadius: 18, border: `2.5px solid ${i === 0 ? meta.color : "#E0E0E0"}`, boxShadow: i === 0 ? `0 3px 0 ${meta.colorDark}` : "0 2px 0 #CCCCCC" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: mIdx === 0 ? meta.color : "#E0E0E0", color: mIdx === 0 ? "#FFFFFF" : "#888" }}>
                <span style={{ fontSize: 16 }}>{mIdx === 0 ? "▶" : `${mIdx + 1}`}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: mIdx === 0 ? meta.colorDark : "#888", marginBottom: 1 }}>
                  {lt.mission} {mIdx + 1}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#2C2C2A" }}>{isAr && lessonAr && lessonAr.missions[mIdx] ? lessonAr.missions[mIdx].title : mission.title}</p>
              </div>
              <div className="shrink-0">
                <span style={{ fontSize: 12, fontWeight: 900, color: mIdx === 0 ? meta.colorDark : "#888" }}>
                  +{mission.xpReward || 10} XP
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            Parent tip (collapsible)
        ══════════════════════════════════════════ */}
        <details className="group px-4 py-3 mb-4" style={{ backgroundColor: "#FFFBE6", borderRadius: 16, border: "2px solid #FFE066" }}>
          <summary className="cursor-pointer list-none flex items-center gap-2" style={{ fontSize: 13, fontWeight: 900, color: "#854F0B" }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <span>{lt.parentTip}</span>
            <span className="ml-auto transition-transform group-open:rotate-180" style={{ fontSize: 12 }}>▼</span>
          </summary>
          <p style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8, color: "#2C2C2A", fontWeight: 500 }}>
            {currentLesson.parentTip}
          </p>
        </details>

        {/* Cost info */}
        <p style={{ fontSize: 11, color: "#888780", lineHeight: 1.5, fontWeight: 600, marginBottom: 24 }}>
          <span style={{ fontWeight: 900 }}>💰 {lt.cost}: </span>
          {currentLesson.costInfo}
        </p>

        {/* ══════════════════════════════════════════
            PHASE 6: QUIZ CTA
            Gagné Event 8: Assess Performance
        ══════════════════════════════════════════ */}
        <PhaseHeader emoji="🏆" label={lt.quizPhase} color={meta.colorDark} />
        <div className="space-y-2">
          <button onClick={() => router.push(`/quiz/${currentLesson!.id}`)}
            className="w-full transition-transform active:translate-y-1"
            style={{ height: 64, backgroundColor: meta.color, color: "#FFFFFF", borderRadius: 24, fontSize: 18, fontWeight: 900, boxShadow: `0 5px 0 ${meta.colorDark}`, border: "none", letterSpacing: "0.3px" }}>
            {lt.startQuiz}
          </button>
          <a href={currentLesson.toolUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-3"
            style={{ fontSize: 12, fontWeight: 800, color: "#5F5E5A" }}>
            🔗 {lt.openTool} {currentLesson.toolName}
          </a>
        </div>
      </div>

      {/* Quacky voice — wired to actual locale */}
      <QuackyVoice lessonContext={currentLesson?.title ?? ""} locale={locale as "en" | "ar"} />
    </div>
  );
}

function PhaseHeader({ emoji, label, color }: { emoji: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontSize: 16 }}>{emoji}</span>
      <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "2px", color }}>{label}</p>
      <div className="flex-1 h-px" style={{ backgroundColor: color, opacity: 0.2 }} />
    </div>
  );
}

function Chip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5"
      style={{ backgroundColor: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 999, color: "#FFFFFF", fontSize: 11, fontWeight: 900 }}>
      <span style={{ fontSize: 13 }}>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}