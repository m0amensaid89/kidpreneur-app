"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/lib/badges";
import { Sparkles } from "lucide-react";
import { BadgeFrame } from "./BadgeFrame";

interface BadgeRevealProps {
  badge: Badge;
  onDismiss: () => void;
}

// Rarity tokens for confetti, button, and glow
const RARITY_STYLE: Record<string, {
  label: string;
  color: string;
  glow: string;
  confettiCount: number;
  confettiColors: string[];
}> = {
  common: {
    label: "BADGE UNLOCKED",
    color: "#2E8CE6",
    glow: "rgba(46,140,230,0.4)",
    confettiCount: 50,
    confettiColors: ["#2E8CE6", "#FFD700", "#FFFFFF", "#85B7EB"],
  },
  rare: {
    label: "RARE BADGE UNLOCKED",
    color: "#7B52EE",
    glow: "rgba(123,82,238,0.5)",
    confettiCount: 80,
    confettiColors: ["#7B52EE", "#FFD700", "#FFFFFF", "#AFA9EC", "#22d3ee"],
  },
  legendary: {
    label: "LEGENDARY BADGE!",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.6)",
    confettiCount: 120,
    confettiColors: ["#FFD700", "#FFA500", "#FFFFFF", "#FBBF24", "#EF4444", "#2E8CE6", "#7B52EE"],
  },
};

export function BadgeReveal({ badge, onDismiss }: BadgeRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rarity = badge.rarity || "common";
  const style = RARITY_STYLE[rarity] || RARITY_STYLE.common;
  const xpBonus = badge.xpBonus || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-hidden animate-in fade-in duration-300">

      {/* Confetti */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: style.confettiCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm opacity-0 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: style.confettiColors[Math.floor(Math.random() * style.confettiColors.length)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2.5 + Math.random() * 2.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${style.glow} 0%, transparent 55%)`,
        }}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className="relative z-10 bg-card rounded-[32px] p-7 max-w-sm w-full flex flex-col items-center text-center gap-5 animate-in slide-in-from-bottom-8 fade-in zoom-in-95 duration-500 border-2"
        style={{
          borderColor: style.color,
          boxShadow: `0 0 40px ${style.glow}, 0 0 80px ${style.glow}`,
        }}
      >
        {/* Rarity header */}
        <div className="flex items-center gap-1.5">
          {rarity === "legendary" && <Sparkles className="w-4 h-4" style={{ color: style.color }} />}
          <p className="text-xs font-black tracking-[0.22em] animate-pulse" style={{ color: style.color }}>
            {style.label}
          </p>
          {rarity === "legendary" && <Sparkles className="w-4 h-4" style={{ color: style.color }} />}
        </div>

        {/* Framed badge — replaces the old ad-hoc ring. BadgeFrame renders Quacky PNG inside. */}
        <div className="animate-in zoom-in-50 duration-700" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <BadgeFrame badge={badge} size="lg" showText={false} />
        </div>

        {/* Name + description */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black">{badge.name}</h2>
          <p className="text-sm text-muted-foreground font-medium leading-snug px-1">
            {badge.description}
          </p>
        </div>

        {/* XP bonus */}
        {xpBonus > 0 && (
          <div
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black animate-in slide-in-from-bottom-4 fade-in duration-500"
            style={{
              backgroundColor: `${style.color}25`,
              color: style.color,
              animationDelay: "500ms",
              animationFillMode: "both",
            }}
          >
            <span>+{xpBonus}</span>
            <span className="text-[11px] tracking-wider">XP BONUS</span>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onDismiss}
          className="w-full h-14 rounded-2xl text-base font-black text-white transition-transform active:translate-y-0.5"
          style={{
            backgroundColor: style.color,
            boxShadow: `0 4px 0 ${style.color}`,
          }}
        >
          {rarity === "legendary" ? "LEGENDARY!" : "Claim it!"}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes confetti {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(105vh) rotate(720deg); }
        }
        .animate-confetti {
          animation-name: confetti;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />
    </div>
  );
}
