"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { Sparkles } from "lucide-react";

const QUACKY_BLUE = "#2E8CE6";
const QUACKY_BLUE_DARK = "#1a6fc4";

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">

      {/* Hero header with Quacky */}
      <div
        className="relative text-white pt-12 pb-10 px-6"
        style={{
          background: `linear-gradient(135deg, ${QUACKY_BLUE} 0%, ${QUACKY_BLUE_DARK} 100%)`,
        }}
      >
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <QuackyAvatar state="happy" size="xl" className="drop-shadow-lg" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-[0.22em] text-white/85 mb-1">
              <Sparkles className="w-3 h-3" />
              KIDPRENEUR
              <Sparkles className="w-3 h-3" />
            </div>
            <h1 className="text-3xl font-black">Welcome back!</h1>
            <p className="text-sm text-white/85 mt-1 font-semibold">
              Your adventure is ready to continue.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto w-full">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[11px] font-black tracking-widest text-muted-foreground uppercase"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 rounded-2xl text-base font-medium border-2"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-[11px] font-black tracking-widest text-muted-foreground uppercase"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-14 rounded-2xl text-base font-medium border-2"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-semibold bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl text-base font-black text-white transition-transform active:translate-y-0.5 disabled:opacity-50 mt-6"
            style={{
              backgroundColor: QUACKY_BLUE,
              boxShadow: `0 4px 0 ${QUACKY_BLUE_DARK}`,
            }}
          >
            {loading ? "Signing in..." : "Let's go!"}
          </button>

          <div className="pt-4 text-center text-sm">
            <span className="text-muted-foreground">New here? </span>
            <Link
              href="/signup"
              className="font-black hover:underline"
              style={{ color: QUACKY_BLUE }}
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
