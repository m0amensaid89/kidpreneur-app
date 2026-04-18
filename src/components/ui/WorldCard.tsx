"use client";

import { Lock, Play } from "lucide-react";

interface WorldCardProps {
  id: string | number;
  name: string;
  description?: string;
  progress: number;       // 0-100
  lessonCount?: number;
  completedLessons?: number;
  isLocked: boolean;
  color: string;          // hero color for this world
  darkColor?: string;     // darker shade for depth shadow
  emoji?: string;
  unlockLabel?: string;
  worldNumber?: number;
  onClick?: () => void;
}

export function WorldCard({
  name,
  progress,
  lessonCount,
  completedLessons,
  isLocked,
  color,
  darkColor,
  emoji = "✦",
  unlockLabel,
  worldNumber,
  onClick,
  description,
}: WorldCardProps) {
  const isActive = !isLocked;
  const shadowColor = darkColor || "#E6D5A8";

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className="w-full flex items-center gap-4 text-left transition-transform active:translate-y-1 disabled:cursor-not-allowed"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        padding: "16px",
        border: isActive ? `3px solid ${color}` : "3px solid #E6D5A8",
        boxShadow: isActive ? `0 5px 0 ${shadowColor}` : "0 3px 0 #E6D5A8",
        opacity: isLocked ? 0.65 : 1,
        cursor: isLocked ? "not-allowed" : "pointer",
      }}
    >
      {/* Colored icon bubble — the world identity */}
      <div
        className="flex items-center justify-center shrink-0 rounded-2xl"
        style={{
          width: 56,
          height: 56,
          backgroundColor: isActive ? color : "#E6D5A8",
          border: isActive ? `3px solid ${shadowColor}` : "3px solid #C4C2B9",
          filter: isLocked ? "grayscale(40%)" : "none",
        }}
      >
        <span style={{ fontSize: 26 }} aria-hidden="true">{emoji}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {worldNumber !== undefined && (
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "1.5px",
              color: isActive ? color : "#888780",
              marginBottom: 2,
            }}
          >
            WORLD {worldNumber}
          </p>
        )}
        <h3
          className="truncate leading-tight"
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#2C2C2A",
          }}
        >
          {name}
        </h3>

        {isLocked ? (
          <p
            className="mt-1"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#888780",
            }}
          >
            🔒 {unlockLabel || "Locked"}
          </p>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{
                height: 8,
                backgroundColor: "#F4F4EC",
                border: `2px solid ${shadowColor}`,
              }}
            >
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            {lessonCount !== undefined && (
              <span
                className="shrink-0"
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: color,
                }}
              >
                {completedLessons ?? 0}/{lessonCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Play / lock circle button */}
      <div
        className="flex items-center justify-center shrink-0 rounded-full"
        style={{
          width: 40,
          height: 40,
          backgroundColor: isActive ? color : "#C4C2B9",
          color: "white",
          boxShadow: isActive ? `0 3px 0 ${shadowColor}` : "none",
        }}
      >
        {isLocked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        )}
      </div>

      <span className="sr-only">{description}</span>
    </button>
  );
}
