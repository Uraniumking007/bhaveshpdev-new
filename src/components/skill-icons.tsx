/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import Image from "next/image";
import { useRef } from "react";
import { useHover } from "usehooks-ts";
import { Skills, type skill } from "@/utils/data";

const SkillIcon = ({ language, colorScheme, src }: skill) => {
  const hoverRef = useRef(null);
  const isHover: boolean = useHover(hoverRef);
  const languageCapz = language.charAt(0).toUpperCase() + language.slice(1);
  return (
    <div ref={hoverRef}>
      <div
        className={`m-2 flex h-max w-max flex-col items-center rounded-full p-2 text-center drop-shadow-lg`}
        style={{
          filter: isHover ? `drop-shadow( 0 0 10px ${colorScheme})` : "none",
        }}
      >
        <Image
          src={src}
          className="h-16 w-16"
          width={150}
          height={150}
          loading="lazy"
          alt={""}
        />
        <div
          className={`relative w-full justify-center pt-1 transition-all duration-150 ease-in-out ${
            isHover
              ? "translate-y-[0rem] opacity-100"
              : "translate-y-[-3rem] opacity-0"
          }`}
          style={{
            filter: isHover ? `drop-shadow( 0 0 10px ${colorScheme})` : "none",
          }}
        >
          {languageCapz}
        </div>
      </div>
    </div>
  );
};

const SkillIcons = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      {Skills.map((skill, key) => {
        return (
          <div key={key}>
            <SkillIcon {...skill} />
          </div>
        );
      })}
    </div>
  );
};

export default SkillIcons;
