"use client";

import { cn } from "@/lib/utils/cn";

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-12rem)]",
        "rounded-lg overflow-hidden"
      )}
    >
      <iframe
        src={`${url}#toolbar=0`}
        className="w-full h-full bg-transparent"
        style={{ background: "transparent" }}
        title="PDF Viewer"
      />
    </div>
  );
}
