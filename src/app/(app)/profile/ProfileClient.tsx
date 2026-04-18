"use client";

import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { BadgeFrame } from "@/components/ui/BadgeFrame";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Badge } from "@/lib/badges";
import { Settings, Share2, LogOut, Lock } from "lucide-react";

interface ProfileClientProps {
  user: User;
  profile: { name?: string; streak?: number; age_range?: string } | null;
  totalXp: number;
  levelData: {
    level: number;
    currentLevelXpStart: number;
    nextLevelXpStart: number;
  };
  allBadges: Badge[];
  earnedBadgeIds: string[];
  missionCount: number;
}

// Rarity badge tile color
const RARITY_COLOR: Record<string, { color: string; dark: string }> = {
  common: { color: "#2E8CE6", dark: "#1a6fc4" },
  rare: { color: "#7B52EE", dark: "#534AB7" },
  legendary: { color: "#FFC43D", dark: "#BA7517" },
};

const CATEGORY_LABEL: Record<string, string> = {
  first_time: "First Steps 🌱",
  mastery: "Mastery 🏆",
  streak: "Streaks 🔥",
  world_completion: "World Conquests 🌍",
  empire: "Empire 👑",
};

const CATEGORY_ORDER = ["first_time", "mastery", "streak", "world_completion", "empire"];

export function ProfileClient({
  user,
  profile,
  totalXp,
  levelData,
  allBadges,
  earnedBadgeIds,
  missionCount,
}: ProfileClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const name = profile?.name || "Kid Founder";
  const streak = profile?.streak || 0;
  const ageRange = profile?.age_range;

  const earnedSet = new Set(earnedBadgeIds);
  const earnedCount = earnedBadgeIds.length;

  const bracketXp = totalXp - levelData.currentLevelXpStart;
  const bracketTotal = levelData.nextLevelXpStart - levelData.currentLevelXpStart;
  const xpPct = bracketTotal > 0 ? Math.min(100, (bracketXp / bracketTotal) * 100) : 100;

  const byCategory: Record<string, Badge[]> = {};
  for (const cat of CATEGORY_ORDER) byCategory[cat] = [];
  for (const b of allBadges) {
    if (byCategory[b.category]) byCategory[b.category].push(b);
  }

  return (
    <div
      className="flex flex-col min-h-full relative overflow-hidden pb-10 animate-in fade-in duration-500"
      style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-4 w-16 h-16 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.4 }} aria-hidden="true" />
      <div className="absolute top-60 left-6 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.4 }} aria-hidden="true" />

      {/* Hero — Quacky portrait in big white circle */}
      <div className="relative z-10 pt-6 pb-5 px-6 text-center">
        <p className="text-xs mb-3" style={{ color: "#378ADD", fontWeight: 900, letterSpacing: "2px" }}>
          MY PROFILE ✨
        </p>

        {/* Quacky with level badge overlay */}
        <div className="relative inline-block">
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#FFFFFF",
              border: "5px solid #2E8CE6",
              boxShadow: "0 6px 0 #1a6fc4",
            }}
          >
            <Image
              src="/quacky/quacky-happy.png"
              alt="Your Quacky"
              width={110}
              height={110}
              className="object-contain"
              priority
            />
          </div>

          {/* Level badge overlay */}
          <div
            className="absolute -bottom-1 -right-1 w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#FFC43D",
              border: "4px solid #FFFFFF",
              boxShadow: "0 3px 0 #BA7517",
              color: "#854F0B",
              fontWeight: 900,
              fontSize: 20,
            }}
          >
            {levelData.level}
          </div>
        </div>

        <h2 className="text-3xl leading-tight mt-4" style={{ color: "#1a6fc4", fontWeight: 900 }}>
          {name}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-1.5 text-xs" style={{ color: "#5F5E5A", fontWeight: 700 }}>
          {ageRange && <span>Age {ageRange}</span>}
          {ageRange && <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#C4C2B9" }} aria-hidden="true" />}
          <span style={{ color: "#854F0B", fontWeight: 800 }}>🔥 {streak} day streak</span>
        </div>
      </div>

      {/* XP Card — yellow chunky */}
      <div
        className="relative z-10 mx-5 p-4"
        style={{
          backgroundColor: "#FFC43D",
          borderRadius: "24px",
          boxShadow: "0 5px 0 #BA7517",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontSize: 11, color: "#854F0B", fontWeight: 900, letterSpacing: "1.5px" }}>
            LEVEL {levelData.level}
          </span>
          <span style={{ fontSize: 12, color: "#854F0B", fontWeight: 800 }}>
            {bracketXp.toLocaleString()} / {(bracketTotal > 0 ? bracketTotal : totalXp).toLocaleString()} XP
          </span>
        </div>
        <div
          className="h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", border: "2px solid #854F0B" }}
        >
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${xpPct}%`, backgroundColor: "#2E8CE6" }}
          />
        </div>
      </div>

      {/* Stats row — 3 chunky cards */}
      <div className="relative z-10 grid grid-cols-3 gap-3 px-5 mt-4">
        <StatCard emoji="⚡" value={totalXp.toLocaleString()} label="TOTAL XP" accent="#2E8CE6" accentDark="#1a6fc4" />
        <StatCard emoji="🎯" value={missionCount} label="MISSIONS" accent="#00A878" accentDark="#0F6E56" />
        <StatCard emoji="🏆" value={`${earnedCount}/${allBadges.length}`} label="BADGES" accent="#FFC43D" accentDark="#BA7517" />
      </div>

      {/* Badges by category */}
      <div className="relative z-10 px-5 mt-7 space-y-5">
        {CATEGORY_ORDER.map((cat) => {
          const badges = byCategory[cat] || [];
          if (badges.length === 0) return null;
          const earnedInCat = badges.filter((b) => earnedSet.has(b.id)).length;

          return (
            <div
              key={cat}
              className="p-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                border: "3px solid #FFE066",
                boxShadow: "0 4px 0 #E6D5A8",
              }}
            >
              <div className="flex items-end justify-between mb-3">
                <h3 style={{ fontSize: 14, fontWeight: 900, color: "#1a6fc4" }}>
                  {CATEGORY_LABEL[cat]}
                </h3>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: "#854F0B",
                    backgroundColor: "#FFF3CC",
                    border: "2px solid #FFE066",
                  }}
                >
                  {earnedInCat}/{badges.length}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <BadgeTile
                    key={badge.id}
                    badge={badge}
                    earned={earnedSet.has(badge.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="relative z-10 px-5 mt-6 space-y-2.5">
        <ActionButton emoji="⚙️" label="Settings" onClick={() => router.push("/settings")} />
        <ActionButton emoji="👨‍👩‍👧" label="Share with parent" onClick={() => {
          const url = `${window.location.origin}/parent?childId=${user.id}`;
          navigator.clipboard.writeText(url);
          alert("Link copied! Send it to your parent.");
        }} />
        <ActionButton emoji="👋" label="Log out" onClick={handleLogout} destructive />
      </div>
    </div>
  );
}

function StatCard({
  emoji,
  value,
  label,
  accent,
  accentDark,
}: {
  emoji: string;
  value: string | number;
  label: string;
  accent: string;
  accentDark: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-3 px-2"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        border: `3px solid ${accent}`,
        boxShadow: `0 4px 0 ${accentDark}`,
      }}
    >
      <span style={{ fontSize: 20, marginBottom: 2 }}>{emoji}</span>
      <p style={{ fontSize: 18, fontWeight: 900, color: "#2C2C2A", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: "1px", color: accentDark, marginTop: 4 }}>
        {label}
      </p>
    </div>
  );
}

function BadgeTile({ badge, earned }: { badge: Badge; earned: boolean }) {
  const rarity = RARITY_COLOR[badge.rarity] || RARITY_COLOR.common;

  return (
    <div
      className="aspect-square p-2 flex flex-col items-center justify-center text-center gap-1 transition-all"
      style={{
        backgroundColor: earned ? `${rarity.color}15` : "#F4F4EC",
        border: `2.5px solid ${earned ? rarity.color : "#E6D5A8"}`,
        borderRadius: "16px",
        boxShadow: earned ? `0 3px 0 ${rarity.dark}` : "0 2px 0 #D3D1C7",
        opacity: earned ? 1 : 0.65,
      }}
      title={badge.description}
    >
      <div className="relative flex items-center justify-center">
        <BadgeFrame badge={badge} size="sm" showText={false} />
        {!earned && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full p-1"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                border: "2px solid #C4C2B9",
              }}
            >
              <Lock className="w-3 h-3" style={{ color: "#888780" }} strokeWidth={2.5} />
            </div>
          </div>
        )}
      </div>
      <p
        className="leading-tight line-clamp-2"
        style={{
          fontSize: 9,
          fontWeight: 900,
          letterSpacing: "0.3px",
          color: earned ? rarity.dark : "#888780",
          textTransform: "uppercase",
        }}
      >
        {badge.name}
      </p>
    </div>
  );
}

function ActionButton({
  emoji,
  label,
  onClick,
  destructive,
}: {
  emoji: string;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  const bgColor = destructive ? "#FEF2F2" : "#FFFFFF";
  const borderColor = destructive ? "#F7C1C1" : "#E6F1FB";
  const shadowColor = destructive ? "#F09595" : "#C4D8EC";
  const textColor = destructive ? "#A32D2D" : "#2C2C2A";

  return (
    <button
      onClick={onClick}
      className="w-full h-14 px-4 flex items-center gap-3 transition-transform active:translate-y-1"
      style={{
        backgroundColor: bgColor,
        borderRadius: "20px",
        border: `3px solid ${borderColor}`,
        boxShadow: `0 4px 0 ${shadowColor}`,
        color: textColor,
        fontWeight: 800,
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}
