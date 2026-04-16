"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else router.push("/home");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-full space-y-8 text-center animate-in fade-in duration-500">
      <QuackyAvatar state={step === 1 ? "happy" : step === 2 ? "pointing" : "cheering"} size="xl" />

      <div className="space-y-4 max-w-sm">
        <h1 className="text-3xl font-black text-primary">
          {step === 1 && "Hi, I'm Quacky!"}
          {step === 2 && "Learn & Play"}
          {step === 3 && "Ready to Build?"}
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          {step === 1 && "I'll be your guide on this amazing journey to becoming a kid entrepreneur."}
          {step === 2 && "Complete lessons, quizzes, and missions to earn XP and level up."}
          {step === 3 && "Let's explore the world of business together. It's time to start!"}
        </p>
      </div>

      <div className="flex space-x-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-2 rounded-full transition-all duration-300 ${s === step ? "w-8 bg-primary" : "w-2 bg-muted"}`} />
        ))}
      </div>

      <Button onClick={handleNext} className="w-full max-w-xs h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/25">
        {step < 3 ? "Next" : "Let's Go!"}
      </Button>
    </div>
  );
}
