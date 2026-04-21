'use client'

import { BottomNav } from "@/components/ui/BottomNav";
import { DesktopLayout } from '@/components/layout/DesktopLayout'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopLayout>
      <div className="flex flex-col min-h-full">
        <div className="flex-1">
          {children}
        </div>
        {/* BottomNav: visible on mobile only */}
        <div className="block lg:hidden">
          <BottomNav />
        </div>
      </div>
    </DesktopLayout>
  );
}
