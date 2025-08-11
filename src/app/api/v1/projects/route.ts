import { prisma } from "@/lib/prisma";


export async function GET() {
  const data = await prisma.projects.findMany({
    orderBy: {
      projectCompleted: "desc",
    },
  });

  return Response.json(data.filter((project) => project.projectCompleted));
}
