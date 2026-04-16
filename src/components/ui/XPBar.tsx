"use client";

import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

interface XPBarProps {
  xp: number;
  levelXP: number; // XP needed for next level
  level: number;
}

export function XPBar({ xp, levelXP, level }: XPBarProps) {
  const progress = Math.min(100, Math.max(0, (xp / levelXP) * 100));

  return (
    <div className="flex items-center space-x-3 w-full bg-card p-3 rounded-2xl border border-border/50">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground font-black text-lg border-2 border-background shadow-sm">
        {level}
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="flex justify-between text-xs font-bold px-1">
          <span className="text-muted-foreground flex items-center">
            <Zap className="w-3 h-3 mr-1 text-accent fill-accent" />
            XP
          </span>
          <span className="text-primary">{xp} / {levelXP}</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>
    </div>
  );
}
