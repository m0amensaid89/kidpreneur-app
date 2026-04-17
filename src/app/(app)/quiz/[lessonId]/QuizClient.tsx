"use client";

import { useState } from "react";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { XPCounter } from "@/components/ui/XPCounter";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { BADGE_FIRST_QUIZ, BADGE_PERFECT_QUIZ, Badge } from "@/lib/badges";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [revealedBadge, setRevealedBadge] = useState<Badge | null>(null);

  const question = quizData[currentIndex];
  const progressValue = ((currentIndex) / quizData.length) * 100;

  const handleOptionSelect = async (index: number) => {
    if (resultState !== "idle") return; // Prevent double clicks

    setSelectedOption(index);
    const isCorrect = index === question.correctAnswer;
    setResultState(isCorrect ? "correct" : "wrong");

    if (isCorrect && userId) {
      // Award 10 XP
      await supabase.from("xp_log").insert({
        user_id: userId,
        xp_amount: 10,
        source: `quiz_correct_${lessonId}_q${currentIndex}`
      });
    }

    if (!isCorrect) {
      setWrongAnswersCount(prev => prev + 1);
    }

    // Move to next after delay
    setTimeout(async () => {
      if (currentIndex < quizData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setResultState("idle");
      } else {
        // Quiz is over
        if (userId) {
           // Check for badges
           let earnedBadge: Badge | null = null;

           // First quiz badge check
           const { data: firstQuizData } = await supabase
             .from("user_badges")
             .select("badge_id")
             .eq("user_id", userId)
             .eq("badge_id", BADGE_FIRST_QUIZ.id)
             .single();

           if (!firstQuizData) {
             earnedBadge = BADGE_FIRST_QUIZ;
             await supabase.from("user_badges").upsert({
               user_id: userId,
               badge_id: BADGE_FIRST_QUIZ.id,
               earned_at: new Date().toISOString()
             }, { onConflict: "user_id,badge_id" });
           }

           // Perfect quiz badge check
           if (isCorrect && wrongAnswersCount === 0) {
              const { data: perfectQuizData } = await supabase
                .from("user_badges")
                .select("badge_id")
                .eq("user_id", userId)
                .eq("badge_id", BADGE_PERFECT_QUIZ.id)
                .single();

              if (!perfectQuizData) {
                 // Prioritize showing perfect quiz badge if both earned
                 earnedBadge = BADGE_PERFECT_QUIZ;
                 await supabase.from("user_badges").upsert({
                   user_id: userId,
                   badge_id: BADGE_PERFECT_QUIZ.id,
                   earned_at: new Date().toISOString()
                 }, { onConflict: "user_id,badge_id" });
              }
           }

           if (earnedBadge) {
             setRevealedBadge(earnedBadge);
             return; // wait for badge dismiss
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

      <div className="flex-1 p-6 flex flex-col items-center justify-start space-y-8 mt-4">

        {/* Avatar Area */}
        <div className={`transition-transform duration-300 ${resultState === "wrong" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
          <QuackyAvatar
            state={resultState === "correct" ? "happy" : resultState === "wrong" ? "sad" : "neutral"}
            size="lg"
          />
        </div>

        {/* Question text */}
        <h2 className="text-2xl font-black text-center min-h-[5rem] flex items-center justify-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="w-full max-w-sm space-y-4">
          {question.options.map((option, index) => {

            let btnClass = "border-border hover:border-primary/50 bg-card";

            if (resultState !== "idle") {
              if (index === question.correctAnswer) {
                // Highlight correct answer
                btnClass = "border-green-500 bg-green-500/20 text-green-500";
              } else if (index === selectedOption) {
                // Highlight selected wrong answer
                btnClass = "border-red-500 bg-red-500/20 text-red-500";
              } else {
                // Dim others
                btnClass = "opacity-50 border-border bg-card";
              }
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={`w-full h-auto min-h-[4rem] py-4 rounded-2xl text-lg font-bold border-2 whitespace-normal transition-all duration-300 ${btnClass}`}
                onClick={() => handleOptionSelect(index)}
                disabled={resultState !== "idle"}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {/* Toasts / Feedback messages */}
        {resultState === "correct" && (
          <div className="fixed bottom-24 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg animate-in slide-in-from-bottom-5 fade-in shadow-lg shadow-green-500/20 flex items-center">
            <span className="text-2xl mr-2">✨</span> Correct! <XPCounter from={0} to={10} className="ml-1" /> XP
          </div>
        )}

        {resultState === "wrong" && (
          <div className="fixed bottom-24 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg animate-in slide-in-from-bottom-5 fade-in shadow-lg shadow-red-500/20 flex items-center">
            <span className="text-2xl mr-2">❌</span> Oops! Let's try the next one.
          </div>
        )}
      </div>

      {revealedBadge && (
        <BadgeReveal badge={revealedBadge} onDismiss={handleBadgeDismiss} />
      )}
    </div>
  );
}