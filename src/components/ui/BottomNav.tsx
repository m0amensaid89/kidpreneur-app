"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Home", href: "/home", icon: Home, match: /^\/home/ },
  { name: "Learn", href: "/world/w1", icon: BookOpen, match: /^\/(world|lesson|quiz|mission|chat)/ },
  { name: "Badges", href: "/profile", icon: Trophy, match: /^\/profile/ },
  { name: "Me", href: "/settings", icon: User, match: /^\/settings/ },
];

const QUACKY_BLUE = "#2E8CE6";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border/50 pb-safe z-40">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.match.test(pathname);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors"
              )}
              style={{
                color: isActive ? QUACKY_BLUE : undefined,
              }}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  !isActive && "text-muted-foreground"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-[10px] font-bold tracking-wider",
                  !isActive && "text-muted-foreground"
                )}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
