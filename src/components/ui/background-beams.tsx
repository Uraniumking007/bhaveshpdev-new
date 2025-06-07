"use client";
import { cn } from "@/lib/utils/cn";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!beamsRef.current) return;

    const beams = beamsRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = beams.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      beams.style.setProperty("--x", `${x}px`);
      beams.style.setProperty("--y", `${y}px`);
    };

    beams.addEventListener("mousemove", handleMouseMove);

    return () => {
      beams.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-white/5 before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/5 after:to-white/10 after:opacity-0 after:transition-opacity after:duration-500 after:ease-in-out",
        "hover:before:opacity-100 hover:after:opacity-100",
        "before:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.1),transparent_50%)]",
        "after:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.1),transparent_50%)]",
        className
      )}
    />
  );
};
