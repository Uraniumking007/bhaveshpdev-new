"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";

export const TooltipButton = ({
  items,
}: {
  items: {
    id: number;
    title: string;
    description: string;
    icon: string;
    link: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={item.title}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 16,
                },
              }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black/90 backdrop-blur z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-6 z-30 w-[60%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              <div className="absolute inset-x-10 z-30 w-[40%] -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
              <div className="font-bold text-white relative z-30 text-base">
                {item.title}
              </div>
              <div className="text-white text-xs">{item.description}</div>
            </motion.div>
          )}
          <Link href={item.link} target="_blank">
            <Image
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.icon}
              alt={item.title}
              className="object-cover !m-0 !p-0 object-top rounded-full h-9 w-9 group-hover:scale-105 group-hover:z-30   relative transition duration-500"
            />
          </Link>
        </div>
      ))}
    </>
  );
};
