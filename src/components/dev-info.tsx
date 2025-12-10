"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TextType from "./text-type";
import { Highlight } from "./hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ImageWithMovingBorder } from "./moving-block";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const DevInfo = () => {
  const [showNameHighlight, setShowNameHighlight] = useState(false);
  const [typeNextText, setTypeNextText] = useState(false);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center w-full h-full items-center lg:pl-40 lg:flex-row">
        <ImageWithMovingBorder
          className="select-none"
          imageSrc="/bhaveshcloseup.jpg"
          imageAlt="Bhavesh Patil"
        />
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
            <div className="w-full flex justify-center flex-wrap items-center gap-2">
              {!typeNextText ? (
                <TextType
                  key="intro-typing"
                  as="span"
                  className="text-black dark:text-white"
                  text="Hi! I'm"
                  typingSpeed={60}
                  deletingSpeed={35}
                  pauseDuration={1600}
                  cursorClassName="text-black dark:text-white"
                  startOnVisible
                  loop={false}
                  hideCursorWhileTyping
                  onSentenceComplete={() => setTypeNextText(true)}
                />
              ) : (
                <span className="text-black dark:text-white">Hi! I'm</span>
              )}

              {showNameHighlight ? (
                <Highlight className="text-black dark:text-white">
                  Bhavesh Patil.
                </Highlight>
              ) : typeNextText ? (
                <TextType
                  key="name-typing"
                  as="span"
                  className="text-black dark:text-white"
                  text="Bhavesh Patil."
                  typingSpeed={60}
                  deletingSpeed={35}
                  pauseDuration={1600}
                  cursorClassName="text-black dark:text-white"
                  startOnVisible
                  loop={false}
                  hideCursorWhileTyping
                  onSentenceComplete={() => setShowNameHighlight(true)}
                />
              ) : null}
            </div>
            <TextGenerateEffect
              className="w-full max-w-3xl px-4 sm:px-6 lg:pt-4 font-normal"
              textClassName="text-base sm:text-lg md:text-xl leading-7 md:leading-8 tracking-wide"
              textStyle={{
                fontFamily: '"Zalando Sans", sans-serif',
                fontOpticalSizing: "auto",
                fontVariationSettings: '"wdth" 100',
              }}
              words="I'm a computer engineering student passionate about building dynamic, user-friendly web applications with JavaScript, TypeScript, Next.js, and Tailwind CSS. Alongside my projects, I gained hands-on experience during a two-month internship, supporting real-world applications. Let's connect and create something great together!"
            />
          </motion.h1>
          <div className="flex flex-row gap-4 items-center justify-center mt-6 w-full">
            <AnimatedTooltip items={contactInfo} />
          </div>
        </div>
      </div>
    </div>
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
    title: "X",
    description: "x.com/UraniumKing0",
    icon: "/icons/outline/brand-x.svg",
    link: "https://x.com/UraniumKing0",
  },
  {
    id: 3,
    title: "Github",
    description: "github.com/Uraniumking007",
    icon: "/icons/outline/brand-github.svg",
    link: "https://github.com/Uraniumking007",
  },
];
