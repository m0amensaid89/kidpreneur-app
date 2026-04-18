"use client";

import Image from "next/image";
import { Send } from "lucide-react";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WORLDS } from "@/lib/data/lessons";
import { createClient } from "@/lib/supabase/client";
import { awardBadge } from "@/lib/badgeDispatcher";
import { BadgeReveal } from "@/components/ui/BadgeReveal";
import { Badge } from "@/lib/badges";

// Resolve the first mission ID for a given lesson.
// Lessons have ids like "l1" and contain missions like [{id:"l1_m1"}, {id:"l1_m2"}, {id:"l1_m3"}].
// We route to the FIRST unstarted mission after chat+reflection.
function getNextMissionIdForLesson(lessonId: string): string | null {
  for (const world of WORLDS) {
    const lesson = world.lessons.find((l) => l.id === lessonId);
    if (lesson && lesson.missions.length > 0) {
      return lesson.missions[0].id;
    }
  }
  return null;
}

type Message = {
  role: "user" | "quacky";
  content: string;
};

function ChatInterface() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const missionIdParam = searchParams.get("missionId");
  const supabase = createClient();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState("");
  const [quackyPose, setQuackyPose] = useState<"quacky-happy" | "quacky-thinking" | "quacky-amazed">("quacky-happy");
  const [revealedBadge, setRevealedBadge] = useState<Badge | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Resolve world + lesson + mission from URL params.
  // Missing missionId → default to the lesson's first mission (m1).
  // Missing lessonId → generic chat (no mission context).
  const resolved = (() => {
    if (!lessonId) return null;
    for (const world of WORLDS) {
      const lesson = world.lessons.find((l) => l.id === lessonId);
      if (!lesson) continue;
      const targetMissionId = missionIdParam ?? lesson.missions[0]?.id;
      const mission = lesson.missions.find((m) => m.id === targetMissionId) ?? lesson.missions[0] ?? null;
      const missionIndex = mission ? lesson.missions.findIndex((m) => m.id === mission.id) : -1;
      return { world, lesson, mission, missionIndex };
    }
    return null;
  })();

  const activeMissionId = resolved?.mission?.id ?? null;

  useEffect(() => {
    if (resolved?.mission) {
      // Use the mission's specific sandboxPrompt — authored by the content team per-mission
      setPrompt(resolved.mission.sandboxPrompt);
    } else if (resolved?.lesson) {
      // Fallback: lesson known but no mission — use a warm generic prompt for the tool
      setPrompt(`Ask Quacky how could a kid use ${resolved.lesson.toolName} to start a business?`);
    } else {
      setMessages([
        {
          role: "quacky",
          content: "Quack! I'm your AI business coach. What do you want to build today?",
        },
      ]);
    }
    // We intentionally depend only on lessonId + missionIdParam so this re-runs on URL changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, missionIdParam]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting, showReflection]);

  const handleSend = async () => {
    if (!prompt.trim() || isWaiting) return;

    const userMessage = prompt;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setPrompt("");
    setIsWaiting(true);
    setQuackyPose("quacky-thinking");
    setShowReflection(false);

    try {
      // Build rich context — the sandbox API will use this to pick a per-mission
      // system prompt if available, otherwise fall back to generic Quacky.
      const context = resolved
        ? {
            toolName: resolved.lesson.toolName,
            worldName: resolved.world.name,
            missionTitle: resolved.mission?.title,
            missionObjective: resolved.mission?.objective,
            quackySystemPrompt: resolved.mission?.quackySystemPrompt,
          }
        : undefined;

      const res = await fetch("/api/sandbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage, context }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [...prev, { role: "quacky", content: data.error }]);
        setQuackyPose("quacky-happy");
      } else {
        setMessages((prev) => [...prev, { role: "quacky", content: data.response }]);
        setQuackyPose("quacky-amazed");
        if (lessonId) setShowReflection(true);

        // Award XP + fire sandbox_prompt_sent badge event
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const userId = session.user.id;

            await supabase.from("xp_log").insert({
              user_id: userId,
              xp_amount: 5,
              source: `sandbox_prompt${lessonId ? `_${lessonId}` : ""}`,
            });

            const badge = await awardBadge(supabase, userId, { type: "sandbox_prompt_sent" });
            if (badge) setRevealedBadge(badge);
          }
        } catch (err) {
          console.warn("[chat] XP/badge dispatch failed (non-fatal):", err);
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "quacky", content: "Quacky is thinking... try again!" }]);
      setQuackyPose("quacky-happy");
    } finally {
      setIsWaiting(false);
    }
  };

  const handleReflectionSubmit = async () => {
    if (!reflection.trim()) return;

    // Fire reflection_submitted event + small XP reward
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userId = session.user.id;

        await supabase.from("xp_log").insert({
          user_id: userId,
          xp_amount: 10,
          source: `reflection${lessonId ? `_${lessonId}` : ""}`,
        });

        // Fire reflection badge (dispatcher grants first_reflection / reflection_sage)
        const badge = await awardBadge(supabase, userId, { type: "reflection_submitted" });
        if (badge) {
          setRevealedBadge(badge);
          // Hold here — user dismissing the badge will then route to first mission
          return;
        }
      }
    } catch (err) {
      console.warn("[chat] reflection dispatch failed (non-fatal):", err);
    }

    // Route to the specific mission this chat was preparing for (from URL param),
    // or fall back to the lesson's first mission if no missionId was provided.
    const targetMissionId = activeMissionId ?? (lessonId ? getNextMissionIdForLesson(lessonId) : null);
    if (targetMissionId) {
      router.push(`/mission/${targetMissionId}`);
    } else {
      // Fallback — no lesson context, just go home
      router.push("/home");
    }
  };

  const handleBadgeDismissFromChat = () => {
    setRevealedBadge(null);
    // If we were holding a reflection, continue to the specific mission now
    if (reflection.trim()) {
      const targetMissionId = activeMissionId ?? (lessonId ? getNextMissionIdForLesson(lessonId) : null);
      if (targetMissionId) {
        router.push(`/mission/${targetMissionId}`);
      } else {
        router.push("/home");
      }
    }
  };

  return (
    <div
      className="flex flex-col min-h-full relative pb-16"
      style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{
          backgroundColor: "#FFF8E7",
          borderBottom: "3px solid #FFE066",
        }}
      >
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition active:scale-95"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 3px 0 #E6D5A8" }}
          aria-label="Back"
        >
          <span style={{ fontSize: 20, color: "#854F0B", lineHeight: 1, fontWeight: 900 }}>‹</span>
        </button>

        <div className="flex items-center gap-2.5 flex-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#FFFFFF",
              border: "2.5px solid #2E8CE6",
              boxShadow: "0 2px 0 #1a6fc4",
            }}
          >
            <Image
              src="/quacky/quacky-happy.png"
              alt="Quacky"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 900, color: "#378ADD", letterSpacing: "1px" }}>
              {resolved?.mission
                ? `MISSION ${resolved.missionIndex + 1} OF ${resolved.lesson.missions.length}`
                : "CHATTING WITH"}
            </p>
            <h1 style={{ fontSize: 16, fontWeight: 900, color: "#1a6fc4", lineHeight: 1 }}>
              {resolved?.lesson?.toolName ?? "Quacky 🦆"}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto pb-4 pr-1">
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            const pose = idx === messages.length - 1 ? quackyPose : "quacky-happy";

            return (
              <div
                key={idx}
                className={`flex items-end gap-2 ${isUser ? "justify-end" : ""}`}
              >
                {!isUser && (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "2.5px solid #2E8CE6",
                    }}
                  >
                    <Image
                      src={`/quacky/${pose}.png`}
                      alt="Quacky"
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </div>
                )}

                <div
                  className="max-w-[78%] px-4 py-3"
                  style={{
                    backgroundColor: isUser ? "#2E8CE6" : "#FFFFFF",
                    color: isUser ? "#FFFFFF" : "#2C2C2A",
                    borderRadius: 20,
                    borderBottomRightRadius: isUser ? 6 : 20,
                    borderBottomLeftRadius: isUser ? 20 : 6,
                    border: isUser ? "none" : "2.5px solid #E6F1FB",
                    boxShadow: isUser ? "0 3px 0 #1a6fc4" : "0 2px 0 #C4D8EC",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.45,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}

          {isWaiting && (
            <div className="flex items-end gap-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FFFFFF", border: "2.5px solid #2E8CE6" }}
              >
                <Image
                  src="/quacky/quacky-thinking.png"
                  alt="Quacky thinking"
                  width={26}
                  height={26}
                  className="object-contain"
                />
              </div>
              <div
                className="px-4 py-3 flex items-center gap-1.5"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  borderBottomLeftRadius: 6,
                  border: "2.5px solid #E6F1FB",
                  boxShadow: "0 2px 0 #C4D8EC",
                }}
              >
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#2E8CE6", animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#2E8CE6", animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#2E8CE6", animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {showReflection && (
            <div
              className="mt-4 p-4 animate-in slide-in-from-bottom-4 fade-in duration-500"
              style={{
                backgroundColor: "#FFC43D",
                border: "3px solid #BA7517",
                borderRadius: 24,
                boxShadow: "0 5px 0 #854F0B",
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 900, color: "#854F0B", marginBottom: 10 }}>
                💭 {resolved?.mission?.reflectionQuestion ?? "How did that make you feel?"}
              </p>
              <input
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Type your thoughts..."
                onKeyDown={(e) => { if (e.key === "Enter") handleReflectionSubmit(); }}
                className="w-full mb-3 outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  border: "2.5px solid #854F0B",
                  padding: "12px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#2C2C2A",
                }}
              />
              <button
                onClick={handleReflectionSubmit}
                className="w-full transition-transform active:translate-y-0.5"
                style={{
                  height: 52,
                  backgroundColor: "#FFFFFF",
                  color: "#854F0B",
                  borderRadius: 16,
                  fontSize: 15,
                  fontWeight: 900,
                  boxShadow: "0 3px 0 #BA7517",
                  border: "2px solid #854F0B",
                }}
              >
                Submit reflection ✨
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        {!showReflection && (
          <div
            className="pt-3 pb-safe flex items-center gap-2"
            style={{ backgroundColor: "#FFF8E7" }}
          >
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              disabled={isWaiting}
              className="flex-1 outline-none"
              style={{
                backgroundColor: "#FFFFFF",
                border: "3px solid #E6F1FB",
                borderRadius: 20,
                height: 52,
                padding: "0 18px",
                fontSize: 14,
                fontWeight: 600,
                color: "#2C2C2A",
              }}
            />
            <button
              onClick={handleSend}
              disabled={isWaiting || !prompt.trim()}
              className="shrink-0 transition-transform active:translate-y-0.5 disabled:opacity-50 flex items-center justify-center"
              style={{
                width: 52,
                height: 52,
                backgroundColor: "#FFC43D",
                color: "#854F0B",
                borderRadius: 20,
                boxShadow: "0 4px 0 #BA7517",
                border: "none",
                cursor: (isWaiting || !prompt.trim()) ? "not-allowed" : "pointer",
              }}
            >
              <Send className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      {revealedBadge && (
        <BadgeReveal badge={revealedBadge} onDismiss={handleBadgeDismissFromChat} />
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: "#FFF8E7", minHeight: "100vh" }} />}>
      <ChatInterface />
    </Suspense>
  );
}
