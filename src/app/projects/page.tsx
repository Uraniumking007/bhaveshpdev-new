import ProjectCard from "@/components/cards/project-card";
import { HeroHighlight } from "@/components/hero-highlight";
import { Loading } from "@/components/loading/default-loading";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { Tabs } from "@/components/tabs/tabs";
import { Projects } from "@prisma/client";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Projects",
  description: "Bhavesh Patil's projects.",
};

const ProjectPage: React.FC = async () => {
  const projects = await getProjects();

  const hasCategory = (project: Projects, category: string): boolean => {
    // Handle uncategorized case
    if (category.toLowerCase() === "uncategorized") {
      return !project.categories || project.categories.length === 0;
    }

    // Handle "all" category
    if (category.toLowerCase() === "all") {
      return true;
    }

    // Return false for uncategorized projects for any other category
    if (!project.categories || project.categories.length === 0) {
      return false;
    }

    const variants: { [key: string]: string[] } = {
      "next.js": ["next.js", "next", "next js", "nextjs"],
      javascript: ["javascript", "js", "vanilla javascript", "vanilla js"],
      "basic html": ["html", "basic html", "vanilla html"],
      frontend: ["frontend", "front-end", "front end"],
      backend: ["backend", "back-end", "back end"],
      fullstack: ["fullstack", "full-stack", "full stack"],
    };

    const normalizeCategory = (cat: string) =>
      cat.toLowerCase().replace(/[\s.]+/g, "");

    const categoryKey = normalizeCategory(category);
    const categoryVariants = variants[categoryKey] || [categoryKey];

    return project.categories.some(
      (projectCategory) =>
        categoryVariants.includes(normalizeCategory(projectCategory)) ||
        Object.entries(variants).some(
          ([key, variants]) =>
            variants.includes(normalizeCategory(projectCategory)) &&
            variants.includes(categoryKey)
        )
    );
  };

  const tabs = [
    {
      title: "All",
      value: "all",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project: Projects) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ),
    },
    {
      title: "Next.js",
      value: "nextjs",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) => hasCategory(project, "Next.js"))
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
    {
      title: "Basic HTML",
      value: "html",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) => hasCategory(project, "Basic HTML"))
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
    {
      title: "JavaScript",
      value: "javascript",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) => hasCategory(project, "JavaScript"))
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
    {
      title: "Full Stack",
      value: "fullstack",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) => hasCategory(project, "Full Stack"))
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
    {
      title: "Frontend",
      value: "frontend",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) => hasCategory(project, "Frontend"))
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
    {
      title: "Backend",
      value: "backend",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) => hasCategory(project, "Backend"))
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
    {
      title: "Uncategorized",
      value: "uncategorized",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter(
              (project: Projects) =>
                !project.categories || project.categories.length === 0
            )
            .map((project: Projects) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      ),
    },
  ];

  return (
    <HeroHighlight>
      <div className="relative w-full px-8 flex justify-center min-h-screen">
        <div className="w-full max-w-7xl">
          <Tabs
            tabs={tabs}
            containerClassName="w-full mt-20 mb-8 justify-center"
            contentClassName=""
          />
        </div>
      </div>
    </HeroHighlight>
  );
};

export default ProjectPage;

const getProjects = async () => {
  return await prisma.projects.findMany({
    orderBy: {
      projectCompleted: "desc",
    },
  });
};
