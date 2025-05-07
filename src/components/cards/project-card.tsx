"use client";
import Image from "next/image";
import { Meteors } from "../meteors";
import { Projects } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrowser,
  IconGlobe,
  IconWorld,
} from "@tabler/icons-react";

export default function ProjectCard(project: Projects) {
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
    <div className="w-full h-80 relative max-w-xs">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.70] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 h-full overflow-hidden rounded-2xl flex flex-col justify-evenly items-start">
        <div className="h-40 mt-4 w-full rounded-full flex items-center justify-center mb-4 ">
          <Image
            src={project.image}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            alt={project.name}
          />
        </div>

        <h1 className="font-bold text-balance text-white mb-1 relative z-50">
          {project.name}
        </h1>

        <p
          className="font-normal text-balance text-slate-500 mb-1 relative z-50"
          style={
            readmore
              ? { display: "block", overflow: "visible" }
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
          {project.description}
        </p>
        {showReadMore && (
          <span
            className="cursor-pointer select-none font-normal text-xs text-secondary underline mb-2"
            onClick={() => {
              setReadmore(!readmore);
            }}
          >
            {readmore ? "Read Less" : "Read More"}
          </span>
        )}
        <div className="w-full flex justify-between mb-4 px-4">
          <Link
            href={project.link}
            target="_blank"
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <IconWorld size={15} />
              <span>{`Preview`}</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </Link>

          <Link
            href={project.github}
            target="_blank"
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <IconBrandGithub size={15} />
              <span>{`Github`}</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </Link>
        </div>

        <Meteors number={2} />
      </div>
    </div>
  );
}
