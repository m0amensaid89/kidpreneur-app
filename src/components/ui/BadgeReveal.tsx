"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/lib/badges";
import { Sparkles } from "lucide-react";

interface BadgeRevealProps {
  badge: Badge;
  onDismiss: () => void;
}

// Rarity visual tokens — legendary gets the biggest treatment
const RARITY_STYLE: Record<string, {
  label: string;
  color: string;
  glow: string;
  ringBg: string;
  confettiCount: number;
  confettiColors: string[];
}> = {
  common: {
    label: "BADGE UNLOCKED",
    color: "#2E8CE6", // Quacky blue
    glow: "rgba(46,140,230,0.4)",
    ringBg: "rgba(46,140,230,0.12)",
    confettiCount: 50,
    confettiColors: ["#2E8CE6", "#FFD700", "#FFFFFF", "#85B7EB"],
  },
  rare: {
    label: "RARE BADGE UNLOCKED",
    color: "#7B52EE", // purple
    glow: "rgba(123,82,238,0.5)",
    ringBg: "rgba(123,82,238,0.15)",
    confettiCount: 80,
    confettiColors: ["#7B52EE", "#FFD700", "#FFFFFF", "#AFA9EC", "#22d3ee"],
  },
  legendary: {
    label: "LEGENDARY BADGE!",
    color: "#FFD700", // gold
    glow: "rgba(255,215,0,0.6)",
    ringBg: "rgba(255,215,0,0.15)",
    confettiCount: 120,
    confettiColors: ["#FFD700", "#FFA500", "#FFFFFF", "#FBBF24", "#EF4444", "#2E8CE6", "#7B52EE"],
  },
};

export function BadgeReveal({ badge, onDismiss }: BadgeRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // No auto-dismiss — kids press the button when ready.
  }, []);

  const rarity = badge.rarity || "common";
  const style = RARITY_STYLE[rarity] || RARITY_STYLE.common;
  const xpBonus = badge.xpBonus || 0;

  // Prefer artUrl (Quacky PNG) when available, fall back to emoji
  const hasArt = !!badge.artUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-hidden animate-in fade-in duration-300">

      {/* Confetti layer */}
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

      {/* Radial glow behind modal */}
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
        {/* Rarity label */}
        <div className="flex items-center gap-1.5">
          {rarity === "legendary" && (
            <Sparkles className="w-4 h-4" style={{ color: style.color }} />
          )}
          <p
            className="text-xs font-black tracking-[0.22em] animate-pulse"
            style={{ color: style.color }}
          >
            {style.label}
          </p>
          {rarity === "legendary" && (
            <Sparkles className="w-4 h-4" style={{ color: style.color }} />
          )}
        </div>

        {/* Badge art container */}
        <div
          className="relative rounded-full flex items-center justify-center animate-in zoom-in-50 duration-700 delay-200"
          style={{
            width: "180px",
            height: "180px",
            backgroundColor: style.ringBg,
            border: `3px solid ${style.color}`,
            animationDelay: "200ms",
            animationFillMode: "both",
          }}
        >
          {/* Outer rotating ring for legendary */}
          {rarity === "legendary" && (
            <div
              className="absolute inset-0 rounded-full animate-spin-slow pointer-events-none"
              style={{
                border: `2px dashed ${style.color}`,
                opacity: 0.6,
                animationDuration: "8s",
              }}
            />
          )}

          {hasArt ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={badge.artUrl!}
              alt={badge.name}
              className="w-[140px] h-[140px] object-contain drop-shadow-lg animate-in spin-in-12 duration-700 delay-300"
            />
          ) : (
            <div
              className="text-[92px] leading-none drop-shadow-2xl animate-in spin-in-12 duration-700 delay-300"
              aria-hidden="true"
            >
              {badge.emoji}
            </div>
          )}
        </div>

        {/* Name + description */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black">{badge.name}</h2>
          <p className="text-sm text-muted-foreground font-medium leading-snug px-1">
            {badge.description}
          </p>
        </div>

        {/* XP bonus pill */}
        {xpBonus > 0 && (
          <div
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black animate-in slide-in-from-bottom-4 fade-in duration-500 delay-500"
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
            filter: "brightness(1)",
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
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow linear infinite; }
      `}} />
    </div>
  );
}
