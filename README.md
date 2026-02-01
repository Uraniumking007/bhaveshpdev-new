# Bhavesh Patil – Personal Site

Personal portfolio and resume site built with **Astro**, with selective **React** islands for complex interactivity and **Alpine.js** for lightweight UI state.

## Architecture

- **Framework:** [Astro](https://astro.build) 5.x (static output)
- **UI:** Astro components (HTML/CSS) + React islands where needed + Alpine.js for forms/nav
- **Styling:** Tailwind CSS 4
- **Content:** Static data from `src/lib/data/` and `public/data/`

### Component Strategy

- **Astro (`.astro`):** Default. Static HTML, optional `<script>` or Alpine.js for interactivity. No client directives on Astro components.
- **React (`.tsx`):** Used only for complex features (e.g. HeroHighlight, PDFViewer, CertificationsPageContent, ProjectFilters, ProjectsList, TextGenerateEffect, AnimatedTooltip). Use `client:load` or `client:visible` when embedding in `.astro` pages.
- **Alpine.js:** Used in ContactForm, NavBar, modals (CertificateModal, ProjectModal) for state and events.

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or bun; project has both `package-lock.json` and `bun.lock`)

### Install

```bash
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun run dev
```

Open **http://localhost:4321** (or the port shown in the terminal).

### Build

```bash
npm run build
# or
bun run build
```

Output: `dist/` (static site).

### Preview production build

```bash
npm run start
# or
bun run start
```

## Project Structure

```
src/
├── pages/           # Astro pages (routes)
├── layouts/         # BaseLayout, HomeLayout, SiteLayout
├── components/      # Astro + React components
│   ├── ui/          # UI primitives (Button, Card, Input, etc.)
│   ├── sections/    # Page sections (Skills, Projects, Timeline, Contact)
│   └── Buttons/     # Specialized buttons
├── lib/             # Data loaders and utilities
├── types/           # TypeScript types
└── app/             # Legacy Next.js app (optional cleanup)
public/
├── data/            # Static JSON data
└── icons/           # SVG assets
```

## Scripts

| Script   | Description        |
|----------|--------------------|
| `npm run dev`   | Start dev server   |
| `npm run build` | Production build   |
| `npm run start` | Preview `dist/`    |
| `npm run lint`   | `astro check`      |

## Documentation

- **Component usage:** [COMPONENT_PATTERNS.md](./COMPONENT_PATTERNS.md)
- **Migration notes:** [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Quick reference:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

## Deploy

Static site; deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages, etc.).  
Contact form submits to `/api/contact`; for static hosts you need a serverless function or external form service (e.g. Formspree) for the POST handler.

## License

Private / personal use.
