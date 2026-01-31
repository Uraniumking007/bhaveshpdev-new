"use client";

import { motion } from "framer-motion";
import { HeroHighlight } from "../hero-highlight";
import { TextGenerateEffect } from "../text-generate-effect";
import { ButtonWithMovingBorder } from "../moving-block";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { Meteors } from "../meteors";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { LitupBorderButtonLink } from "../Buttons/litup-border-button";
import { ProjectImageCarousel } from "../ui/project-image-carousel";
import { ProjectWithRelations } from "../../types/projects";

interface ProjectsSectionProps {
  projects?: ProjectWithRelations[];
}

const ProjectCard = ({ project }: { project: ProjectWithRelations }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, {
    margin: "-10% 0px",
    amount: 0.3,
    once: true, // only animate in, never toggle back to hidden
  });
  const fadeInEase = [0.22, 1, 0.36, 1] as const;

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: fadeInEase },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInVariants}
      initial="hidden"
      animate={isInView ? "visible" : undefined}
      className="group relative bg-black/50 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20 w-full"
    >
      <Meteors number={2} />
      <div className="aspect-video relative">
        <ProjectImageCarousel
          images={project.images}
          image={project.image}
          alt={project.name}
          className="aspect-video"
        />
        {!project.isCompleted && (
          <div className="absolute top-2 right-2 z-20">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              Ongoing Project
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {project.name}
          </h3>
          <div className="space-y-2">
            <p
              className={`text-white/70 text-sm ${
                !isExpanded ? "line-clamp-2" : ""
              }`}
            >
              {project.description}
            </p>
            {project.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {(
          project.technologies
            ?.map((pt) => pt.technology?.name)
            .filter((n): n is string => n !== undefined) ||
          []
        ).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(
              project.technologies
                ?.map((pt) => pt.technology?.name)
                .filter((n): n is string => n !== undefined) ||
              []
            ).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm text-white"
            >
              <IconExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm text-white"
            >
              <IconBrandGithub className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ projects = [] }: ProjectsSectionProps) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-screen h-fit min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-neutral-700 dark:text-white"
          >
            Featured Projects
          </motion.h2>
          <TextGenerateEffect
            className="text-center mb-12 text-neutral-600 dark:text-neutral-300"
            words="Loading projects..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-fit min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-neutral-700 dark:text-white"
        >
          Featured Projects
        </motion.h2>
        <TextGenerateEffect
          className="text-center mb-12 text-neutral-600 dark:text-neutral-300"
          words="Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <LitupBorderButtonLink path="/projects" className="inline-block">
            View All Projects
          </LitupBorderButtonLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
