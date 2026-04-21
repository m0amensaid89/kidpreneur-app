"use client";

import { useLocale } from "@/components/LocaleProvider";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SettingsClientProps {
  user: User;
  profile: { name?: string; age_range?: string; quacky_skin?: string } | null;
}

const SKIN_OPTIONS = [
  { id: "blue", color: "#2E8CE6", dark: "#1a6fc4", label: "Classic" },
  { id: "orange", color: "#FF6340", dark: "#D85A30", label: "Canvas" },
  { id: "purple", color: "#7B52EE", dark: "#534AB7", label: "Story" },
  { id: "green", color: "#00A878", dark: "#0F6E56", label: "Power" },
  { id: "violet", color: "#6B35FF", dark: "#3C3489", label: "Neural" },
];

const AGE_OPTIONS = ["8-10", "11-13", "14-15"];
// Bilingual skin labels — Egyptian dialect
const SKIN_LABELS_AR: Record<string, string> = {
  Classic: 'كلاسيك', Canvas: 'كانفاس', Story: 'ستوري', Power: 'باور', Neural: 'نيورال',
};


export function SettingsClient({ user, profile }: SettingsClientProps) {
  const router = useRouter();
  const { locale, isRTL } = useLocale();
  const isAr = locale === 'ar';
  const t = isAr
    ? {
        back: 'رجوع', yourName: 'اسمك', nameQuestion: 'كواكي هيناديك إيه؟',
        ageQuestion: 'عمرك قد إيه؟', age8: '٨-١١ سنة', age12: '١٢-١٥ سنة',
        soundEffects: 'مؤثرات صوتية', soundDesc: 'أصوات ممتعة أثناء التعلم',
        turnOffSounds: 'أوقف الأصوات', turnOnSounds: 'شغّل الأصوات',
        language: 'اللغة', quackySkin: 'شخصية كواكي',
        save: 'احفظ التغييرات', saving: 'جاري الحفظ...',
        areYouSure: 'متأكد؟', logout: 'خروج', cancel: 'إلغاء',
        english: 'الإنجليزية', arabic: 'العربية',
      }
    : {
        back: 'Back', yourName: 'YOUR NAME', nameQuestion: 'What should Quacky call you?',
        ageQuestion: 'HOW OLD ARE YOU?', age8: '8-11 years', age12: '12-15 years',
        soundEffects: 'Sound effects', soundDesc: 'Fun sounds while you learn',
        turnOffSounds: 'Turn off sounds', turnOnSounds: 'Turn on sounds',
        language: 'Language', quackySkin: 'Quacky Skin',
        save: 'Save Changes', saving: 'Saving...',
        areYouSure: 'Are you sure?', logout: 'Log Out', cancel: 'Cancel',
        english: 'English', arabic: 'Arabic',
      };
  const supabase = createClient();

  const [name, setName] = useState(profile?.name || "");
  const [ageRange, setAgeRange] = useState(profile?.age_range || "8-10");
  const [skinColor, setSkinColor] = useState(profile?.quacky_skin || "blue");
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const savedSounds = localStorage.getItem("kidpreneur_sounds");
    if (savedSounds !== null) setSoundsEnabled(savedSounds === "true");
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    // Save name (critical) first, then the extras as best-effort
    const nameResult = await supabase
      .from("profiles")
      .update({ name: name.trim(), updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (nameResult.error) {
      setSaveError(nameResult.error.message);
      setIsSaving(false);
      return;
    }

    // Best-effort writes — columns may not exist
    await supabase.from("profiles").update({ age_range: ageRange }).eq("id", user.id);
    await supabase.from("profiles").update({ quacky_skin: skinColor }).eq("id", user.id);

    localStorage.setItem("kidpreneur_sounds", soundsEnabled.toString());
    setIsSaving(false);
    router.push("/profile");
  };

  const handleResetProgress = async () => {
    await supabase.from("xp_log").delete().eq("user_id", user.id);
    await supabase.from("mission_completions").delete().eq("user_id", user.id);
    await supabase.from("profiles").update({ streak: 0 }).eq("id", user.id);
    setShowResetModal(false);
    window.location.href = "/home";
  };

  return (
    <div
      className="flex flex-col min-h-full relative overflow-hidden pb-10 animate-in fade-in duration-300"
      style={{ color: "#2C2C2A" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-16 right-6 w-14 h-14 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.4 }} aria-hidden="true" />
      <div className="absolute top-48 left-6 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.4 }} aria-hidden="true" />

      {/* Top bar — back + title */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition active:scale-95"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 3px 0 #E6D5A8" }}
          aria-label={t.back}
        >
          <span style={{ fontSize: 20, color: "#854F0B", lineHeight: 1, fontWeight: 900 }}>‹</span>
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1a6fc4", flex: 1 }}>Settings ⚙️</h1>
      </div>

      {/* Quacky header */}
      <div className="relative z-10 flex justify-center pb-2">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "4px solid #2E8CE6",
            boxShadow: "0 5px 0 #1a6fc4",
          }}
        >
          <Image
            src="/quacky/quacky-neutral.png"
            alt="Quacky"
            width={90}
            height={90}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Body card */}
      <div
        className="relative z-10 flex-1 mt-4 px-5 pt-5 pb-6"
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* Name */}
        <div className="mb-5">
          <label
            className="block mb-1.5"
            style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#378ADD" }}
          >
            YOUR NAME
          </label>
          <div
            style={{
              backgroundColor: "#F4F8FD",
              border: "3px solid #E6F1FB",
              borderRadius: 20,
              padding: "14px 18px",
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.nameQuestion}
              className="w-full bg-transparent outline-none text-base"
              style={{ color: "#2C2C2A", fontWeight: 700 }}
            />
          </div>
        </div>

        {/* Age range */}
        <div className="mb-5">
          <label
            className="block mb-2"
            style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#378ADD" }}
          >
            HOW OLD ARE YOU?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {AGE_OPTIONS.map((range) => {
              const isSelected = ageRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setAgeRange(range)}
                  className="transition-all active:translate-y-0.5"
                  style={{
                    height: 52,
                    backgroundColor: isSelected ? "#E6F1FB" : "#F4F8FD",
                    color: isSelected ? "#1a6fc4" : "#5F5E5A",
                    border: `2.5px solid ${isSelected ? "#2E8CE6" : "#E6F1FB"}`,
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: 900,
                    boxShadow: isSelected ? "0 3px 0 #1a6fc4" : "0 2px 0 #E6F1FB",
                    cursor: "pointer",
                  }}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quacky color */}
        <div className="mb-5">
          <label
            className="block mb-2"
            style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", color: "#378ADD" }}
          >
            QUACKY&apos;S TEAM COLOR
          </label>
          <div
            className="flex justify-around items-center py-3"
            style={{
              backgroundColor: "#F4F8FD",
              border: "2.5px solid #E6F1FB",
              borderRadius: 20,
            }}
          >
            {SKIN_OPTIONS.map((skin) => {
              const isSelected = skinColor === skin.id;
              return (
                <button
                  key={skin.id}
                  onClick={() => setSkinColor(skin.id)}
                  className="flex flex-col items-center gap-1 transition-transform active:scale-95"
                  style={{ cursor: "pointer" }}
                  aria-label={isAr ? SKIN_LABELS_AR[skin.label] ?? skin.label : skin.label}
                >
                  <div
                    className="rounded-full transition-all"
                    style={{
                      width: isSelected ? 48 : 36,
                      height: isSelected ? 48 : 36,
                      backgroundColor: skin.color,
                      border: isSelected ? "3px solid #FFFFFF" : "none",
                      boxShadow: isSelected
                        ? `0 0 0 3px ${skin.color}, 0 4px 0 ${skin.dark}`
                        : `0 2px 0 ${skin.dark}`,
                    }}
                  />
                  <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.5px", color: isSelected ? skin.dark : "#888780" }}>
                    {isAr ? SKIN_LABELS_AR[skin.label] ?? skin.label : skin.label.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound toggle */}
        <div
          className="flex items-center gap-3 mb-5 px-4 py-3"
          style={{
            backgroundColor: "#FFFBE6",
            border: "2.5px solid #FFE066",
            borderRadius: 20,
          }}
        >
          <span style={{ fontSize: 24 }}>🔊</span>
          <div className="flex-1">
            <p style={{ fontSize: 14, fontWeight: 900, color: "#854F0B", lineHeight: 1.2 }}>
              Sound effects
            </p>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#BA7517" }}>
              Fun sounds while you learn
            </p>
          </div>
          <button
            onClick={() => setSoundsEnabled(!soundsEnabled)}
            className="relative transition-all active:scale-95"
            style={{
              width: 56,
              height: 32,
              backgroundColor: soundsEnabled ? "#00A878" : "#D3D1C7",
              borderRadius: 999,
              border: "2.5px solid #854F0B",
              cursor: "pointer",
            }}
            aria-label={soundsEnabled ? t.turnOffSounds : t.turnOnSounds}
          >
            <div
              className="absolute top-0.5 transition-all"
              style={{
                left: soundsEnabled ? "calc(100% - 25px)" : "2px",
                width: 20,
                height: 20,
                backgroundColor: "#FFFFFF",
                borderRadius: 999,
                boxShadow: "0 2px 0 #854F0B",
              }}
            />
          </button>
        </div>

        {saveError && (
          <div
            className="text-sm text-center rounded-2xl p-3 mb-3"
            style={{
              backgroundColor: "#FCEBEB",
              color: "#A32D2D",
              border: "2px solid #F7C1C1",
              fontWeight: 600,
            }}
          >
            Couldn&apos;t save: {saveError}
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full transition-transform active:translate-y-1 disabled:opacity-60 mb-3"
          style={{
            height: 64,
            backgroundColor: "#FFC43D",
            color: "#854F0B",
            borderRadius: 24,
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "0 5px 0 #BA7517",
            border: "none",
            cursor: isSaving ? "wait" : "pointer",
            letterSpacing: "0.3px",
          }}
        >
          {isSaving ? t.saving : "Save changes 💾"}
        </button>

        {/* Reset progress — destructive */}
        <button
          onClick={() => setShowResetModal(true)}
          className="w-full transition-transform active:translate-y-1"
          style={{
            height: 52,
            backgroundColor: "#FEF2F2",
            color: "#A32D2D",
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 800,
            border: "2.5px solid #F7C1C1",
            boxShadow: "0 3px 0 #F09595",
            cursor: "pointer",
          }}
        >
          🗑️ Reset all progress
        </button>
      </div>

      {/* Reset confirmation modal */}
      {showResetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 animate-in fade-in"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="w-full max-w-sm p-5"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              border: "3px solid #F7C1C1",
              boxShadow: "0 6px 0 #F09595",
            }}
          >
            <div className="text-center pt-3 pb-4">
              <div style={{ fontSize: 48, marginBottom: 8 }}>⚠️</div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#A32D2D", lineHeight: 1.1 }}>
                Are you sure?
              </h2>
              <p className="mt-2" style={{ fontSize: 13, fontWeight: 600, color: "#5F5E5A", lineHeight: 1.4 }}>
                This will delete all your XP, streaks, and missions. You can&apos;t undo this.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowResetModal(false)}
                className="transition-transform active:translate-y-0.5"
                style={{
                  height: 52,
                  backgroundColor: "#F4F8FD",
                  color: "#2C2C2A",
                  borderRadius: 16,
                  fontSize: 14,
                  fontWeight: 900,
                  border: "2.5px solid #E6F1FB",
                  boxShadow: "0 3px 0 #C4D8EC",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="transition-transform active:translate-y-0.5"
                style={{
                  height: 52,
                  backgroundColor: "#E24B4A",
                  color: "#FFFFFF",
                  borderRadius: 16,
                  fontSize: 14,
                  fontWeight: 900,
                  border: "none",
                  boxShadow: "0 3px 0 #A32D2D",
                  cursor: "pointer",
                }}
              >
                Yes, reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
