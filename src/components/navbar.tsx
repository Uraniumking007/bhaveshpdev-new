import * as React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { MenuToggle } from "./Buttons/menu-toggle-button";
import MagicBorderButtonLink from "./Buttons/MagicBorderButtonLink";

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
    y: -235,
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
      <Navigation toggleOpen={toggleOpen} />
    </motion.nav>
  );
};

export const Navigation = ({
  toggleOpen,
}: {
  toggleOpen: (i?: number | undefined) => void;
}) => (
  <>
    <motion.ul
      variants={menuVariants}
      className="flex lg:hidden gap-2 flex-col w-28 absolute -top-4 right-8"
    >
      <motion.li variants={menuItemVariants}>
        <MagicBorderButtonLink toggle={toggleOpen} path="/">
          Home
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li variants={menuItemVariants}>
        <MagicBorderButtonLink toggle={toggleOpen} path="/projects">
          Projects
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li variants={menuItemVariants}>
        <MagicBorderButtonLink toggle={toggleOpen} path="/certifications">
          Certifications
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li variants={menuItemVariants}>
        <MagicBorderButtonLink toggle={toggleOpen} path="/skills">
          Skills
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li variants={menuItemVariants}>
        <MagicBorderButtonLink
          toggle={toggleOpen}
          path="/resume"
        >
          Resume
        </MagicBorderButtonLink>
      </motion.li>
    </motion.ul>
    <motion.ul className="lg:flex hidden gap-4 w-fit absolute top-4 right-8">
      <motion.li className="w-28 h-12">
        <MagicBorderButtonLink toggle={toggleOpen} path="/">
          Home
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li className="w-28 h-12">
        <MagicBorderButtonLink toggle={toggleOpen} path="/projects">
          Projects
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li className="w-28 h-12">
        <MagicBorderButtonLink toggle={toggleOpen} path="/certifications">
          Certifications
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li className="w-28 h-12">
        <MagicBorderButtonLink toggle={toggleOpen} path="/skills">
          Skills
        </MagicBorderButtonLink>
      </motion.li>
      <motion.li className="w-28 h-12">
        <a
          href="/resume"
          className="relative w-full inline-flex md:h-12 h-10 drop-shadow-2xl overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Resume
          </span>
        </a>
      </motion.li>
    </motion.ul>
  </>
);

export default NavBar;
