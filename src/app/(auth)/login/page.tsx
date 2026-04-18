"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <div
      className="flex flex-col min-h-[100dvh] relative overflow-hidden"
      style={{
        backgroundColor: "#FFF8E7",
        color: "#2C2C2A",
      }}
    >
      {/* Decorative floating circles — Quacky's world */}
      <div
        className="absolute top-16 right-8 w-16 h-16 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFE066", opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-40 left-6 w-20 h-20 rounded-full pointer-events-none"
        style={{ backgroundColor: "#FFB3BA", opacity: 0.45 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-56 right-4 w-14 h-14 rounded-full pointer-events-none"
        style={{ backgroundColor: "#B3E5FC", opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 left-8 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: "#C8E6C9", opacity: 0.5 }}
        aria-hidden="true"
      />

      {/* Hero — Quacky in his world (warm cream bg) */}
      <div className="relative z-10 pt-10 pb-6 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div
          className="w-40 h-40 mx-auto mb-5 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "5px solid #2E8CE6",
            boxShadow: "0 6px 0 #1a6fc4",
          }}
        >
          <Image
            src="/quacky/quacky-happy.png"
            alt="Quacky is happy to see you"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        <h1
          className="text-4xl leading-tight mb-2"
          style={{
            color: "#1a6fc4",
            fontWeight: 900,
          }}
        >
          Hey there!
        </h1>
        <p
          className="text-base"
          style={{
            color: "#5F5E5A",
            fontWeight: 500,
          }}
        >
          Ready to keep learning?
        </p>
      </div>

      {/* White form card that peeks up from the cream background */}
      <div
        className="relative z-10 flex-1 mt-4 px-6 pt-6 pb-10 animate-in fade-in slide-in-from-bottom-6 duration-500"
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto w-full">

          {/* Email bubble */}
          <div
            style={{
              backgroundColor: "#F4F8FD",
              border: "3px solid #E6F1FB",
              borderRadius: "24px",
              padding: "12px 20px",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#2E8CE6")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E6F1FB")}
          >
            <label
              htmlFor="email"
              className="block text-xs mb-1"
              style={{ color: "#378ADD", fontWeight: 700 }}
            >
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
              style={{
                color: "#2C2C2A",
                fontWeight: 600,
              }}
            />
          </div>

          {/* Password bubble */}
          <div
            style={{
              backgroundColor: "#F4F8FD",
              border: "3px solid #E6F1FB",
              borderRadius: "24px",
              padding: "12px 20px",
            }}
          >
            <label
              htmlFor="password"
              className="block text-xs mb-1"
              style={{ color: "#378ADD", fontWeight: 700 }}
            >
              secret password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-base"
              style={{
                color: "#2C2C2A",
                fontWeight: 600,
              }}
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

          {/* The big yellow CTA — the hero button */}
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
            {loading ? "One sec..." : "Let's go! 🚀"}
          </button>

          <div className="pt-4 text-center text-sm" style={{ color: "#5F5E5A" }}>
            <span>New here? </span>
            <Link
              href="/signup"
              style={{ color: "#2E8CE6", fontWeight: 800, textDecoration: "underline" }}
            >
              Make an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
