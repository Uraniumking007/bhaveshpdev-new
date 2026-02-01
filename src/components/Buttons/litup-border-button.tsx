"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface LitupBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const LitupBorderButton = React.forwardRef<HTMLButtonElement, LitupBorderButtonProps>(
  ({ className = "", disabled = false, type = "button", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "p-[3px] relative block w-full",
          disabled && "opacity-80 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"
          aria-hidden="true"
        />

        {/* Inner content */}
        <div
          className={cn(
            "relative flex items-center justify-center gap-2 px-8 py-2.5",
            "bg-neutral-900 rounded-[6px] transition duration-200",
            "text-white hover:bg-neutral-800 min-h-[44px]",
            "[&>*]:!text-white [&>*]:font-medium",
            !disabled && "hover:bg-neutral-800"
          )}
        >
          {children}
        </div>
      </button>
    );
  }
);

LitupBorderButton.displayName = "LitupBorderButton";

export default LitupBorderButton;
