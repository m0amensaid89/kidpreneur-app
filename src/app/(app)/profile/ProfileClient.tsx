"use client";

import { TopBar } from "@/components/ui/TopBar";
import { XPBar } from "@/components/ui/XPBar";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Badge } from "@/lib/badges";

interface ProfileClientProps {
  user: any;
  profile: any;
  totalXp: number;
  levelData: { level: number; currentLevelXpStart: number; nextLevelXpStart: number; };
  earnedBadges: Badge[];
  missionCount: number;
}

export function ProfileClient({ user, profile, totalXp, levelData, earnedBadges, missionCount }: ProfileClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const username = profile?.username || "Kid Entrepreneur";
  const streak = profile?.streak || 0;

  return (
    <div className="flex flex-col min-h-full pb-20">
      <TopBar title="My Profile" showBack={false} />

      <div className="p-4 flex-1 space-y-6">
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative">
            <QuackyAvatar state="happy" size="lg" />
            <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-black px-2 py-1 rounded-full border-2 border-background shadow-sm">
              Lvl {levelData.level}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{username}</h2>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <span className="text-muted-foreground text-sm font-medium">Age 8-15</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-orange-500 font-bold text-sm">
                 🔥 {streak} Day Streak
              </div>
            </div>
          </div>
        </div>

        <XPBar xp={totalXp} levelXP={levelData.nextLevelXpStart} level={levelData.level} />

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border-border/50 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl font-black text-primary">{missionCount}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Missions</span>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl font-black text-accent">{earnedBadges.length}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Badges</span>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <div className="space-y-3 pt-2">
           <h3 className="text-lg font-bold px-1">My Badges</h3>
           {earnedBadges.length > 0 ? (
             <div className="grid grid-cols-3 gap-3">
               {earnedBadges.map(badge => (
                 <div key={badge.id} className="bg-card border border-border/50 rounded-2xl p-3 flex flex-col items-center justify-center text-center space-y-2 shadow-sm aspect-square">
                   <span className="text-3xl">{badge.emoji}</span>
                   <span className="text-[10px] font-bold leading-tight uppercase text-muted-foreground">{badge.name}</span>
                 </div>
               ))}
             </div>
           ) : (
             <div className="bg-card border border-border/50 border-dashed rounded-2xl p-6 text-center shadow-sm">
               <p className="text-muted-foreground text-sm font-medium">Complete missions and quizzes to earn badges!</p>
             </div>
           )}
        </div>

        <div className="pt-8">
          <Button variant="destructive" className="w-full font-bold h-12 rounded-xl shadow-sm" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
