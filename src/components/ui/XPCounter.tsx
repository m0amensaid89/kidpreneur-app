"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface XPCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
}

export function XPCounter({ from, to, duration = 1000, className }: XPCounterProps) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - percentage, 4);

      setCount(Math.floor(from + (to - from) * easeProgress));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return (
    <span
      className={cn(
        "text-[#FBBF24] font-black",
        "animate-[xpBounce_0.5s_ease-out_forwards]",
        className
      )}
    >
      +{count}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes xpBounce {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `
      }} />
    </span>
  );
}
