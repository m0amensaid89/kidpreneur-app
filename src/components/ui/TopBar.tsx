"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "./button";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

export function TopBar({ title, showBack = true, rightElement }: TopBarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex-1 flex items-center">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8 mr-2 rounded-full hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex-1 text-center font-bold text-lg">{title}</div>
      <div className="flex-1 flex justify-end items-center">{rightElement}</div>
    </div>
  );
}
