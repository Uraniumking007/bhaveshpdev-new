# Astro Portfolio + Blog + Admin CMS (Better Auth + GitHub PR Publishing)

## Context

### Original Request
Set up an Astro-based software developer portfolio (data stored locally in repo), with a blog, authentication using Better Auth (GitHub), a Hashnode-like WYSIWYG editor, and standard portfolio sections.

### Key Decisions (confirmed)
- Deploy: **Vercel**
- Rendering: **Static public site + SSR for `/admin` + SSR for blog routes**
- Styling: **Tailwind + shadcn/ui**
- Blog content storage: **relational DB (Postgres on Neon)**
- DB query layer: **Kysely**
- Search for blog content: **Postgres full-text search (FTS)**
- Media storage: **ImageKit** (store asset URLs/metadata in DB)
- Editor: **TipTap** WYSIWYG storing a **Markdown subset** (no arbitrary MDX/JSX in body)
- Auth: **Better Auth** with **GitHub OAuth**
  - Single admin allowlist: **`UraniumKing007`**
- Publishing model: from `/admin`, store posts in DB (with revision history)
- Blog v1 must-haves: drafts, scheduled publish (local timezone), cover image, reading time, syntax highlighting, canonical URL
  - scheduled posts hidden from site/RSS/search until publish time
- Scheduling timezone: **`Asia/Kolkata`**
- Out of scope v1: tags, series, comments, newsletter
- Analytics: **Umami (self-host)**
- Search: **site-wide**
- Tests: **basic E2E with Playwright**
- Contact: **contact form** sending via **Zoho SMTP**

### Repo Findings
- Repo currently has **no Astro project yet** (effectively empty).

### External References (authoritative)
- Better Auth + Astro integration: https://www.better-auth.com/docs/integrations/astro
- Better Auth GitHub OAuth: https://www.better-auth.com/docs/authentication/github
- Better Auth security/session docs (consult when implementing): https://www.better-auth.com/docs
- TipTap Markdown: https://tiptap.dev/docs/editor/markdown
- Umami tracker config: https://docs.umami.is/docs/tracker-configuration
- GitHub Apps overview: https://docs.github.com/en/apps/creating-github-apps
- GitHub Apps auth (JWT → installation token): https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app
- GitHub REST (Contents/PRs/Reviews): https://docs.github.com/en/rest

---

## Work Objectives

### Core Objective
Deliver a production-ready portfolio + blog on Vercel with an authenticated `/admin` CMS that edits Markdown posts and stores/publishes them from a relational database.

### Concrete Deliverables
- Astro app scaffolded with Vercel adapter and hybrid rendering
- Portfolio sections/pages:
  - Home, About, Projects, Experience, Skills/Stack, Speaking/Writing, Testimonials, Resume/CV, Contact
- Blog:
  - index + post pages rendered from DB (SSR)
  - drafts + scheduled publishing + canonical URL + reading time + code syntax highlighting + cover images
  - RSS feed
- `/admin`:
  - Better Auth GitHub OAuth login
  - allowlist enforcement for `UraniumKing007`
  - TipTap editor with Markdown-subset serialization
  - ImageKit upload integration
  - “Save draft” and “Schedule/Publish” actions backed by DB
  - Revision history (view + restore)
- Site-wide search
- Umami analytics integration
- Contact form endpoint sending via Zoho SMTP
- Playwright E2E smoke tests

### Definition of Done
- Public site pages render as static where intended; `/admin` is SSR-only and requires auth.
- Blog publishing works end-to-end: create draft → schedule/publish → stored in DB with revision history.
- Scheduled post gating works in production (hidden from index/RSS/search and direct URL until publish time).
- `pnpm test:e2e` (or equivalent) passes locally and in CI.
- Deployment on Vercel succeeds with required env vars documented.

---

## Resolved Decisions (previously open)
- Scheduled post enforcement: **SSR blog routes** (so scheduled gating works at request time).
- Timezone identifier: **Asia/Kolkata**.

---

## Guardrails (Must NOT Do)
- Do **not** re-introduce repo-based publishing (no GitHub App PR flow).
- Do **not** implement tags/series/comments/newsletter.
- Do **not** allow arbitrary MDX/JSX in post bodies (Markdown subset only).
- Do **not** add background job infrastructure in v1 (prefer query-based scheduled gating).
- Do **not** bypass Better Auth origin protections (no `disableOriginCheck`).
- Do **not** accept any GitHub user besides the allowlisted username.

---

## Verification Strategy

### Automated
- **Playwright E2E smoke** covering:
  - Home loads + key nav links
  - Blog index loads + post detail loads
  - `/admin` redirects when unauthenticated
  - Authenticated `/admin` loads editor
  - Basic publish action triggers PR creation (can be mocked/stubbed in E2E if needed)

### Manual (always)
- Verify scheduled post visibility rules (hidden pre-publish; visible at/after publish time)
- Verify RSS excludes drafts/scheduled
- Verify search excludes drafts/scheduled
- Verify image rendering + OpenGraph preview
- Verify contact form delivers to intended inbox via Zoho SMTP

---

## Task Flow (high level)
1) Scaffold Astro + base UI → 2) Blog DB schema + SSR blog pages → 3) Admin SSR + auth → 4) TipTap editor + Markdown storage → 5) ImageKit + DB publishing + revisions → 6) SEO/RSS/search/analytics → 7) Contact form → 8) Playwright E2E + CI → 9) Vercel deployment hardening

---

## TODOs

> NOTE: This repo is currently empty, so “Pattern References” are mostly external docs and planned file paths.

### 0. Scaffold Astro project (Vercel + hybrid rendering) ✅ (partial)
- Tailwind configured ✅
- React integration configured ✅
- Tailwind dependencies installed (autoprefixer, postcss, tailwind, clsx, tailwind-merge, class-variance-authority) ✅
- Build succeeds ✅
- Basic /src/ structure with index.astro
- Astro 5.x + Vercel adapter configured ✅

**Remaining:**
- Fix LSP errors in tailwind.config.mjs and Button.tsx (non-blocking)
- Add shadcn UI components (e.g., Button - done, but need more)
- Configure /admin and /blog routes as SSR (directories created, prerender=false added)
- Complete Tailwind styles integration (verify styles compile on pages) (partial - Tailwind + React configured, need SSR routes)

**What to do**
- Initialize Astro project (TypeScript enabled).
- Add Vercel adapter.
- Configure **hybrid rendering** so public pages are pre-rendered and:
  - `/admin/**` is SSR-only
  - `/blog/**` routes are SSR (for scheduled gating)

**Acceptance Criteria**
- `pnpm dev` starts and serves the site.
- Static pages are pre-rendered; `/admin` is SSR (not prerendered).
- Blog routes are SSR and scheduled gating can be enforced at request time.

**References**
- Astro config / output modes: https://docs.astro.build/en/reference/configuration-reference/

### 1. Tailwind + shadcn/ui integration (Astro + React islands) ✅ ✅

**What to do**
- Add Tailwind.
- Add React integration for interactive islands.
- Set up shadcn/ui within the React component layer.

**Notes / Pitfalls**
- In Astro, React components render static HTML by default; add `client:*` directives only where interactivity is required.
- Props passed into hydrated islands must be serializable (no functions/class instances).
- Prefer `.astro` for static sections and small hydrated React “islands” for interactive UI.

**Acceptance Criteria**
- A shadcn/ui component renders on a page (hydrated island where needed).
- Tailwind styles compile and apply.

**References**
- Tailwind + Astro: https://docs.astro.build/en/guides/styling/#tailwind
- shadcn/ui: https://ui.shadcn.com/

### 2. Base layout, navigation, theming (Ready to proceed - build issue resolved) ⚠️ (incomplete - subagent claimed completion but no Header/Footer components created, BaseLayout minimal)

**What to do**
- Create site layout, header nav, footer.
- Add responsive design baseline.

**Acceptance Criteria**
- All target sections exist as routes and link from nav.
- Lighthouse basic pass (manual).

### 3. Portfolio content model (local data)

**What to do**
- Decide local data format for projects/experience/testimonials (e.g., JSON/YAML or Astro content collection).
- Implement components for listing + detail views where appropriate.

**Acceptance Criteria**
- Projects page renders from local data.
- Experience renders from local data.

### 4. Blog database schema + migrations (Neon Postgres)

**What to do**
- Define tables (minimum):
  - `blog_posts`:
    - `id` (pk)
    - `slug` (unique)
    - `title`, `description`, `canonical_url`
    - `cover_image_url` (ImageKit URL)
    - `draft` (boolean)
    - `scheduled_at` (timestamptz, nullable)
    - `published_at` (timestamptz, nullable)
    - `created_at`, `updated_at`
  - `blog_post_revisions`:
    - `id` (pk)
    - `post_id` (fk)
    - `markdown` (text)
    - `tiptap_json` (jsonb, optional but recommended for fidelity)
    - `created_at`
    - `created_by` (e.g., github_id)
    - `summary` (nullable)
  - Search fields:
    - Either a generated `tsvector` column or a query-time `to_tsvector(...)` strategy (with a GIN index if stored)
- Store times in UTC (timestamptz) and convert from **Asia/Kolkata** input on write.

**Acceptance Criteria**
- Migrations apply locally and against Neon.
- Slug uniqueness enforced.
- Seeded post renders on blog route.

**References**
- Neon docs: https://neon.tech/docs
- Postgres FTS: https://www.postgresql.org/docs/current/textsearch.html

### 5. Blog pages (index + detail) with visibility rules

**What to do**
- Implement blog index and post page.
- Enforce:
  - drafts hidden from public
  - scheduled posts hidden until local-time publish moment
  - published posts visible

**Acceptance Criteria**
- Drafts do not appear on blog index nor can be accessed by direct URL.
- Scheduled posts do not appear until time threshold, then appear.

**Note**
- Implement blog routes as SSR so “scheduled” can be enforced (including direct URL).

### 6. RSS feed from DB (exclude drafts/scheduled)

**What to do**
- Generate RSS feed with only currently-public posts.

**Acceptance Criteria**
- RSS endpoint exists and validates.
- Draft/scheduled posts do not appear.

**References**
- Astro RSS: https://docs.astro.build/en/guides/rss/

### 7. Syntax highlighting for code blocks

**What to do**
- Configure Markdown rendering + syntax highlighting for blog posts.

**Acceptance Criteria**
- Code blocks in `.md` posts render with highlighting.

### 8. SEO + OpenGraph

**What to do**
- Set global SEO defaults.
- Add per-post OpenGraph using cover image, description, canonical URL.

**Acceptance Criteria**
- Pages include title/meta description/canonical.
- OG tags present for posts.

### 9. `/admin` SSR area scaffold

**What to do**
- Create `/admin` routes (dashboard, editor).
- Ensure SSR-only behavior.

**Acceptance Criteria**
- `/admin` routes are not pre-rendered.

### 10. Better Auth GitHub OAuth integration for `/admin`

**What to do**
- Add Better Auth.
- Create APIRoute handler for `/api/auth/[...all]`.
- Add middleware to populate session in `Astro.locals`.
- Protect `/admin` routes.
- Enforce allowlist: only GitHub username `UraniumKing007` can access.

**Security Notes**
- Configure `trustedOrigins` (prod + localhost) and do not disable origin checking.
- Use a patched Better Auth version (open-redirect advisory fixed in `better-auth >= 1.1.21`).

**Acceptance Criteria**
- Unauthenticated user hitting `/admin` is redirected to login.
- Authenticated but non-allowlisted user is denied.
- Allowlisted user can access `/admin`.

**References**
- Better Auth Astro integration: https://www.better-auth.com/docs/integrations/astro
- Better Auth GitHub OAuth: https://www.better-auth.com/docs/authentication/github

### 11. TipTap editor (Markdown subset) in `/admin`

**What to do**
- Build a TipTap editor component using a restricted extension set.
- Enable Markdown parsing/serialization using `@tiptap/markdown`.
- Provide UI similar to Hashnode basics: headings, bold/italic, lists, blockquote, code block (highlighted), link, image.

**Acceptance Criteria**
- Editor can load existing Markdown and round-trip without breaking structure (within supported subset).
- Editor outputs Markdown used as the post body.

**References**
- TipTap Markdown: https://tiptap.dev/docs/editor/markdown

### 12. Admin post model + CRUD UI (draft/schedule)

**What to do**
- Admin form for post metadata (title, slug, description, cover image path, canonical URL, draft toggle, scheduledAt).
- Validation (slug uniqueness, required fields).
- Determine status: draft vs scheduled vs published.

**Acceptance Criteria**
- Admin can create/edit a post and persist to DB.
- A revision row is recorded on each save/publish.
- Scheduled posts are enforced in public views.

### 13. Image workflow (ImageKit)

**What to do**
- In `/admin`, allow selecting/uploading an image to ImageKit.
- Store returned asset URL (and minimal metadata) on the post.

**Acceptance Criteria**
- Cover image is accessible at a public URL once merged.

### 14. Database access layer (Kysely) + Neon connection strategy

**What to do**
- Configure Kysely with Neon in a serverless-safe way.
- Ensure query client is reused appropriately (avoid per-request connection storms).
- Add statement timeout / query timeouts.

**Acceptance Criteria**
- Blog SSR routes can query Neon in dev and production.

**References**
- Kysely docs: https://kysely.dev/

### 15. Revision history + publish transitions

**What to do**
- Define publish behavior:
  - `draft=false`
  - if scheduled: set `scheduled_at`
  - if immediate: set `published_at=now()`
  - always create a revision row
- Add admin UI to browse revisions and restore a prior revision.

**Acceptance Criteria**
- Restoring a revision changes the rendered public post.

### 16. Site-wide search

**What to do**
- Implement site-wide search indexing that:
  - includes pages + blog + projects
  - excludes drafts and scheduled posts

**What to do**
- Implement DB-backed search for blog posts using Postgres FTS.

**Decision (confirmed)**
- Use **Hybrid search**:
  - Blog: DB-backed Postgres FTS
  - Portfolio content (projects/experience/etc): client-side search over local data

**Acceptance Criteria**
- Searching finds blog posts by title/body.
- Draft/scheduled posts are excluded from search results until visible.

**Acceptance Criteria**
- Search finds a blog post by title.
- Draft/scheduled posts are not searchable until published.

### 17. Umami analytics (self-host)

**What to do**
- Add Umami script with env-based enablement.
- Ensure it works with Astro navigations.

**Acceptance Criteria**
- Page views appear in Umami in production.

**References**
- Umami tracker config: https://docs.umami.is/docs/tracker-configuration

### 18. Contact form (Zoho SMTP)

**What to do**
- Create a contact form UI.
- Create an SSR endpoint to send mail via Zoho SMTP.
- Add basic abuse prevention (honeypot + rate limit) (recommended).

**Acceptance Criteria**
- Submitting form sends email to configured inbox.
- Failures are handled gracefully (user-facing message).

### 19. Playwright E2E tests

**What to do**
- Add Playwright.
- Write smoke tests.
- Add CI workflow (GitHub Actions) to run E2E.

**Acceptance Criteria**
- `pnpm test:e2e` passes locally.
- CI passes on PR.

### 20. Vercel deployment + environment variables

**What to do**
- Document required env vars:
  - Better Auth: BETTER_AUTH_SECRET, BETTER_AUTH_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
  - Neon: DATABASE_URL (plus any pooled/serverless URL as needed)
  - ImageKit: IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT
  - Umami: PUBLIC_UMAMI_HOST_URL, PUBLIC_UMAMI_WEBSITE_ID, PUBLIC_UMAMI_ENABLED
  - SMTP: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO
- Ensure `trustedOrigins` includes Vercel preview/prod URLs.

**Acceptance Criteria**
- Deployment succeeds on Vercel.
- `/admin` works in production.

---

## Commit Strategy (for executor)
- Prefer atomic commits by milestone:
  1) scaffold + UI framework
  2) portfolio pages + data
  3) blog collections/pages + RSS + SEO
  4) admin + auth
  5) editor
  6) GitHub PR publishing
  7) search + analytics
  8) contact + smtp
  9) E2E + CI

---

## Open Items / Defaults Used
- Search tool defaulted to Pagefind unless you prefer another.
- Abuse protection for contact form recommended (honeypot + rate limit) unless you want none.
