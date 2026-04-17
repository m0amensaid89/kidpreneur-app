"use client";

import { TopBar } from "@/components/ui/TopBar";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WORLDS } from "@/lib/data/lessons";

type Message = {
  role: "user" | "quacky";
  content: string;
};

function ChatInterface() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState("");
  const [quackyState, setQuackyState] = useState<"happy" | "thinking" | "amazed">("happy");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lessonId) {
      let foundTool = "";
      for (const world of WORLDS) {
        const lesson = world.lessons.find((l) => l.id === lessonId);
        if (lesson && lesson.toolName) {
          foundTool = lesson.toolName;
          break;
        }
      }

      if (foundTool) {
        setPrompt(`Ask Quacky how could a kid use ${foundTool} to start a business?`);
      }
    } else {
      setMessages([
        {
          role: "quacky",
          content: "Quack! I'm your AI business coach. What do you want to build today?",
        },
      ]);
    }
  }, [lessonId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting, showReflection]);

  const handleSend = async () => {
    if (!prompt.trim() || isWaiting) return;

    const userMessage = prompt;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setPrompt("");
    setIsWaiting(true);
    setQuackyState("thinking");
    setShowReflection(false);

    try {
      let lessonContext = "";
      if (lessonId) {
          for (const world of WORLDS) {
            const lesson = world.lessons.find((l) => l.id === lessonId);
            if (lesson && lesson.toolName) {
              lessonContext = `The user is learning about ${lesson.toolName}.`;
              break;
            }
          }
      }

      const res = await fetch("/api/sandbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage, lessonContext }),
      });

      const data = await res.json();

      if (data.error) {
         setMessages((prev) => [...prev, { role: "quacky", content: data.error }]);
         setQuackyState("happy");
      } else {
         setMessages((prev) => [...prev, { role: "quacky", content: data.response }]);
         setQuackyState("amazed");
         if (lessonId) {
           setShowReflection(true);
         }
      }

    } catch (error) {
      setMessages((prev) => [...prev, { role: "quacky", content: "Quacky is thinking... try again!" }]);
      setQuackyState("happy");
    } finally {
      setIsWaiting(false);
    }
  };

  const handleReflectionSubmit = () => {
    if (!reflection.trim()) return;
    // Assuming missionId follows this pattern based on lessonId from QuizClient
    const missionId = `m_${lessonId}`;
    router.push(`/mission/${missionId}`);
  };

  return (
    <div className="flex flex-col min-h-full pb-16">
      <TopBar title="Chat with Quacky" showBack={false} />

      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        {/* Messages area */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-4 pr-2 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end space-x-2 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "quacky" && (
                 <QuackyAvatar state={idx === messages.length - 1 ? quackyState : "happy"} size="sm" />
              )}
              <div
                className={`${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none shadow-primary/20"
                    : "bg-card border border-border/50 rounded-bl-none"
                } rounded-2xl px-4 py-3 max-w-[80%] shadow-sm`}
              >
                <p className="text-sm font-medium whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isWaiting && (
             <div className="flex items-end space-x-2">
               <QuackyAvatar state="thinking" size="sm" />
               <div className="bg-card border border-border/50 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%] shadow-sm flex items-center space-x-1">
                 <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
          )}

          {showReflection && (
            <div className="bg-accent/20 border-2 border-accent/50 rounded-2xl p-4 mt-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
               <p className="font-bold text-foreground mb-3">How did that make you feel?</p>
               <div className="flex flex-col space-y-2">
                 <Input
                   value={reflection}
                   onChange={(e) => setReflection(e.target.value)}
                   placeholder="Type your reflection here..."
                   className="bg-card border-border/50 h-12 rounded-xl"
                   onKeyDown={(e) => {
                     if (e.key === "Enter") handleReflectionSubmit();
                   }}
                 />
                 <Button onClick={handleReflectionSubmit} className="rounded-xl h-12 font-bold shadow-sm">
                   Submit Reflection
                 </Button>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        {!showReflection && (
          <div className="pt-2 flex items-center space-x-2 bg-background pb-safe">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-card border-border/50 h-12 rounded-xl"
              onKeyDown={(e) => {
                 if (e.key === "Enter") handleSend();
              }}
              disabled={isWaiting}
            />
            <Button
               size="icon"
               className="h-12 w-12 rounded-xl shrink-0 shadow-sm shadow-primary/20"
               onClick={handleSend}
               disabled={isWaiting || !prompt.trim()}
            >
              <Send className="h-5 w-5 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatInterface />
    </Suspense>
  );
}
