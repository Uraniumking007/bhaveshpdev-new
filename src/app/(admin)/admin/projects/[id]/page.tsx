"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Projects } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  IconArrowLeft,
  IconCalendar,
  IconX,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  updateProject,
  getProjects,
  getAllTechnologies,
  getAllCategories,
} from "../actions";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ImageUpload } from "@/components/ui/image-upload";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    images: [] as string[],
    projectUrl: "",
    githubUrl: "",
    tech: [] as string[],
    categories: [] as string[],
    startDate: "",
    endDate: "",
    isCompleted: false,
    isFeatured: false,
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [existingTechnologies, setExistingTechnologies] = useState<string[]>(
    []
  );
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [techSearchQuery, setTechSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects = await getProjects();
        const project = projects.find((p) => p.id === id);
        if (!project) throw new Error("Project not found");

        console.log("Loaded project:", project);

        setProject(project);
        const formatForInput = (date: Date | null) =>
          date ? format(date, "yyyy-MM-dd") : "";

        const formattedData = {
          title: project.name,
          description: project.description,
          imageUrl: project.image || "",
          images: project.images || [],
          projectUrl: project.link,
          githubUrl: project.github,
          tech:
            project.technologies?.map((pt) => pt.technology.name) ||
            project.tech ||
            [],
          categories:
            project.projectCategories?.map((pc) => pc.category.name) ||
            project.categories ||
            [],
          startDate: formatForInput(
            project.projectInitiated ? new Date(project.projectInitiated) : null
          ),
          endDate: formatForInput(
            project.projectCompleted ? new Date(project.projectCompleted) : null
          ),
          isCompleted: project.isCompleted,
          isFeatured: project.isFeatured,
        };
        console.log("Formatted form data:", formattedData);
        setFormData(formattedData);
      } catch (err) {
        console.error("Error loading project:", err);
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  useEffect(() => {
    const loadExisting = async () => {
      const [techResult, categoryResult] = await Promise.all([
        getAllTechnologies(),
        getAllCategories(),
      ]);
      if (techResult.success) {
        setExistingTechnologies(techResult.data || []);
      }
      if (categoryResult.success) {
        setExistingCategories(categoryResult.data || []);
      }
    };
    loadExisting();
  }, []);

  const addTechnology = (tech?: string) => {
    const techToAdd = (tech || newTechnology).trim().toLowerCase();
    if (techToAdd && !formData.tech.includes(techToAdd)) {
      setFormData({
        ...formData,
        tech: [...formData.tech, techToAdd],
      });
      setNewTechnology("");
      setTechSearchQuery("");
      setTechDropdownOpen(false);
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter((t) => t !== tech),
    });
  };

  const filteredTechnologies = existingTechnologies.filter(
    (tech) =>
      tech.toLowerCase().includes(techSearchQuery.toLowerCase()) &&
      !formData.tech.includes(tech.toLowerCase())
  );

  const addCategory = (category?: string) => {
    const categoryToAdd = (category || newCategory).trim().toLowerCase();
    if (categoryToAdd && !formData.categories.includes(categoryToAdd)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, categoryToAdd],
      });
      setNewCategory("");
      setCategorySearchQuery("");
      setCategoryDropdownOpen(false);
    }
  };

  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    });
  };

  const filteredCategories = existingCategories.filter(
    (category) =>
      category.toLowerCase().includes(categorySearchQuery.toLowerCase()) &&
      !formData.categories.includes(category.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Validate dates
      if (!formData.startDate) {
        throw new Error("Start date is required");
      }
      if (formData.isCompleted && !formData.endDate) {
        throw new Error("End date is required for completed projects");
      }
      if (
        formData.isCompleted &&
        new Date(formData.endDate) < new Date(formData.startDate)
      ) {
        throw new Error("End date cannot be before start date");
      }

      console.log("Submitting form data:", {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : null,
      });

      const result = await updateProject(id as string, {
        ...formData,
        images: formData.images || [],
      });
      console.log("Update result:", result);

      if (!result.success) throw new Error(result.error);
      router.push("/admin/projects");
    } catch (err) {
      console.error("Error updating project:", err);
      setError(err instanceof Error ? err.message : "Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCompleted = e.target.checked;
    console.log("Completion status changed:", isCompleted);
    setFormData((prev) => {
      const newData = {
        ...prev,
        isCompleted,
        endDate: isCompleted ? prev.endDate : "",
      };
      console.log("New form data:", newData);
      return newData;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Project</h1>
          <p className="text-white/70 mt-2">Update your project details</p>
        </div>
        <Button
          onClick={() => router.push("/admin/projects")}
          className={cn(
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300",
            "flex items-center gap-2"
          )}
        >
          <IconArrowLeft className="w-5 h-5" />
          Back to Projects
        </Button>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">
                Primary Image URL (for backward compatibility)
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label>Additional Images (for carousel)</Label>
              <div className="space-y-2">
                <ImageUpload
                  onUploadComplete={(url) => {
                    if (!formData.images.includes(url)) {
                      setFormData((prev) => ({
                        ...prev,
                        images: [...prev.images, url],
                        imageUrl: prev.imageUrl || url,
                      }));
                    }
                  }}
                  folder="projects"
                />
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={newImageUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewImageUrl(e.target.value)
                    }
                    placeholder="Add image URL"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (
                          newImageUrl.trim() &&
                          !formData.images.includes(newImageUrl.trim())
                        ) {
                          setFormData((prev) => ({
                            ...prev,
                            images: [...prev.images, newImageUrl.trim()],
                            imageUrl: prev.imageUrl || newImageUrl.trim(),
                          }));
                          setNewImageUrl("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        newImageUrl.trim() &&
                        !formData.images.includes(newImageUrl.trim())
                      ) {
                        setFormData((prev) => ({
                          ...prev,
                          images: [...prev.images, newImageUrl.trim()],
                          imageUrl: prev.imageUrl || newImageUrl.trim(),
                        }));
                        setNewImageUrl("");
                      }
                    }}
                    className={cn(
                      "bg-white/10 hover:bg-white/20 text-white",
                      "transition-all duration-300"
                    )}
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
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index
                                ),
                              }));
                            }}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
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
              <Label htmlFor="projectUrl">Project URL</Label>
              <Input
                id="projectUrl"
                value={formData.projectUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, projectUrl: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label>Technologies</Label>
              <div className="flex gap-2 mb-2">
                <div className="flex-1 relative">
                  <Popover
                    open={techDropdownOpen}
                    onOpenChange={setTechDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-left text-white",
                          "focus:outline-none focus:ring-2 focus:ring-white/20",
                          "flex items-center justify-between"
                        )}
                      >
                        <span
                          className={
                            techSearchQuery ? "text-white" : "text-white/50"
                          }
                        >
                          {techSearchQuery ||
                            "Select or type to add technology"}
                        </span>
                        <IconChevronDown className="w-4 h-4 text-white/50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-neutral-900 border-white/10 p-0">
                      <div className="p-2">
                        <input
                          type="text"
                          value={techSearchQuery}
                          onChange={(e) => setTechSearchQuery(e.target.value)}
                          placeholder="Search technologies..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                          autoFocus
                        />
                        <div className="max-h-48 overflow-y-auto">
                          {filteredTechnologies.length > 0 ? (
                            filteredTechnologies.map((tech) => (
                              <button
                                key={tech}
                                type="button"
                                onClick={() => addTechnology(tech)}
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                              >
                                {tech}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-white/50">
                              No matching technologies
                            </div>
                          )}
                          {techSearchQuery &&
                            !existingTechnologies.some(
                              (t) =>
                                t.toLowerCase() ===
                                techSearchQuery.toLowerCase()
                            ) &&
                            !formData.tech.includes(
                              techSearchQuery.toLowerCase()
                            ) && (
                              <button
                                type="button"
                                onClick={() => addTechnology(techSearchQuery)}
                                className="w-full text-left px-3 py-2 text-sm text-blue-400 hover:bg-white/10 rounded transition-colors border-t border-white/10 mt-1 pt-2"
                              >
                                + Add "{techSearchQuery}"
                              </button>
                            )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  className="w-48"
                  placeholder="Or type new tech"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addTechnology()}
                  disabled={!newTechnology.trim()}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-white/10 text-white capitalize"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-white/70"
                    >
                      <IconX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <Label>Categories</Label>
              <div className="flex gap-2 mb-2">
                <div className="flex-1 relative">
                  <Popover
                    open={categoryDropdownOpen}
                    onOpenChange={setCategoryDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-left text-white",
                          "focus:outline-none focus:ring-2 focus:ring-white/20",
                          "flex items-center justify-between"
                        )}
                      >
                        <span
                          className={
                            categorySearchQuery ? "text-white" : "text-white/50"
                          }
                        >
                          {categorySearchQuery ||
                            "Select or type to add category"}
                        </span>
                        <IconChevronDown className="w-4 h-4 text-white/50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-neutral-900 border-white/10 p-0">
                      <div className="p-2">
                        <input
                          type="text"
                          value={categorySearchQuery}
                          onChange={(e) =>
                            setCategorySearchQuery(e.target.value)
                          }
                          placeholder="Search categories..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                          autoFocus
                        />
                        <div className="max-h-48 overflow-y-auto">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                              <button
                                key={category}
                                type="button"
                                onClick={() => addCategory(category)}
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                              >
                                {category}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-white/50">
                              No matching categories
                            </div>
                          )}
                          {categorySearchQuery &&
                            !existingCategories.some(
                              (c) =>
                                c.toLowerCase() ===
                                categorySearchQuery.toLowerCase()
                            ) &&
                            !formData.categories.includes(
                              categorySearchQuery.toLowerCase()
                            ) && (
                              <button
                                type="button"
                                onClick={() => addCategory(categorySearchQuery)}
                                className="w-full text-left px-3 py-2 text-sm text-blue-400 hover:bg-white/10 rounded transition-colors border-t border-white/10 mt-1 pt-2"
                              >
                                + Add "{categorySearchQuery}"
                              </button>
                            )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-48"
                  placeholder="Or type new category"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addCategory()}
                  disabled={!newCategory.trim()}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-white/10 text-white capitalize"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="hover:text-white/70"
                    >
                      <IconX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 inline-block">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex w-full items-center justify-start gap-2 text-left font-normal",
                      !formData.startDate && "text-white/60"
                    )}
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
                      setFormData((prev) => {
                        const iso = format(date, "yyyy-MM-dd");
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
              <Label className="mb-2 inline-block">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={!formData.isCompleted}
                    className={cn(
                      "flex w-full items-center justify-start gap-2 text-left font-normal",
                      !formData.endDate && "text-white/60"
                    )}
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
                    disabled={
                      formData.startDate
                        ? { before: new Date(formData.startDate) }
                        : undefined
                    }
                    selected={
                      formData.endDate ? new Date(formData.endDate) : undefined
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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isCompleted"
                checked={formData.isCompleted}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const isCompleted = e.target.checked;
                  console.log("Completion status changed:", isCompleted);
                  setFormData((prev) => ({
                    ...prev,
                    isCompleted,
                    endDate: isCompleted ? prev.endDate : "",
                  }));
                }}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-white/20"
              />
              <Label htmlFor="isCompleted">Project is completed</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-white/20"
              />
              <Label htmlFor="isFeatured">Mark as featured</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => router.push("/admin/projects")}
              disabled={isSubmitting}
              className={cn(
                "inline-flex h-10 items-center justify-center gap-2",
                "px-4 rounded-lg whitespace-nowrap",
                "bg-white/10 hover:bg-white/20 text-white",
                "transition-all duration-300",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex h-10 items-center justify-center gap-2",
                "px-4 rounded-lg whitespace-nowrap",
                "bg-blue-500 hover:bg-blue-600 text-white",
                "transition-all duration-300",
                "disabled:opacity-70 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
