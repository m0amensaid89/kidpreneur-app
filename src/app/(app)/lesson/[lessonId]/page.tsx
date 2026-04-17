"use client";

import { use } from "react";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { WORLDS } from "@/lib/data/lessons";
import { useRouter } from "next/navigation";
import { ChevronRight, Target, Sparkles } from "lucide-react";

export default function LessonIntroPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);

  // Find the lesson in our hardcoded data
  let currentLesson = null;
  let currentWorld = null;

  for (const world of WORLDS) {
    const lesson = world.lessons.find(l => l.id === unwrappedParams.lessonId);
    if (lesson) {
      currentLesson = lesson;
      currentWorld = world;
      break;
    }
  }

  if (!currentLesson || !currentWorld) {
    return (
      <div className="flex flex-col min-h-full">
        <TopBar title="Lesson Not Found" />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">This lesson doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-8 animate-in fade-in duration-500">
      <TopBar title={currentWorld.name} />

      <div className="flex-1 p-4 flex flex-col space-y-6">

        {/* Breadcrumb / Title */}
        <div className="space-y-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
            {currentWorld.name} <ChevronRight className="w-3 h-3 mx-1" /> Lesson
          </div>
          <h1 className="text-3xl font-black">{currentLesson.title}</h1>
        </div>

        {/* Quacky Greeting */}
        <div className="bg-card border border-border/50 rounded-3xl p-4 flex items-start space-x-4 shadow-sm relative overflow-visible">
          <div className="flex-shrink-0 -mt-8 ml-2">
            <QuackyAvatar state="neutral" size="md" />
          </div>
          <div className="flex-1 pt-2">
            <div className="bg-muted/50 rounded-2xl rounded-tl-none p-3 text-sm font-bold relative">
              Today we learn about {currentLesson.toolName}! Ready to dive in?
              {/* Speech bubble pointer */}
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[8px] border-t-muted/50 border-l-[8px] border-l-transparent" />
            </div>
          </div>
        </div>

        {/* What You Will Learn */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold flex items-center text-primary">
            <Target className="w-5 h-5 mr-2" />
            What you will learn
          </h2>
          <ul className="space-y-2">
            {currentLesson.learningPoints.map((point, i) => (
              <li key={i} className="flex items-start bg-card/50 border border-border/30 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mr-3 text-sm font-bold">
                  {i + 1}
                </div>
                <span className="text-sm font-medium pt-0.5">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warm-Up Challenge */}
        <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-4 space-y-2 mt-4">
          <h2 className="text-lg font-bold flex items-center text-accent">
            <Sparkles className="w-5 h-5 mr-2" />
            Warm-Up Challenge
          </h2>
          <p className="text-sm font-medium text-foreground/90 leading-relaxed">
            {currentLesson.warmUpChallenge}
          </p>
        </div>

        <div className="pt-6 mt-auto">
          <Button
            onClick={() => router.push(`/quiz/${currentLesson.id}`)}
            className="w-full h-16 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}