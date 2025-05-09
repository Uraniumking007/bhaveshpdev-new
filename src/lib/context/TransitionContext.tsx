"use client";
import { createContext, useContext, useState, useCallback } from "react";

const TransitionContext = createContext({
  isExiting: false,
  showLoader: false,
  startExit: (cb: () => void) => {},
  hideLoader: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

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

  // Hide loader after navigation (optional: use a global event or effect)
  const hideLoader = () => setShowLoader(false);

  return (
    <TransitionContext.Provider
      value={{ isExiting, showLoader, startExit, hideLoader }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
