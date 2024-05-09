import { permanentRedirect } from "next/navigation";
import React from "react";

export default function page() {
  permanentRedirect("/resume.pdf");
  return (
    <div>
      <h1>Resume</h1>
    </div>
  );
}
