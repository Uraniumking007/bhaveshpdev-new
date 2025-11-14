"use client";

import { useMemo, useState, useTransition } from "react";
import type { Projects } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@heroui/react";
import { deleteProject } from "./actions";

type ProjectsClientProps = {
  projects: Projects[];
};

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const router = useRouter();
  const [items, setItems] = useState(projects);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return items;
    const normalized = query.toLowerCase();
    return items.filter((project) => {
      const haystack = [
        project.name,
        project.description,
        project.categories?.join(" "),
        project.tech?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [items, query]);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteProject(id);
      if (!result.success) {
        toast.error(result.error || "Failed to delete project");
        setDeletingId(null);
        return;
      }
      setItems((prev) => prev.filter((project) => project.id !== id));
      toast.success("Project deleted");
      setDeletingId(null);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Projects</h1>
          <p className="text-white/70">
            Manage your portfolio entries and keep them up to date.
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-white/10 text-white hover:bg-white/20">
            New Project
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-sm">
            <Label htmlFor="project-search" className="text-white/60">
              Search projects
            </Label>
            <Input
              id="project-search"
              placeholder="Search by title, stack, or category"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-1 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>
          <p className="text-sm text-white/60">
            Showing {filteredProjects.length} of {items.length}
          </p>
        </div>

        <Table className="[&_th]:text-white [&_td]:text-white/80">
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} className="border-white/10">
                <TableCell className="max-w-xs">
                  <div>
                    <p className="font-medium text-white">{project.name}</p>
                    <p className="line-clamp-2 text-xs text-white/60">
                      {project.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    color={project.isCompleted ? "success" : "warning"}
                    variant="flat"
                  >
                    {project.isCompleted ? "Completed" : "In progress"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 text-xs text-white/70">
                    {project.tech?.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="rounded-full bg-white/10 px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 text-xs text-white/70">
                    {project.categories?.map((category) => (
                      <span
                        key={`${project.id}-${category}`}
                        className="rounded-full bg-white/10 px-2 py-0.5"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/40 text-red-400 hover:bg-red-500/10"
                      disabled={isPending && deletingId === project.id}
                      onClick={() => handleDelete(project.id)}
                    >
                      {isPending && deletingId === project.id
                        ? "Deleting…"
                        : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="text-white/60">
            Keep your most recent work at the top for easy access.
          </TableCaption>
        </Table>
      </div>
    </div>
  );
}
