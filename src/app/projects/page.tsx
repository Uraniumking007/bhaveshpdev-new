import { HeroHighlight } from "@/components/hero-highlight";
import { Meteors } from "@/components/meteors";
import Image from "next/image";
import React from "react";

const ProjectPage: React.FC = () => {
  return (
    <HeroHighlight>
      <h1>Project Details</h1>
      <div className="">
        <div className=" w-full relative max-w-xs">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <div className="h-fit mt-4   w-64 rounded-full flex items-center justify-center mb-4 ">
              <Image
                src={"https://i.imgur.com/CNqMu3q.png"}
                width={500}
                height={500}
                alt="bhavesh closeup"
              />
            </div>

            <h1 className="font-bold text-xl text-white mb-4 relative z-50">
              Tasky
            </h1>

            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
              This is a Task Management App.
            </p>

            <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
              Explore
            </button>

            <Meteors number={20} />
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default ProjectPage;
