"use client";

import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { LessonCard } from "@/components/ui/LessonCard";

const MOCK_LESSONS = [
  { id: 1, title: "What is an Idea?", type: "lesson" as const, status: "completed" as const, xpReward: 50 },
  { id: 2, title: "Brainstorming 101", type: "lesson" as const, status: "available" as const, xpReward: 50 },
  { id: 3, title: "Idea Quiz", type: "quiz" as const, status: "locked" as const, xpReward: 100 },
  { id: 4, title: "Find a Problem", type: "mission" as const, status: "locked" as const, xpReward: 200 },
];

export default function WorldPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full">
      <TopBar title={`World ${params.worldId}`} />

      <div className="p-4 space-y-4">
        <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-2 mb-6 shadow-sm">
          <h2 className="text-2xl font-black text-primary">Idea Island</h2>
          <p className="text-sm text-muted-foreground">Complete these lessons to unlock the next world!</p>
        </div>

        <div className="space-y-3">
          {MOCK_LESSONS.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              type={lesson.type}
              status={lesson.status}
              xpReward={lesson.xpReward}
              onClick={() => {
                if (lesson.type === 'lesson') router.push(`/lesson/${lesson.id}`);
                else if (lesson.type === 'quiz') router.push(`/quiz/${lesson.id}`);
                else router.push(`/mission/${lesson.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
