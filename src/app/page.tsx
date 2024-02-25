import { variants } from "@/utils/variants";
import Introduction from "./components/introduction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Home",
  description:
    "I'm a computer engineering student who enjoys using JavaScript,TypeScript, Next.js, and Tailwind CSS. I am interested about creating dynamic, responsive web applications that provide an excellent user experience.",
};

export default function Home() {
  const [previousTab] = useAtom(tabHistory);
  console.log("previousTab", previousTab);

  return (
    <>
      <main className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center">
        <motion.div
          initial={previousTab === "/" ? "fade" : "left"}
          variants={variants}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        >
          <Introduction />
        </motion.div>
      </main>
    </>
  );
}
