"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  activeValue: string;
  onValueChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

function Tabs({
  defaultValue = "0",
  value: controlledValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const activeValue = controlledValue ?? uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange, orientation }}>
      <div
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        role="presentation"
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useTabsContext();

  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({
  value,
  className,
  disabled = false,
  ...props
}: TabsTriggerProps) {
  const { activeValue, onValueChange, orientation } = useTabsContext();
  const isActive = activeValue === value;
  const ref = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const tabsList = ref.current?.parentElement;
    if (!tabsList) return;

    const tabs = Array.from(tabsList.querySelectorAll('[role="tab"]'));
    const currentIndex = tabs.indexOf(ref.current!);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowLeft":
        if (orientation === "horizontal") {
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        }
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          e.preventDefault();
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          e.preventDefault();
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    const nextTab = tabs[nextIndex] as HTMLButtonElement;
    nextTab?.focus();
    nextTab?.click();
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      data-state={isActive ? "active" : "inactive"}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

function TabsContent({
  value,
  className,
  forceMount = false,
  children,
  ...props
}: TabsContentProps) {
  const { activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!forceMount && !isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      data-state={isActive ? "active" : "inactive"}
      tabIndex={isActive ? 0 : -1}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
