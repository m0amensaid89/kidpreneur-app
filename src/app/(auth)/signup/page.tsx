"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/onboarding");
      router.refresh();
    }
  };

  return (
    <div
      className="flex flex-col min-h-[100dvh] relative overflow-hidden"
      style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}
    >
      {/* Decorative floating circles */}
      <div
        className="absolute top-12 right-6 w-20 h-20 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-44 left-8 w-16 h-16 rounded-full pointer-events-none"
        style={{ backgroundColor: "#C8E6C9", opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-64 right-10 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.45 }}
        aria-hidden="true"
      />

      {/* Hero — cheering Quacky */}
      <div className="relative z-10 pt-8 pb-5 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div
          className="w-36 h-36 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "5px solid #FFC43D",
            boxShadow: "0 6px 0 #BA7517",
          }}
        >
          <Image
            src="/quacky/quacky-cheering.png"
            alt="Quacky is cheering for you"
            width={110}
            height={110}
            className="object-contain"
            priority
          />
        </div>

        <h1
          className="text-3xl leading-tight mb-1"
          style={{ color: "#1a6fc4", fontWeight: 900 }}
        >
          Let&apos;s be friends!
        </h1>
        <p className="text-base" style={{ color: "#5F5E5A", fontWeight: 500 }}>
          Your adventure starts here.
        </p>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 px-6 pb-2">
        <div className="max-w-sm mx-auto flex items-center justify-around gap-3 px-4 py-2.5 rounded-2xl"
          style={{ backgroundColor: "#FFFFFF", border: "2px solid #FFE066" }}
        >
          <TrustItem emoji="🌍" label="5 worlds" />
          <div style={{ width: 1, height: 24, backgroundColor: "#E6D5A8" }} />
          <TrustItem emoji="🎯" label="114 missions" />
          <div style={{ width: 1, height: 24, backgroundColor: "#E6D5A8" }} />
          <TrustItem emoji="🏆" label="33 badges" />
        </div>
      </div>

      {/* White form card */}
      <div
        className="relative z-10 flex-1 mt-4 px-6 pt-6 pb-10 animate-in fade-in slide-in-from-bottom-6 duration-500"
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <form onSubmit={handleSignup} className="space-y-4 max-w-sm mx-auto w-full">

          <div
            style={{
              backgroundColor: "#F4F8FD",
              border: "3px solid #E6F1FB",
              borderRadius: "24px",
              padding: "12px 20px",
            }}
          >
            <label htmlFor="email" className="block text-xs mb-1" style={{ color: "#378ADD", fontWeight: 700 }}>
              your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="type it here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-base"
              style={{ color: "#2C2C2A", fontWeight: 600 }}
            />
          </div>

          <div
            style={{
              backgroundColor: "#F4F8FD",
              border: "3px solid #E6F1FB",
              borderRadius: "24px",
              padding: "12px 20px",
            }}
          >
            <label htmlFor="password" className="block text-xs mb-1" style={{ color: "#378ADD", fontWeight: 700 }}>
              make a password
            </label>
            <input
              id="password"
              type="password"
              placeholder="at least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full bg-transparent outline-none text-base"
              style={{ color: "#2C2C2A", fontWeight: 600 }}
            />
          </div>

          {error && (
            <div
              className="text-sm text-center rounded-2xl p-3"
              style={{
                backgroundColor: "#FCEBEB",
                color: "#A32D2D",
                border: "2px solid #F7C1C1",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          {/* Big CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full transition-transform active:translate-y-1 disabled:opacity-60 mt-6"
            style={{
              height: "64px",
              backgroundColor: "#FFC43D",
              color: "#854F0B",
              borderRadius: "24px",
              fontSize: "18px",
              fontWeight: 900,
              boxShadow: "0 5px 0 #BA7517",
              border: "none",
              cursor: loading ? "wait" : "pointer",
              letterSpacing: "0.3px",
            }}
          >
            {loading ? "Creating..." : "I&apos;m in! 🎉"}
          </button>

          <p className="text-xs text-center pt-3 px-4 leading-relaxed"
            style={{ color: "#888780", fontWeight: 500 }}
          >
            By joining, you let Quacky cheer for you every time you win.
          </p>

          <div className="pt-2 text-center text-sm" style={{ color: "#5F5E5A" }}>
            <span>Been here before? </span>
            <Link
              href="/login"
              style={{ color: "#2E8CE6", fontWeight: 800, textDecoration: "underline" }}
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function TrustItem({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "#854F0B", fontWeight: 800 }}>
        {label}
      </span>
    </div>
  );
}
