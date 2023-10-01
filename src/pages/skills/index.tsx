import SkillIcons from "@/components/skill-icons";

import Head from "next/head";

const metadata = {
  title: "Bhavesh Patil - Home",
  description:
    "This is a home page it contains information regarding bhavesh's skills",
};

const page = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <div className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center">
        <SkillIcons />
      </div>
    </>
  );
};

export default page;
