"use client";

import { Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorldCardProps {
  id: string | number;
  name: string;
  description?: string;
  progress: number;       // 0-100
  lessonCount?: number;
  completedLessons?: number;
  isLocked: boolean;
  color: string;          // hex hero color for this world
  emoji?: string;         // temporary visual identity until Quacky world badges land
  unlockLabel?: string;   // e.g. "Unlocks at 2,000 XP"
  worldNumber?: number;
  onClick?: () => void;
}

/**
 * Helpers to derive soft bg + dark text from the world's hero color.
 * We use the hero color for the icon tile and accent stroke, and
 * apply an 18% alpha wash behind the card for active states.
 */
function hexWithAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function WorldCard({
  name,
  description,
  progress,
  lessonCount,
  completedLessons,
  isLocked,
  color,
  emoji = "✦",
  unlockLabel,
  worldNumber,
  onClick,
}: WorldCardProps) {
  const isActive = !isLocked;

  // Card styling depends on state
  const cardStyle: React.CSSProperties = isActive
    ? {
        backgroundColor: hexWithAlpha(color, 0.08),
        borderColor: color,
      }
    : {
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
      };

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={cn(
        "w-full flex items-center gap-4 rounded-3xl border-2 p-4 transition-all duration-300 text-left",
        isActive
          ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          : "cursor-not-allowed opacity-70",
      )}
      style={cardStyle}
    >
      {/* Colored icon tile */}
      <div
        className="flex items-center justify-center w-14 h-14 rounded-2xl text-2xl shrink-0 shadow-sm"
        style={{
          backgroundColor: isActive ? color : "hsl(var(--muted))",
          filter: isLocked ? "grayscale(60%)" : "none",
        }}
      >
        <span>{emoji}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {worldNumber !== undefined && (
          <p
            className="text-[10px] font-bold tracking-widest mb-0.5"
            style={{ color: isActive ? color : "hsl(var(--muted-foreground))" }}
          >
            WORLD {worldNumber}
          </p>
        )}
        <h3 className="text-base font-bold leading-tight text-foreground truncate">
          {name}
        </h3>

        {isLocked ? (
          <p className="text-xs text-muted-foreground font-semibold mt-1">
            {unlockLabel || "Locked"}
          </p>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-black/20">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            {lessonCount !== undefined && (
              <span
                className="text-[11px] font-bold shrink-0"
                style={{ color }}
              >
                {completedLessons ?? 0} / {lessonCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right-side action indicator */}
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
        style={{
          backgroundColor: isActive ? color : "hsl(var(--muted))",
          color: isActive ? "white" : "hsl(var(--muted-foreground))",
        }}
      >
        {isLocked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        )}
      </div>

      {/* Suppress unused `description` warning; kept in API for backwards compat */}
      <span className="sr-only">{description}</span>
    </button>
  );
}
