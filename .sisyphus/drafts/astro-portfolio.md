# Draft: Astro Developer Portfolio + Blog (Better Auth + Hashnode-like editor)

## Requirements (stated)
- Build a software developer portfolio using Astro.
- Most data stored locally (in-repo).
- Add a blog.
- Add authentication using Better Auth (Git plugin).
- Add a WYSIWYG editor that feels like Hashnode.
- Include other portfolio essentials.

## Requirements (confirmed from Q&A)
- Deployment: Vercel.
- Rendering: Static public site + SSR for admin area.
- Auth audience: single admin (you).
- Auth provider: GitHub OAuth.
- Blog authoring format: MDX.
- Portfolio sections: Projects, About, Experience, Skills/Stack, Contact, Resume/CV, Speaking/Writing, Testimonials.

## Additional Decisions (confirmed)
- Better Auth “git plugin” usage: GitHub OAuth for /admin login only (no commit/push/PR from admin).
- Editor: TipTap-based Hashnode-like WYSIWYG.
- Content workflow: Admin UI only.
- Media storage: in-repo under `public/`.
- Styling: Tailwind + shadcn/ui.
- Tests: basic E2E with Playwright.
- Nice-to-haves: SEO + OpenGraph, RSS feed, Analytics, Search.

## Additional Decisions (confirmed, round 2)
- Admin auth hardening: allowlist your GitHub username (single identity).
- Blog v1 features: drafts, scheduled publishing, cover image, reading time, syntax highlighting, canonical URL.
- Search: site-wide (blog + projects + pages).
- Analytics: Umami.
- Contact: contact form (requires backend + email provider).

## Additional Decisions (confirmed, round 3)
- Allowlisted GitHub username: `UraniumKing007`.
- TipTap storage model: Markdown subset (MDX-compatible subset; no arbitrary JSX in body).
- Scheduling timezone: your local timezone.
- Explicitly OUT for v1: tags, series, comments, newsletter.
- Umami: self-host.
- Contact form provider: TBD (you said you’ll do it manually).

## Additional Decisions (confirmed, round 4)
- Publishing mechanism: Admin UI in production creates/updates content via **GitHub PRs** (Option 2).

## Additional Decisions (confirmed, round 5)
- GitHub integration auth: **GitHub App** (installed on the repo; server generates installation tokens).
- PR behavior: open PR + request review (no auto-merge).
- Blog content location: `src/content/blog` (Astro Content Collections).
- Contact form delivery: SMTP.

## Additional Decisions (confirmed, round 6)
- GitHub App install scope: this repo only.
- CMS branch strategy: shared branch (not per-post).
- Blog file format: `.md` (Markdown) in `src/content/blog`.
- SMTP provider: custom SMTP with Zoho.

## Additional Decisions (confirmed, round 7)
- Dual GitHub auth is acceptable:
  - Better Auth (GitHub OAuth) for `/admin` login
  - GitHub App for branch/PR write operations
- Git branches:
  - Base branch for PRs: `astro-build`
  - Shared CMS branch name: `cms`
  - PR should request review from `UraniumKing007`
- Scheduled posts behavior: hidden from site/RSS/search until publish time (local timezone), then visible.

## Change Request (new)
- Replace GitHub App PR-based publishing with **relational database storage for blog posts**.
- Blog pages will use **SSR to fetch posts from DB** and render.

## Change Request (confirmed details)
- DB provider: Neon (direct)
- Query layer: Kysely
- Search: Postgres full-text search
- Images: ImageKit
- Revisions: keep edit history

## Implications to resolve
- Need DB choice (Postgres/MySQL/etc) + hosting (Vercel Postgres/Neon/Supabase/etc).
- Need schema + migrations strategy.
- Need image storage strategy (repo `public/` no longer feasible from production admin).
- Need to update plan: remove GitHub App tasks, replace with DB CRUD + SSR fetching + search strategy.

## Research Findings (Better Auth, initial)
- Docs: https://www.better-auth.com/docs/integrations/astro and https://www.better-auth.com/docs/authentication/github
- Typical env vars:
  - BETTER_AUTH_SECRET (>=32 chars)
  - BETTER_AUTH_URL (site base URL)
  - GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
- Astro integration pattern: mount `auth.handler(request)` under an `APIRoute` (e.g. `/api/auth/[...all]`) and use `middleware.ts` to populate `Astro.locals` via `auth.api.getSession({ headers })`.
- Security: configure `trustedOrigins` and avoid disabling origin checks; note upstream security advisory (open redirect) and pin to a patched version.

## Research Findings (Better Auth “git plugin”)
- No official Better Auth “git plugin” exists (official plugin list does not include anything for git/GitHub App operations).
- Better Auth’s GitHub integration is **OAuth login for users** (good for `/admin` auth), not GitHub App authentication for PR publishing.
- Recommendation: keep concerns separate:
  - Better Auth for `/admin` session/login
  - GitHub App + Octokit for repo writes + PR creation/review requests

## Research Findings (Umami self-host, Astro)
- Umami is privacy-focused and cookie-free by default; basic tracking typically doesn’t require cookie consent.
- Astro View Transitions may require re-running the tracker script (e.g., `data-astro-rerun`) or tracking on `astro:page-load`.
- Recommend env-based toggle (enabled only in production) and `PUBLIC_` env vars for host + website id.

## Assumptions (UNCONFIRMED)
- “Locally stored” means content lives in the Git repo (Markdown/MDX/JSON) and deploys as static pages.
- Auth is mainly for an **admin authoring area** (not public user accounts).

## Open Questions
- Hosting target (Vercel/Netlify/Cloudflare/self-host) and whether SSR is allowed.
- Better Auth provider(s) (GitHub-only? email? passkeys?) and expected login audience (just you vs multiple authors).
- Blog content format (MD/MDX) and editor output format (Markdown vs HTML/JSON).
- Media handling (image uploads, storage location, optimization).
- Styling/UI preferences (tailwind? shadcn/ui? custom).

## Open Questions (updated)
- Better Auth “git plugin”: what do you want it to do?
  - A) use GitHub OAuth to authenticate you
  - B) additionally commit/push blog changes back to GitHub from the admin UI
  - C) something else (please describe)
- WYSIWYG editor choice: do you want a ready-made editor (TipTap/ProseMirror/Lexical) configured Hashnode-style, or a lighter MDX editor with live preview?
- Content workflow: are posts edited only via admin UI, or also directly in Git?
- Media: where should images live (in repo under `public/` vs external storage e.g. S3/Cloudinary)?
- Comments/newsletter: do you want comments (Giscus/Utterances) or newsletter signup?
- Analytics: Plausible/Umami/GA, or none?

## Open Questions (remaining)
- Admin allowlist: what is the exact GitHub username to allow?
- Post model: do you need tags, series, drafts/scheduled posts, canonical URL, reading time, cover image, and code blocks with syntax highlighting?
- Publishing flow: “Save draft” vs “Publish” (immediate) vs “Schedule”.
- Search scope: blog only or blog + projects + pages?

## Open Questions (remaining, updated)
- Editor ↔ MDX: TipTap is rich-text-first; MDX round-tripping can be lossy.
  - Are you okay with storing **Markdown (MDX-compatible subset)** generated by TipTap, and treating “MDX” as mostly Markdown + frontmatter (no arbitrary JSX in body)?
  - Or do you require arbitrary MDX/JSX components inside posts (harder with WYSIWYG)?
- Scheduled posts: what timezone should scheduling use (local vs UTC), and should scheduled posts be hidden from RSS/search until published?
- Tags/series: earlier you didn’t pick these as must-have; confirm they’re OUT for v1.
- Analytics: Umami cloud vs self-host (and is cookie consent needed?).
- Contact form: preferred provider (Resend/Postmark/SendGrid) and anti-spam approach (hCaptcha/Turnstile/honeypot + rate limit).

## Key Risk / Ambiguity (needs resolution)
- With deployment on Vercel, the production app generally cannot persistently write new MDX files back into the repo.
  - If admin UI is the only authoring method and posts are stored locally in the repo, we need a publishing mechanism (e.g., author locally + git commit; or enable git-writing; or store posts in external DB/storage and generate at build time).
  - Decision: Use GitHub PR flow.

## Scope Boundaries (placeholder)
- INCLUDE: Portfolio pages + blog + admin authoring + auth + editor.
- EXCLUDE: TBD (e.g., comments, paid features, multi-tenant).
