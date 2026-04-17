"use client";

import { TopBar } from "@/components/ui/TopBar";
import { XPBar } from "@/components/ui/XPBar";
import { WorldCard } from "@/components/ui/WorldCard";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { useRouter } from "next/navigation";
import { WORLDS } from "@/lib/data/lessons";
import { Flame } from "lucide-react";

interface HomeClientProps {
  name: string;
  totalXp: number;
  currentStreak: number;
  level: number;
  levelXpStart: number;
  nextLevelXpStart: number;
}

export function HomeClient({ name, totalXp, currentStreak, level, levelXpStart, nextLevelXpStart }: HomeClientProps) {
  const router = useRouter();

  // Calculate progress relative to current level bracket
  const currentBracketXp = totalXp - levelXpStart;
  const bracketTotalXp = nextLevelXpStart - levelXpStart;

  // Handle edge case where max level is reached
  const xpBarCurrent = currentBracketXp;
  const xpBarTotal = bracketTotalXp > 0 ? bracketTotalXp : totalXp;

  return (
    <div className="flex flex-col min-h-full pb-8 animate-in fade-in duration-500">
      <TopBar
        title={`Hey ${name}!`}
        showBack={false}
        rightElement={
          <div className="flex items-center space-x-1 bg-orange-500/10 px-2 py-1 rounded-full text-orange-500 font-bold border border-orange-500/20">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span className="text-sm">{currentStreak}</span>
          </div>
        }
      />

      <div className="p-4 space-y-6 flex-1 relative">
        <XPBar xp={xpBarCurrent} levelXP={xpBarTotal} level={level} />

        <div className="space-y-4 pt-2 relative z-10 pb-24">
          {/* Path connecting worlds */}
          <div className="absolute left-12 top-0 bottom-0 w-2 bg-muted-foreground/20 rounded-full z-0 translate-x-[-4px]" />

          {WORLDS.map((world, index) => {
            // Only Canvas Kingdom (index 0) is unlocked initially
            const isLocked = index > 0;
            return (
              <div key={world.id} className="relative z-10">
                <WorldCard
                  id={world.id}
                  name={world.name}
                  description={world.description}
                  progress={0} // Mock progress for now
                  isLocked={isLocked}
                  onClick={() => router.push(`/world/${world.id}`)}
                />
              </div>
            );
          })}
        </div>

        {/* Floating Quacky */}
        <div className="fixed bottom-20 right-4 z-20 pointer-events-none drop-shadow-xl animate-in slide-in-from-bottom-10 fade-in duration-700">
          <QuackyAvatar state="pointing" size="md" className="translate-y-2 translate-x-2" />
        </div>
      </div>
    </div>
  );
}