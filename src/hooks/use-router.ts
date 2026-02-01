/**
 * Astro-compatible router utilities.
 * Replaces Next.js's useRouter for static builds.
 */

/**
 * Navigate to a different route.
 * In static builds, this uses window.location for navigation.
 */
export function navigate(href: string, options?: { replace?: boolean }) {
  if (typeof window === "undefined") {
    return;
  }

  if (options?.replace) {
    window.location.replace(href);
  } else {
    window.location.href = href;
  }
}

/**
 * Get the current pathname.
 */
export function getPathname(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.pathname;
}

/**
 * Router hook that mimics Next.js's useRouter API.
 * Note: Not all methods are supported in static builds.
 */
export function useRouter() {
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    prefetch: () => {
      // No-op in static builds
    },
    pathname: getPathname(),
    query: {},
    asPath: typeof window !== "undefined" ? window.location.pathname : "",
  };
}

/**
 * Pathname hook that mimics Next.js's usePathname.
 */
export function usePathname(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.pathname;
}
