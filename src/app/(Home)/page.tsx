import nextDynamic from "next/dynamic";
import type { Metadata } from "next";
import type { Projects, Timeline, Certification } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Home",
  description: "Bhavesh Patil's personal website.",
};

const DevInfo = nextDynamic(() => import("@/components/dev-info"), {
  loading: () => <div className="min-h-[60vh]" />,
});

const SkillsSection = nextDynamic(
  () => import("@/components/sections/skills-section"),
  {
    loading: () => <div className="min-h-[60vh]" />,
  }
);

const ProjectsSection = nextDynamic(
  () => import("@/components/sections/projects-section"),
  {
    loading: () => <div className="min-h-[60vh]" />,
  }
);

const TimelineSection = nextDynamic(
  () => import("@/components/sections/timeline-section"),
  {
    loading: () => <div className="min-h-[60vh]" />,
  }
);

const ContactSection = nextDynamic(
  () => import("@/components/sections/contact-section"),
  {
    loading: () => <div className="min-h-[60vh]" />,
  }
);
export const revalidate = 3600; // Revalidate every hour (3600 seconds)

async function getFeaturedProjects(): Promise<Projects[]> {
  try {
    return await prisma.projects.findMany({
      where: {
        isFeatured: true,
      },
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
    });
  } catch (error) {
    console.error("[Home] Failed to load featured projects", error);
    return [];
  }
}

async function getTimelineData(): Promise<Timeline[]> {
  try {
    return await prisma.timeline.findMany({
      orderBy: { yearStart: "desc" },
    });
  } catch (error) {
    console.error("[Home] Failed to load timeline data", error);
    return [];
  }
}

export default async function Home() {
  const [projects, timelineData] = await Promise.all([
    getFeaturedProjects(),
    getTimelineData(),
  ]);

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <DevInfo />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <TimelineSection timelineData={timelineData} />
      <ContactSection />
    </main>
  );
}
