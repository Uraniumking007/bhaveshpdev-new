"use client";

import dynamic from "next/dynamic";

const ShootingStars = dynamic(
  () =>
    import("@/components/ui/shooting-stars").then((m) => ({
      default: m.ShootingStars,
    })),
  { ssr: false }
);

const StarsBackground = dynamic(
  () =>
    import("@/components/ui/stars-background").then((m) => ({
      default: m.StarsBackground,
    })),
  { ssr: false }
);

export function HomeBackgroundEffects() {
  return (
    <>
      <ShootingStars />
      <StarsBackground />
    </>
  );
}
