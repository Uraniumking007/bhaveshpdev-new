import { prisma } from "@/lib/prisma";

export async function GET() {
  return prisma.projects.findMany({
    orderBy: {
      projectCompleted: "desc",
    },
  });
}
