"use client";
import { cn } from "@/lib/utils/cn";
import React from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const pseudoRandom = React.useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  const meteors = React.useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: number }).map((_, i) => ({
      left: `${pseudoRandom(i + 1) * 100}%`,
      top: `${pseudoRandom(i + number + 1) * 100}%`,
      animationDelay: `${(pseudoRandom(i + number * 2 + 1) * 2).toFixed(3)}s`,
      animationDuration: `${(pseudoRandom(i + number * 3 + 1) * 2 + 2).toFixed(
        3
      )}s`,
    }));
  }, [number, pseudoRandom, isMounted]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {meteors.map((meteor, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor-effect absolute h-px w-px rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        />
      ))}
    </div>
  );
};
