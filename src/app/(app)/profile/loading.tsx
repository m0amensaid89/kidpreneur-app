import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { TopBar } from "@/components/ui/TopBar";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-full">
      <TopBar title="Loading..." showBack={false} />
      <div className="p-4 flex-1">
        <SkeletonLoader />
      </div>
    </div>
  );
}
