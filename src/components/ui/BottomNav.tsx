"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Trophy, User } from "lucide-react";

const tabs = [
  { name: "Home", href: "/home", icon: Home, match: /^\/home/ },
  { name: "Learn", href: "/world/w1", icon: BookOpen, match: /^\/(world|lesson|quiz|mission|chat)/ },
  { name: "Badges", href: "/profile", icon: Trophy, match: /^\/profile/ },
  { name: "Me", href: "/settings", icon: User, match: /^\/settings/ },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] pb-safe z-40"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "3px solid #FFE066",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.match.test(pathname);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className="flex flex-col items-center justify-center w-full h-full gap-0.5 transition-transform active:scale-95"
            >
              <div
                className="flex items-center justify-center rounded-2xl transition-all"
                style={{
                  width: isActive ? 48 : 36,
                  height: 32,
                  backgroundColor: isActive ? "#FFE066" : "transparent",
                }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{
                    color: isActive ? "#854F0B" : "#888780",
                  }}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 900 : 700,
                  letterSpacing: "0.5px",
                  color: isActive ? "#854F0B" : "#888780",
                }}
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
