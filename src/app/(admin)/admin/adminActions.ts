"use server";
import { prisma } from "@/lib/prisma";
import { Projects } from "@prisma/client";

export async function createProject({ project }: { project: Projects }) {
  return await prisma.projects.create({
    data: {
      id: crypto.randomUUID(),
      name: project.name,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      tech: project.tech,
      projectInitiated: project.projectInitiated,
      projectCompleted: project.projectCompleted,
      isCompleted: project.isCompleted,
      updatedAt: new Date(),
    },
  });
}

export async function editProject({ project }: { project: Projects }) {
  await prisma.projects.update({
    data: {
      name: project.name,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      tech: project.tech,
      projectInitiated: project.projectInitiated,
      projectCompleted: project.projectCompleted,
      isCompleted: project.isCompleted,
      updatedAt: new Date(),
    },
    where: {
      id: project.id,
    },
  });
}
