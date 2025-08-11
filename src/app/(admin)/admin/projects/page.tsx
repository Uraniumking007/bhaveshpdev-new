"use client";

import { useState, useEffect } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ProjectForm } from "@/components/forms/project-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { getProjects, deleteProject } from "./actions";
import { ProjectAdminCard } from "@/components/cards/project-card";
import { useRouter } from "next/navigation";

export default function ProjectsAdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdate = async (id: string) => {
    router.push(`/admin/projects/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const result = await deleteProject(id);
        if (!result.success) throw new Error(result.error);
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading projects: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-white/70 mt-2">
            Manage your portfolio projects and showcase your work.
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className={cn(
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300",
            "flex items-center gap-2"
          )}
        >
          <IconPlus className="w-5 h-5" />
          Add Project
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-2xl">
            <ProjectForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <ProjectAdminCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
