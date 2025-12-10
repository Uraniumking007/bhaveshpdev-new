import { prisma } from "@/lib/prisma";


export async function GET() {
  const data = await prisma.projects.findMany({
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
    orderBy: {
      projectCompleted: "desc",
    },
  });

  return Response.json(data.filter((project) => project.projectCompleted));
}
