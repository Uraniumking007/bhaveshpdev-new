import { useMemo } from "react";

/**
 * Astro-compatible hook for accessing URL search parameters.
 * Replaces Next.js's useSearchParams for static builds.
 */
export function useSearchParams() {
  // Use useMemo to avoid recreating on every render
  return useMemo(() => {
    if (typeof window === "undefined") {
      // Server-side: return empty URLSearchParams
      return new URLSearchParams();
    }

    // Client-side: parse from current URL
    return new URLSearchParams(window.location.search);
  }, []);
}
