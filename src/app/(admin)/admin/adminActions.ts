"use server";
import { prisma } from "@/lib/prisma";
import { Projects } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function createProject({ project }: { project: Projects }) {
  await requireAdmin();

  // Normalize and create/connect technologies
  const techNames = Array.from(
    new Set(
      (project.tech || []).map((t) => t.trim().toLowerCase()).filter(Boolean)
    )
  );
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
  const categoryNames = Array.from(
    new Set(
      (project.categories || [])
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean)
    )
  );
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

  return await prisma.projects.create({
    data: {
      id: crypto.randomUUID(),
      name: project.name,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      images: project.images || [],
      tech: project.tech, // Keep for backward compatibility
      projectInitiated: project.projectInitiated,
      projectCompleted: project.projectCompleted,
      isCompleted: project.isCompleted,
      isFeatured: project.isFeatured ?? false,
      updatedAt: new Date(),
      categories: project.categories, // Keep for backward compatibility
      technologies: {
        create: techConnections,
      },
      projectCategories: {
        create: categoryConnections,
      },
    },
  });
}

export async function editProject({ project }: { project: Projects }) {
  await requireAdmin();

  // Normalize and create/connect technologies
  const techNames = Array.from(
    new Set(
      (project.tech || []).map((t) => t.trim().toLowerCase()).filter(Boolean)
    )
  );
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
  const categoryNames = Array.from(
    new Set(
      (project.categories || [])
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean)
    )
  );
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

  // Delete existing relations
  await prisma.projectTechnology.deleteMany({
    where: { projectId: project.id },
  });
  await prisma.projectCategory.deleteMany({
    where: { projectId: project.id },
  });

  await prisma.projects.update({
    data: {
      name: project.name,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      images: project.images || [],
      tech: project.tech, // Keep for backward compatibility
      projectInitiated: project.projectInitiated,
      projectCompleted: project.projectCompleted,
      isCompleted: project.isCompleted,
      isFeatured: project.isFeatured ?? false,
      updatedAt: new Date(),
      categories: project.categories, // Keep for backward compatibility
      technologies: {
        create: techConnections,
      },
      projectCategories: {
        create: categoryConnections,
      },
    },
    where: {
      id: project.id,
    },
  });
}

export async function revalidateAdminPages() {
  ("use server");
  revalidatePath("/admin");
  revalidatePath("/projects");
}