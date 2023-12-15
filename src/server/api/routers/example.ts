import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const exampleRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        description: z.string().min(3),
        projectInitiated: z.string(),
        projectCompleted: z.string().optional(),
        githubUrl: z.string().url(),
        projectUrl: z.string().url(),
        ImageUrl: z.string().url(),
        languages: z.array(z.string()),
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.projects.create({
          data: {
            name: input.name,
            description: input.description,
            projectInitiated: input.projectInitiated,
            projectCompleted: input.projectCompleted,
            image: input.ImageUrl,
            link: input.projectUrl,
            github: input.githubUrl,
            tech: input.languages,
            isCompleted: input.isCompleted,
          },
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      return {
        message: "Project created",
      };
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
