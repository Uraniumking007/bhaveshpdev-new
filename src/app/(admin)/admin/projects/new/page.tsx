"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProjectForm } from "@/components/forms/project-form";

export default function CreateProjectPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Projects
          </p>
          <h1 className="text-3xl font-bold text-white">Add Project</h1>
          <p className="text-white/70 mt-2">
            Publish a new portfolio entry to showcase your work.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-white/20 text-white"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <ProjectForm
          onClose={() => {
            router.push("/admin/projects");
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
