import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const MagicBorderButtonLink = ({
  children,
  path,
  toggle,
}: {
  children: React.ReactNode;
  path: string;
  toggle: (i?: number | undefined) => void;
}) => {

  return (
    <Link
      href={path}
      className="relative w-full inline-flex md:h-12 h-10 drop-shadow-2xl overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </Link>
  );
};

export default MagicBorderButtonLink;
