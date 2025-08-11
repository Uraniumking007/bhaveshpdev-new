"use client";

import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { createProject } from "@/app/(admin)/admin/projects/actions";
import { updateProject } from "@/app/(admin)/admin/projects/actions";
import { ImageUpload } from "../ui/image-upload";

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
    images: string[];
    projectUrl: string;
    githubUrl: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    isCompleted: boolean;
    categories: string[];
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
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [newCategory, setNewCategory] = useState("");
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
        imageUrl: rest.imageUrl || "",
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
            Image
          </label>
          <div className="space-y-2">
            <ImageUpload
              onUploadComplete={(url) =>
                setFormData({ ...formData, imageUrl: url })
              }
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
              required
              disabled={isSubmitting}
            />
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              min={formData.startDate}
              disabled={isSubmitting || !formData.isCompleted}
            />
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
