"use client";

import { useState } from "react";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { Badge } from "@/lib/badges";
import { awardBadge } from "@/lib/badgeDispatcher";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizClientProps {
  lessonId: string;
  quizData: QuizQuestion[];
  userId?: string;
}

export function QuizClient({ lessonId, quizData, userId }: QuizClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [resultState, setResultState] = useState<"idle" | "correct" | "wrong">("idle");
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [revealedBadge, setRevealedBadge] = useState<Badge | null>(null);

  const question = quizData[currentIndex];
  const progressValue = ((currentIndex) / quizData.length) * 100;

  const handleOptionSelect = async (index: number) => {
    if (resultState !== "idle") return;

    setSelectedOption(index);
    const isCorrect = index === question.correctAnswer;
    setResultState(isCorrect ? "correct" : "wrong");

    if (isCorrect && userId) {
      await supabase.from("xp_log").insert({
        user_id: userId,
        xp_amount: 10,
        source: `quiz_correct_${lessonId}_q${currentIndex}`
      });
    }

    if (!isCorrect) {
      setWrongAnswersCount((prev) => prev + 1);
    }

    setTimeout(async () => {
      if (currentIndex < quizData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setResultState("idle");
      } else {
        // Quiz complete. Route through the dispatcher.
        if (userId) {
          // Track perfect quizzes separately so the dispatcher can count them.
          const isPerfect = isCorrect && wrongAnswersCount === 0;
          if (isPerfect) {
            await supabase.from("perfect_quizzes").upsert(
              { user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() },
              { onConflict: "user_id,lesson_id" }
            );
          }

          const badge = await awardBadge(supabase, userId, {
            type: "quiz_complete",
            lessonId,
            perfect: isPerfect
          });

          if (badge) {
            setRevealedBadge(badge);
            return;
          }
        }

        router.push(`/chat?lessonId=${lessonId}`);
      }
    }, 2000);
  };

  const handleBadgeDismiss = () => {
    setRevealedBadge(null);
    router.push(`/chat?lessonId=${lessonId}`);
  };

  return (
    <div className={`flex flex-col min-h-full pb-8 transition-colors duration-500 animate-in fade-in ${resultState === "correct" ? "bg-green-500/10" : resultState === "wrong" ? "bg-red-500/10" : ""}`}>
      <TopBar title={`Question ${currentIndex + 1} of ${quizData.length}`} />

      <div className="px-4 py-3">
        <Progress value={progressValue} className="h-3" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 text-center">
        <QuackyAvatar
          state={resultState === "correct" ? "happy" : resultState === "wrong" ? "sad" : "thinking"}
          size="lg"
        />

        <h2 className="text-2xl font-bold max-w-md">
          {question.question}
        </h2>

        <div className="w-full max-w-md space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectChoice = idx === question.correctAnswer;
            let buttonClass = "w-full h-auto min-h-16 text-left whitespace-normal p-4 rounded-2xl border-2 font-semibold transition-all";

            if (resultState !== "idle") {
              if (isCorrectChoice) {
                buttonClass += " bg-green-500/20 border-green-500 text-green-700 dark:text-green-300";
              } else if (isSelected) {
                buttonClass += " bg-red-500/20 border-red-500 text-red-700 dark:text-red-300";
              } else {
                buttonClass += " opacity-50 border-border";
              }
            } else {
              buttonClass += " hover:border-primary hover:bg-primary/5 border-border";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={buttonClass}
                disabled={resultState !== "idle"}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {revealedBadge && (
        <BadgeReveal badge={revealedBadge} onDismiss={handleBadgeDismiss} />
      )}
    </div>
  );
}
