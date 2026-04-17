"use client";

import { use, useEffect, useState } from "react";
import { TopBar } from "@/components/ui/TopBar";
import { LessonCard } from "@/components/ui/LessonCard";
import { WORLDS } from "@/lib/data/lessons";
import { useRouter } from "next/navigation";

export default function WorldDetailPage({ params }: { params: Promise<{ worldId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const world = WORLDS.find(w => w.id === unwrappedParams.worldId);

  if (!world) {
    return (
      <div className="flex flex-col min-h-full">
        <TopBar title="World Not Found" />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">This world doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-8 animate-in fade-in duration-500">
      <TopBar title={world.name} />

      {/* World Header */}
      <div
        className="w-full pt-8 pb-12 px-6 flex flex-col items-center justify-center text-center text-white relative overflow-hidden"
        style={{ backgroundColor: world.color }}
      >
        {/* Simple decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

        <h1 className="text-3xl font-black mb-2 relative z-10 drop-shadow-md">{world.name}</h1>
        <p className="text-white/90 font-medium max-w-xs relative z-10">{world.description}</p>
        <div className="mt-4 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold relative z-10">
          {world.lessonCount} Lessons
        </div>
      </div>

      <div className="p-4 flex-1 space-y-4 -mt-6 relative z-20">
        {world.lessons.length > 0 ? (
          world.lessons.map((lesson, index) => {
            // As requested: Lesson 1 always available, others unlock sequentially
            // Since we are mocking progress, we just make lesson 1 available and rest locked
            const isAvailable = index === 0;
            const status = isAvailable ? "available" : "locked";

            return (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                type="lesson"
                status={status}
                xpReward={10}
                onClick={() => router.push(`/lesson/${lesson.id}`)}
              />
            );
          })
        ) : (
          <div className="text-center p-8 bg-muted/30 rounded-2xl border-2 border-dashed border-border mt-10">
            <p className="text-muted-foreground font-bold">Lessons coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}