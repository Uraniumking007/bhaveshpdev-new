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
  const meteors = React.useMemo(() => {
    return Array.from({ length: number }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 2 + 2}s`,
    }));
  }, [number]);

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
