"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/lib/badges";
import { BadgeFrame } from "@/components/ui/BadgeFrame";

interface RecentMission {
  mission_id: string;
  lesson_id: string;
  completed_at: string;
}

interface ChildData {
  name: string;
  streak: number;
  lastActive: string | null;
  totalXp: number;
  level: number;
  currentLevelXpStart: number;
  nextLevelXpStart: number;
  missionCount: number;
  badges: Badge[];
  recentMissions: RecentMission[];
}

const RARITY_COLOR: Record<string, { color: string; dark: string }> = {
  common: { color: "#2E8CE6", dark: "#1a6fc4" },
  rare: { color: "#7B52EE", dark: "#534AB7" },
  legendary: { color: "#FFC43D", dark: "#BA7517" },
};

function timeAgo(iso: string | null): string {
  if (!iso) return "Not active yet";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getLessonLabel(lessonId: string): string {
  // Lesson IDs are like "l1", "l2", etc.
  const match = lessonId.match(/l(\d+)/);
  if (match) return `Lesson ${match[1]}`;
  return lessonId;
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
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [childId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center p-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "4px solid #2E8CE6",
            boxShadow: "0 4px 0 #1a6fc4",
          }}
        >
          <Image
            src="/quacky/quacky-thinking.png"
            alt="Quacky is loading"
            width={56}
            height={56}
            className="object-contain animate-pulse"
            priority
          />
        </div>
        <p
          className="mt-4"
          style={{ fontSize: 13, fontWeight: 800, color: "#378ADD", letterSpacing: "1px" }}
        >
          LOADING YOUR CHILD&apos;S PROGRESS...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div style={{ fontSize: 56, marginBottom: 12 }}>🤔</div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1a6fc4", lineHeight: 1.15 }}>
          We couldn&apos;t find this profile
        </h1>
        <p
          className="mt-2 max-w-xs"
          style={{ fontSize: 14, color: "#5F5E5A", fontWeight: 600, lineHeight: 1.4 }}
        >
          Ask your child to send you a fresh link from their Profile page.
        </p>
      </div>
    );
  }

  // Level progress math
  const bracketXp = data.totalXp - data.currentLevelXpStart;
  const bracketTotal = data.nextLevelXpStart - data.currentLevelXpStart;
  const levelPct = bracketTotal > 0 ? Math.min(100, (bracketXp / bracketTotal) * 100) : 100;

  return (
    <div className="flex flex-col min-h-full relative overflow-hidden pb-10 animate-in fade-in duration-500">
      {/* Decorative floating circles */}
      <div
        className="absolute top-16 right-6 w-16 h-16 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.35 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-56 left-8 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.35 }}
        aria-hidden="true"
      />

      {/* Header band — soft blue, identifies this as the parent view */}
      <div className="relative z-10 pt-5 pb-3 px-5 text-center">
        <p
          style={{
            fontSize: 10,
            fontWeight: 900,
            color: "#378ADD",
            letterSpacing: "2.5px",
            marginBottom: 4,
          }}
        >
          👨‍👩‍👧 PARENT DASHBOARD
        </p>
        <h1 style={{ fontSize: 14, fontWeight: 700, color: "#5F5E5A", lineHeight: 1.4 }}>
          Here&apos;s how {data.name} is doing on KidPreneur
        </h1>
      </div>

      {/* Child header card — Quacky + name + last active */}
      <div className="relative z-10 mx-5 mt-4 p-5 text-center"
        style={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #2E8CE6",
          borderRadius: 28,
          boxShadow: "0 5px 0 #1a6fc4",
        }}
      >
        {/* Quacky in circle with level overlay */}
        <div className="relative inline-block">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#F4F8FD",
              border: "3px solid #2E8CE6",
            }}
          >
            <Image
              src="/quacky/quacky-happy.png"
              alt={`${data.name}'s Quacky`}
              width={76}
              height={76}
              className="object-contain"
              priority
            />
          </div>
          {/* Level overlay */}
          <div
            className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center"
            style={{
              width: 34,
              height: 34,
              backgroundColor: "#FFC43D",
              border: "3px solid #FFFFFF",
              boxShadow: "0 2px 0 #BA7517",
              color: "#854F0B",
              fontWeight: 900,
              fontSize: 14,
            }}
          >
            {data.level}
          </div>
        </div>

        <h2
          className="mt-3"
          style={{ fontSize: 26, fontWeight: 900, color: "#1a6fc4", lineHeight: 1.1 }}
        >
          {data.name}
        </h2>

        <p
          className="mt-1"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#5F5E5A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "#00A878" }}>●</span>
          Active {timeAgo(data.lastActive)}
        </p>
      </div>

      {/* Level progress card */}
      <div
        className="relative z-10 mx-5 mt-4 p-4"
        style={{
          backgroundColor: "#FFC43D",
          border: "3px solid #BA7517",
          borderRadius: 24,
          boxShadow: "0 5px 0 #854F0B",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "1.5px",
              color: "#854F0B",
            }}
          >
            LEVEL {data.level} PROGRESS
          </span>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#854F0B" }}>
            {data.totalXp.toLocaleString()} XP total
          </span>
        </div>
        <div
          className="h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", border: "2px solid #854F0B" }}
        >
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${levelPct}%`, backgroundColor: "#2E8CE6" }}
          />
        </div>
        <p
          className="mt-2 text-center"
          style={{ fontSize: 11, fontWeight: 700, color: "#854F0B" }}
        >
          {bracketXp.toLocaleString()} / {(bracketTotal > 0 ? bracketTotal : data.totalXp).toLocaleString()} XP in this level
        </p>
      </div>

      {/* Stats — 3 chunky cards */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 px-5 mt-4">
        <StatCard emoji="🔥" value={data.streak} label="DAY STREAK" accent="#FF6340" accentDark="#D85A30" />
        <StatCard emoji="🎯" value={data.missionCount} label="MISSIONS" accent="#00A878" accentDark="#0F6E56" />
        <StatCard emoji="🏆" value={data.badges.length} label="BADGES" accent="#FFC43D" accentDark="#BA7517" />
      </div>

      {/* Recent activity */}
      <div
        className="relative z-10 mx-5 mt-5 p-4"
        style={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #FFE066",
          borderRadius: 24,
          boxShadow: "0 4px 0 #E6D5A8",
        }}
      >
        <h3
          className="mb-3"
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: "#1a6fc4",
          }}
        >
          📈 Recent activity
        </h3>

        {data.recentMissions.length > 0 ? (
          <div className="space-y-2">
            {data.recentMissions.map((m) => (
              <div
                key={m.mission_id}
                className="flex items-center justify-between px-3 py-2.5"
                style={{
                  backgroundColor: "#FFFBE6",
                  border: "2px solid #FFE066",
                  borderRadius: 14,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span style={{ fontSize: 18 }}>✓</span>
                  <div className="min-w-0">
                    <p
                      className="truncate"
                      style={{ fontSize: 13, fontWeight: 800, color: "#2C2C2A", lineHeight: 1.2 }}
                    >
                      Mission completed
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#854F0B" }}>
                      {getLessonLabel(m.lesson_id)} · {m.mission_id}
                    </p>
                  </div>
                </div>
                <span
                  className="shrink-0"
                  style={{ fontSize: 10, fontWeight: 700, color: "#5F5E5A" }}
                >
                  {timeAgo(m.completed_at)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#5F5E5A",
              textAlign: "center",
              padding: "16px 0",
              lineHeight: 1.4,
            }}
          >
            {data.name} hasn&apos;t completed any missions yet. They&apos;ll show up here as they make progress.
          </p>
        )}
      </div>

      {/* Earned badges — using real Quacky art */}
      <div
        className="relative z-10 mx-5 mt-5 p-4"
        style={{
          backgroundColor: "#FFFFFF",
          border: "3px solid #2E8CE6",
          borderRadius: 24,
          boxShadow: "0 4px 0 #C4D8EC",
        }}
      >
        <h3
          className="mb-3"
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: "#1a6fc4",
          }}
        >
          🏅 Earned badges ({data.badges.length})
        </h3>

        {data.badges.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {data.badges.map((badge) => {
              const rarity = RARITY_COLOR[badge.rarity] || RARITY_COLOR.common;
              return (
                <div
                  key={badge.id}
                  className="aspect-square p-2 flex flex-col items-center justify-center text-center gap-1"
                  style={{
                    backgroundColor: `${rarity.color}15`,
                    border: `2.5px solid ${rarity.color}`,
                    borderRadius: 16,
                    boxShadow: `0 3px 0 ${rarity.dark}`,
                  }}
                  title={badge.description}
                >
                  <BadgeFrame badge={badge} size="sm" showText={false} />
                  <p
                    className="leading-tight line-clamp-2"
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      letterSpacing: "0.3px",
                      color: rarity.dark,
                      textTransform: "uppercase",
                    }}
                  >
                    {badge.name}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="text-center py-5"
            style={{
              backgroundColor: "#F4F8FD",
              borderRadius: 16,
              border: "2px dashed #B5D4F4",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>🐣</div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#378ADD" }}>
              First badges coming soon!
            </p>
          </div>
        )}
      </div>

      {/* What is KidPreneur — brief parent primer */}
      <div
        className="relative z-10 mx-5 mt-5 p-4"
        style={{
          backgroundColor: "#EEEBFF",
          border: "3px solid #AFA9EC",
          borderRadius: 24,
        }}
      >
        <h3 className="mb-2" style={{ fontSize: 13, fontWeight: 900, color: "#534AB7" }}>
          💡 About KidPreneur
        </h3>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#2C2C2A", lineHeight: 1.55 }}>
          KidPreneur teaches kids 8-15 how to use AI tools to build real projects
          across 5 worlds: design, storytelling, marketing, automation, and
          strategy. Your child learns through hands-on missions, reflections,
          and capstone projects — earning XP and badges as they grow.
        </p>
      </div>

      {/* Footer note */}
      <p
        className="relative z-10 text-center mt-6 px-6"
        style={{ fontSize: 11, fontWeight: 600, color: "#888780", lineHeight: 1.5 }}
      >
        This dashboard refreshes automatically when you reload the page. Check
        back any time to see {data.name}&apos;s progress.
      </p>
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
        borderRadius: 20,
        border: `3px solid ${accent}`,
        boxShadow: `0 4px 0 ${accentDark}`,
      }}
    >
      <span style={{ fontSize: 22, marginBottom: 2 }}>{emoji}</span>
      <p style={{ fontSize: 20, fontWeight: 900, color: "#2C2C2A", lineHeight: 1 }}>
        {value}
      </p>
      <p
        style={{
          fontSize: 9,
          fontWeight: 900,
          letterSpacing: "1px",
          color: accentDark,
          marginTop: 4,
        }}
      >
        {label}
      </p>
    </div>
  );
}
