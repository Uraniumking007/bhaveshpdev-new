import { HeroHighlight } from "@/components/hero-highlight";
import SkillsIcons from "@/components/tabs/skills-icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Skills",
  description: "Bhavesh Patil's skills.",
};

export default function SkillsPage() {
  return (
    <HeroHighlight>
      <div className="h-full">
        <SkillsIcons />
      </div>
    </HeroHighlight>
  );
}
