"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Projects } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconArrowLeft, IconCalendar } from "@tabler/icons-react";
import { updateProject, getProjects } from "../actions";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

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
    projectUrl: "",
    githubUrl: "",
    tech: [] as string[],
    categories: [] as string[],
    startDate: "",
    endDate: "",
    isCompleted: false,
  });

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
          projectUrl: project.link,
          githubUrl: project.github,
          tech: project.tech,
          categories: project.categories,
          startDate: formatForInput(
            project.projectInitiated ? new Date(project.projectInitiated) : null
          ),
          endDate: formatForInput(
            project.projectCompleted ? new Date(project.projectCompleted) : null
          ),
          isCompleted: project.isCompleted,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const result = await updateProject(id as string, formData);
      console.log("Update result:", result);

      if (!result.success) throw new Error(result.error);
      router.push("/admin/projects");
    } catch (err) {
      console.error("Error updating project:", err);
      setError(err instanceof Error ? err.message : "Failed to update project");
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
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
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
              <Label htmlFor="tech">Technologies (comma-separated)</Label>
              <Input
                id="tech"
                value={formData.tech.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    tech: e.target.value
                      .split(",")
                      .map((t: string) => t.trim()),
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="categories">Categories (comma-separated)</Label>
              <Input
                id="categories"
                value={formData.categories.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    categories: e.target.value
                      .split(",")
                      .map((c: string) => c.trim()),
                  })
                }
              />
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
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className={cn(
                "bg-white/10 hover:bg-white/20 text-white",
                "transition-all duration-300"
              )}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={cn(
                "bg-blue-500 hover:bg-blue-600 text-white",
                "transition-all duration-300"
              )}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
