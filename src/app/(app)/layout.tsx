"use client";

import { BottomNav } from "@/components/ui/BottomNav";
import { DesktopLayout } from '@/components/layout/DesktopLayout'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopLayout>
      <div className="flex-1 flex flex-col w-full h-full pb-16 lg:pb-0">
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </DesktopLayout>
  );
}
