# Build Prompt — SEO improvements for the ALOE Accounting and Tax site

You are working in an existing production marketing website for **ALOE Accounting and Tax**, a licensed Brampton, Ontario CPA firm. Implement the SEO improvements below. Work in small, reviewable commits and verify each.

## Stack & architecture (read before coding)
- **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.** Statically rendered (SSG) — all pages must stay crawlable HTML. No client-only rendering of content.
- **SEO is a content model + build pipeline, not a plugin.** Do **not** add `next-seo`, `react-helmet`, or any schema/SEO package. Use native App Router mechanisms only. Avoid new dependencies unless truly unavoidable.
- **Single source of truth:** `src/lib/site.config.ts` (brand, NAP, `businessHours`, `googleBusiness`, `socialLinks`/`socialProfiles`, `services`, `industries`, `staticRoutes`, `redirects`, `canonical()`/`absoluteUrl()`). Everything — metadata, nav, footer, sitemap, JSON-LD, redirects — reads from here. Never hand-maintain a parallel list.
- **Key files:**
  - `src/lib/seo.ts` — `buildMetadata()` (the one metadata builder used by every page's `generateMetadata`/`metadata`).
  - `src/lib/jsonld.tsx` — `JsonLd` component + schema builders (`organizationSchema`, `websiteSchema`, `professionalServiceSchema`, `breadcrumbSchema`, `serviceSchema`, `blogPostingSchema`, `itemListSchema`, `aboutPageSchema`).
  - `src/app/sitemap.ts`, `src/app/robots.ts` — generated from config + `src/lib/posts.ts`.
  - `next.config.ts` — `redirects()` derived from `redirects` in config; `trailingSlash:false`.
  - `src/components/analytics/Analytics.tsx` — Google Ads global tag; `src/lib/events.ts` — conversion events.
  - `src/lib/posts.ts` — in-repo, build-validated blog registry (no CMS). Adding a post here auto-creates route + metadata + sitemap entry.
- **Principles:** KISS, YAGNI, DRY. Keep exactly one `<h1>` per page, visible breadcrumbs that match `BreadcrumbList`, root-relative internal links.
- **Honesty rules (do not violate):** never emit `Review`, `AggregateRating`, `FAQPage`, or `Offer` schema (no real backing data + Google policy). No invented metrics, prices, ratings, offices, or profiles. Only use real data provided below or already in the repo.

## Verification (run after each task)
`npm run lint && npm run build` must pass (all routes still SSG). Then `npm run start` and check served HTML with `curl`/`grep`: exactly one `<h1>` per page, correct title/description/canonical, JSON-LD types present and no forbidden types, sitemap/robots correct. Do a desktop + mobile browser pass for any visual change and confirm no console/hydration errors.

---

## Tasks (in priority order)

### 1. Upgrade LocalBusiness structured data (real data provided)
In `src/lib/jsonld.tsx`, `professionalServiceSchema()`:
- Change `@type` from `"ProfessionalService"` to **`"AccountingService"`** (Google reports the business `primaryType: accounting`).
- Add `geo`: `{ "@type": "GeoCoordinates", latitude: 43.6594316, longitude: -79.7398342 }`.
- Add `hasMap`: `"https://maps.google.com/?cid=7668074435045977325"`.
- Add a structured `areaServed` list: Brampton, Mississauga, Caledon, and the Greater Toronto Area (as `City`/`AdministrativeArea` objects). Keep the existing string too if simplest, or replace.
- Keep existing `openingHoursSpecification`, `address`, `telephone`, `email`, `logo`, `image`, `sameAs`.
Put the coordinates/mapUrl in `googleBusiness` in `site.config.ts` (SSOT) and read them in the schema builder.
**Accept:** home HTML JSON-LD shows `AccountingService` with `geo` + `hasMap`; no Review/AggregateRating added.

### 2. Web app manifest + favicon set + theme-color
- Add `src/app/manifest.ts` (Next metadata route) with name, short_name, `theme_color` (brand navy `#0a1b2e` or green `#15c58c` — match brand), `background_color`, and icons referencing existing/derived PNGs.
- Add an `apple-icon.png` (App Router convention) and confirm `icon.png` is picked up.
- Add `themeColor` via the Next `viewport`/metadata export in `src/app/layout.tsx`.
**Accept:** `/manifest.webmanifest` returns 200; `<link rel="manifest">`, `<meta name="theme-color">`, and apple touch icon present in HTML.

### 3. Legacy WordPress → Next redirect map (migration)
The domain currently runs WordPress; this site replaces it. Preserve link equity:
- The **owner will provide** the list of currently-indexed old URLs (from Google Search Console → Pages). Wire each old path → best new path into the `redirects` array in `site.config.ts` (already consumed by `next.config.ts`). Use `permanent: true`.
- Pre-seed obvious WordPress patterns if present (e.g. `/services/:slug` legacy names, `/wp-*` → home or 410, old `/about-us` → `/about`, `/contact-us` → `/contact`).
- Do not invent redirects for URLs you can't confirm; leave a clearly-marked `// TODO: owner to supply GSC URL list` block.
**Accept:** `curl -I` on a mapped old path returns 308/301 to the new path.

### 4. Blog/content scaffolding (content-ready, no CMS)
- Confirm the `src/lib/posts.ts` workflow and add **1–2 example posts** as templates (clearly marked as drafts via the `draft: true` flag so they don't ship) demonstrating: kebab slug, `metaDescription` (~150 chars), `excerpt`, `publishedAt`, `body` paragraphs, and 2–3 root-relative internal links to service pages in the body.
- Verify BlogPosting + BreadcrumbList schema renders on a published article and that the Resources index + sitemap pick it up.
**Accept:** with one non-draft test post, `/resources` lists it, `/resources/<slug>` renders with BlogPosting JSON-LD, and it appears in `sitemap.xml`; drafts do NOT appear. (Remove the test post or keep as `draft:true` when done.)

### 5. GA4 support (activate only if an id is provided)
- Extend `analytics` in `site.config.ts` with an optional `ga4MeasurementId` (`G-XXXX`) and update `src/components/analytics/Analytics.tsx` to also load/`config` GA4 **only when the id is set**. Do not add GA4 if no `G-` id is provided — leave the plumbing dormant.
- Keep the existing Google Ads tag and conversion events intact.
**Accept:** with no id, output is unchanged (Ads only); with a test `G-` id, GA4 gtag config appears once.

### 6. Apply the NAP + host decisions (owner-supplied)
Once the owner confirms:
- **Postal code:** reconcile `L6Y 0B5` vs `L6Y 0P8` (and whether "Suite 201" is included) — update `contact.address` + `addressLine` in `site.config.ts` (one place; footer, contact page, and schema all follow).
- **Canonical host:** if switching to `www`, update `site.domain` in `site.config.ts` (everything derives from it) and note that the host must 301 non-www → www (or vice-versa).
**Accept:** the chosen NAP/host appears consistently in footer, contact page, sitemap, robots `host`, and all JSON-LD.

### 7. (Optional) Richer OG image
Replace `public/og-default.png` with a designed 1200×630 (brand headline + logo on navy/white) if the owner wants stronger social CTR. Keep it a single default (no per-page OG generation unless the blog grows). Update `site.ogImage` only if the filename changes.

---

## Out of scope (do NOT do)
- FAQPage / Review / AggregateRating / Offer schema; invented ratings, prices, or metrics.
- City/location doorway pages; hreflang; RSS/tag/author pages.
- Swapping the framework, adding a CMS, or adding SEO/schema npm packages.
- Off-site work (Google Business Profile edits, GSC/Bing submission, citation building) — these are owner tasks; note them in your summary but don't attempt them in code.

## Data you'll need
- Geo: `43.6594316, -79.7398342`
- Google Maps (cid): `https://maps.google.com/?cid=7668074435045977325`
- Google primaryType: `accounting` → `AccountingService`
- NAP (pending owner reconciliation): 285 Steeles Ave W [Suite 201?], Brampton, ON — **L6Y 0B5 or L6Y 0P8**
- Canonical host: **www vs non-www** (owner to decide)
- Ads tag already set: `AW-11251511415`; GSC verification already set.
