"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200; // Adjust scroll amount as needed
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full flex items-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-all md:hidden"
          aria-label="Scroll left"
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollContainerRef}
          className={cn(
            "flex items-center relative",
            "overflow-x-auto scrollbar-hide px-12 sm:px-0",
            "w-full max-w-full scroll-smooth touch-pan-x",
            "[perspective:1000px]",
            containerClassName
          )}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex gap-2 sm:gap-4 mx-auto">
            {propTabs.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => moveSelectedTabToTop(idx)}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={cn(
                  "relative rounded-full transition-all shrink-0",
                  "px-4 py-2 sm:px-5 sm:py-2.5",
                  "text-sm sm:text-base whitespace-nowrap",
                  "hover:bg-white/5 backdrop-blur-sm",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20",
                  "border border-white/10",
                  tabClassName
                )}
              >
                {active.value === tab.value && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      "absolute inset-0 bg-white/10 rounded-full backdrop-blur-md",
                      "border border-white/20",
                      activeTabClassName
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 1,
                    }}
                  />
                )}
                <span className="relative z-10 font-medium text-white/90">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-all md:hidden"
          aria-label="Scroll right"
        >
          <IconChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full mt-8">
        <FadeInDiv
          tabs={tabs}
          active={active}
          hovering={hovering}
          className={contentClassName}
        />
      </div>
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  return (
    <div className="relative w-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            filter: idx === 0 ? "blur(0px)" : `blur(${idx * 4}px)`,
            opacity: Math.max(1 - idx * 0.2, 0),
            scale: 1 - idx * 0.05,
            zIndex: tabs.length - idx,
            transform: `translateY(${hovering ? idx * -20 : 0}px)`,
            willChange: "transform, opacity",
            transformOrigin: "center top",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity:
              tab.value === active.value ? 1 : Math.max(1 - idx * 0.2, 0),
            y: tab.value === active.value ? 0 : 20,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
            opacity: { duration: 0.2 },
          }}
          className={cn("w-full", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
