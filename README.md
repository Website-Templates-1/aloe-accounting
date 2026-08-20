# ALOE Accounting and Tax

Production marketing website for a licensed Brampton CPA firm. Next.js (App
Router) + TypeScript + Tailwind v4, statically rendered, mobile-first, and
accessible. SEO is a content model + build pipeline, not a plugin.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fails on invalid post metadata / slug collisions)
npm run start    # serve the production build
npm run lint
```

No environment variables are required to build or run the public site — see
`.env.example` for optional email, reviews, and admin config.

## Deploy on Netlify

This is a Next.js 16 App Router app. Marketing pages are statically rendered,
but the contact form (Server Action) and `/admin` APIs need Netlify’s Next.js
runtime. Do **not** use static HTML export or a publish directory of `out`.

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an
   existing project** → GitHub → this repo.
2. Confirm **Build command** `npm run build` and **Publish directory** `.next`.
3. Deploy. The first URL is `https://<site-name>.netlify.app`.

### Environment variables

Set these in **Site settings → Environment variables**, then **clear cache and
deploy** so functions pick them up. None are required for the public marketing
build.

**Admin** (`/admin`)
- `AUTH_SECRET` — `openssl rand -base64 32` (≥16 chars)
- `OWNER_USERNAME`
- `OWNER_PASSWORD_HASH` — scrypt `saltHex:hashHex` (see `.env.example`)

**Git-as-database** (approve / save / generate persist to the repo)
- `GITHUB_TOKEN` — fine-grained PAT, this repo only, Contents: Read and write
- `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH` (`main`)

**Scheduled drafts** (matches `.github/workflows/generate-draft.yml`)
- `CRON_SECRET` — same value as the GitHub Actions secret
- `OPENAI_API_KEY` (optional `OPENAI_MODEL=gpt-4o`)

**Optional later:** `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `CONTACT_INBOX`,
`CONTACT_SENDER`; `GOOGLE_MAPS_API_KEY` for live reviews.

GitHub repo secrets for the Monday cron: `SITE_URL` (canonical
`https://www.aloeaccountingandtax.com`, or the `*.netlify.app` URL until DNS
is live) and `CRON_SECRET` (same as Netlify).

### Custom domain

Canonical host is `https://www.aloeaccountingandtax.com`; `next.config.ts`
301s the apex to www.

In Netlify **Domain management**, add `www` as primary, add the apex, enable
HTTPS. Point DNS: `www` CNAME to the Netlify site hostname; apex ALIAS/ANAME
(or Netlify’s apex → www redirect). Redeploy once HTTPS is active so the
admin session cookie (`Secure`) works.

### After deploy

- Homepage `200`, no trailing slash; apex → www `301` once DNS is on
- `/sitemap.xml` and `/robots.txt` use the www origin
- Contact form submits (console adapter until Resend is set)
- `/admin/login` signs in; `POST /api/admin/generate` without a bearer is 401

Netlify Functions default to a **10s** timeout on Starter. `/api/admin/generate`
calls OpenAI + GitHub and can exceed that (Pro can go to 26s). Approving a post
commits to `main` and triggers a rebuild — published posts appear after that
deploy finishes.

## Architecture

### Single source of truth — `src/lib/site.config.ts`
Brand, canonical domain, NAP, navigation, footer, the **service registry**, the
static-route list, and the **redirect table** all live here. The sitemap,
JSON-LD, page metadata, nav, footer, and `next.config` redirects all read from
this one module. Never hand-maintain a parallel URL list.

### SEO system (KISS / DRY / YAGNI)
- `src/lib/seo.ts` — one `buildMetadata()` builder (title, description,
  canonical, OpenGraph, Twitter, robots) used by every page.
- `src/lib/jsonld.tsx` — one `JsonLd` helper + schema builders. Site-wide:
  `Organization`, `WebSite`, `ProfessionalService` (real NAP). Per-page:
  `BreadcrumbList`, `Service`, `BlogPosting`, `ItemList`, `AboutPage`.
  Intentionally **no** Review/AggregateRating/FAQPage schema.
- `src/app/sitemap.ts`, `src/app/robots.ts` — generated from the same sources.
- Redirects: one table in `site.config.ts`, consumed by `next.config.ts` (301).
- Google Search Console verification + Google Ads global tag are set once,
  globally (`src/app/layout.tsx`, `src/components/analytics/Analytics.tsx`).

Every indexable page has: one `<h1>`, a unique title + meta description,
`rel=canonical` (non-trailing-slash absolute URL), OG + Twitter tags, and
visible breadcrumbs that match its `BreadcrumbList`.

### Conversion events
`src/lib/events.ts` fires conversion-ready Google Ads events for: quote-form
success, phone clicks, email clicks, and Client Portal clicks. Add the Ads
conversion labels in `conversionLabels` at launch — no other rewiring needed.

### Contact form
`src/components/contact/ContactForm.tsx` → server action
`src/app/actions/contact.ts` → provider-agnostic interface `src/lib/email.ts`.
Ships with a safe `console` adapter and a `resend` adapter stub. **No live
credentials, DNS, or delivery are configured yet** (by design).

### Blog / Resources
No CMS. Posts live in `src/lib/posts.ts` (in-repo registry, currently empty).
Adding one validated entry there creates the route, metadata, and sitemap
entry automatically. Slugs and required fields are validated at build time.
_(A richer blog solution is a deliberate future decision.)_

## Common edits

| Task | Where |
|---|---|
| Add / edit a service | `services[]` in `src/lib/site.config.ts` (route, hub card, sitemap, schema follow) |
| Rename a URL | add a row to `redirects[]` in `src/lib/site.config.ts` |
| Add a nav / footer link | `primaryNav` / `footerNav` in `src/lib/site.config.ts` |
| Add a blog post | append to `posts[]` in `src/lib/posts.ts` |
| Update NAP / brand | `site` / `contact` in `src/lib/site.config.ts` |
| Add an Ads conversion label | `conversionLabels` in `src/lib/events.ts` |
| Enable live Google reviews | set `GOOGLE_MAPS_API_KEY` (Places API New); Place ID in `site.config.ts` |

## Outstanding before launch
See [`docs/MISSING_INFO.md`](docs/MISSING_INFO.md) — contact-info confirmation,
metric/review verification, trust-logo assets, social profiles, OG artwork,
and email provider credentials.
