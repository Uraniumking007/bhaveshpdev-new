import { HeroHighlight } from "@/components/hero-highlight";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { ProjectFilters } from "@/components/project-filters";
import { ProjectsList } from "@/components/projects-list";
import { ProjectWithRelations } from "@/types/projects";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Projects",
  description: "Bhavesh Patil's projects.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ProjectPage: React.FC = async () => {
  const [projects, filterOptions] = await Promise.all([
    getAllProjects(),
    getFilterOptions(),
  ]);
  const allCategories = filterOptions.categories;
  const allTech = filterOptions.technologies;

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
            <ProjectsList projects={projects} />
          </Suspense>
        </div>
      </div>
    </HeroHighlight>
  );
};

const getAllProjects = async (): Promise<ProjectWithRelations[]> => {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
        projectCategories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        projectCompleted: "desc",
      },
    });
    return projects;
  } catch (error) {
    console.error("[ProjectsPage] Failed to fetch projects", error);
    return [];
  }
};

async function getFilterOptions() {
  // Gather from normalized tables only
  const [techRows, categoryRows] = await Promise.all([
    prisma.technology.findMany({ select: { name: true } }),
    prisma.category.findMany({ select: { name: true } }),
  ]);

  return {
    technologies: techRows.map((t) => t.name).sort(),
    categories: categoryRows.map((c) => c.name).sort(),
  };
}

export default ProjectPage;

