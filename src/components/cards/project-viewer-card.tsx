"use client";

import { useState, useEffect } from "react";
import type { ProjectWithRelations } from "@/types/projects";
import {
  IconBrandGithub,
  IconExternalLink,
  IconStar,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";

/** Fallback when project image is missing or fails to load */
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23374151' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='system-ui' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";

interface ProjectViewerCardProps {
  project: ProjectWithRelations;
  index?: number;
  variant?: "default" | "featured" | "compact";
}

export function ProjectViewerCard({
  project,
  index = 0,
  variant = project.isFeatured ? "featured" : "default",
}: ProjectViewerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  useEffect(() => {
    setImageLoadFailed(false);
  }, [project.image]);

  const imageSrc =
    !project.image || imageLoadFailed ? PLACEHOLDER_IMAGE : project.image;

  const techNames = project.technologies
    ?.map((pt) => pt.technology?.name)
    .filter(Boolean) || [];

  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-[var(--card)] border border-[var(--border)]",
        "transition-all duration-300 ease-out",
        "hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
        "hover:border-primary/30",
        isCompact && "aspect-auto"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 backdrop-blur-sm">
            <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-amber-300">Featured</span>
          </span>
        </div>
      )}

      {/* Image Section */}
      <div
        className={cn(
          "relative overflow-hidden aspect-video",
          isCompact && "aspect-[16/9]"
        )}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image */}
        <img
          src={imageSrc}
          alt={project.name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "transition-transform duration-700 ease-out",
            "group-hover:scale-105"
          )}
          loading="lazy"
          onError={() => setImageLoadFailed(true)}
        />

        {/* Hover Actions Overlay - only visible when card is hovered */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center gap-3",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!isHovered}
        >
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-3 rounded-xl backdrop-blur-sm",
                "bg-white/10 hover:bg-white/20 border border-white/20",
                "transition-all duration-200 hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label={`View ${project.name} live`}
            >
              <IconExternalLink className="w-5 h-5 text-white" strokeWidth={2} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-3 rounded-xl backdrop-blur-sm",
                "bg-white/10 hover:bg-white/20 border border-white/20",
                "transition-all duration-200 hover:scale-110",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label={`View ${project.name} source code`}
            >
              <IconBrandGithub className="w-5 h-5 text-white" strokeWidth={2} />
            </a>
          )}
        </div>

        {/* Completion Badge */}
        {project.isCompleted && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
              <span className="text-xs font-medium text-emerald-300">Complete</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn("p-5 space-y-4", isCompact && "p-4 space-y-3")}>
        {/* Header */}
        <div className="space-y-2">
          <h3
            className={cn(
              "font-bold text-xl text-[var(--foreground)] tracking-tight",
              "group-hover:text-primary transition-colors duration-200"
            )}
          >
            {project.name}
          </h3>
          <p
            className={cn(
              "text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-2"
            )}
          >
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        {techNames.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techNames
              .filter((tech): tech is string => tech !== undefined)
              .slice(0, 5)
              .map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-lg",
                    "bg-primary/10 text-primary text-xs font-medium",
                    "border border-primary/20",
                    "transition-colors duration-200",
                    "hover:bg-primary/20 hover:border-primary/30"
                  )}
                >
                  {tech}
                </span>
              ))}
            {techNames.length > 5 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-muted/50 text-muted-foreground text-xs font-medium">
                +{techNames.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Footer Links (Always visible on mobile, hover on desktop) */}
        <div className="pt-2 flex items-center gap-3 text-sm">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 text-[var(--muted-foreground)]",
                "hover:text-primary transition-colors duration-200",
                "focus:outline-none focus:underline focus:underline-offset-2"
              )}
            >
              <IconExternalLink className="w-4 h-4" strokeWidth={2} />
              <span>Live Demo</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 text-[var(--muted-foreground)]",
                "hover:text-primary transition-colors duration-200",
                "focus:outline-none focus:underline focus:underline-offset-2"
              )}
            >
              <IconBrandGithub className="w-4 h-4" strokeWidth={2} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
