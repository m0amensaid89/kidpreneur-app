import { ParentClient } from "./ParentClient";

export default async function ParentPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white text-slate-900 font-sans">
      {!childId ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">No Child Profile Specified</h1>
          <p className="text-slate-500">Please make sure the link is complete.</p>
        </div>
      ) : (
        <ParentClient childId={childId} />
      )}
    </div>
  );
}
