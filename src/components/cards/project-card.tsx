import type { Project } from "@/types/static-data";
import {
  IconBrandGithub,
  IconExternalLink,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils/cn";

interface ProjectViewerCardProps {
  project: Project;
}

export function ProjectViewerCard({
  project,
}: ProjectViewerCardProps) {
  const techNames = project.technologies
    ?.map((pt) => pt.technology?.name)
    .filter(Boolean) || [];

  return (
    <div className="group relative bg-black/50 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
      <div className="aspect-video relative">
        <img
          src={project.image || "/placeholder.png"}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <IconExternalLink className="w-5 h-5 text-white" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <IconBrandGithub className="w-5 h-5 text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {project.name}
          </h3>
          <p className="text-white/70 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        {techNames.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techNames
              .filter((tech): tech is string => tech !== undefined)
              .map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
                >
                  {tech}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
