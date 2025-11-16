"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

type ProjectData = {
  title: string;
  description: string;
  imageUrl: string;
  images?: string[];
  projectUrl?: string;
  githubUrl?: string;
  tech: string[];
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  categories?: string[];
};

export async function getProjects() {
  await requireAdmin();
  return await prisma.projects.findMany();
}

export async function createProject(data: ProjectData) {
  try {
    await requireAdmin();

    // Use images array if provided, otherwise use imageUrl as fallback
    const imagesArray =
      data.images && data.images.length > 0
        ? data.images
        : data.imageUrl
        ? [data.imageUrl]
        : [];

    const project = await prisma.projects.create({
      data: {
        id: crypto.randomUUID(),
        name: data.title,
        description: data.description,
        image: data.imageUrl,
        images: imagesArray,
        link: data.projectUrl || "",
        github: data.githubUrl || "",
        tech: data.tech,
        categories: data.categories || [],
        projectInitiated: new Date(data.startDate),
        projectCompleted: data.isCompleted ? new Date(data.endDate) : null,
        isCompleted: data.isCompleted,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true, data: project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(
  id: string,
  data: {
    title: string;
    description: string;
    imageUrl: string;
    images?: string[];
    projectUrl: string;
    githubUrl: string;
    tech: string[];
    categories: string[];
    startDate: string;
    endDate: string;
    isCompleted: boolean;
  }
) {
  try {
    await requireAdmin();

    // Use images array if provided, otherwise use imageUrl as fallback
    const imagesArray =
      data.images && data.images.length > 0
        ? data.images
        : data.imageUrl
        ? [data.imageUrl]
        : [];

    const updateData = {
      name: data.title,
      description: data.description,
      image: data.imageUrl,
      images: imagesArray,
      link: data.projectUrl,
      github: data.githubUrl,
      tech: data.tech,
      categories: data.categories,
      projectInitiated: new Date(data.startDate),
      projectCompleted:
        data.isCompleted && data.endDate ? new Date(data.endDate) : null,
      isCompleted: data.isCompleted,
      updatedAt: new Date(),
    };

    const result = await prisma.projects.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

export async function deleteProject(id: string) {
  try {
    await requireAdmin();

    await prisma.projects.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
