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

  const filtered = data.filter((project) => project.projectCompleted);
  return new Response(JSON.stringify(filtered), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
