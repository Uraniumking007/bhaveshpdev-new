import SkillIcons from "@/components/skill-icons";

import Head from "next/head";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";
import { variants } from "@/utils/animationVariants";
import PageTransition from "@/components/page-transition";

const metadata = {
  title: "Bhavesh Patil - Home",
  description:
    "This is a home page it contains information regarding bhavesh's skills",
};

const SkillsPage = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <PageTransition ref={ref}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <div className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center">
        <SkillIcons />
      </div>
    </PageTransition>
  );
};

export default SkillsPage;
