import { BottomNav } from "@/components/ui/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col w-full h-full pb-16">
      <div className="flex-1 overflow-y-auto w-full">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
