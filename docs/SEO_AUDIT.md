# SEO Audit — ALOE Accounting and Tax

_Audited against the live local build (Next.js 16 App Router, static/SSG). Focus: on-page, technical, structured data, local SEO, and migration._

## ✅ Already solid (baseline)
- **Crawlable HTML** — statically rendered; all content in source, no JS gate.
- **Single source of truth** (`src/lib/site.config.ts`) feeds titles, nav, footer, sitemap, JSON-LD, redirects.
- **Per-page metadata** — unique `<title>` + meta description, `rel=canonical` (non-trailing-slash, one host), OG + Twitter tags. Redundant-brand title bug fixed.
- **Structured data** — Organization, WebSite, ProfessionalService (real NAP + `openingHoursSpecification`), BreadcrumbList, Service (per service), AboutPage + Person (founder w/ photo, `alumniOf`, `hasCredential`), ItemList. `sameAs` (Instagram, LinkedIn).
- **Crawl control** — `app/sitemap.ts` (all public URLs, no drafts), `app/robots.ts` (allow + sitemap + host), `trailingSlash:false`, 301 redirect table, 404 returns `noindex,follow`.
- **On-page** — exactly one `<h1>` per page, visible breadcrumbs matching BreadcrumbList, root-relative internal links, enriched service pages (benefits / who-it's-for / process), trust logos, Google reviews (visible, no fake rating schema).
- **Verification + analytics** — GSC verification meta present; Google Ads tag global; conversion events (form, phone, email, portal). `html lang="en-CA"`, viewport, OG image (1200×630 PNG) all present.

## 🔴 Critical — migration & launch
1. **This is a WordPress → Next.js migration.** The domain currently serves a live WP site. Before cutover, export the list of currently-indexed URLs (GSC → Pages, plus `site:aloeaccountingandtax.com`) and build a **301 redirect map** old→new to preserve link equity. Add to the redirect table in `site.config.ts`. Missing this = lost rankings.
2. **NAP inconsistency.** Google Business Profile shows postal code **L6Y 0P8** (no suite); the site uses **L6Y 0B5, Suite 201**. Pick the correct one and make site + GBP + all citations identical. NAP consistency is a core local ranking factor.
3. **Pick www vs non-www.** Google/GBP list **www**; the site canonical is **non-www**. Choose one, 301 the other at the host, and set the same as the GSC property + GBP website URL.
4. **Deploy + submit.** Ship to production, submit `sitemap.xml` in Google Search Console (and Bing Webmaster). Ensure any staging environment is `noindex`.

## 🟠 High-value (biggest organic ROI)
5. **Content / blog program.** `Resources` is wired but empty — the single biggest untapped lever. Plan ~8–12 cornerstone articles targeting local + service intent, e.g. "Salary vs. dividends for Ontario owner-managers", "Corporate (T2) tax deadlines for CCPCs", "Bookkeeping checklist for Brampton small businesses", "What to do if the CRA reassesses you". Each post already gets BlogPosting schema + sitemap entry via `src/lib/posts.ts`; add internal links to the relevant service pages.
6. **Local structured-data upgrades** (Google confirms `primaryType: accounting`):
   - Change the LocalBusiness type from generic `ProfessionalService` to **`AccountingService`** (more specific subtype).
   - Add **`geo`** `{ latitude: 43.6594316, longitude: -79.7398342 }`, **`hasMap`** (`https://maps.google.com/?cid=7668074435045977325`), and a structured **`areaServed`** list (Brampton, Mississauga, Caledon, GTA).
   - Leave out `priceRange`/`aggregateRating` unless owner supplies real, defensible values.
7. **Google Business Profile optimization** (off-site, high local impact): confirm primary + secondary categories, fill services/description, add photos, post updates, answer Q&A, keep NAP identical to the site, and keep gathering reviews (already surfaced on-site).

## 🟡 Medium (polish)
8. **Web app manifest + full favicon set** — currently only `icon.png`. Add `manifest.json` (name, `theme-color`, icon set), `apple-icon`, and `<meta name="theme-color">`. Better mobile/share polish.
9. **Analytics measurement** — only the Google Ads tag is present (no GA4). SEO decisions need traffic data: add **GA4** if a `G-` id is provided, or rely on GSC. Owner's call.
10. **Richer OG image (optional)** — current is logo-on-white; a designed 1200×630 (headline + brand) lifts social CTR. Per-page OG only worth it once the blog exists.
11. **On-page FAQ depth** — home has a visible FAQ (correctly no FAQPage schema — Google deprecated those rich results). Expanding FAQ content (or a dedicated `/faq`) helps long-tail queries. (Per-service FAQ was previously declined.)

## 🔧 Technical / deployment
12. **Core Web Vitals** — run Lighthouse on the deployed URL; verify LCP (hero), CLS, INP. Expected good (SSG + `next/font` + `next/image`) but confirm on real hosting.
13. **Host headers** — HSTS, compression, sensible cache-control for static assets; canonical-host 301. Mostly a hosting-config task.
14. **Image SEO** — all current `next/image` uses have alt; enforce descriptive alt + captions on any future blog imagery.

## 🚫 Deliberately NOT recommended (YAGNI / honesty)
- FAQPage / Review / AggregateRating / Offer schema — no real backing data + Google policy.
- City/location doorway pages — thin content, penalized.
- hreflang — single `en-CA` locale.
- RSS / tag / author index pages — no content to warrant them yet.

## Concrete data for implementation
- **Geo:** `43.6594316, -79.7398342`
- **Google Maps (hasMap / cid):** `https://maps.google.com/?cid=7668074435045977325`
- **Google primaryType:** `accounting` → schema type `AccountingService`
- **NAP (pending reconciliation):** 285 Steeles Ave W [Suite 201?], Brampton, ON **L6Y 0B5 vs L6Y 0P8**
- **Canonical host decision:** www vs non-www (Google lists www; site uses non-www)
