"use client";
import Image from "next/image";
import { Projects } from "@prisma/client";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { Meteors } from "../meteors";
import { useState } from "react";

interface ProjectViewerCardProps {
  project: Projects;
}

export function ProjectViewerCard({ project }: ProjectViewerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-black/50 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
      <Meteors number={2} />
      <div className="aspect-video relative">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
        />
        {!project.isCompleted && !project.isOngoing && (
          <div className="absolute top-2 right-2">
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

        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
              >
                {tech.toLowerCase()}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
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
    </div>
  );
}
