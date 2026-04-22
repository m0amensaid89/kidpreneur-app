"use client";

import { useLocale } from "@/components/LocaleProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const TOTAL_STEPS = 3;

const SKIN_OPTIONS = [
  { id: "blue", color: "#2E8CE6", label: "Classic", dark: "#1a6fc4" },
  { id: "orange", color: "#FF6340", label: "Canvas", dark: "#D85A30" },
  { id: "purple", color: "#7B52EE", label: "Story", dark: "#534AB7" },
  { id: "green", color: "#00A878", label: "Power", dark: "#0F6E56" },
  { id: "violet", color: "#6B35FF", label: "Neural", dark: "#3C3489" },
];

export default function OnboardingPage() {
  const { locale, isRTL } = useLocale();
  const isAr = locale === "ar";

  const ot = isAr
    ? {
        step1Label: "الخطوة الأولى",
        step1Title: "إيه اسمك؟",
        step1Sub: "كواكي عايز يعرف يناديك إزاي! 🦆",
        step1Placeholder: "اسمك الأول",
        step1Next: "كمّل →",
        step2Label: "الخطوة الثانية",
        step2Title: (name: string) => `عندك قد إيه يا ${name}؟`,
        step2Sub: "هنختار المحتوى المناسب لك!",
        age1: "من ٨ لـ ١١ سنة",
        age2: "من ١٢ لـ ١٥ سنة",
        step3Label: "الخطوة الأخيرة",
        step3Title: "اختار لون كواكي!",
        step3Sub: "ده بطتك الذكية — خليها على ذوقك 🎨",
        startBtn: "يلا نبدأ! 🚀",
        settingUp: "بنجهّز إمبراطوريتك...",
        back: "رجوع",
      }
    : {
        step1Label: "STEP ONE",
        step1Title: "What's your name?",
        step1Sub: "Quacky wants to know what to call you! 🦆",
        step1Placeholder: "Your first name",
        step1Next: "Next →",
        step2Label: "STEP TWO",
        step2Title: (name: string) => `How old are you, ${name}?`,
        step2Sub: "We'll pick the right content for you!",
        age1: "8-11 years",
        age2: "12-15 years",
        step3Label: "LAST STEP",
        step3Title: "Pick Quacky's color!",
        step3Sub: "This is your AI duck — make it yours 🎨",
        startBtn: "Let's go! 🚀",
        settingUp: "Setting up...",
        back: "Back",
      };

  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [skinColor, setSkinColor] = useState("blue");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);
  const supabase = createClient();

  const handleComplete = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      // CRITICAL path: save the name. If this fails, onboarding CAN'T complete.
      const nameResult = await supabase.from("profiles").upsert(
        {
          id: session.user.id,
          name: name.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (nameResult.error) {
        console.error("[onboarding] critical: failed to save name", nameResult.error);
        setSubmitError(`Couldn't save your name: ${nameResult.error.message}`);
        setIsSubmitting(false);
        return;
      }

      // BEST-EFFORT path: try to save the extras. If the columns don't exist in
      // the schema yet, fail silently — user can still proceed with their name.
      if (ageRange) {
        const { error } = await supabase
          .from("profiles")
          .update({ age_range: ageRange })
          .eq("id", session.user.id);
        if (error) console.warn("[onboarding] couldn't save age_range (column may not exist):", error.message);
      }

      if (skinColor && skinColor !== "blue") {
        const { error } = await supabase
          .from("profiles")
          .update({ quacky_skin: skinColor })
          .eq("id", session.user.id);
        if (error) console.warn("[onboarding] couldn't save quacky_skin (column may not exist):", error.message);
      }

      // Navigate with a hard push so the server page-load re-runs with the new profile row.
      router.push("/home");
      router.refresh();
    } catch (err) {
      console.error("[onboarding] unexpected error:", err);
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Per-step Quacky pose + color
  const quackyPose = step === 1 ? "quacky-happy" : step === 2 ? "quacky-thinking" : "quacky-cheering";
  const quackyLabel = step === 1 ? "Quacky is waving hello" : step === 2 ? "Quacky is thinking" : "Quacky is cheering";

  return (
    <div
      className="flex flex-col min-h-[100dvh] relative overflow-hidden"
      style={{ color: "#2C2C2A" }}
    >
      {/* Decorative floating circles */}
      <div className="absolute top-12 right-8 w-16 h-16 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.5 }} aria-hidden="true" />
      <div className="absolute top-40 left-6 w-14 h-14 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.45 }} aria-hidden="true" />
      <div className="absolute top-64 right-10 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#B3E5FC", opacity: 0.5 }} aria-hidden="true" />

      {/* Top bar : back + progress dots */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-2">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition active:scale-95"
            style={{ backgroundColor: "#FFFFFF", boxShadow: "0 3px 0 #E6D5A8" }}
            aria-label={ot.back}
          >
            <span style={{ fontSize: 20, color: "#854F0B", lineHeight: 1 }}>‹</span>
          </button>
        ) : (
          <div className="w-10 h-10" />
        )}

        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i + 1 === step ? "32px" : "10px",
                height: "10px",
                backgroundColor: i + 1 <= step ? "#FFC43D" : "#FFE6A8",
              }}
            />
          ))}
        </div>

        <div className="w-10 h-10" />
      </div>

      {/* Quacky hero */}
      <div className="relative z-10 pt-4 pb-4 text-center animate-in fade-in zoom-in-95 duration-300" key={`quacky-${step}`}>
        <div
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "5px solid #2E8CE6",
            boxShadow: "0 6px 0 #1a6fc4",
          }}
        >
          <Image
            src={`/quacky/${quackyPose}.png`}
            alt={quackyLabel}
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Body card */}
      <div
        className="relative z-10 flex-1 mt-4 px-6 pt-7 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-400"
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
        key={`body-${step}`}
      >
        <div className="max-w-sm mx-auto w-full">

          {step === 1 && (
            <div className="space-y-5 text-center">
              <div>
                <p className="text-xs mb-1" style={{ color: "#378ADD", fontWeight: 700, letterSpacing: "1px" }}>
                  QUESTION 1 OF 3
                </p>
                <h2 className="text-3xl leading-tight" style={{ color: "#1a6fc4", fontWeight: 900 }}>
                  What should Quacky call you?
                </h2>
              </div>

              <div
                style={{
                  backgroundColor: "#F4F8FD",
                  border: "3px solid #E6F1FB",
                  borderRadius: "24px",
                  padding: "16px 20px",
                }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={ot.step1Placeholder}
                  maxLength={30}
                  autoFocus
                  className="w-full bg-transparent outline-none text-lg text-center"
                  style={{ color: "#2C2C2A", fontWeight: 700 }}
                />
              </div>

              <button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full transition-transform active:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  height: "64px",
                  backgroundColor: name.trim() ? "#FFC43D" : "#E6D5A8",
                  color: name.trim() ? "#854F0B" : "#888780",
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 900,
                  boxShadow: name.trim() ? "0 5px 0 #BA7517" : "none",
                  border: "none",
                  letterSpacing: "0.3px",
                }}
              >
                Next →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-center">
              <div>
                <p className="text-xs mb-1" style={{ color: "#378ADD", fontWeight: 700, letterSpacing: "1px" }}>
                  QUESTION 2 OF 3
                </p>
                <h2 className="text-3xl leading-tight" style={{ color: "#1a6fc4", fontWeight: 900 }}>
                  {ot.step2Title(name.trim() || (isAr ? "صديقي" : "friend"))}
                </h2>
                <p className="text-sm mt-2" style={{ color: "#5F5E5A", fontWeight: 500 }}>
                  Quacky will pick the right missions for you.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {["8-10", "11-13", "14-15"].map((range) => {
                  const isSelected = ageRange === range;
                  return (
                    <button
                      key={range}
                      onClick={() => {
                        setAgeRange(range);
                        setTimeout(handleNext, 300);
                      }}
                      className="w-full transition-all active:translate-y-0.5"
                      style={{
                        height: "64px",
                        backgroundColor: isSelected ? "#E6F1FB" : "#F4F8FD",
                        color: isSelected ? "#1a6fc4" : "#2C2C2A",
                        border: `3px solid ${isSelected ? "#2E8CE6" : "#E6F1FB"}`,
                        borderRadius: "24px",
                        fontSize: "18px",
                        fontWeight: 800,
                        boxShadow: isSelected ? "0 4px 0 #1a6fc4" : "0 2px 0 #E6F1FB",
                        cursor: "pointer",
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
            <div className="space-y-5 text-center">
              <div>
                <p className="text-xs mb-1" style={{ color: "#378ADD", fontWeight: 700, letterSpacing: "1px" }}>
                  QUESTION 3 OF 3
                </p>
                <h2 className="text-3xl leading-tight" style={{ color: "#1a6fc4", fontWeight: 900 }}>
                  Pick your team color!
                </h2>
                <p className="text-sm mt-2" style={{ color: "#5F5E5A", fontWeight: 500 }}>
                  You can change it anytime.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {SKIN_OPTIONS.map((skin) => {
                  const isSelected = skinColor === skin.id;
                  return (
                    <button
                      key={skin.id}
                      onClick={() => setSkinColor(skin.id)}
                      className="flex flex-col items-center gap-1.5 transition-transform active:scale-95"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="rounded-full transition-all"
                        style={{
                          width: isSelected ? 60 : 48,
                          height: isSelected ? 60 : 48,
                          backgroundColor: skin.color,
                          border: isSelected ? "4px solid #FFFFFF" : "none",
                          boxShadow: isSelected
                            ? `0 0 0 3px ${skin.color}, 0 5px 0 ${skin.dark}`
                            : `0 3px 0 ${skin.dark}`,
                        }}
                      />
                      <span
                        className="text-[10px] uppercase tracking-wider"
                        style={{
                          color: isSelected ? skin.dark : "#888780",
                          fontWeight: 800,
                        }}
                      >
                        {skin.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitError && (
                <div
                  className="text-sm text-center rounded-2xl p-3 mt-2"
                  style={{
                    backgroundColor: "#FCEBEB",
                    color: "#A32D2D",
                    border: "2px solid #F7C1C1",
                    fontWeight: 600,
                  }}
                >
                  {submitError}
                </div>
              )}

              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full transition-transform active:translate-y-1 disabled:opacity-60 mt-4"
                style={{
                  height: "64px",
                  backgroundColor: "#FFC43D",
                  color: "#854F0B",
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 900,
                  boxShadow: "0 5px 0 #BA7517",
                  border: "none",
                  cursor: isSubmitting ? "wait" : "pointer",
                  letterSpacing: "0.3px",
                }}
              >
                {isSubmitting ? ot.settingUp : ot.startBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}