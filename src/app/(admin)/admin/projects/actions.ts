"use server";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ProjectData = {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  tech: string[];
  startDate: string;
  endDate: string;
  isCompleted: boolean;
};

export async function getProjects() {
  return await prisma.projects.findMany();
}

export async function createProject(data: ProjectData) {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

    const project = await prisma.projects.create({
      data: {
        id: crypto.randomUUID(),
        name: data.title,
        description: data.description,
        image: data.imageUrl,
        link: data.projectUrl || "",
        github: data.githubUrl || "",
        tech: data.tech,
        projectInitiated: new Date(data.startDate),
        projectCompleted: data.isCompleted ? new Date(data.endDate) : null,
        isCompleted: data.isCompleted,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/projects");
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
    console.log("Updating project with data:", {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    });

    const updateData = {
      name: data.title,
      description: data.description,
      image: data.imageUrl,
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

    console.log("Prisma update data:", updateData);

    const result = await prisma.projects.update({
      where: { id },
      data: updateData,
    });

    console.log("Update result:", result);

    revalidatePath("/admin/projects");
    revalidatePath("/projects");

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
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

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
