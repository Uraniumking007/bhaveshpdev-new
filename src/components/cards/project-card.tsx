"use client";
import Image from "next/image";
import { Projects } from "@prisma/client";
import {
  IconBrandGithub,
  IconEdit,
  IconTrash,
  IconExternalLink,
} from "@tabler/icons-react";

import { cn } from "@/utils/cn";
import { Button } from "../ui/button";

interface ProjectAdminCardProps {
  project: Projects;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string) => Promise<void>;
}

export function ProjectAdminCard({
  project,
  onDelete,
  onUpdate,
}: ProjectAdminCardProps) {
  return (
    <div className="group relative bg-black/50 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20">
      <div className="aspect-video relative">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
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

        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => onUpdate(project.id)}
            className={cn(
              "bg-white/10 hover:bg-white/20 text-white",
              "transition-all duration-300"
            )}
          >
            <IconEdit className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onDelete(project.id)}
            className={cn(
              "bg-red-500/10 hover:bg-red-500/20 text-red-500",
              "transition-all duration-300"
            )}
          >
            <IconTrash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
