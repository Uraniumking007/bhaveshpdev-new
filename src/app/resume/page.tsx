import { HeroHighlight } from "@/components/hero-highlight";
import { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Resume",
  description: "Bhavesh Patil's resume.",
};

export default function page() {
  permanentRedirect("/resume.pdf");
  return (
    <HeroHighlight>
      <Link href={"/"}>Go Back to Home</Link>
    </HeroHighlight>
  );
}
