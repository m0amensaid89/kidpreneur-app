import { BottomNav } from "@/components/ui/BottomNav";
import { DesktopLayout } from '@/components/layout/DesktopLayout'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col w-full h-full pb-16">
      <div className="flex-1 overflow-y-auto w-full">
        <DesktopLayout>{children}</DesktopLayout>
      </div>
      <BottomNav />
    </div>
  );
}