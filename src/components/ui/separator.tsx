"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    const role = decorative ? "none" : "separator";
    const ariaOrientation = orientation === "vertical" ? "vertical" : undefined;

    return (
      <div
        ref={ref}
        role={role}
        aria-orientation={ariaOrientation}
        data-slot="separator"
        className={cn(
          "bg-border shrink-0",
          {
            "h-px w-full": orientation === "horizontal",
            "h-full w-px": orientation === "vertical",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = "Separator"

export { Separator }
