"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Projects } from "@prisma/client";
import { IconX, IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { useEffect, useRef } from "react";
import { ProjectImageCarousel } from "./project-image-carousel";

interface ProjectModalProps {
  project: Projects;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={cn(
                "relative w-full max-w-4xl bg-neutral-900 rounded-2xl border border-white/10",
                "max-h-[85vh] overflow-y-auto",
                "p-4 sm:p-6",
                "my-4 sm:my-0"
              )}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
              >
                <IconX className="w-5 h-5 text-white/70" />
              </button>

              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2 pr-8">
                  <h2 className="text-2xl font-bold text-white">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full h-80 rounded-xl overflow-hidden"
                >
                  <ProjectImageCarousel
                    images={project.images}
                    image={project.image}
                    alt={project.name}
                    className="h-80"
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-white/80 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Project Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-4 text-sm text-white/70"
                >
                  <div>
                    <p>
                      Started:{" "}
                      {new Date(project.projectInitiated).toLocaleDateString()}
                    </p>
                    {project.projectCompleted && (
                      <p>
                        Completed:{" "}
                        {new Date(
                          project.projectCompleted
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <p>
                      Status:{" "}
                      {project.isCompleted ? "Completed" : "In Progress"}
                    </p>
                    {project.isFeatured && (
                      <p className="text-blue-400">Featured Project</p>
                    )}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 pt-4"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                      "bg-white/10 hover:bg-white/20",
                      "text-white font-medium",
                      "transition-colors duration-200"
                    )}
                  >
                    View Project
                    <IconExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                      "bg-white/10 hover:bg-white/20",
                      "text-white font-medium",
                      "transition-colors duration-200"
                    )}
                  >
                    View Code
                    <IconBrandGithub className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
