"use client";

import { useMemo } from "react";
import { useSearchParams } from "@/hooks/use-search-params";
import ProjectViewerCard from "./cards/ProjectViewerCard.astro";
import type { ProjectWithRelations } from "@/types/projects";

interface ProjectsListProps {
  projects: ProjectWithRelations[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const searchParams = useSearchParams();

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by categories (using relations only)
    // Match projects that have at least one of the selected categories (OR logic)
    const categoriesParam = searchParams.get("categories");
    if (categoriesParam) {
      const categoriesLower = categoriesParam
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);

      if (categoriesLower.length > 0) {
        filtered = filtered.filter((project) => {
          const categoryNames =
            project.projectCategories
              ?.map((pc) => pc.category?.name?.toLowerCase())
              .filter((c): c is string => c !== undefined) || [];
          return categoriesLower.some((c) => categoryNames.includes(c));
        });
      }
    }

    // Filter by technologies (using relations only)
    // Match projects that have at least one of the selected technologies (OR logic)
    const techParam = searchParams.get("tech");
    if (techParam) {
      const techLower = techParam
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      if (techLower.length > 0) {
        filtered = filtered.filter((project) => {
          const techNames =
            project.technologies
              ?.map((pt) => pt.technology?.name?.toLowerCase())
              .filter((t): t is string => t !== undefined) || [];
          return techLower.some((t) => techNames.includes(t));
        });
      }
    }

    // Filter by completion status
    // Rules:
    // - completed=true & ongoing=true -> show all (no filter)
    // - completed=false & ongoing=false -> show all (no filter)
    // - completed=true & ongoing=false -> show completed only (isCompleted = true)
    // - completed=false & ongoing=true -> show ongoing only (isCompleted = false)
    const completed = searchParams.get("completed") !== "false";
    const ongoing = searchParams.get("ongoing") !== "false";

    if (completed && !ongoing) {
      // Show completed only
      filtered = filtered.filter((project) => project.isCompleted === true);
    } else if (!completed && ongoing) {
      // Show ongoing only
      filtered = filtered.filter((project) => project.isCompleted === false);
    }
    // If both true or both false, don't filter by completion status

    // Filter by search query if present (using relations only)
    const searchParam = searchParams.get("search");
    if (searchParam) {
      const searchLower = searchParam.toLowerCase();
      filtered = filtered.filter((project) => {
        const techNames =
          project.technologies
            ?.map((pt) => pt.technology?.name)
            .filter((t): t is string => t !== undefined) || [];
        const categoryNames =
          project.projectCategories
            ?.map((pc) => pc.category?.name)
            .filter((c): c is string => c !== undefined) || [];
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          techNames.some((t) => t.toLowerCase().includes(searchLower)) ||
          categoryNames.some((c) => c.toLowerCase().includes(searchLower))
        );
      });
    }

    return filtered;
  }, [projects, searchParams]);

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 text-lg">
          No projects found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full">
      {filteredProjects.map((project, index) => (
        <ProjectViewerCard
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}
