"use server";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { Projects } from "@prisma/client";

export async function createProject({ project }: { project: Projects }) {
  const user = await auth();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const userData = await prisma.user.findFirst({
    where: {
      email: user.user.email,
    },
  });

  if (!userData?.isAdmin) {
    throw new Error("Unauthorized");
  }

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
      categories: project.categories,
    },
  });
}

export async function editProject({ project }: { project: Projects }) {
  const user = await auth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userData = await prisma.user.findFirst({
    where: {
      email: user.user.email,
    },
  });

  if (!userData?.isAdmin) {
    throw new Error("Unauthorized");
  }

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
      categories: project.categories,
    },
    where: {
      id: project.id,
    },
  });
}
