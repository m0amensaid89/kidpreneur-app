"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { Rocket } from "lucide-react";

const QUACKY_BLUE = "#2E8CE6";
const QUACKY_BLUE_DARK = "#1a6fc4";

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
    <div className="flex flex-col min-h-[100dvh]">

      <div
        className="relative text-white pt-12 pb-10 px-6"
        style={{
          background: `linear-gradient(135deg, ${QUACKY_BLUE} 0%, ${QUACKY_BLUE_DARK} 100%)`,
        }}
      >
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <QuackyAvatar state="cheering" size="xl" className="drop-shadow-lg" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-[0.22em] text-white/85 mb-1">
              <Rocket className="w-3 h-3" />
              JOIN KIDPRENEUR
              <Rocket className="w-3 h-3" />
            </div>
            <h1 className="text-3xl font-black">Start your adventure!</h1>
            <p className="text-sm text-white/85 mt-1 font-semibold">
              Build your empire, one mission at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Trust row */}
      <div className="px-6 py-4 bg-card border-b border-border/50">
        <div className="flex items-center justify-around max-w-sm mx-auto text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Ages 8-15
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            5 worlds
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            114 missions
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <form onSubmit={handleSignup} className="space-y-4 max-w-sm mx-auto w-full">
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
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
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
            {loading ? "Creating account..." : "Create my account"}
          </button>

          <p className="text-[11px] text-center text-muted-foreground leading-relaxed pt-3 px-4">
            By continuing you agree to let Quacky cheer for you every time you
            complete a mission. 🦆
          </p>

          <div className="pt-2 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/login"
              className="font-black hover:underline"
              style={{ color: QUACKY_BLUE }}
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
