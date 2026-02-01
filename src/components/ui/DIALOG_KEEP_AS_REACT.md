# Dialog Component - Keep as React (Category C)

## Decision

**Status**: Keep `src/components/ui/dialog.tsx` as React component

**Category**: C (Complex Component)

**Date**: 2025-01-31

## Rationale

### Why Keep as React?

1. **Radix UI Primitives**: The dialog component is built on `@radix-ui/react-dialog`, which provides:
   - Robust accessibility features (ARIA attributes, keyboard navigation)
   - Focus trap implementation
   - Portal rendering for proper z-index layering
   - Screen reader support
   - Comprehensive testing and browser compatibility

2. **Complexity**: Dialog components require sophisticated behavior:
   - Focus management (trap focus, restore focus on close)
   - Escape key handling
   - Click outside detection
   - Portal rendering to document.body
   - Scroll locking on body element
   - Animation synchronization
   - ARIA role and state management

3. **Well-Tested Foundation**: Radix UI primitives are:
   - Extensively tested across browsers and screen readers
   - WCAG 2.1 AA compliant
   - Maintained by a team of accessibility experts
   - Used in production by thousands of applications

4. **Currently Unused**: The dialog component is not currently used anywhere in the codebase, making it low priority for migration.

### Why Not Convert to Alpine.js?

1. **Accessibility Risk**: Implementing proper focus trap and keyboard navigation from scratch is error-prone
2. **Feature Parity**: Would need to recreate all Radix UI features
3. **Maintenance Burden**: Ongoing accessibility updates and bug fixes
4. **Time Investment**: High effort for a component that's not currently used

## Alternative: Astro Modal Components

For actual modal usage in the project, we've created **Astro + Alpine.js** modal components:
- `CertificateModal.astro` - For certification details
- `ProjectModal.astro` - For project details

These Astro modals include:
- ✅ Focus trap implementation
- ✅ Escape key to close
- ✅ Click outside to close
- ✅ Backdrop overlay
- ✅ Smooth animations
- ✅ ARIA accessibility
- ✅ Body scroll lock
- ✅ Smaller bundle size (no React overhead)

## Future Considerations

### When to Reconsider Migration

If `dialog.tsx` becomes actively used, evaluate:
1. **Usage frequency**: If used in >5 places, consider migrating
2. **Custom needs**: If heavy customization required, Alpine.js may be better
3. **Bundle size impact**: If React/Radix significantly impacts bundle
4. **Alternative libraries**: Consider `@astrojs/starlight` or other Astro-native dialog libraries

### Migration Path (if needed)

```bash
# 1. Install Alpine.js
npm install alpinejs

# 2. Replace dialog.tsx usage with Astro modals
# 3. Use Alpine.js focus trap plugin
npm install @alpinejs/focus

# 4. Update imports across codebase
```

## Related Components

- **Converted**: `CertificateModal.astro`, `ProjectModal.astro` ✅
- **Kept as React**: `dialog.tsx` (unused, complex primitives)
- **Similar Category C**: `select.tsx`, `popover.tsx`, `tabs.tsx`, `tooltip.tsx`

## Performance Impact

- **Current**: No impact (component unused)
- **If Used**: ~13KB gzipped (Radix UI primitives + React)
- **Alternative**: ~3KB gzipped (Alpine.js modal implementation)

## Conclusion

Keeping `dialog.tsx` as React is the correct decision because:
1. It's not currently used (low priority)
2. Radix UI provides superior accessibility
3. Migration effort is high
4. Astro alternatives exist for actual modal needs

The project now has both options available:
- **React Dialog**: For complex accessibility requirements (if needed)
- **Astro Modals**: For lightweight, fully-featured modals (current approach)
