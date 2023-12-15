import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const exampleRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        description: z.string().min(3),
        projectInitiated: z.date(),
        projectCompleted: z.date(),
        githubUrl: z.string().url(),
        projectUrl: z.string().url(),
        ImageUrl: z.string().url(),
        languages: z.array(z.string()),
      }),
    )
    .query(async ({ input }) => {
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
        },
      });

      return {
        name: input.name,
        id: 1,
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
