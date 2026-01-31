"use client";
import { IconClipboard } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import React from "react";

interface LitupBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface LitupBorderButtonLinkProps {
  children: React.ReactNode;
  path: string;
  className?: string;
}

const LitupBorderButton = ({
  children,
  className,
  ...props
}: LitupBorderButtonProps) => {
  return (
    <button className="p-[3px] relative" {...props}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        {children}
      </div>
    </button>
  );
};

const LitupBorderButtonLink: React.FC<LitupBorderButtonLinkProps> = ({
  children,
  path,
  className,
  ...props
}: LitupBorderButtonLinkProps) => {
  return (
    <Link href={path} {...props}>
      <LitupBorderButton>{children}</LitupBorderButton>
    </Link>
  );
};

export { LitupBorderButton, LitupBorderButtonLink };
