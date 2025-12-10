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
  isFeatured?: boolean;
};

export async function getProjects() {
  await requireAdmin();
  return await prisma.projects.findMany({
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
      projectCategories: {
        include: {
          category: true,
        },
      },
    },
  });
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

    // Normalize and create/connect technologies
    const techNames = (data.tech || []).map((t) => t.trim().toLowerCase()).filter(Boolean);
    const techConnections = await Promise.all(
      techNames.map(async (techName) => {
        const tech = await prisma.technology.upsert({
          where: { name: techName },
          update: {},
          create: { name: techName },
        });
        return { technologyId: tech.id };
      })
    );

    // Normalize and create/connect categories
    const categoryNames = (data.categories || [])
      .map((c) => c.trim().toLowerCase())
      .filter(Boolean);
    const categoryConnections = await Promise.all(
      categoryNames.map(async (categoryName) => {
        const category = await prisma.category.upsert({
          where: { name: categoryName },
          update: {},
          create: { name: categoryName },
        });
        return { categoryId: category.id };
      })
    );

    const project = await prisma.projects.create({
      data: {
        id: crypto.randomUUID(),
        name: data.title,
        description: data.description,
        image: data.imageUrl,
        images: imagesArray,
        link: data.projectUrl || "",
        github: data.githubUrl || "",
        tech: data.tech, // Keep for backward compatibility
        categories: data.categories || [], // Keep for backward compatibility
        projectInitiated: new Date(data.startDate),
        projectCompleted: data.isCompleted ? new Date(data.endDate) : null,
        isCompleted: data.isCompleted,
        isFeatured: data.isFeatured ?? false,
        updatedAt: new Date(),
        technologies: {
          create: techConnections,
        },
        projectCategories: {
          create: categoryConnections,
        },
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
        projectCategories: {
          include: {
            category: true,
          },
        },
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
    isFeatured?: boolean;
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

    // Normalize and create/connect technologies
    const techNames = (data.tech || []).map((t) => t.trim().toLowerCase()).filter(Boolean);
    const techConnections = await Promise.all(
      techNames.map(async (techName) => {
        const tech = await prisma.technology.upsert({
          where: { name: techName },
          update: {},
          create: { name: techName },
        });
        return { technologyId: tech.id };
      })
    );

    // Normalize and create/connect categories
    const categoryNames = (data.categories || [])
      .map((c) => c.trim().toLowerCase())
      .filter(Boolean);
    const categoryConnections = await Promise.all(
      categoryNames.map(async (categoryName) => {
        const category = await prisma.category.upsert({
          where: { name: categoryName },
          update: {},
          create: { name: categoryName },
        });
        return { categoryId: category.id };
      })
    );

    // Delete existing relations and create new ones
    await prisma.projectTechnology.deleteMany({
      where: { projectId: id },
    });
    await prisma.projectCategory.deleteMany({
      where: { projectId: id },
    });

    const updateData = {
      name: data.title,
      description: data.description,
      image: data.imageUrl,
      images: imagesArray,
      link: data.projectUrl,
      github: data.githubUrl,
      tech: data.tech, // Keep for backward compatibility
      categories: data.categories, // Keep for backward compatibility
      projectInitiated: new Date(data.startDate),
      projectCompleted:
        data.isCompleted && data.endDate ? new Date(data.endDate) : null,
      isCompleted: data.isCompleted,
      isFeatured: data.isFeatured ?? false,
      updatedAt: new Date(),
      technologies: {
        create: techConnections,
      },
      projectCategories: {
        create: categoryConnections,
      },
    };

    const result = await prisma.projects.update({
      where: { id },
      data: updateData,
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
        projectCategories: {
          include: {
            category: true,
          },
        },
      },
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
