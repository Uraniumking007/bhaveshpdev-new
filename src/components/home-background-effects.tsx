"use client";

import { lazy, Suspense } from "react";

const ShootingStars = lazy(() =>
  import("@/components/ui/shooting-stars").then((m) => ({
    default: m.ShootingStars,
  }))
);

const StarsBackground = lazy(() =>
  import("@/components/ui/stars-background").then((m) => ({
    default: m.StarsBackground,
  }))
);

export function HomeBackgroundEffects() {
  return (
    <Suspense fallback={null}>
      <ShootingStars />
      <StarsBackground />
    </Suspense>
  );
}
