import ProjectCard from "@/components/cards/project-card";
import { HeroHighlight } from "@/components/hero-highlight";
import { Meteors } from "@/components/meteors";
import Image from "next/image";
import React from "react";

const ProjectPage: React.FC = () => {
  return (
    <HeroHighlight>
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </HeroHighlight>
  );
};

export default ProjectPage;
