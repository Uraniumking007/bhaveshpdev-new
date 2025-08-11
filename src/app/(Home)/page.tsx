import DevInfo from "@/components/dev-info";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import TimelineSection from "@/components/sections/timeline-section";
import ContactSection from "@/components/sections/contact-section";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { HeroHighlight } from "@/components/hero-highlight";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Home",
  description: "Bhavesh Patil's personal website.",
};

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
      <HeroHighlight>
        <ScrollProgress />
        <div id="dev-info">
          <DevInfo />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="projects">
          <ProjectsSection projects={projects} />
        </div>
        <div id="timeline">
          <TimelineSection timelineData={timelineData} />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </HeroHighlight>
    </main>
  );
}
