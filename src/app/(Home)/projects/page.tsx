import { HeroHighlight } from "@/components/hero-highlight";
import { Loading } from "@/components/loading/default-loading";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { Projects } from "@prisma/client";
import { ProjectViewerCard } from "@/components/cards/project-viewer-card";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Projects",
  description: "Bhavesh Patil's projects.",
};

const ProjectPage: React.FC = async () => {
  const projects = await getProjects();

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

export default ProjectPage;

const getProjects = async () => {
  return await prisma.projects.findMany({
    orderBy: {
      projectCompleted: "desc",
    },
  });
};
