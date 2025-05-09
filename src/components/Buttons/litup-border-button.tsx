"use client";
import { IconClipboard } from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import React from "react";
import TransitionLink from "../transition-link";

interface LitupBorderButtonProps {
  children: React.ReactNode;
  onClick: () => void;
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
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button className="p-[3px] relative">
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
}) => {
  return (
    <TransitionLink href={path}>
      <LitupBorderButton>{children}</LitupBorderButton>
    </TransitionLink>
  );
};

export { LitupBorderButton, LitupBorderButtonLink };
