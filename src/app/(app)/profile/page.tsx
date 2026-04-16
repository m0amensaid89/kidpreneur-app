"use client";

import { TopBar } from "@/components/ui/TopBar";
import { XPBar } from "@/components/ui/XPBar";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-full">
      <TopBar title="My Profile" showBack={false} />

      <div className="p-4 flex-1 space-y-6">
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative">
            <QuackyAvatar state="graduation" size="lg" />
            <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-black px-2 py-1 rounded-full border-2 border-background">
              Lvl 2
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Kid Entrepreneur</h2>
            <p className="text-muted-foreground">Joined Today</p>
          </div>
        </div>

        <XPBar xp={450} levelXP={1000} level={2} />

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl font-black text-primary">3</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lessons</span>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl font-black text-accent">1</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">World</span>
            </CardContent>
          </Card>
        </div>

        <div className="pt-8">
          <Button variant="destructive" className="w-full font-bold" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
