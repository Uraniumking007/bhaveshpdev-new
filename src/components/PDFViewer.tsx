"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-12rem)] rounded-lg overflow-auto flex flex-col items-center bg-transparent"
    >
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="text-white">Loading PDF...</div>}
        className="w-full flex flex-col items-center"
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth > 800 ? 800 : containerWidth}
            renderAnnotationLayer={false}
            renderTextLayer={true}
            className="my-2"
          />
        ))}
      </Document>
    </div>
  );
}
