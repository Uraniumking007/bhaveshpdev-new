import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { tabHistory } from "@/utils/atom";
import { useAtom } from "jotai";
import { variants } from "@/utils/animationVariants";
import PDFViewer from "@/components/pdf-viewer";

export default function ResumePage() {
  // const [previousTab] = useAtom(tabHistory);

  return (
    <>
      <Head>
        <title>Bhavesh Patil | Resume</title>
        <meta
          name="description"
          content="This is a project page that contains all the information about projects that bhavesh has created in past."
        />
      </Head>
      <div
        className="my-4 flex h-[100vh-5rem] max-w-full cursor-default flex-wrap items-center justify-center overflow-auto"
      >
        <div className="flex h-screen w-full flex-wrap justify-center overflow-auto pb-40 lg:pb-20">
          <PDFViewer file={"/Resume.pdf"} />
        </div>
      </div>
    </>
  );
}
