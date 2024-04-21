import ProjectCard from "@/components/cards/project-card";
import { HeroHighlight } from "@/components/hero-highlight";
import { Meteors } from "@/components/meteors";
import Image from "next/image";
import React from "react";

const ProjectPage: React.FC = () => {
  return (
    <HeroHighlight>
      <div className="flex flex-wrap gap-8 w-full justify-center">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </HeroHighlight>
  );
};

export default ProjectPage;
