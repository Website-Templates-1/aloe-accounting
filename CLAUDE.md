@AGENTS.md

# Working conventions (ALOE site)

## Verification — do NOT auto-verify with the browser
Do not open the in-app browser to screenshot or visually verify changes by
default — it consumes context. Verify functionally instead:
- `npm run lint` and `npm run build` (must pass; all routes stay SSG)
- targeted `curl` + `grep` against a local `npm run start` for metadata,
  JSON-LD, sitemap/robots, redirects, and rendered content

Leave visual/UX confirmation to the user. Only use the browser for a screenshot
when the user explicitly asks for one.

## Project rules (already established)
- **Single source of truth:** `src/lib/site.config.ts` drives metadata, nav,
  footer, sitemap, JSON-LD, and redirects. Never hand-maintain a parallel list.
- **SEO honesty:** never emit `Review`, `AggregateRating`, `FAQPage`, or `Offer`
  JSON-LD, and never invent metrics, prices, ratings, or profiles.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind v4, statically
  rendered. No `next-seo`/`react-helmet`/schema packages; avoid new deps.
