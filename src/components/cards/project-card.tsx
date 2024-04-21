"use client";
import Image from "next/image";
import { Meteors } from "../meteors";
import { Projects } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function ProjectCard(project: Projects) {
  console.log(project.image);

  const [readmore, setReadmore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const desRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (desRef.current) {
      setShowReadMore(
        desRef.current.scrollHeight !== desRef.current.clientHeight
      );
    }
  }, []);
  return (
    <div className="w-full h-full relative max-w-xs">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 h-full overflow-hidden rounded-2xl flex flex-col justify-center items-start">
        <div className="h-40 mt-4 w-full rounded-full flex items-center justify-center mb-4 ">
          <Image
            src={project.image}
            width={500}
            height={500}
            alt={project.name}
          />
        </div>

        <h1 className="font-bold text-xl text-white mb-1 relative z-50">
          {project.name}
        </h1>

        <p
          className="font-normal text-base text-slate-500 mb-4 relative z-50"
          style={
            readmore
              ? { display: "block" }
              : {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  // textOverflow: "ellipsis",
                }
          }
          ref={desRef}
        >
          {project.description}{" "}
          {showReadMore && (
            <span
              className="cursor-pointer select-none font-medium text-secondary underline"
              onClick={() => {
                setReadmore(!readmore);
              }}
            >
              {readmore ? "Read Less" : "Read More"}
            </span>
          )}
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
  );
}
