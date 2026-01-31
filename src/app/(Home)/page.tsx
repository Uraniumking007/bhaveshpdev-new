import nextDynamic from "next/dynamic";
import type { Metadata } from "next";
import type { Project, Timeline } from "@/types/static-data";
import { getFeaturedProjects, getTimeline, getTechnologies, getCategories } from "@/lib/data";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import type { ProjectWithRelations } from "@/types/projects";

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

export default async function Home() {
  const [projects, timelineData, technologies, categories] = await Promise.all([
    getFeaturedProjects(),
    getTimeline(),
    getTechnologies(),
    getCategories(),
  ]);

  // Transform projects to match ProjectWithRelations type
  const transformedProjects: ProjectWithRelations[] = projects.map((project) => ({
    ...project,
    technologies: project.technologies.map((pt) => ({
      ...pt,
      technology: technologies.find((t) => t.id === pt.technologyId),
    })),
    projectCategories: project.categories.map((pc) => ({
      ...pc,
      category: categories.find((c) => c.id === pc.categoryId),
    })),
  }));

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <DevInfo />
      <SkillsSection />
      <ProjectsSection projects={transformedProjects} />
      <TimelineSection timelineData={timelineData} />
      <ContactSection />
    </main>
  );
}
