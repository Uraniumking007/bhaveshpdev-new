"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressReact() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(to right, #6366f1, #a855f7)",
      }}
    />
  );
}
