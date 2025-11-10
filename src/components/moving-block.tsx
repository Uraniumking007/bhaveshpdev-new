"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";

export function ButtonWithMovingBorder({
  borderRadius = "1.75rem",
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  children,
  ...otherProps
}: {
  borderRadius?: string;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center mx-6 my-2 px-0.5 py-0.5 font-semibold text-base md:text-lg bg-transparent overflow-hidden group transition-all duration-200 focus:outline-none",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-8 w-16 opacity-40 bg-[radial-gradient(var(--sky-400)_60%,transparent_100%)] blur-sm",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative z-10 px-6 py-2 rounded-full bg-slate-900/90 border border-slate-800/70 backdrop-blur-xl text-white font-bold shadow-lg group-hover:bg-slate-800/95 group-active:scale-95 transition-all duration-200 flex items-center justify-center",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export function ImageWithMovingBorder({
  borderRadius = "1.75rem",
  containerClassName,
  borderClassName,
  duration,
  className,
  imageSrc,
  imageAlt,
  ...otherProps
}: {
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  imageSrc: string;
  imageAlt: string;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "bg-transparent relative text-xl w-48 md:w-60 lg:w-full min-[1440px]:w-72 p-[1px] overflow-hidden ",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
