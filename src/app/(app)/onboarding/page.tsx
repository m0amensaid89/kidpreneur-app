"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft } from "lucide-react";

const QUACKY_BLUE = "#2E8CE6";
const QUACKY_BLUE_DARK = "#1a6fc4";

// World colors for the skin picker (matches the 5-world palette)
const SKIN_OPTIONS = [
  { id: "blue", color: "#2E8CE6", label: "Classic" },
  { id: "orange", color: "#FF6340", label: "Canvas" },
  { id: "purple", color: "#7B52EE", label: "Story" },
  { id: "green", color: "#00A878", label: "Power" },
  { id: "violet", color: "#6B35FF", label: "Neural" },
];

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [skinColor, setSkinColor] = useState("blue");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("profiles").upsert(
        {
          id: session.user.id,
          name: name,
          age_range: ageRange,
          quacky_skin: skinColor,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        console.error("Error saving profile:", error);
      }

      router.push("/home");
    } catch (err) {
      console.error(err);
      router.push("/home");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">

      {/* Quacky-blue hero with progress dots */}
      <div
        className="relative text-white pt-6 pb-8 px-5"
        style={{
          background: `linear-gradient(135deg, ${QUACKY_BLUE} 0%, ${QUACKY_BLUE_DARK} 100%)`,
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/25 hover:bg-white/35 flex items-center justify-center transition shrink-0"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}
          <div className="flex-1 flex items-center justify-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i + 1 === step ? "28px" : "8px",
                  backgroundColor: i + 1 <= step ? "white" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
          <div className="w-9 h-9" />
        </div>

        <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300" key={step}>
          <QuackyAvatar
            state={
              step === 1 ? "neutral"
                : step === 2 ? "thinking"
                  : "happy"
            }
            size="lg"
            className="drop-shadow-lg"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 pt-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-400" key={`body-${step}`}>
        <div className="max-w-sm mx-auto w-full">

          {step === 1 && (
            <div className="space-y-6 text-center">
              <div>
                <p className="text-[11px] font-black tracking-widest text-muted-foreground uppercase mb-2">
                  Question 1 of 3
                </p>
                <h2 className="text-2xl font-black leading-tight">
                  What should Quacky call you?
                </h2>
              </div>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="text-center text-lg font-semibold h-14 rounded-2xl border-2"
                maxLength={30}
                autoFocus
              />

              <button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full h-14 rounded-2xl text-base font-black text-white transition-transform active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: QUACKY_BLUE,
                  boxShadow: name.trim() ? `0 4px 0 ${QUACKY_BLUE_DARK}` : "none",
                }}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <div>
                <p className="text-[11px] font-black tracking-widest text-muted-foreground uppercase mb-2">
                  Question 2 of 3
                </p>
                <h2 className="text-2xl font-black leading-tight">
                  How old are you, {name.trim() || "friend"}?
                </h2>
                <p className="text-sm text-muted-foreground font-medium mt-2">
                  This helps Quacky pick the right missions for you.
                </p>
              </div>

              <div className="grid gap-3">
                {["8-10", "11-13", "14-15"].map((range) => {
                  const isSelected = ageRange === range;
                  return (
                    <button
                      key={range}
                      onClick={() => {
                        setAgeRange(range);
                        setTimeout(handleNext, 250);
                      }}
                      className="h-16 rounded-2xl text-lg font-black border-2 transition-all active:scale-[0.98]"
                      style={{
                        borderColor: isSelected ? QUACKY_BLUE : "hsl(var(--border))",
                        backgroundColor: isSelected ? `${QUACKY_BLUE}15` : "hsl(var(--card))",
                        color: isSelected ? QUACKY_BLUE : "hsl(var(--foreground))",
                      }}
                    >
                      {range} years old
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div>
                <p className="text-[11px] font-black tracking-widest text-muted-foreground uppercase mb-2">
                  Question 3 of 3
                </p>
                <h2 className="text-2xl font-black leading-tight">
                  Pick Quacky&apos;s team color
                </h2>
                <p className="text-sm text-muted-foreground font-medium mt-2">
                  You can change this later.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 py-4">
                {SKIN_OPTIONS.map((skin) => {
                  const isSelected = skinColor === skin.id;
                  return (
                    <button
                      key={skin.id}
                      onClick={() => setSkinColor(skin.id)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="w-14 h-14 rounded-full border-4 transition-all"
                        style={{
                          backgroundColor: skin.color,
                          borderColor: isSelected ? "white" : "transparent",
                          transform: isSelected ? "scale(1.1)" : "scale(1)",
                          boxShadow: isSelected
                            ? `0 0 0 3px ${skin.color}, 0 4px 12px ${skin.color}80`
                            : "none",
                          opacity: isSelected ? 1 : 0.6,
                        }}
                      />
                      <span
                        className="text-[10px] font-black tracking-wider uppercase"
                        style={{
                          color: isSelected ? skin.color : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {skin.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl text-base font-black text-white transition-transform active:translate-y-0.5 disabled:opacity-50"
                style={{
                  backgroundColor: QUACKY_BLUE,
                  boxShadow: `0 4px 0 ${QUACKY_BLUE_DARK}`,
                }}
              >
                {isSubmitting ? "Saving..." : "Let's go! 🚀"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
