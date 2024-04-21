import Image from "next/image";
import { Meteors } from "../meteors";

export default function ProjectCard() {
  return (
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

          <h1 className="font-bold text-xl text-white mb-1 relative z-50">
            Tasky
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            This is a Task Management App.
          </p>
          <div className="w-full flex justify-between mb-4">
            <button className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Preview
            </button>
            <button className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Github
            </button>
          </div>

          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
