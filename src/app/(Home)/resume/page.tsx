"use client";

import { HeroHighlight } from "@/components/hero-highlight";
import { IconDownload, IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { redirect } from "next/navigation";

export default function ResumePage() {
  redirect("/resume.pdf");
  return (
    <HeroHighlight>
      <div className="w-full min-h-screen px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Resume</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              View and download my professional resume
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-center gap-4 mb-4">
              <a
                href="/resume.pdf"
                download
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-white/10 hover:bg-white/20 text-white",
                  "transition-all duration-300"
                )}
              >
                <IconDownload className="w-5 h-5" />
                Download Resume
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-white/10 hover:bg-white/20 text-white",
                  "transition-all duration-300"
                )}
              >
                <IconExternalLink className="w-5 h-5" />
                Open in New Tab
              </a>
            </div>

            <div className="text-center text-white/70">
              <p>Click the buttons above to view or download the resume.</p>
              <p className="mt-2">
                The PDF will open in your browser&apos;s native PDF viewer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
