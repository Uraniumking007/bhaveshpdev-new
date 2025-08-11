"use client";

import { usePathname } from "next/navigation";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      style={{
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
