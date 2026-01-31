// Navigation order for determining slide direction
// Left to right order in header navigation
export const NAVIGATION_ORDER = [
  '/',
  '/projects',
  '/about',
  '/blog',
  '/resume',
  '/contact',
] as const;

export type NavigationPath = typeof NAVIGATION_ORDER[number];

/**
 * Get the index of a path in the navigation order
 */
export function getNavigationIndex(path: string): number {
  // Handle blog posts (they start with /blog/)
  if (path.startsWith('/blog/')) {
    return NAVIGATION_ORDER.indexOf('/blog');
  }
  
  const index = NAVIGATION_ORDER.indexOf(path as NavigationPath);
  return index !== -1 ? index : 0; // Default to home if not found
}

/**
 * Determine if navigation is forward (right) or backward (left) based on button position
 * @param currentPath Current page path
 * @param targetPath Target page path
 * @returns 'forward' if target is to the right, 'backward' if to the left
 */
export function getNavigationDirection(
  currentPath: string,
  targetPath: string
): 'forward' | 'backward' {
  const currentIndex = getNavigationIndex(currentPath);
  const targetIndex = getNavigationIndex(targetPath);
  
  return targetIndex > currentIndex ? 'forward' : 'backward';
}
