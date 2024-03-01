/* eslint-disable @typescript-eslint/require-await */
import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { type NextRouter, useRouter } from "next/router";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

interface Chainable {
  entry: () => { x: string };
  exit: () => { x: string };
}

function PageTransition(
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef,
) {
  const router = useRouter();
  const [tab] = useAtom(tabHistory);
  const onTheRight = { x: "100%" };
  const inTheCenter = { x: "0%" };
  const onTheLeft = { x: "-100%" };
  const transition = { duration: 0.3, ease: "easeInOut" };

  function getDirection(
    router: NextRouter,
    previousPagePath?: string | null,
  ): Chainable {
    const currentPath = router.asPath;

    const routesMap: Record<string, Record<string, Record<string, string>>> = {
      "/": {
        "/projects": onTheLeft,
        "/skills": onTheLeft,
        "/resume": onTheLeft,
      },
      "/projects": {
        "/": onTheRight,
        "/skills": onTheLeft,
        "/resume": onTheLeft,
      },
      "/skills": {
        "/": onTheRight,
        "/projects": onTheRight,
        "/resume": onTheLeft,
      },
      "/resume": {
        "/": onTheRight,
        "/projects": onTheRight,
        "/skills": onTheRight,
      },
    };

    function entry() {
      if (previousPagePath == null) {
        return inTheCenter;
      }
      return routesMap[currentPath]?.[previousPagePath] == onTheLeft
        ? onTheLeft
        : onTheRight;
    }
    function exit() {
      if (previousPagePath == null) {
        return inTheCenter;
      }
      return routesMap[previousPagePath]?.[currentPath] == onTheLeft
        ? onTheLeft
        : onTheRight;
    }

    return {
      entry,
      exit,
    };
  }

  return (
    <motion.div
      ref={ref}
      initial={getDirection(router, tab).entry()}
      animate={inTheCenter}
      exit={getDirection(router, tab).exit()}
      transition={transition}
      {...rest}
      className="h-full w-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(PageTransition);
