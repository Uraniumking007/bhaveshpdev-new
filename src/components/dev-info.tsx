"use client";

import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandX,
} from "@tabler/icons-react";
import React from "react";
import { HeroHighlight, Highlight } from "./hero-highlight";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./text-generate-effect";
import { ButtonWithMovingBorder } from "./moving-block";
import { TooltipButton } from "./Buttons/tooltip-button";

const DevInfo = () => {
  return (
    <HeroHighlight>
      <div className="flex flex-col justify-center w-full items-center lg:pl-40 lg:flex-row">
        <ButtonWithMovingBorder children={undefined} className="select-none" />
        <div>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl mt-4 lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex flex-col justify-center items-center"
          >
            <div className="w-full">
              Hi! I&apos;m{" "}
              <Highlight className="text-black dark:text-white">
                Bhavesh.
              </Highlight>
            </div>
            <TextGenerateEffect
              className="lg:text-lg md:w-[70%] text-sm font-normal lg:pt-4 lg:w-[75%]"
              words="I'm a computer engineering student who enjoys using JavaScript,
            TypeScript, Next.js, and Tailwind CSS. I am interested about creating
            dynamic, responsive web applications that provide an excellent user
            experience."
            />
          </motion.h1>
          <div className="flex flex-row gap-4 items-center justify-center mt-6 w-full">
            <TooltipButton items={contactInfo} />
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default DevInfo;

const contactInfo = [
  {
    id: 0,
    title: "G-Mail",
    description: "contact@bhaveshp.dev",
    icon: "/icons/outline/brand-gmail.svg",
    link: "mailto:contact@bhaveshp.dev",
  },
  {
    id: 1,
    title: "Discord",
    description: "discord.gg/smCjSmMw9D",
    icon: "/icons/outline/brand-discord.svg",
    link: "https://discord.gg/smCjSmMw9D",
  },
  {
    id: 2,
    title: "X formerly Twitter",
    description: "twitter.com/UraniumKing0",
    icon: "/icons/outline/brand-x.svg",
    link: "https://twitter.com/UraniumKing0",
  },
  {
    id: 3,
    title: "Github",
    description: "github.com/Uraniumking007",
    icon: "/icons/outline/brand-github.svg",
    link: "https://github.com/Uraniumking007",
  },
];
