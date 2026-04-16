"use client";

import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";

export default function MissionPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full">
      <TopBar title="Mission" />

      <div className="flex-1 p-4 flex flex-col space-y-6">
        <div className="bg-orange-500/10 border-2 border-orange-500/20 rounded-2xl p-6 text-center space-y-4">
          <div className="flex justify-center">
             <QuackyAvatar state="pointing" size="lg" />
          </div>
          <h1 className="text-2xl font-black text-orange-500">Your First Mission!</h1>
          <p className="font-medium">Look around your house and write down 3 things that frustrate you. These are problems waiting for a solution!</p>
        </div>

        <div className="flex-1 space-y-4">
          <textarea
            className="w-full h-40 bg-background/50 border-2 border-border/50 rounded-xl p-4 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            placeholder="I get frustrated when..."
          />
        </div>

        <Button onClick={() => router.back()} className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/25">
          Submit Mission (+200 XP)
        </Button>
      </div>
    </div>
  );
}
