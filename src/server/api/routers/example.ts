import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { type Projects } from "@prisma/client";

export const projectsRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        description: z.string().min(3),
        projectInitiated: z.date(),
        projectCompleted: z.date().nullable(),
        github: z.string(),
        link: z.string(),
        image: z.string(),
        tech: z.array(z.string()),
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = await prisma.projects.create({
        data: {
          name: input.name,
          description: input.description,
          projectInitiated: input.projectInitiated,
          projectCompleted: input.projectCompleted,
          image: input.image,
          link: input.link,
          github: input.github,
          tech: input.tech,
          isCompleted: input.isCompleted,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not Created",
        });
      }

      return {
        message: "Project created",
      };
    }),
  getOneProject: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      }),
    )
    .query(async ({ input }) => {
      const data = await prisma.projects.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not Found",
        });
      }
      const project: Projects = data;

      return {
        project,
      };
    }),
  getProjects: publicProcedure.query(async () => {
    const data = await prisma.projects.findMany({
      orderBy: {
        projectInitiated: "desc",
      },
    });

    const projects: Projects[] = data;

    return {
      projects,
    };
  }),

  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const data = await prisma.projects.delete({
        where: {
          id: input.id,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not Deleted",
        });
      }

      return {
        message: "Project deleted",
      };
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3),
        description: z.string().min(3),
        projectInitiated: z.date(),
        projectCompleted: z.date().nullable(),
        github: z.string(),
        link: z.string(),
        image: z.string(),
        tech: z.array(z.string()),
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = await prisma.projects.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          // projectInitiated: new Date(),
          projectInitiated: input.projectInitiated,
          projectCompleted: input.projectCompleted,
          image: input.image,
          link: input.link,
          github: input.github,
          tech: input.tech,
          isCompleted: input.isCompleted,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not Updated",
        });
      }
      return {
        message: "Project Updated",
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
