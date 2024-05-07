import { HeroHighlight } from "@/components/hero-highlight";
import SkillsIcons from "@/components/tabs/skills-icons";
import React from "react";

export default function SkillsPage() {
  return (
    <HeroHighlight>
      <div className="h-full">
        <SkillsIcons />
      </div>
    </HeroHighlight>
  );
}
