"use client";
import { createContext, useContext, useCallback } from "react";

interface TransitionContextType {
  startExit: (cb: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  startExit: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const startExit = useCallback((cb: () => void) => {
    // Execute page change immediately
    cb();
  }, []);

  return (
    <TransitionContext.Provider value={{ startExit }}>
      {children}
    </TransitionContext.Provider>
  );
}
