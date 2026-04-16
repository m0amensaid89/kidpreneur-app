"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Learn", href: "/world/1", icon: BookOpen }, // Placeholder link
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname.startsWith(tab.href === "/world/1" ? "/world" : tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wider">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
