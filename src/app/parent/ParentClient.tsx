"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/lib/badges";
import { Card, CardContent } from "@/components/ui/card";
import { TopBar } from "@/components/ui/TopBar";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

interface ChildData {
  name: string;
  streak: number;
  lastActive: string | null;
  totalXp: number;
  level: number;
  missionCount: number;
  badges: Badge[];
}

export function ParentClient({ childId }: { childId: string }) {
  const [data, setData] = useState<ChildData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/parent/${childId}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [childId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <TopBar title="Parent Dashboard" showBack={false} />
        <div className="p-4 flex-1">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Child Not Found</h1>
        <p className="text-slate-500">The requested profile does not exist.</p>
      </div>
    );
  }

  const lastActiveDate = data.lastActive
    ? new Date(data.lastActive).toLocaleDateString()
    : "Never";

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white animate-in fade-in duration-300">
      <TopBar title="Parent Dashboard" showBack={false} />

      <div className="p-6 space-y-6 max-w-md mx-auto w-full flex-1">
        <div className="text-center py-4">
          <h2 className="text-3xl font-black text-slate-800">{data.name}</h2>
          <p className="text-slate-500 font-medium mt-1">
            Last active: {lastActiveDate}
          </p>
        </div>

        <div className="bg-[#10B981]/10 rounded-2xl p-6 border-2 border-[#10B981]/20 text-center">
          <p className="text-sm font-bold text-[#10B981] uppercase tracking-wider mb-1">Current Level</p>
          <div className="text-4xl font-black text-slate-800 mb-2">Level {data.level}</div>
          <div className="text-slate-600 font-bold">{data.totalXp} XP Total</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border-2 border-slate-100 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-3xl font-black text-orange-500">🔥 {data.streak}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Day Streak</span>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-slate-100 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-3xl font-black text-[#10B981]">{data.missionCount}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missions</span>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-bold text-slate-800 px-1 mb-3">Earned Badges</h3>
          {data.badges.length > 0 ? (
            <div className="grid grid-cols-4 gap-3">
              {data.badges.map(badge => (
                <div key={badge.id} className="bg-slate-50 rounded-xl p-2 flex flex-col items-center justify-center text-center space-y-1 border border-slate-100">
                  <span className="text-2xl">{badge.emoji}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-slate-100 border-dashed rounded-xl p-6 text-center">
              <p className="text-slate-500 text-sm font-medium">No badges earned yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
