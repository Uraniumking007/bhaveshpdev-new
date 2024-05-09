import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Resume",
  description: "Bhavesh Patil's resume.",
};

export default function page() {
  permanentRedirect("/resume.pdf");
  return (
    <div>
      <h1>Resume</h1>
    </div>
  );
}
