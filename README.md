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

No environment variables are required to build or run — see `.env.example` for
the optional email delivery config.

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

## Outstanding before launch
See [`docs/MISSING_INFO.md`](docs/MISSING_INFO.md) — contact-info confirmation,
metric/review verification, trust-logo assets, social profiles, OG artwork,
and email provider credentials.
