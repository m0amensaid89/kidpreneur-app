"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [skinColor, setSkinColor] = useState("blue"); // default blue
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // If no auth session, just redirect to home for now (mock flow)
        router.push("/home");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: session.user.id,
          name: name,
          age_range: ageRange,
          quacky_skin: skinColor,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

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
    <div className="flex flex-col min-h-full pb-8 animate-in fade-in duration-500">
      <TopBar title={`Step ${step} of 3`} showBack={step > 1} />

      <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-8">
        <QuackyAvatar state="neutral" size="lg" />

        <div className="w-full max-w-sm space-y-6">
          {step === 1 && (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">What's your name?</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your first name"
                className="text-center text-lg h-14 rounded-2xl"
              />
              <Button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/25"
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">How old are you?</h2>
              <div className="grid gap-3">
                {["8-10", "11-13", "14-15"].map((range) => (
                  <Button
                    key={range}
                    variant={ageRange === range ? "default" : "outline"}
                    className={`h-16 rounded-2xl text-xl font-bold border-2 transition-all ${ageRange === range ? "border-primary bg-primary/20 text-primary scale-[1.02]" : "border-border"}`}
                    onClick={() => {
                      setAgeRange(range);
                      setTimeout(handleNext, 300);
                    }}
                  >
                    {range} years old
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">Pick your Quacky color!</h2>
              <div className="flex justify-center gap-4 py-4">
                {[
                  { id: "blue", color: "bg-blue-500" },
                  { id: "orange", color: "bg-orange-500" },
                  { id: "green", color: "bg-green-500" },
                ].map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => setSkinColor(skin.id)}
                    className={`w-16 h-16 rounded-full ${skin.color} border-4 transition-all ${skinColor === skin.id ? "border-white scale-110 shadow-lg shadow-white/20" : "border-transparent opacity-70"}`}
                  />
                ))}
              </div>
              <Button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
              >
                {isSubmitting ? "Saving..." : "Let's Go!"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}