"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  id: string | number;
  title: string;
  type: "lesson" | "quiz" | "mission";
  status: "locked" | "available" | "completed";
  xpReward: number;
  onClick?: () => void;
}

export function LessonCard({ title, type, status, xpReward, onClick }: LessonCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <Card
      onClick={isLocked ? undefined : onClick}
      className={cn(
        "relative overflow-hidden transition-all duration-300 group",
        isLocked ? "opacity-75 cursor-not-allowed bg-muted/50" : "cursor-pointer hover:border-primary/50",
        isCompleted ? "border-primary/30 bg-primary/5" : ""
      )}
    >
      <div className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          {isLocked ? (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Lock className="w-5 h-5" />
            </div>
          ) : isCompleted ? (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-0.5 min-w-0">
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm",
              type === "lesson" ? "bg-blue-500/20 text-blue-500" :
              type === "quiz" ? "bg-purple-500/20 text-purple-500" :
              "bg-orange-500/20 text-orange-500"
            )}>
              {type}
            </span>
          </div>
          <h4 className={cn(
            "font-bold text-base truncate",
            isLocked ? "text-muted-foreground" : "text-foreground"
          )}>
            {title}
          </h4>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end">
          <span className="text-xs font-bold text-accent">+{xpReward} XP</span>
        </div>
      </div>
    </Card>
  );
}
