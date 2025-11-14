import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "./projects-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsAdminPage() {
    return (
    <Suspense fallback={<ProjectsTableSkeleton />}>
      <ProjectsContent />
    </Suspense>
    );
  }

async function ProjectsContent() {
  const projects = await prisma.projects.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return <ProjectsClient projects={projects} />;
  }

function ProjectsTableSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-20 w-full rounded-3xl bg-white/10" />
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-12 w-full rounded-lg bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
