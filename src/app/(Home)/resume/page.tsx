"use client";

import dynamic from "next/dynamic";
import { HeroHighlight } from "@/components/hero-highlight";
import { IconDownload } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => <div className="text-white">Loading PDF...</div>,
});

export default function ResumePage() {
  return (
    <HeroHighlight>
      <div className="w-full min-h-screen px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Resume</h1>
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
          </div>

          <div className="bg-transparent rounded-xl p-6 border border-white/10">
            <PDFViewer url="/resume.pdf" />
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
