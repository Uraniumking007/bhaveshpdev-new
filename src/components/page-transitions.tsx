import { type HTMLMotionProps, motion } from "framer-motion";
import { type ForwardedRef } from "react";
import { useRouter } from "next/router";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = ForwardedRef<HTMLDivElement>;

export const PageTransitionLayout = (
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef,
) => {
  const router = useRouter();
  const fromRight = { x: "100%" };
  const fromLeft = { x: "-100%" };
  const center = { x: 0 };
  const transition = { duration: 0.5, ease: "easeInOut" };

  return (
    <motion.div
      ref={ref}
      initial={router.asPath === "/" ? fromLeft : fromRight}
      animate={center}
      exit={router.asPath === "/" ? fromRight : fromLeft}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
