import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTimeline } from "./actions";
import { TimelineClient } from "./timeline-client";
import type { AdminTimelineEntry } from "@/types/admin";

export default function AdminTimelinePage() {
  return (
    <Suspense fallback={<TimelineSkeleton />}>
      <TimelineContent />
    </Suspense>
  );
}

async function TimelineContent() {
  const timeline = await getTimeline();
  const entries: AdminTimelineEntry[] = timeline.map((entry) => ({
    id: entry.id,
    yearStart: entry.yearStart ?? "",
    yearEnd: entry.yearEnd ?? "",
    ongoing: Boolean(entry.ongoing),
    title: entry.title ?? "",
    description: entry.description ?? "",
    type: entry.type ?? "",
  }));
  return <TimelineClient entries={entries} />;
}

function TimelineSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-20 w-full rounded-2xl bg-white/10" />
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-14 w-full rounded-lg bg-white/10" />
        ))}
        </div>
    </div>
  );
}
