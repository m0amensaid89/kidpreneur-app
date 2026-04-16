"use client";

import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full">
      <TopBar title="Lesson" />

      <div className="flex-1 p-4 flex flex-col items-center justify-center space-y-8 text-center animate-in fade-in zoom-in duration-500">
        <QuackyAvatar state="thinking" size="xl" />

        <div className="space-y-4">
          <h1 className="text-2xl font-black">Every business starts with an idea!</h1>
          <p className="text-lg text-muted-foreground">An idea is just a thought about how to make something better, or a new way to solve a problem.</p>
        </div>

        <div className="w-full pt-8">
          <Button onClick={() => router.back()} className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/25">
            Complete (+50 XP)
          </Button>
        </div>
      </div>
    </div>
  );
}
