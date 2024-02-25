"use client";
import Image from "next/image";
import { useRef } from "react";
import { useHover } from "usehooks-ts";
import { Skills, skill } from "../../utils/projectArr";

const SkillIcon = ({ language, colorScheme, src }: skill) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const languageCapz = language.charAt(0).toUpperCase() + language.slice(1);
  return (
    <div ref={hoverRef}>
      <div
        className={`w-max text-center h-max flex items-center flex-col rounded-full p-2 m-2 drop-shadow-lg`}
        style={{
          filter: isHover ? `drop-shadow( 0 0 10px ${colorScheme})` : "none",
        }}
      >
        <Image
          src={src}
          className="w-16 h-16"
          width={150}
          height={150}
          loading="lazy"
          alt={""}
        />
        <div
          className={`pt-1 relative w-full justify-center ease-in-out transition-all duration-150 ${
            isHover
              ? "opacity-100 translate-y-[0rem]"
              : "opacity-0 translate-y-[-3rem]"
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
    <div className="flex flex-wrap w-full justify-center items-center">
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
