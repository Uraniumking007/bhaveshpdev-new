import React from "react";
import Head from "next/head";
import PDFViewer from "@/components/pdf-viewer";

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Bhavesh Patil | Resume</title>
        <meta
          name="description"
          content="This is a project page that contains all the information about projects that bhavesh has created in past."
        />
      </Head>

      <div className="flex h-screen w-full flex-wrap justify-center overflow-auto pb-40 lg:pb-20">
        <PDFViewer file={"/Resume.pdf"} />
      </div>
    </>
  );
}
