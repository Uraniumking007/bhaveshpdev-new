import Introduction from "@/components/indroduction";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";
import { variants } from "@/utils/animationVariants";
import PageTransition from "@/components/page-transition";

export default function Home(
  _: unknown,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <PageTransition ref={ref}>
      <Head>
        <title>Bhavesh Patil | Home</title>
      </Head>
      <main className="flex h-[calc(100%-4rem)] w-full select-none items-center justify-center">
        <div
        // initial={previousTab === "/" ? "fade" : "left"}
        // variants={variants}
        // animate={{ opacity: 1, x: 0 }}
        // exit={{ opacity: 0 }}
        // transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        >
          <Introduction />
        </div>
      </main>
    </PageTransition>
  );
}
