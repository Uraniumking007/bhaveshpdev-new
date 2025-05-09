import DevInfo from "@/components/dev-info";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import TimelineSection from "@/components/sections/timeline-section";
import ContactSection from "@/components/sections/contact-section";
import type { Metadata } from "next";
import { getProjects } from "../(admin)/admin/projects/actions";
import { prisma } from "@/lib/prisma";

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
  return (
    <main className="min-h-screen">
      <DevInfo />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <TimelineSection />
      <ContactSection />
    </main>
  );
}
