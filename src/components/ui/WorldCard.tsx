"use client";

import { Card } from "@/components/ui/card";
import { Lock, Unlock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorldCardProps {
  id: string | number;
  name: string;
  description?: string;
  progress: number;
  isLocked: boolean;
  onClick?: () => void;
}

export function WorldCard({ id, name, description, progress, isLocked, onClick }: WorldCardProps) {
  return (
    <Card
      onClick={isLocked ? undefined : onClick}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isLocked ? "opacity-75 cursor-not-allowed bg-muted/50 grayscale-[50%]" : "cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50"
      )}
    >
      <div className="p-5 flex items-center space-x-4">
        <div className={cn(
          "flex items-center justify-center w-16 h-16 rounded-2xl border-2 shadow-inner",
          isLocked ? "bg-muted border-muted-foreground/20 text-muted-foreground" : "bg-primary/20 border-primary text-primary"
        )}>
          {isLocked ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-xl leading-tight">{name}</h3>
          {description && <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>}

          {!isLocked && (
            <div className="pt-2 flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-primary">{progress}%</span>
            </div>
          )}
        </div>

        {!isLocked && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground shadow-sm">
            <Play className="w-5 h-5 ml-1" fill="currentColor" />
          </div>
        )}
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
          <div className="bg-background/80 px-4 py-2 rounded-full border border-border/50 text-sm font-bold text-muted-foreground flex items-center shadow-sm">
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </div>
        </div>
      )}
    </Card>
  );
}
