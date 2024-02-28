/* eslint-disable @typescript-eslint/require-await */
import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { type NextRouter, useRouter } from "next/router";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

function PageTransition(
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef,
) {
  const router = useRouter();
  const [tab] = useAtom(tabHistory);
  const onTheRight = { x: "100%" };
  const inTheCenter = { x: 0 };
  const onTheLeft = { x: "-100%" };
  const transition = { duration: 0.6, ease: "easeInOut" };

  function getDirection(router: NextRouter, previousPagePath?: string | null) {
    const currentPath = router.asPath;
    const lastTab = previousPagePath;

    if (lastTab === null) {
      return inTheCenter;
    }
    if (lastTab === currentPath) {
      return inTheCenter;
    }
    if (
      (lastTab === "/projects" && currentPath === "/") ||
      (lastTab === "/skills" && currentPath === "/") ||
      (lastTab === "/resume" && currentPath === "/") ||
      (lastTab === "/skills" && currentPath === "/projects") ||
      (lastTab === "/resume" && currentPath === "/projects") ||
      (lastTab === "/resume" && currentPath === "/skills")
    ) {
      return onTheLeft;
    }
    if (
      (lastTab === "/" && currentPath === "/projects") ||
      (lastTab === "/" && currentPath === "/skills") ||
      (lastTab === "/projects" && currentPath === "/skills") ||
      (lastTab === "/" && currentPath === "/resume") ||
      (lastTab === "/projects" && currentPath === "/resume") ||
      (lastTab === "/skills" && currentPath === "/resume")
    ) {
      return onTheRight;
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getDirection(router, tab)}
      animate={inTheCenter}
      exit={getDirection(router, tab)}
      transition={transition}
      {...rest}
      className="h-full w-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(PageTransition);
