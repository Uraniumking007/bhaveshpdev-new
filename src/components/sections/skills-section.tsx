"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { HeroHighlight } from "../hero-highlight";
import { TextGenerateEffect } from "../text-generate-effect";
import { Skills } from "@/lib/utils/data";
import Image from "next/image";
import { useHover } from "usehooks-ts";
import { useRef } from "react";

const SkillIcon = ({ language, colorScheme, src }: (typeof Skills)[0]) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover: boolean = useHover(hoverRef as React.RefObject<HTMLElement>);
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
          alt={language}
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

const SkillsSection = () => {
  return (
    <HeroHighlight>
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-neutral-700 dark:text-white"
        >
          Technical Skills
        </motion.h2>
        <TextGenerateEffect
          className="text-center mb-12 text-neutral-600 dark:text-neutral-300"
          words="Here are the technologies and tools I work with to bring ideas to life."
        />
        <div className="flex w-full flex-wrap items-center justify-center">
          {Skills.map((skill, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: key * 0.1 }}
            >
              <SkillIcon {...skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </HeroHighlight>
  );
};

export default SkillsSection;
