"use client";

import { TopBar } from "@/components/ui/TopBar";
import { XPBar } from "@/components/ui/XPBar";
import { WorldCard } from "@/components/ui/WorldCard";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { useRouter } from "next/navigation";

// Mock data for worlds since Supabase tables aren't set up yet
const MOCK_WORLDS = [
  { id: 1, name: "Idea Island", description: "Discover your first big idea", progress: 60, isLocked: false },
  { id: 2, name: "Market Mountain", description: "Learn who needs your idea", progress: 0, isLocked: true },
  { id: 3, name: "Product Plateau", description: "Build your first prototype", progress: 0, isLocked: true },
  { id: 4, name: "Sales Savannah", description: "Make your first sale", progress: 0, isLocked: true },
  { id: 5, name: "Growth Galaxy", description: "Scale your business to the stars", progress: 0, isLocked: true },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full pb-8">
      <TopBar
        title="World Map"
        showBack={false}
        rightElement={<QuackyAvatar state="happy" size="sm" className="w-8 h-8 rounded-full bg-accent/20 border border-accent/50" />}
      />

      <div className="p-4 space-y-6 flex-1">
        <XPBar xp={450} levelXP={1000} level={2} />

        <div className="space-y-4 pt-2 relative">
          {/* Path connecting worlds */}
          <div className="absolute left-12 top-0 bottom-0 w-2 bg-muted-foreground/20 rounded-full z-0 translate-x-[-4px]" />

          {MOCK_WORLDS.map((world) => (
            <div key={world.id} className="relative z-10">
              <WorldCard
                id={world.id}
                name={world.name}
                description={world.description}
                progress={world.progress}
                isLocked={world.isLocked}
                onClick={() => router.push(`/world/${world.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
