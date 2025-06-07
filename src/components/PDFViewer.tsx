"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useEffect } from "react";

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  useEffect(() => {
    // Initialize startTime for PDF viewer
    if (typeof window !== "undefined") {
      (window as any).startTime = Date.now();
    }
  }, []);

  return (
    <div className="w-full h-[calc(100vh-12rem)] sm:h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] bg-transparent rounded-lg overflow-hidden [&_.rpv-core__viewer]:bg-transparent [&_.rpv-core__page-layer]:bg-transparent [&_.rpv-core__inner-page]:bg-transparent [&_.rpv-core__page]:bg-transparent [&_.rpv-core__viewer]:w-full [&_.rpv-core__viewer]:h-full">
      <Worker workerUrl="/pdf.worker.min.js">
        <Viewer fileUrl={url} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
