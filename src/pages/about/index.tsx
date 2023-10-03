import React, { useEffect } from "react";
import { SocialCard } from "@/components/cards/social-cards";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";
import { variants } from "@/utils/animationVariants";
import Head from "next/head";

export const metadata = {
  title: "Bhavesh Patil - Projects",
  description:
    "Bhavesh is a computer engineering student with adapt knowledge in javascript,typescript,react,nextjs",
};

const About = () => {
  const [previousTab] = useAtom(tabHistory);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <AnimatePresence>
        <motion.div
          initial={previousTab === "/about" ? "fade" : "right"}
          variants={variants}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          className="flex h-[calc(100%-5rem)] w-full flex-col items-center overflow-auto"
        >
          <h1 className="mb-12 mt-4 text-center text-2xl md:text-4xl lg:text-6xl">
            About
          </h1>
          <div className="flex flex-grow items-center justify-center">
            <div className="mb-20 block h-full w-full md:mb-0 lg:w-[95%] xl:w-[55%]">
              <div className="mt-4 flex w-full flex-col items-center md:flex-row md:justify-center">
                <SocialCard />
                <div className="mt-2 flex flex-col p-4 md:p-8">
                  <p className="text-center text-sm md:text-base lg:text-lg">
                    I am a computer engineering student at CGPIT, Uka Tarsadia
                    University. I&apos;m just getting started with coding and
                    attempting to learn various programming languages.
                  </p>
                  <p className="mt-2 text-center text-[0.975rem] md:text-[1.075rem] lg:text-xl">
                    Web Developer | Student | Content Creator
                  </p>
                  <ul className="mt-2 list-inside list-disc text-xs md:text-sm lg:text-base">
                    <li>🌍 I&apos;m based in Gujarat, India</li>
                    <li>🧠 I&apos;m learning Javascript</li>
                    <li>
                      🤔 I&apos;m looking for help with learning more about
                      javascript.
                    </li>
                    <li>😄 Pronouns: he/his</li>
                    <li>⚡ I like playing games.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default About;
