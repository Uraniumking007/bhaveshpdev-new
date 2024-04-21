import ProjectCard from "@/components/cards/project-card";
import { HeroHighlight } from "@/components/hero-highlight";
import { Meteors } from "@/components/meteors";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";

const ProjectPage: React.FC = async () => {
  const projects = await getData();
  return (
    <HeroHighlight className="">
      <div className="relative top-16 left-10 flex flex-wrap gap-12 w-[95%] py-10 justify-center h-fit overflow-visible">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </HeroHighlight>
  );
};

export default ProjectPage;

const getData = async () => {
  return await prisma.projects.findMany();
};
