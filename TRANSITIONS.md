# Astro View Transitions Reference

## Built-in Animation Types

### 1. `fade` (Default)
Crossfade animation - old content fades out, new content fades in.

**Usage:**
```astro
<html transition:animate="fade">
  <!-- Page content -->
</html>
```

### 2. `slide`
Old content slides out to the left, new content slides in from the right. On backwards navigation, animations reverse.

**Usage:**
```astro
<main transition:animate="slide">
  <!-- Content -->
</main>
```

### 3. `initial`
Opt out of Astro's animation and use browser's default styling.

**Usage:**
```astro
<div transition:animate="initial">
  <!-- Content -->
</div>
```

### 4. `none`
Disable animations for this element.

**Usage:**
```astro
<html transition:animate="none">
  <!-- Disables default fade for entire page -->
</html>
```

## Transition Directives

### `transition:name`
Give elements a shared name to match them across pages.

**Usage:**
```astro
<!-- Page 1 -->
<aside transition:name="hero">
  Hero content
</aside>

<!-- Page 2 -->
<section transition:name="hero">
  Different hero content (will animate between these)
</section>
```

### `transition:animate`
Override animation type for specific elements.

**Usage:**
```astro
<!-- Page-level default -->
<html transition:animate="none">
  <!-- Override on specific element -->
  <header transition:animate="slide">
    Header slides
  </header>
  
  <main transition:animate="fade">
    Main content fades
  </main>
</html>
```

### `transition:persist`
Keep elements/components across navigation (preserves state).

**Usage:**
```astro
<!-- Video continues playing across pages -->
<video controls muted autoplay transition:persist>
  <source src="video.mp4" type="video/mp4" />
</video>

<!-- React component with state preserved -->
<Counter client:load transition:persist initialCount={5} />
```

### `transition:persist-props`
Keep an island's props (not just state) across navigation.

**Usage:**
```astro
<MyComponent 
  client:load 
  transition:persist 
  transition:persist-props
  title="Static Title"
/>
```

## Custom Animations

### Customize Built-in Animations

**Import and customize:**
```astro
---
import { fade } from 'astro:transitions';
---

<header transition:animate={fade({ duration: '0.4s' })}>
  Custom fade duration
</header>
```

### Create Custom Animations

**Define custom animation:**
```astro
---
const customTransition = {
  forwards: {
    old: {
      name: 'slide-out',
      duration: '0.5s',
      easing: 'ease-in',
      direction: 'reverse',
    },
    new: {
      name: 'slide-in',
      duration: '0.5s',
      easing: 'ease-out',
    },
  },
  backwards: {
    old: {
      name: 'slide-in',
      duration: '0.5s',
      easing: 'ease-in',
      direction: 'reverse',
    },
    new: {
      name: 'slide-out',
      duration: '0.5s',
      easing: 'ease-out',
    },
  },
};
---

<style>
  @keyframes slide-out {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
  }
  
  @keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
</style>

<main transition:animate={customTransition}>
  <!-- Content -->
</main>
```

## Common Patterns

### Page-Level Animation
```astro
<html transition:animate="fade">
  <head>
    <ClientRouter />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Element-Specific Animations
```astro
<html transition:animate="none">
  <head>
    <ClientRouter />
  </head>
  <body>
    <header transition:animate="slide">
      Header slides
    </header>
    
    <main transition:animate="fade">
      Main content fades
    </main>
    
    <footer transition:animate="none">
      Footer no animation
    </footer>
  </body>
</html>
```

### Persisting Elements
```astro
<!-- Navigation persists across pages -->
<nav transition:persist="main-nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<!-- Video player persists -->
<video transition:persist controls>
  <source src="video.mp4" />
</video>
```

### Matching Elements Across Pages
```astro
<!-- Home page -->
<section transition:name="hero-section">
  <h1>Welcome</h1>
</section>

<!-- About page -->
<section transition:name="hero-section">
  <h1>About Us</h1>
</section>
<!-- These will animate between each other -->
```

## ClientRouter Options

### Fallback Behavior
```astro
---
import { ClientRouter } from 'astro:transitions';
---

<head>
  <!-- Default: animate (simulates transitions) -->
  <ClientRouter />
  
  <!-- Or: swap (immediate replacement) -->
  <ClientRouter fallback="swap" />
  
  <!-- Or: none (full page navigation) -->
  <ClientRouter fallback="none" />
</head>
```

## Current Setup

Your `BaseLayout.astro` currently uses:
- ✅ `ClientRouter` component (enables view transitions)
- ✅ Custom CSS fade animations (`fade-in` / `fade-out` keyframes)
- ✅ Default fade behavior

To apply different transitions, add `transition:animate` directives to elements:

```astro
<!-- Example: Make header slide, main fade -->
<header transition:animate="slide">
  <!-- Header content -->
</header>

<main transition:animate="fade">
  <!-- Main content -->
</main>
```
