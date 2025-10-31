import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Home",
  description: "Bhavesh Patil's personal website.",
};

const DevInfo = dynamic(() => import("@/components/dev-info"), {
  ssr: false,
  loading: () => <div className="min-h-[60vh]" />,
});

const SkillsSection = dynamic(
  () => import("@/components/sections/skills-section"),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" />,
  }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects-section"),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" />,
  }
);

const TimelineSection = dynamic(
  () => import("@/components/sections/timeline-section"),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" />,
  }
);

const ContactSection = dynamic(
  () => import("@/components/sections/contact-section"),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" />,
  }
);

export default async function Home() {
  const projects = await prisma.projects.findMany({
    where: {
      isFeatured: true,
    },
  });

  const timelineData = await prisma.timeline.findMany({
    orderBy: { yearStart: "desc" },
  });

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
