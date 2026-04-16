"use client";

import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full">
      <TopBar title="Quiz Time" />

      <div className="flex-1 p-4 flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Question 1/3</span>
          <h1 className="text-2xl font-black">What is an idea?</h1>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full h-auto p-4 justify-start text-left text-lg font-medium rounded-xl border-2">
            A type of food
          </Button>
          <Button variant="outline" className="w-full h-auto p-4 justify-start text-left text-lg font-medium rounded-xl border-2 hover:border-primary/50 hover:bg-primary/5">
            A thought on how to solve a problem
          </Button>
          <Button variant="outline" className="w-full h-auto p-4 justify-start text-left text-lg font-medium rounded-xl border-2">
            A video game
          </Button>
        </div>

        <div className="pt-4">
          <Button onClick={() => router.back()} className="w-full h-12 text-lg font-bold rounded-xl shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/25">
            Check Answer
          </Button>
        </div>
      </div>
    </div>
  );
}
