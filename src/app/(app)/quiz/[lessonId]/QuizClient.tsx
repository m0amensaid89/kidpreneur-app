"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { Badge } from "@/lib/badges";
import { awardBadge } from "@/lib/badgeDispatcher";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Check, X, ArrowRight } from "lucide-react";

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

// Per-world identity — same palette as Home + Lesson
const WORLD_COLORS: Record<string, { color: string; colorDark: string; softBg: string }> = {
  w1: { color: "#FF6340", colorDark: "#D85A30", softBg: "#FFE4DC" },
  w2: { color: "#7B52EE", colorDark: "#534AB7", softBg: "#E8E2FF" },
  w3: { color: "#2E8CE6", colorDark: "#1a6fc4", softBg: "#D6EAFB" },
  w4: { color: "#00A878", colorDark: "#0F6E56", softBg: "#D3F0E3" },
  w5: { color: "#6B35FF", colorDark: "#3C3489", softBg: "#DFD4FF" },
};

const LETTER_FOR = ["A", "B", "C", "D"];

// Kids-UI feedback colors
const SUCCESS_COLOR = "#00A878";
const SUCCESS_DARK  = "#0F6E56";
const SUCCESS_SOFT  = "#D3F0E3";
const ERROR_COLOR   = "#E24B4A";
const ERROR_DARK    = "#A32D2D";
const ERROR_SOFT    = "#FCEBEB";

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

  const handleOptionSelect = (index: number) => {
    if (hasChecked) return;
    setSelectedOption(index);
  };

  const handleCheck = async () => {
    if (selectedOption === null) return;

    if (!hasChecked) {
      setHasChecked(true);
      const correct = selectedOption === question.correctAnswer;

      if (correct && userId) {
        await supabase.from("xp_log").insert({
          user_id: userId,
          xp_amount: 10,
          source: `quiz_correct_${lessonId}_q${currentIndex}`,
        });
      }
      if (!correct) setWrongAnswersCount((prev) => prev + 1);
      return;
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasChecked(false);
      return;
    }

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

  // Quacky pose based on state
  const quackyPose = !hasChecked ? "quacky-thinking" : isCorrect ? "quacky-cheering" : "quacky-sad";
  const quackyLabel = !hasChecked ? "Quacky is thinking" : isCorrect ? "Quacky is cheering" : "Quacky is sad";

  return (
    <div
      className="flex flex-col min-h-screen relative animate-in fade-in duration-300"
      style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}
    >
      {/* Top bar — back + chunky progress bar + counter */}
      <div className="flex items-center gap-3 px-4 py-3 pt-5">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition active:scale-95"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 3px 0 #E6D5A8",
          }}
          aria-label="Back"
        >
          <span style={{ fontSize: 20, color: "#854F0B", lineHeight: 1, fontWeight: 900 }}>‹</span>
        </button>

        <div
          className="flex-1 rounded-full overflow-hidden"
          style={{
            height: 12,
            backgroundColor: "#FFFFFF",
            border: `2px solid ${meta.color}`,
          }}
        >
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progressValue}%`,
              backgroundColor: meta.color,
            }}
          />
        </div>

        <span
          className="shrink-0 tabular-nums px-2.5 py-1"
          style={{
            fontSize: 11,
            fontWeight: 900,
            color: meta.colorDark,
            backgroundColor: "#FFFFFF",
            border: `2px solid ${meta.color}`,
            borderRadius: 999,
          }}
        >
          {currentIndex + 1} / {quizData.length}
        </span>
      </div>

      {lessonTitle && (
        <p className="px-5 mt-1" style={{ fontSize: 10, fontWeight: 900, letterSpacing: "1.5px", color: meta.colorDark }}>
          {lessonTitle.toUpperCase()}
        </p>
      )}

      {/* Question area */}
      <div className="flex-1 px-5 pt-4 pb-36 space-y-5">
        {/* Quacky + question bubble */}
        <div className="flex items-start gap-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "#FFFFFF",
              border: `3px solid ${meta.color}`,
              boxShadow: `0 3px 0 ${meta.colorDark}`,
            }}
          >
            <Image
              src={`/quacky/${quackyPose}.png`}
              alt={quackyLabel}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div
            className="flex-1 px-4 py-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              borderTopLeftRadius: 4,
              border: `3px solid ${meta.color}`,
              boxShadow: `0 3px 0 ${meta.colorDark}`,
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.35, color: "#2C2C2A" }}>
              {question.question}
            </p>
          </div>
        </div>

        {/* Option cards */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isTheCorrect = idx === question.correctAnswer;

            let borderColor = "#E6F1FB";
            let bgColor = "#FFFFFF";
            let shadowColor = "#C4D8EC";
            let letterBg = "#F4F8FD";
            let letterColor = "#5F5E5A";
            let textColor = "#2C2C2A";
            let statusIcon: React.ReactNode = null;
            let opacity = 1;

            if (!hasChecked) {
              if (isThisSelected) {
                borderColor = meta.color;
                bgColor = meta.softBg;
                shadowColor = meta.colorDark;
                letterBg = meta.color;
                letterColor = "#FFFFFF";
              }
            } else {
              if (isTheCorrect) {
                borderColor = SUCCESS_COLOR;
                bgColor = SUCCESS_SOFT;
                shadowColor = SUCCESS_DARK;
                letterBg = SUCCESS_COLOR;
                letterColor = "#FFFFFF";
                textColor = SUCCESS_DARK;
                statusIcon = <Check className="w-5 h-5" style={{ color: SUCCESS_COLOR }} strokeWidth={3} />;
              } else if (isThisSelected) {
                borderColor = ERROR_COLOR;
                bgColor = ERROR_SOFT;
                shadowColor = ERROR_DARK;
                letterBg = ERROR_COLOR;
                letterColor = "#FFFFFF";
                textColor = ERROR_DARK;
                statusIcon = <X className="w-5 h-5" style={{ color: ERROR_COLOR }} strokeWidth={3} />;
              } else {
                opacity = 0.55;
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={hasChecked}
                className="w-full flex items-center gap-3 text-left transition-transform active:translate-y-0.5 disabled:cursor-default"
                style={{
                  backgroundColor: bgColor,
                  border: `3px solid ${borderColor}`,
                  borderRadius: 20,
                  padding: "14px 16px",
                  boxShadow: `0 4px 0 ${shadowColor}`,
                  color: textColor,
                  opacity,
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0 rounded-2xl transition"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: letterBg,
                    color: letterColor,
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                >
                  {LETTER_FOR[idx]}
                </div>
                <span className="flex-1" style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>
                  {option}
                </span>
                {statusIcon && <div className="shrink-0">{statusIcon}</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom CTA bar with feedback */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pt-4 pb-6 z-30 transition-colors"
        style={{
          backgroundColor: showExplainer
            ? isCorrect
              ? SUCCESS_SOFT
              : ERROR_SOFT
            : "#FFFFFF",
          borderTop: `3px solid ${showExplainer ? (isCorrect ? SUCCESS_COLOR : ERROR_COLOR) : "#FFE066"}`,
        }}
      >
        {showExplainer && question.explainer && (
          <div className="mb-3">
            <p
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "1.5px",
                color: isCorrect ? SUCCESS_DARK : ERROR_DARK,
                marginBottom: 4,
              }}
            >
              {isCorrect ? "NICE ONE! 🎉" : "NOT QUITE 💭"}
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.4, color: "#2C2C2A", fontWeight: 600 }}>
              {question.explainer}
            </p>
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={selectedOption === null}
          className="w-full transition-transform active:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            height: 64,
            backgroundColor: showExplainer
              ? isCorrect
                ? SUCCESS_COLOR
                : meta.color
              : selectedOption !== null
                ? meta.color
                : "#E6D5A8",
            color: selectedOption !== null || showExplainer ? "#FFFFFF" : "#888780",
            borderRadius: 24,
            fontSize: 18,
            fontWeight: 900,
            boxShadow: selectedOption !== null
              ? showExplainer
                ? isCorrect
                  ? `0 5px 0 ${SUCCESS_DARK}`
                  : `0 5px 0 ${meta.colorDark}`
                : `0 5px 0 ${meta.colorDark}`
              : "none",
            border: "none",
            letterSpacing: "0.3px",
          }}
        >
          {!hasChecked
            ? "Check"
            : currentIndex < quizData.length - 1
              ? <>Continue <ArrowRight className="w-5 h-5" /></>
              : "Finish quiz 🏁"
          }
        </button>
      </div>

      {revealedBadge && (
        <BadgeReveal badge={revealedBadge} onDismiss={handleBadgeDismiss} />
      )}
    </div>
  );
}
