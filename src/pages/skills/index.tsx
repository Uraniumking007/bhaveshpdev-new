import PageTransitions from "@/components/page-transitions";
import SkillIcons from "@/components/skill-icons";
import Head from "next/head";
import { type ForwardedRef } from "react";

const metadata = {
  title: "Bhavesh Patil - Home",
  description:
    "This is a home page it contains information regarding bhavesh's skills",
};

const SkillsPage = (_: unknown, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <PageTransitions ref={ref}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <SkillIcons />
    </PageTransitions>
  );
};

export default SkillsPage;
