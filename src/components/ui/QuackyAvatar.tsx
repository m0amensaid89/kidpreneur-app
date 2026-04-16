"use client";

import { cn } from "@/lib/utils";

type QuackyState = "neutral" | "pointing" | "happy" | "sad" | "thinking" | "amazed" | "cheering" | "graduation";

interface QuackyAvatarProps {
  state?: QuackyState;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

export function QuackyAvatar({ state = "neutral", className, size = "md" }: QuackyAvatarProps) {
  // Using standard img tag per requirements for transparent background
  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      <img
        src={`/quacky/quacky-${state}.png`}
        alt={`Quacky ${state}`}
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to placeholder if image not found
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement?.setAttribute('data-error', 'true');
        }}
      />
      {/* Placeholder that shows when image is missing */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-2xl border-2 border-dashed border-muted-foreground/30 text-xs font-bold text-center text-muted-foreground opacity-0 [[data-error=true]_&]:opacity-100">
        [Quacky {state}]
      </div>
    </div>
  );
}
