# Astro Modal Components - Usage Guide

## Overview

This guide explains how to use the new Astro-based modal components that replace the React modals with improved accessibility and smaller bundle size.

## Components

### CertificateModal.astro

An accessible modal component for displaying certification details.

**Features:**
- ✅ Focus trap (keeps tab navigation within modal)
- ✅ Escape key to close
- ✅ Click outside/backdrop to close
- ✅ Smooth animations
- ✅ ARIA accessibility (role="dialog", aria-modal, aria-labelledby)
- ✅ Body scroll lock when open
- ✅ Keyboard navigation support
- ✅ Returns focus to trigger element on close

**Usage:**

```astro
---
import CertificateModal from '@/components/ui/CertificateModal.astro';

const certification = {
  title: "AWS Certified Solutions Architect",
  issuer: "Amazon Web Services",
  date: "2024-01-15",
  imageUrl: "/images/aws-cert.png",
  description: "Professional certification for designing distributed systems...",
  pdfUrl: "/certificates/aws-cert.pdf"
};
---

<!-- Trigger button -->
<button
  onclick="document.getElementById('cert-modal').open()"
>
  View Certificate
</button>

<!-- Modal component -->
<CertificateModal certification={certification} id="cert-modal" />
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `certification.title` | `string` | Yes | Certificate title |
| `certification.issuer` | `string` | Yes | Issuing organization |
| `certification.date` | `string` | Yes | Issue date (ISO format) |
| `certification.imageUrl` | `string` | No | Certificate image URL |
| `certification.description` | `string` | No | Certificate description |
| `certification.pdfUrl` | `string` | No | PDF certificate URL |

### ProjectModal.astro

An accessible modal component for displaying project details with image carousel.

**Features:**
- All CertificateModal features, plus:
- ✅ Image carousel with navigation arrows
- ✅ Dot indicators for images
- ✅ Project categories and tech stack display
- ✅ GitHub and live demo links

**Usage:**

```astro
---
import ProjectModal from '@/components/ui/ProjectModal.astro';

const project = {
  name: "Portfolio Website",
  description: "A modern portfolio built with Astro and React...",
  image: "/images/portfolio.png",
  images: [
    { url: "/images/portfolio-1.png", alt: "Homepage" },
    { url: "/images/portfolio-2.png", alt: "Projects page" }
  ],
  link: "https://example.com",
  github: "https://github.com/user/portfolio",
  projectInitiated: "2024-01-01",
  projectCompleted: "2024-02-15",
  isCompleted: true,
  isFeatured: true,
  projectCategories: [
    { category: { name: "Web Development" } }
  ],
  technologies: [
    { technology: { name: "Astro" } },
    { technology: { name: "React" } },
    { technology: { name: "TypeScript" } }
  ]
};
---

<!-- Trigger button -->
<button
  onclick="document.getElementById('project-modal').open()"
>
  View Project
</button>

<!-- Modal component -->
<ProjectModal project={project} id="project-modal" />
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `project.name` | `string` | Yes | Project name |
| `project.description` | `string` | Yes | Project description |
| `project.image` | `string` | No | Main project image URL |
| `project.images` | `Array` | No | Multiple images for carousel |
| `project.link` | `string` | No | Live demo URL |
| `project.github` | `string` | No | GitHub repository URL |
| `project.projectInitiated` | `string` | Yes | Start date (ISO format) |
| `project.projectCompleted` | `string` | No | Completion date |
| `project.isCompleted` | `boolean` | Yes | Project completion status |
| `project.isFeatured` | `boolean` | Yes | Featured project flag |
| `project.projectCategories` | `Array` | No | Project categories |
| `project.technologies` | `Array` | No | Tech stack list |

## Alpine.js Integration

These modals use Alpine.js for interactivity. Alpine.js is already included in the `BaseLayout.astro`:

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

**If you're not using BaseLayout.astro**, add this script before the closing `</body>` tag in your layout.

## Opening the Modal Programmatically

Each modal has an `open()` method that can be called from JavaScript:

```javascript
// Get the modal element
const modal = document.getElementById('your-modal-id');

// Open the modal
modal.open();

// Close the modal
modal.close();
```

## Styling Customization

The modals use Tailwind CSS classes for styling. You can customize:

```astro
<!-- Override styles using the class attribute -->
<div
  class="relative w-full max-w-2xl bg-neutral-900 rounded-2xl border border-white/10 p-6 shadow-2xl"
  style="max-width: 800px; /* custom max-width */"
>
```

## Accessibility Features

### Keyboard Navigation

- **Escape**: Closes the modal
- **Tab**: Moves focus to next focusable element (trapped within modal)
- **Shift+Tab**: Moves focus to previous focusable element
- **Enter/Space**: Activates buttons and links

### Screen Reader Support

- Role: `dialog`
- ARIA attributes: `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
- Focus management: Automatically traps and restores focus
- Labels: All buttons have proper `aria-label` attributes

### Focus Management

The modal automatically:
1. Stores the element that had focus before opening
2. Moves focus to the close button when opened
3. Traps focus within the modal while open
4. Returns focus to the original element when closed

## Migration from React Modals

### Before (React)

```tsx
import { CertificateModal } from '@/components/ui/certificate-modal';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <CertificateModal
        certification={certification}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
```

### After (Astro)

```astro
---
import CertificateModal from '@/components/ui/CertificateModal.astro';
---

<button id="open-cert">Open</button>
<CertificateModal certification={certification} id="cert-modal" />

<script>
  document.getElementById('open-cert').addEventListener('click', () => {
    document.getElementById('cert-modal').open();
  });
</script>
```

## Troubleshooting

### Modal not opening

1. Check if Alpine.js is loaded (open browser console and type `Alpine`)
2. Ensure the modal ID is unique
3. Check for JavaScript errors in the console

### Focus not trapping

1. Ensure all focusable elements have proper `tabindex`
2. Check that the modal has `role="dialog"` and `aria-modal="true"`
3. Verify no other elements have higher z-index

### Animations not working

1. Check that Tailwind CSS is loaded
2. Ensure no conflicting CSS rules
3. Verify browser supports CSS transitions

## Performance

- **Bundle size**: ~3KB (Alpine.js) vs ~50KB (React + Framer Motion)
- **Load time**: Faster initial page load (no React hydration)
- **Runtime**: Lower memory footprint (no virtual DOM)

## Related Files

- `src/components/ui/CertificateModal.astro` - Certificate modal implementation
- `src/components/ui/ProjectModal.astro` - Project modal implementation
- `src/layouts/BaseLayout.astro` - Base layout with Alpine.js
- `src/components/ui/DIALOG_KEEP_AS_REACT.md` - Why dialog.tsx remains as React

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify Alpine.js is loaded
3. Review the Alpine.js documentation: https://alpinejs.dev/
4. Check WAI-ARIA Authoring Practices for modals: https://www.w3.org/WAI/ARIA/apg/
