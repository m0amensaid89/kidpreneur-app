"use client";

import { useState } from "react";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { Badge } from "@/lib/badges";
import { awardBadge } from "@/lib/badgeDispatcher";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft, Check, X, ArrowRight } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explainer?: string;
}

interface QuizClientProps {
  lessonId: string;
  worldId?: string;
  lessonTitle?: string;
  quizData: QuizQuestion[];
  userId?: string;
}

// Per-world identity — matches Phase 1 HomeClient + Phase 2 LessonPage
const WORLD_COLORS: Record<string, { color: string; colorDark: string; bg: string }> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", bg: "#FFF7F2" },
  w2: { color: "#7B52EE", colorDark: "#534AB7", bg: "#F3F0FF" },
  w3: { color: "#2E8CE6", colorDark: "#185FA5", bg: "#E6F1FB" },
  w4: { color: "#00A878", colorDark: "#0F6E56", bg: "#E6F6F0" },
  w5: { color: "#6B35FF", colorDark: "#3C3489", bg: "#EEEBFF" },
};

const LETTER_FOR = ["A", "B", "C", "D"];

export function QuizClient({ lessonId, worldId, lessonTitle, quizData, userId }: QuizClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [revealedBadge, setRevealedBadge] = useState<Badge | null>(null);

  const question = quizData[currentIndex];
  const meta = WORLD_COLORS[worldId || "w1"] || WORLD_COLORS.w1;

  const isCorrect = selectedOption !== null && selectedOption === question.correctAnswer;
  const progressValue = ((currentIndex + (hasChecked ? 1 : 0)) / quizData.length) * 100;

  // User taps an option (does NOT submit — they can change their mind before pressing Check)
  const handleOptionSelect = (index: number) => {
    if (hasChecked) return;
    setSelectedOption(index);
  };

  // User presses Check / Continue
  const handleCheck = async () => {
    if (selectedOption === null) return;

    if (!hasChecked) {
      // Checking the answer
      setHasChecked(true);
      const correct = selectedOption === question.correctAnswer;

      if (correct && userId) {
        await supabase.from("xp_log").insert({
          user_id: userId,
          xp_amount: 10,
          source: `quiz_correct_${lessonId}_q${currentIndex}`,
        });
      }
      if (!correct) {
        setWrongAnswersCount((prev) => prev + 1);
      }
      return;
    }

    // Already checked — advance or finish
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasChecked(false);
      return;
    }

    // Quiz complete — route to dispatcher + chat
    if (userId) {
      const isPerfect = wrongAnswersCount === 0 && selectedOption === question.correctAnswer;
      if (isPerfect) {
        await supabase.from("perfect_quizzes").upsert(
          { user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() },
          { onConflict: "user_id,lesson_id" }
        );
      }

      const badge = await awardBadge(supabase, userId, {
        type: "quiz_complete",
        lessonId,
        perfect: isPerfect,
      });

      if (badge) {
        setRevealedBadge(badge);
        return;
      }
    }

    router.push(`/chat?lessonId=${lessonId}`);
  };

  const handleBadgeDismiss = () => {
    setRevealedBadge(null);
    router.push(`/chat?lessonId=${lessonId}`);
  };

  const showExplainer = hasChecked;

  return (
    <div className="flex flex-col min-h-screen pb-8 animate-in fade-in duration-300">

      {/* === Top bar : back + progress === */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center shrink-0 transition"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressValue}%`,
              backgroundColor: meta.color,
            }}
          />
        </div>

        <span className="text-xs font-bold text-muted-foreground shrink-0 tabular-nums">
          {currentIndex + 1} / {quizData.length}
        </span>
      </div>

      {lessonTitle && (
        <p className="px-5 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          {lessonTitle}
        </p>
      )}

      {/* === Question area === */}
      <div className="flex-1 px-5 pt-4 pb-28 space-y-6">

        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <QuackyAvatar
              state={
                !hasChecked
                  ? "thinking"
                  : isCorrect
                    ? "happy"
                    : "sad"
              }
              size="md"
            />
          </div>
          <div className="flex-1 relative bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
            <div
              className="absolute -left-2 top-3 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "8px solid hsl(var(--card))",
              }}
            />
            <p className="text-base font-semibold leading-snug">
              {question.question}
            </p>
          </div>
        </div>

        {/* Option cards */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isTheCorrect = idx === question.correctAnswer;

            // Figure out visual state
            let borderColor = "hsl(var(--border))";
            let bgColor = "hsl(var(--card))";
            let letterBg = "hsl(var(--muted))";
            let letterColor = "hsl(var(--muted-foreground))";
            let textColor = "hsl(var(--foreground))";
            let statusIcon: React.ReactNode = null;

            if (!hasChecked) {
              if (isThisSelected) {
                borderColor = meta.color;
                bgColor = meta.bg;
                letterBg = meta.color;
                letterColor = "white";
              }
            } else {
              if (isTheCorrect) {
                // Show the correct one in green
                borderColor = "#22C55E";
                bgColor = "rgba(34,197,94,0.12)";
                letterBg = "#22C55E";
                letterColor = "white";
                textColor = "#15803D";
                statusIcon = <Check className="w-5 h-5 text-green-500" strokeWidth={3} />;
              } else if (isThisSelected) {
                // The wrong choice the user made
                borderColor = "#EF4444";
                bgColor = "rgba(239,68,68,0.12)";
                letterBg = "#EF4444";
                letterColor = "white";
                textColor = "#B91C1C";
                statusIcon = <X className="w-5 h-5 text-red-500" strokeWidth={3} />;
              } else {
                // Other non-selected options fade
                bgColor = "hsl(var(--card) / 0.5)";
                textColor = "hsl(var(--muted-foreground))";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={hasChecked}
                className="w-full flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all active:scale-[0.98] disabled:cursor-default"
                style={{
                  borderColor,
                  backgroundColor: bgColor,
                  color: textColor,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition"
                  style={{
                    backgroundColor: letterBg,
                    color: letterColor,
                  }}
                >
                  {LETTER_FOR[idx]}
                </div>
                <span className="flex-1 text-[14px] font-semibold leading-snug">
                  {option}
                </span>
                {statusIcon && (
                  <div className="shrink-0">{statusIcon}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* === Fixed bottom CTA bar === */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background border-t border-border/50 px-5 pt-4 pb-6 z-30 transition-colors"
        style={{
          backgroundColor: showExplainer
            ? isCorrect
              ? "rgba(34,197,94,0.08)"
              : "rgba(239,68,68,0.08)"
            : undefined,
        }}
      >
        {showExplainer && question.explainer && (
          <div className="mb-3">
            <p
              className="text-[11px] font-black tracking-wider mb-1"
              style={{
                color: isCorrect ? "#15803D" : "#B91C1C",
              }}
            >
              {isCorrect ? "NICE ONE!" : "NOT QUITE"}
            </p>
            <p className="text-[13px] font-medium text-foreground/90 leading-snug">
              {question.explainer}
            </p>
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={selectedOption === null}
          className="w-full h-14 rounded-2xl text-base font-black text-white transition-transform active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            backgroundColor: showExplainer
              ? isCorrect
                ? "#22C55E"
                : meta.color
              : selectedOption !== null
                ? meta.color
                : "hsl(var(--muted))",
            boxShadow: selectedOption !== null
              ? showExplainer
                ? isCorrect
                  ? "0 4px 0 #15803D"
                  : `0 4px 0 ${meta.colorDark}`
                : `0 4px 0 ${meta.colorDark}`
              : "none",
          }}
        >
          {!hasChecked
            ? "Check"
            : currentIndex < quizData.length - 1
              ? <>Continue <ArrowRight className="w-4 h-4" /></>
              : "Finish quiz →"
          }
        </button>
      </div>

      {revealedBadge && (
        <BadgeReveal badge={revealedBadge} onDismiss={handleBadgeDismiss} />
      )}
    </div>
  );
}
