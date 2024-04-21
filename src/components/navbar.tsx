"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { MenuToggle } from "./Buttons/menu-toggle-button";
import MagicBorderButton from "./Buttons/magic-border-button";

const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants = {
  open: {
    y: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const NavBar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      className="absolute top-8 right-8 z-50"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={720}
      ref={containerRef}
    >
      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation />
    </motion.nav>
  );
};

export const Navigation = () => (
  <motion.ul
    variants={menuVariants}
    className="flex gap-2 flex-col w-28 absolute -top-4 right-8"
  >
    <motion.li variants={menuItemVariants}>
      <MagicBorderButton path="/">Home</MagicBorderButton>
    </motion.li>
    <motion.li variants={menuItemVariants}>
      <MagicBorderButton path="projects">Projects</MagicBorderButton>
    </motion.li>
    <motion.li variants={menuItemVariants}>
      <MagicBorderButton path="skills">Skills</MagicBorderButton>
    </motion.li>
    <motion.li variants={menuItemVariants}>
      <MagicBorderButton path="resume">Resume</MagicBorderButton>
    </motion.li>
  </motion.ul>
);

export default NavBar;
