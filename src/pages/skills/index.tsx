import SkillIcons from "@/components/skill-icons";

import Head from "next/head";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";
import { variants } from "@/utils/animationVariants";

const metadata = {
  title: "Bhavesh Patil - Home",
  description:
    "This is a home page it contains information regarding bhavesh's skills",
};

const SkillsPage = () => {
  const [previousTab] = useAtom(tabHistory);
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <motion.div
        initial={
          previousTab === "projects"
            ? "fade"
            : previousTab === "/" || previousTab === "/projects"
            ? "right"
            : "left"
        }
        variants={variants}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center"
      >
        <SkillIcons />
      </motion.div>
    </>
  );
};

export default SkillsPage;
