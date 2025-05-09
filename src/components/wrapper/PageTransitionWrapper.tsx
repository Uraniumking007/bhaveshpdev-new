"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { useTransition } from "@/lib/context/TransitionContext";
import { createContext, useContext } from "react";
import LoadingOverlay from "@/components/loading-overlay";

const TransitionContext = createContext({
  isExiting: false,
  showLoader: false,
  startExit: (cb: () => void) => {},
  hideLoader: () => {},
});

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExiting, setIsExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const startExit = useCallback((cb: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setShowLoader(true);
      cb();
    }, 400); // match your animation duration
  }, []);

  const hideLoader = () => setShowLoader(false);

  return (
    <TransitionContext.Provider
      value={{ isExiting, showLoader, startExit, hideLoader }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExiting, showLoader, hideLoader } = useTransition();
  const pathname = usePathname();

  // Hide loader when the new page is loaded
  useEffect(() => {
    if (showLoader) {
      hideLoader();
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 1, y: 0 }}
          animate={isExiting ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <LoadingOverlay show={showLoader} />
    </>
  );
}
