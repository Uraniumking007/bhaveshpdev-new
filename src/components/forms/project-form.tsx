"use client";

import { useState } from "react";
import { IconCalendar, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
  createProject,
  updateProject,
} from "@/app/(admin)/admin/projects/actions";
import { ImageUpload } from "../ui/image-upload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type ProjectFormData = {
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  projectUrl: string;
  githubUrl: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  categories: string[];
  isFeatured: boolean;
};

type ServerActionData = {
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  projectUrl?: string;
  githubUrl?: string;
  tech: string[];
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  categories: string[];
};

interface ProjectFormProps {
  onClose: () => void;
  initialData?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    images?: string[];
    projectUrl: string;
    githubUrl: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    isCompleted: boolean;
    categories: string[];
    isFeatured: boolean;
  };
}

export function ProjectForm({ onClose, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    images: initialData?.images || [],
    projectUrl: initialData?.projectUrl || "",
    githubUrl: initialData?.githubUrl || "",
    technologies: initialData?.technologies || [],
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    isCompleted: initialData?.isCompleted || false,
    categories: initialData?.categories || [],
    isFeatured: initialData?.isFeatured || false,
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { technologies, ...rest } = formData;
      const serverData = {
        ...rest,
        tech: technologies,
        projectUrl: rest.projectUrl || "",
        githubUrl: rest.githubUrl || "",
        images: rest.images || [],
      };
      const result = initialData
        ? await updateProject(initialData.id, serverData)
        : await createProject(serverData);

      if (!result.success) {
        throw new Error(result.error || "Failed to save project");
      }

      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory.trim()],
      });
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    });
  };

  const addImage = (url: string) => {
    if (url.trim() && !formData.images.includes(url.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, url.trim()],
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (url: string) => {
    addImage(url);
    // Also set as primary image if no primary image is set
    if (!formData.imageUrl) {
      setFormData({ ...formData, imageUrl: url });
    }
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isCompleted: e.target.checked,
      endDate: e.target.checked ? formData.endDate : "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {initialData ? "Edit Project" : "Add New Project"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Project title"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            rows={4}
            placeholder="Project description"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Primary Image (for backward compatibility)
          </label>
          <div className="space-y-2">
            <ImageUpload
              onUploadComplete={(url) => {
                setFormData({ ...formData, imageUrl: url });
                // Also add to images array if not already present
                if (!formData.images.includes(url)) {
                  setFormData((prev) => ({
                    ...prev,
                    imageUrl: url,
                    images: prev.images.length === 0 ? [url] : prev.images,
                  }));
                }
              }}
              folder="projects"
            />
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Or enter image URL directly"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Additional Images (for carousel)
          </label>
          <div className="space-y-2">
            <ImageUpload
              onUploadComplete={handleImageUpload}
              folder="projects"
            />
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Add image URL"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newImageUrl.trim()) {
                      addImage(newImageUrl.trim());
                      setNewImageUrl("");
                    }
                  }
                }}
                disabled={isSubmitting}
              />
              <Button
                type="button"
                onClick={() => {
                  if (newImageUrl.trim()) {
                    addImage(newImageUrl.trim());
                    setNewImageUrl("");
                  }
                }}
                className={cn(
                  "bg-white/10 hover:bg-white/20 text-white",
                  "transition-all duration-300"
                )}
                disabled={isSubmitting}
              >
                Add
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-white/60">
                  {formData.images.length} image(s) added
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative group aspect-video rounded-lg overflow-hidden border border-white/10"
                    >
                      <img
                        src={img}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        <IconX className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Project URL
          </label>
          <input
            type="url"
            value={formData.projectUrl}
            onChange={(e) =>
              setFormData({ ...formData, projectUrl: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="https://example.com"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="https://github.com/username/repo"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex w-full items-center justify-start gap-2 text-left font-normal",
                    !formData.startDate && "text-white/60"
                  )}
                  disabled={isSubmitting}
                >
                  <IconCalendar className="h-4 w-4" />
                  {formData.startDate
                    ? format(new Date(formData.startDate), "PPP")
                    : "Pick a start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-white/10 bg-neutral-950 p-0 text-white">
                <Calendar
                  mode="single"
                  selected={
                    formData.startDate
                      ? new Date(formData.startDate)
                      : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return;
                    const iso = format(date, "yyyy-MM-dd");
                    setFormData((prev) => {
                      const shouldResetEnd =
                        prev.endDate &&
                        new Date(prev.endDate) < date &&
                        prev.isCompleted;
                      return {
                        ...prev,
                        startDate: iso,
                        endDate: shouldResetEnd ? "" : prev.endDate,
                      };
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className={!formData.isCompleted ? "opacity-60" : undefined}>
            <label className="block text-sm font-medium text-white/70 mb-2">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex w-full items-center justify-start gap-2 text-left font-normal",
                    !formData.endDate && "text-white/60"
                  )}
                  disabled={isSubmitting || !formData.isCompleted}
                >
                  <IconCalendar className="h-4 w-4" />
                  {formData.endDate
                    ? format(new Date(formData.endDate), "PPP")
                    : "Pick an end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-white/10 bg-neutral-950 p-0 text-white">
                <Calendar
                  mode="single"
                  selected={
                    formData.endDate ? new Date(formData.endDate) : undefined
                  }
                  disabled={
                    formData.startDate
                      ? { before: new Date(formData.startDate) }
                      : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return;
                    setFormData((prev) => ({
                      ...prev,
                      endDate: format(date, "yyyy-MM-dd"),
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCompleted"
            checked={formData.isCompleted}
            onChange={handleCompletedChange}
            className="w-4 h-4 rounded border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-white/20"
            disabled={isSubmitting}
          />
          <label
            htmlFor="isCompleted"
            className="text-sm font-medium text-white/70"
          >
            Project is completed
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.checked })
            }
            className="w-4 h-4 rounded border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-white/20"
            disabled={isSubmitting}
          />
          <label
            htmlFor="isFeatured"
            className="text-sm font-medium text-white/70"
          >
            Mark as featured
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Add technology"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTechnology();
                }
              }}
              disabled={isSubmitting}
            />
            <Button
              type="button"
              onClick={addTechnology}
              className={cn(
                "bg-white/10 hover:bg-white/20 text-white",
                "transition-all duration-300"
              )}
              disabled={isSubmitting}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-white/10 text-white"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="hover:text-white/70"
                  disabled={isSubmitting}
                >
                  <IconX className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Categories
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Add category"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCategory();
                }
              }}
              disabled={isSubmitting}
            />
            <Button
              type="button"
              onClick={addCategory}
              className={cn(
                "bg-white/10 hover:bg-white/20 text-white",
                "transition-all duration-300"
              )}
              disabled={isSubmitting}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-white/10 text-white"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="hover:text-white/70"
                  disabled={isSubmitting}
                >
                  <IconX className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onClose}
          className={cn(
            "bg-white/5 hover:bg-white/10 text-white",
            "transition-all duration-300"
          )}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={cn(
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300"
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : initialData ? (
            "Update Project"
          ) : (
            "Add Project"
          )}
        </Button>
      </div>
    </form>
  );
}
