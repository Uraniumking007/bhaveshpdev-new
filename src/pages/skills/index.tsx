import SkillIcons from "@/components/skill-icons";

import Head from "next/head";

const metadata = {
  title: "Bhavesh Patil - Home",
  description:
    "This is a home page it contains information regarding bhavesh's skills",
};

const SkillsPage = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <SkillIcons />
    </>
  );
};

export default SkillsPage;
