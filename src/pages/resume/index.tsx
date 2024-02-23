import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { tabHistory } from "@/utils/atom";
import { useAtom } from "jotai";
import { variants } from "@/utils/animationVariants";
import PDFViewer from "@/components/pdf-viewer";

export default function ResumePage() {
  const [previousTab] = useAtom(tabHistory);

  return (
    <>
      <Head>
        <title>Bhavesh Patil | Resume</title>
        <meta
          name="description"
          content="This is a project page that contains all the information about projects that bhavesh has created in past."
        />
      </Head>
      <motion.div
        initial={
          previousTab === "projects"
            ? "fade"
            : previousTab === "/"
            ? "right"
            : "left"
        }
        variants={variants}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        className="my-4 flex h-[100vh-5rem] max-w-full cursor-default flex-wrap items-center justify-center overflow-auto"
      >
        <div className="flex h-screen w-full flex-wrap justify-center overflow-auto pb-40 lg:pb-20">
          <PDFViewer file="https://1drv.ms/b/s!AidQwYdVozajjY9Py58PEAVb3fsarA?e=xEkGOt" />
        </div>
      </motion.div>
    </>
  );
}
