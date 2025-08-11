import { HeroHighlight } from "@/components/hero-highlight";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";
import { Projects } from "@prisma/client";
import { ProjectViewerCard } from "@/components/cards/project-viewer-card";
import { ProjectFilters } from "@/components/project-filters";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Projects",
  description: "Bhavesh Patil's projects.",
};

interface PageProps {
  searchParams: {
    categories?: string;
    tech?: string;
    search?: string;
    completed?: string;
    ongoing?: string;
  };
}

const ProjectPage: React.FC<PageProps> = async ({ searchParams }) => {
  const projects = await getProjects(searchParams);
  const allCategories = Array.from(
    new Set(projects.flatMap((p) => p.categories))
  );
  const allTech = Array.from(new Set(projects.flatMap((p) => p.tech)));

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
            <ProjectFilters categories={allCategories} technologies={allTech} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full">
            {projects.map((project: Projects) => (
              <ProjectViewerCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

const getProjects = async (searchParams: PageProps["searchParams"]) => {
  const where: any = {};

  // Filter by categories
  if (searchParams.categories) {
    const categories = searchParams.categories.split(",");
    where.categories = {
      hasSome: categories,
    };
  }

  // Filter by technologies
  if (searchParams.tech) {
    const tech = searchParams.tech.split(",");
    where.tech = {
      hasSome: tech,
    };
  }

  // Filter by completion status
  if (searchParams.completed === "false" && searchParams.ongoing === "false") {
    where.isCompleted = false; // This will never match anything
  } else if (searchParams.completed === "false") {
    where.isCompleted = false;
  } else if (searchParams.ongoing === "false") {
    where.isCompleted = true;
  }

  // Get all projects with filters
  const projects = await prisma.projects.findMany({
    where,
    orderBy: {
      projectCompleted: "desc",
    },
  });

  // Filter by search query if present
  if (searchParams.search) {
    const searchLower = searchParams.search.toLowerCase();
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tech.some((t) => t.toLowerCase().includes(searchLower)) ||
        project.categories.some((c) => c.toLowerCase().includes(searchLower))
    );
  }

  return projects;
};

export default ProjectPage;
