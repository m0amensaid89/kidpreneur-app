"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsClient({ user, profile }: { user: any, profile: any }) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(profile?.name || "");
  const [ageRange, setAgeRange] = useState(profile?.age_range || "8-10");
  const [quackySkin, setQuackySkin] = useState(profile?.quacky_skin || "yellow");
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const savedSounds = localStorage.getItem("kidpreneur_sounds");
    if (savedSounds !== null) {
      setSoundsEnabled(savedSounds === "true");
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await supabase
      .from("profiles")
      .update({
        name,
        age_range: ageRange,
        quacky_skin: quackySkin,
      })
      .eq("id", user.id);

    localStorage.setItem("kidpreneur_sounds", soundsEnabled.toString());
    setIsSaving(false);
    router.push("/profile");
  };

  const handleResetProgress = async () => {
    // We clear xp_log and mission_completions, and set streak to 0
    await supabase.from("xp_log").delete().eq("user_id", user.id);
    await supabase.from("mission_completions").delete().eq("user_id", user.id);
    await supabase.from("profiles").update({ streak: 0 }).eq("id", user.id);
    setShowResetModal(false);
    window.location.href = "/home"; // Hard reload to clear all states
  };

  const colors = [
    { id: "yellow", hex: "#FBBF24", name: "Classic Yellow" },
    { id: "green", hex: "#10B981", name: "Neon Green" },
    { id: "purple", hex: "#8B5CF6", name: "Cosmic Purple" }
  ];

  return (
    <div className="flex flex-col min-h-full pb-20 animate-in fade-in duration-300">
      <TopBar title="Settings" />

      <div className="p-4 flex-1 space-y-6">
        <div className="flex justify-center mb-6">
          <img src="/quacky/quacky-neutral.png" alt="Quacky" className="w-24 h-24 object-contain" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Display Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card border-border/50 h-12 text-lg font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Age Range</label>
            <Select value={ageRange} onValueChange={setAgeRange}>
              <SelectTrigger className="bg-card border-border/50 h-12 text-lg font-bold">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8-10">8-10 years</SelectItem>
                <SelectItem value="11-13">11-13 years</SelectItem>
                <SelectItem value="14-15">14-15 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Quacky Color</label>
            <div className="flex justify-around bg-card border border-border/50 rounded-2xl p-4">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setQuackySkin(c.id)}
                  className={`w-12 h-12 rounded-full transition-transform ${quackySkin === c.id ? 'scale-110 ring-4 ring-primary ring-offset-4 ring-offset-background' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <Card className="bg-card border-border/50 shadow-sm mt-4">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Sound Effects</h3>
                <p className="text-xs text-muted-foreground font-medium">Fun sounds while learning</p>
              </div>
              <Switch
                checked={soundsEnabled}
                onCheckedChange={setSoundsEnabled}
              />
            </CardContent>
          </Card>
        </div>

        <div className="pt-8 space-y-4">
          <Button
            className="w-full font-black h-14 rounded-xl shadow-md text-lg"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>

          <Button
            variant="ghost"
            className="w-full font-bold text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowResetModal(true)}
          >
            Reset Progress
          </Button>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-foreground">Are you sure?</h2>
              <p className="text-muted-foreground font-medium">This will delete all your XP, streaks, and completed missions. This cannot be undone!</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 font-bold rounded-xl" onClick={() => setShowResetModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="h-12 font-bold rounded-xl" onClick={handleResetProgress}>
                Yes, Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
