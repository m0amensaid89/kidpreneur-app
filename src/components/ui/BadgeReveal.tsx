"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/lib/badges";
import { Button } from "./button";

interface BadgeRevealProps {
  badge: Badge;
  onDismiss: () => void;
}

export function BadgeReveal({ badge, onDismiss }: BadgeRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
      {/* CSS Confetti */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm opacity-0 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: ['#10B981', '#FBBF24', '#3B82F6', '#8B5CF6', '#EF4444'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-card/90 border-2 border-primary/50 shadow-2xl shadow-primary/20 rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center space-y-6 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-500 relative z-10">
        <h3 className="text-xl font-black text-accent tracking-widest uppercase animate-pulse">
          Badge Unlocked!
        </h3>

        <div className="text-[80px] leading-none drop-shadow-2xl animate-in zoom-in-50 spin-in-12 duration-700 delay-300">
          {badge.emoji}
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{badge.name}</h2>
          <p className="text-muted-foreground font-medium">{badge.description}</p>
        </div>

        <Button
          onClick={onDismiss}
          className="w-full h-14 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          Awesome!
        </Button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confetti {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
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
