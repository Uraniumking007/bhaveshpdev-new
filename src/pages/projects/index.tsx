import React from "react";
import ProjectCards from "@/components/cards/project-cards";

import Head from "next/head";

const projects = () => {
  return (
    <>
      <Head>
        <title>Bhavesh Patil | Projects</title>
        <meta
          name="description"
          content="This is a project page that contains all the information about projects that bhavesh has created in past."
        />
      </Head>
      <div className="my-4 flex h-[100vh-5rem]  max-w-full cursor-default flex-wrap items-center justify-center overflow-auto">
        <div className="flex h-screen w-full flex-wrap justify-center overflow-auto pb-40 lg:pb-20">
          <ProjectCards />
        </div>
      </div>
    </>
  );
};

export default projects;
