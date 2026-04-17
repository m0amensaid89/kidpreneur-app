export function SkeletonLoader() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-32 bg-muted rounded-2xl w-full"></div>
      <div className="h-24 bg-muted rounded-2xl w-full"></div>
      <div className="h-24 bg-muted rounded-2xl w-full"></div>
    </div>
  );
}
