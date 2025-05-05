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

  const tabs = [
    {
      title: "Next.js",
      value: "nextjs",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects
            .filter((project: Projects) =>
              project.categories.includes("Next.js")
            )
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
            .filter((project: Projects) =>
              project.categories.includes("Basic HTML")
            )
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
            .filter((project: Projects) =>
              project.categories.includes("JavaScript")
            )
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
            .filter((project: Projects) =>
              project.categories.includes("Full Stack")
            )
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
            .filter((project: Projects) =>
              project.categories.includes("Frontend")
            )
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
            .filter((project: Projects) =>
              project.categories.includes("Backend")
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
      <div className="relative w-full px-8">
        <Tabs
          tabs={tabs}
          containerClassName="w-full justify-start"
          contentClassName="pt-16"
        />
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
