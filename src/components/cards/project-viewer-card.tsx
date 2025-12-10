"use client";
import { Projects } from "@prisma/client";
import {
  IconBrandGithub,
  IconExternalLink,
  IconArrowRight,
} from "@tabler/icons-react";
import { Meteors } from "../meteors";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ProjectModal } from "../ui/project-modal";
import { ProjectImageCarousel } from "../ui/project-image-carousel";

interface ProjectViewerCardProps {
  project: Projects;
}

export const ProjectViewerCard = ({ project }: ProjectViewerCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group relative rounded-2xl border border-white/10 bg-white/5 p-6",
          "hover:bg-white/10 transition-all duration-300",
          "backdrop-blur-sm",
          "flex flex-col h-full"
        )}
      >
        <div className="flex flex-col gap-4 grow">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <ProjectImageCarousel
              images={project.images}
              image={project.image}
              alt={project.name}
              className="h-48"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-white">{project.name}</h3>
            <div className="flex flex-wrap gap-2">
              {(project.projectCategories?.map((pc) => pc.category.name) || project.categories || []).map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-white/80 mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "inline-flex items-center gap-2 text-sm",
              "text-white/70 hover:text-white",
              "transition-colors duration-200"
            )}
          >
            Read More
            <IconArrowRight className="w-4 h-4" />
          </button>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            View Project
            <IconExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            View Code
            <IconBrandGithub className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
