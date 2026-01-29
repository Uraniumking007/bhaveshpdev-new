# AGENTS.md

## Project Overview
This is an Astro 5.16.15 portfolio site with React 19 integration, deployed to Vercel with server-side rendering. Uses shadcn/ui for UI components with Tailwind CSS 4.0.

## Package Manager
**Bun** - Use `bun install`, `bun run <script>`, `bun add <package>`

## Build Commands

```bash
bun install              # Install dependencies
bun run dev            # Start dev server at localhost:4321
bun run build          # Build for production (outputs to ./dist/)
bun run preview        # Preview production build locally
bun astro ...          # Run Astro CLI commands
```

**No test commands configured** - This project currently has no test framework. Run `astro check` for type checking.

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled (`tsconfig.json` extends `astro/tsconfigs/strict`)
- **Path aliases**:
  - `@/*` → `./src/*`
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
- **Never suppress type errors**: No `as any`, `@ts-ignore`, or `@ts-expect-error`

### Import Patterns
- **Absolute imports** preferred using `@/` alias
- **Component imports**: `import Button from '@/components/ui/Button'`
- **Utility imports**: `import { cn } from '@/lib/utils'`
- **Layout imports**: `import BaseLayout from '@/layouts/BaseLayout.astro'`
- **External libraries**: Standard named/default imports from node_modules

### File Naming Conventions
- **Pages**: `index.astro` in kebab-case directories (`blog/`, `admin/`)
- **Components**: PascalCase with extensions (`Button.tsx`, `BaseLayout.astro`)
- **Utilities**: kebab-case (`utils.ts`, `global.css`)
- **Directories**: kebab-case (`components/`, `layouts/`, `lib/`)

### Component Naming
- **React/Astro Components**: PascalCase (`Button`, `BaseLayout`)
- **Utility Functions**: camelCase (`cn`)
- **Interfaces/Types**: PascalCase (`ButtonProps`)

### Styling Patterns

**Tailwind CSS**:
- Use utility classes directly in components
- Merge conditional classes with `cn()` utility
- Follow Tailwind's utility-first approach

**shadcn/ui Components**:
- Use `class-variance-authority` for variant-based styling
- Component structure: `base` classes + `variants` object + `defaultVariants`
- Pattern: `const { className, variant, size, ...props }`
- Apply with: `cn(buttonVariants({ variant, size, className }))`

### Component Patterns

**Astro Components**:
- Pages in `src/pages/` follow file-based routing
- Layouts in `src/layouts/` wrap pages with shared structure
- Use `<slot />` for content injection in layouts
- Props passed via JSX attributes to layouts
- Server-side rendering: use `export const prerender = false` for dynamic routes

**React Components** (`src/components/ui/`):
- Extend native props: `interface Props extends React.ComponentProps<"button">`
- Forward refs: `React.forwardRef<HTMLButtonElement, Props>(...)`
- Use `class-variance-authority` for variant management
- Export component and variant object

**Prop Passing**:
- Astro: Destructure `Astro.props` in frontmatter
- React: Destructure with spread pattern: `({ className, ...props }, ref)`

### Error Handling
- **Current state**: No custom error handling configured
- Relies on Astro's default error pages (404, 500)
- No try-catch blocks, error boundaries, or logging
- **Recommendation**: Add custom error pages and error boundaries for production

### Project Structure
```
src/
├── pages/          # Route components (file-based routing)
├── layouts/        # Shared layout wrappers
├── components/     # Reusable components
│   └── ui/        # shadcn/ui components
├── lib/           # Utilities and helpers
└── styles/         # Global styles
```

### Configuration Files
- `astro.config.mjs` - Astro config (server output, Vercel adapter, React integration)
- `tailwind.config.mjs` - Tailwind configuration
- `tsconfig.json` - TypeScript strict mode with path aliases
- `components.json` - shadcn/ui configuration (style: new-york, baseColor: zinc)

### When Adding New Code
1. **Pages**: Add to `src/pages/` following file-based routing
2. **UI Components**: Follow Button.tsx pattern with class-variance-authority
3. **Layouts**: Create in `src/layouts/` with `<slot />` for content
4. **Utilities**: Add to `src/lib/` with camelCase function names
5. **Styles**: Use Tailwind utilities, add global styles to `src/styles/global.css`
