"use server";
import { prisma } from "@/lib/prisma";
import { Projects } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function createProject({ project }: { project: Projects }) {
  await requireAdmin();
  return await prisma.projects.create({
    data: {
      id: crypto.randomUUID(),
      name: project.name,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      images: project.images || [],
      tech: project.tech,
      projectInitiated: project.projectInitiated,
      projectCompleted: project.projectCompleted,
      isCompleted: project.isCompleted,
      updatedAt: new Date(),
      categories: project.categories,
    },
  });
}

export async function editProject({ project }: { project: Projects }) {
  await requireAdmin();
  await prisma.projects.update({
    data: {
      name: project.name,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      images: project.images || [],
      tech: project.tech,
      projectInitiated: project.projectInitiated,
      projectCompleted: project.projectCompleted,
      isCompleted: project.isCompleted,
      updatedAt: new Date(),
      categories: project.categories,
    },
    where: {
      id: project.id,
    },
  });
}

export async function revalidateAdminPages() {
  "use server";
  revalidatePath("/admin");
  revalidatePath("/projects");
}
