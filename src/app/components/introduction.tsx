"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atoms";
import { variants } from "@/utils/variants";

const Introduction = () => {
  const [previousTab] = useAtom(tabHistory);
  console.log("previousTab", previousTab);
  return (
    <motion.div
      initial={previousTab === "/" ? "fade" : "left"}
      variants={variants}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-col sm:flex-row md:w-[75%] lg:w-[60%]">
          <div className="avatar m-2 justify-center">
            <div className="w-16 md:w-40 lg:w-72 mask mask-squircle">
              <Image
                src="/assets/bhavesh5.jpg"
                width={1280}
                height={720}
                alt=""
                loading="eager"
              />
            </div>
          </div>
          <div className="text-sm tracking-normal lg:text-xl text-center items-center">
            <span className="text-xl lg:text-3xl">
              Hi! I&apos;m <span className=" text-yellow-400">Bhavesh</span>
            </span>
            <div className="p-2 ">
              I&apos;m a computer engineering student who enjoys using
              JavaScript, TypeScript, Next.js, and Tailwind CSS. I am interested
              about creating dynamic, responsive web applications that provide
              an excellent user experience.
            </div>
            <div className="flex justify-center items-center">
              <div className="text-lg">Contact Me : </div>
              <div className="m-1 ml-2 active:scale-75 ease-in-out duration-100 sm:m-2">
                <Link
                  href={"mailto:bhaveshpatil8000@gmail.com"}
                  target="_blank"
                >
                  <Image
                    src={"/assets/social-icons/gmail.svg"}
                    alt={""}
                    width={28}
                    height={28}
                  />
                </Link>
              </div>
              <div className="m-1 active:scale-75 ease-in-out duration-100 sm:m-2">
                <Link href={"https://discord.gg/kcQWJCa5BV"} target="_blank">
                  <Image
                    src={"/assets/social-icons/discord.svg"}
                    width={28}
                    height={28}
                    alt="Discord"
                  />
                </Link>
              </div>
              <div className="m-1 active:scale-75 ease-in-out duration-100 sm:m-2">
                <Link href={"https://twitter.com/UraniumKing0"} target="_blank">
                  <Image
                    src={"/assets/social-icons/twitter.svg"}
                    width={28}
                    height={28}
                    alt="Discord"
                  />
                </Link>
              </div>
              <div className="m-1 active:scale-75 ease-in-out duration-100 sm:m-2">
                <Link
                  href={"https://github.com/Uraniumking007"}
                  target="_blank"
                >
                  <Image
                    src={"/assets/social-icons/github.svg"}
                    width={25}
                    height={25}
                    alt={""}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;
