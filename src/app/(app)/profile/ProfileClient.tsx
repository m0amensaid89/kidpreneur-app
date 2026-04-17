"use client";

import type { User } from "@supabase/supabase-js";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Badge } from "@/lib/badges";
import {
  Flame,
  Trophy,
  Target,
  Zap,
  Settings,
  Share2,
  LogOut,
  Lock,
} from "lucide-react";

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

const QUACKY_BLUE = "#2E8CE6";
const QUACKY_BLUE_DARK = "#1a6fc4";

// Rarity badge tile color
const RARITY_COLOR: Record<string, string> = {
  common: "#2E8CE6",
  rare: "#7B52EE",
  legendary: "#FFD700",
};

const CATEGORY_LABEL: Record<string, string> = {
  first_time: "First Steps",
  mastery: "Mastery",
  streak: "Streaks",
  world_completion: "World Conquests",
  empire: "Empire",
};

const CATEGORY_ORDER = [
  "first_time",
  "mastery",
  "streak",
  "world_completion",
  "empire",
];

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

  const name = profile?.name || "Kid Entrepreneur";
  const streak = profile?.streak || 0;
  const ageRange = profile?.age_range;

  const earnedSet = new Set(earnedBadgeIds);
  const earnedCount = earnedBadgeIds.length;

  // XP bar math within current level bracket
  const bracketXp = totalXp - levelData.currentLevelXpStart;
  const bracketTotal = levelData.nextLevelXpStart - levelData.currentLevelXpStart;
  const xpPct = bracketTotal > 0 ? Math.min(100, (bracketXp / bracketTotal) * 100) : 100;

  // Group badges by category
  const byCategory: Record<string, Badge[]> = {};
  for (const cat of CATEGORY_ORDER) byCategory[cat] = [];
  for (const b of allBadges) {
    if (byCategory[b.category]) byCategory[b.category].push(b);
  }

  return (
    <div className="flex flex-col min-h-full pb-24 animate-in fade-in duration-500">

      {/* ═══ HERO HEADER : Quacky-blue gradient ═══ */}
      <div
        className="text-white relative pb-6"
        style={{
          background: `linear-gradient(135deg, ${QUACKY_BLUE} 0%, ${QUACKY_BLUE_DARK} 100%)`,
          padding: "24px 20px 24px",
        }}
      >
        <h1 className="text-center text-xs font-black tracking-[0.25em] text-white/90 mb-4">
          MY PROFILE
        </h1>

        {/* Quacky avatar with level badge */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <QuackyAvatar state="happy" size="xl" className="drop-shadow-lg" />
            <div
              className="absolute -bottom-1 -right-1 rounded-full w-11 h-11 flex items-center justify-center border-[3px] font-black text-sm"
              style={{
                backgroundColor: "#FFD700",
                borderColor: "white",
                color: "#854F0B",
              }}
            >
              {levelData.level}
            </div>
          </div>

          <h2 className="text-2xl font-black mt-3">{name}</h2>
          <div className="flex items-center gap-3 mt-1 text-white/85 text-xs font-semibold">
            {ageRange && <span>Age {ageRange}</span>}
            {ageRange && (
              <span
                className="w-1 h-1 rounded-full bg-white/50"
                aria-hidden="true"
              />
            )}
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-orange-300 text-orange-300" />
              {streak} day streak
            </span>
          </div>
        </div>

        {/* XP progress within the hero */}
        <div className="mt-5 bg-white/15 rounded-2xl p-3 backdrop-blur-sm">
          <div className="flex justify-between items-center text-[11px] font-bold mb-1.5 text-white/90">
            <span className="tracking-wider">LEVEL {levelData.level}</span>
            <span>
              {bracketXp.toLocaleString()} / {(bracketTotal > 0 ? bracketTotal : totalXp).toLocaleString()} XP
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden bg-white/25">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${xpPct}%`,
                backgroundColor: "#FFD700",
              }}
            />
          </div>
        </div>
      </div>

      {/* ═══ STATS ROW ═══ */}
      <div className="grid grid-cols-3 gap-2 px-5 -mt-5 relative z-10">
        <StatCard
          icon={<Zap className="w-4 h-4" style={{ color: QUACKY_BLUE }} />}
          value={totalXp.toLocaleString()}
          label="TOTAL XP"
        />
        <StatCard
          icon={<Target className="w-4 h-4 text-green-500" />}
          value={missionCount}
          label="MISSIONS"
        />
        <StatCard
          icon={<Trophy className="w-4 h-4 text-amber-400" />}
          value={`${earnedCount}/${allBadges.length}`}
          label="BADGES"
        />
      </div>

      {/* ═══ BADGES BY CATEGORY ═══ */}
      <div className="px-5 mt-6 space-y-5">
        {CATEGORY_ORDER.map((cat) => {
          const badges = byCategory[cat] || [];
          if (badges.length === 0) return null;
          const earnedInCat = badges.filter((b) => earnedSet.has(b.id)).length;

          return (
            <div key={cat}>
              <div className="flex items-end justify-between mb-3">
                <h3 className="text-sm font-black tracking-wide">
                  {CATEGORY_LABEL[cat]}
                </h3>
                <span className="text-[11px] font-bold text-muted-foreground">
                  {earnedInCat} / {badges.length}
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

      {/* ═══ ACTIONS ═══ */}
      <div className="px-5 mt-8 space-y-2">
        <ActionButton
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          onClick={() => router.push("/settings")}
        />
        <ActionButton
          icon={<Share2 className="w-4 h-4" />}
          label="Share with parent"
          onClick={() => {
            const url = `${window.location.origin}/parent?childId=${user.id}`;
            navigator.clipboard.writeText(url);
            alert("Parent dashboard link copied to clipboard!");
          }}
        />
        <ActionButton
          icon={<LogOut className="w-4 h-4" />}
          label="Log out"
          onClick={handleLogout}
          destructive
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  STAT CARD                                       */
/* ─────────────────────────────────────────────── */
function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-3 flex flex-col items-center justify-center border border-border/50 shadow-sm">
      <div className="mb-1">{icon}</div>
      <p className="text-xl font-black tabular-nums leading-none">{value}</p>
      <p className="text-[9px] font-bold tracking-wider text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  BADGE TILE                                      */
/* ─────────────────────────────────────────────── */
function BadgeTile({ badge, earned }: { badge: Badge; earned: boolean }) {
  const rarityColor = RARITY_COLOR[badge.rarity] || RARITY_COLOR.common;
  const hasArt = !!badge.artUrl;

  return (
    <div
      className="aspect-square rounded-2xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 border-2 transition-all"
      style={{
        backgroundColor: earned ? `${rarityColor}15` : "hsl(var(--muted) / 0.4)",
        borderColor: earned ? rarityColor : "transparent",
        opacity: earned ? 1 : 0.55,
        filter: earned ? "none" : "grayscale(70%)",
      }}
      title={badge.description}
    >
      <div className="relative flex items-center justify-center">
        {hasArt ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={earned ? badge.artUrl! : (badge.artUrlLocked || badge.artUrl!)}
            alt={badge.name}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span
            className="text-3xl leading-none"
            aria-hidden="true"
          >
            {badge.emoji}
          </span>
        )}
        {!earned && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 rounded-full p-1">
              <Lock className="w-3 h-3 text-muted-foreground" strokeWidth={2.5} />
            </div>
          </div>
        )}
      </div>
      <p
        className="text-[9px] font-black leading-tight uppercase tracking-wide line-clamp-2"
        style={{
          color: earned ? rarityColor : "hsl(var(--muted-foreground))",
        }}
      >
        {badge.name}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  ACTION BUTTON                                   */
/* ─────────────────────────────────────────────── */
function ActionButton({
  icon,
  label,
  onClick,
  destructive,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 rounded-xl border border-border/50 bg-card px-4 flex items-center gap-3 font-bold text-sm hover:bg-muted/50 transition active:scale-[0.98]"
      style={{
        color: destructive ? "#EF4444" : undefined,
      }}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}
