"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { createClient } from "@/lib/supabase/client";
import { Star } from "lucide-react";

export default function MissionCompletePage({ params }: { params: Promise<{ missionId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const supabase = createClient();
  const [hasAwarded, setHasAwarded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch fix: render confetti only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const awardMissionComplete = async () => {
      if (hasAwarded) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 1. Award 30 XP
      await supabase.from("xp_log").insert({
        user_id: session.user.id,
        xp_amount: 30,
        source: `mission_complete_${unwrappedParams.missionId}`
      });

      // 2. Mark mission complete
      await supabase.from("mission_completions").upsert({
        user_id: session.user.id,
        mission_id: unwrappedParams.missionId,
        stars: 3,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,mission_id' }); // Assuming composite key setup

      setHasAwarded(true);
    };

    awardMissionComplete();
  }, [hasAwarded, supabase, unwrappedParams.missionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] pb-16 bg-gradient-to-b from-primary/20 via-background to-background relative overflow-hidden">

      {/* CSS Confetti */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm opacity-0 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: ['#10B981', '#FBBF24', '#3B82F6', '#8B5CF6', '#EF4444'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 w-full max-w-sm z-10 text-center animate-in zoom-in-95 duration-500">

        <div className="animate-bounce">
          <QuackyAvatar state="cheering" size="xl" className="drop-shadow-2xl" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm uppercase tracking-widest">
            Mission Complete!
          </h1>

          <div className="flex justify-center space-x-2 py-2">
            {[1, 2, 3].map((star) => (
              <Star key={star} className="w-12 h-12 fill-accent text-accent animate-in zoom-in spin-in-12 duration-700 delay-300 drop-shadow-md" />
            ))}
          </div>

          <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-3xl p-6 shadow-xl">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">XP Earned</p>
            <p className="text-5xl font-black text-primary">+30</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm px-6 space-y-3 z-10 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-500">
        <Button
          className="w-full h-16 rounded-2xl text-xl font-bold shadow-lg"
          onClick={() => router.push("/world/w1")} // Mock going back to next mission/world
        >
          Next Mission
        </Button>
        <Button
          variant="outline"
          className="w-full h-14 rounded-2xl text-lg font-bold border-2"
          onClick={() => router.push("/home")}
        >
          Back to Map
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