import { Suspense } from "react";
import { getBackdoors } from "./actions";
import { BackdoorsClient } from "./backdoors-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function BackdoorsAdminPage() {
    return (
    <Suspense fallback={<BackdoorsSkeleton />}>
      <BackdoorsContent />
    </Suspense>
  );
}

async function BackdoorsContent() {
  const backdoors = await getBackdoors();
  const entries = backdoors.map((entry) => ({
    id: entry.id.toString(),
    hostname: entry.hostname,
    payment: entry.payment ? Number(entry.payment) : null,
    statuscode: entry.statuscode,
    createdAt: entry.created_at.toISOString(),
  }));

  return <BackdoorsClient entries={entries} />;
  }

function BackdoorsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-16 w-full rounded-2xl bg-white/10" />
      {Array.from({ length: 4 }).map((_, idx) => (
        <Skeleton
          key={idx}
          className="h-20 w-full rounded-xl border border-white/10 bg-white/5"
          />
        ))}
    </div>
  );
}
