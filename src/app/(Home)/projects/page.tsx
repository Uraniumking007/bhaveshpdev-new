import { HeroHighlight } from "@/components/hero-highlight";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { ProjectFilters } from "@/components/project-filters";
import { ProjectsList } from "@/components/projects-list";
import { getProjects, getTechnologies, getCategories } from "@/lib/data";
import type { ProjectWithRelations } from "@/types/projects";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Projects",
  description: "Bhavesh Patil's projects.",
};

export const revalidate = 60;

const ProjectPage: React.FC = async () => {
  const [projects, technologies, categories] = await Promise.all([
    getProjects(),
    getTechnologies(),
    getCategories(),
  ]);

  // Transform data to match the expected format
  const transformedProjects: ProjectWithRelations[] = projects.map((project) => ({
    ...project,
    technologies: project.technologies.map((pt) => ({
      ...pt,
      technology: technologies.find((t) => t.id === pt.technologyId) || undefined,
    })),
    projectCategories: project.categories.map((pc) => ({
      ...pc,
      category: categories.find((c) => c.id === pc.categoryId) || undefined,
    })),
  }));

  const allTech = technologies.map((t) => t.name).sort();
  const allCategories = categories.map((c) => c.name).sort();

  return (
    <HeroHighlight>
      <div className="w-full min-h-screen px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Projects & Work
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              A collection of my projects and work that showcase my skills and
              experience in software development.
            </p>
          </div>

          <div className="mb-8">
            <Suspense
              fallback={<div className="text-white">Loading filters...</div>}
            >
              <ProjectFilters
                categories={allCategories}
                technologies={allTech}
              />
            </Suspense>
          </div>

          <Suspense
            fallback={<div className="text-white">Loading projects...</div>}
          >
            <ProjectsList projects={transformedProjects} />
          </Suspense>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default ProjectPage;

