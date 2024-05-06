import ProjectCard from "@/components/cards/project-card";
import { HeroHighlight } from "@/components/hero-highlight";
import { Loading } from "@/components/loading/default-loading";
import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";

const ProjectPage: React.FC = async () => {
  const projects = await getProjects();
  return (
    <HeroHighlight className="">
      <div className="relative top-16 left-10 flex flex-wrap gap-12 w-[95%] py-10 justify-center h-fit overflow-visible">
        <Suspense fallback={<Loading />}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </Suspense>
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