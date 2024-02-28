import React, { type ForwardedRef } from "react";
import ProjectCards from "@/components/cards/project-cards";
import Head from "next/head";
import PageTransitions from "@/components/page-transitions";

const Projects = (_: unknown, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <PageTransitions ref={ref}>
      <Head>
        <title>Bhavesh Patil | Projects</title>
        <meta
          name="description"
          content="This is a project page that contains all the information about projects that bhavesh has created in past."
        />
      </Head>

      <div className="flex h-screen w-full flex-wrap justify-center overflow-auto pb-40 lg:pb-20">
        <ProjectCards />
      </div>
    </PageTransitions>
  );
};

export default Projects;
