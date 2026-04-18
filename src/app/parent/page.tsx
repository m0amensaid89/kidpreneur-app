import { ParentClient } from "./ParentClient";

export default async function ParentPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const { childId } = await searchParams;

  return (
    <div
      className="flex flex-col min-h-[100dvh]"
      style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}
    >
      {!childId ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div style={{ fontSize: 56, marginBottom: 12 }}>🔗</div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#1a6fc4",
              lineHeight: 1.15,
              maxWidth: 320,
            }}
          >
            No child profile found
          </h1>
          <p
            className="mt-2"
            style={{
              fontSize: 14,
              color: "#5F5E5A",
              fontWeight: 600,
              maxWidth: 320,
              lineHeight: 1.4,
            }}
          >
            Make sure the link your child shared with you is complete.
          </p>
        </div>
      ) : (
        <ParentClient childId={childId} />
      )}
    </div>
  );
}
