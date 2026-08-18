# ALOE Accounting & Tax — Implementation Plan

Production marketing website for a licensed Brampton CPA firm.

## Stack decision

- **Next.js 15 (App Router) + TypeScript** — statically rendered marketing site (`generateStaticParams` + SSG). Crawlers get full HTML.
- **Tailwind CSS v4** for the design system (dark navy / white / emerald green).
- **No CMS** (Sanity removed at owner request). Blog/resources use an in-repo, build-validated post registry (`src/lib/posts.ts`); a bespoke blog solution is a future decision.
- **SEO = content model + build pipeline**, native App Router mechanisms only. No `next-seo`, no `react-helmet`, no schema packages.
- Forms: a typed server-action interface with a pluggable email provider (Resend-shaped), **not wired to live credentials**.

### SEO mechanism mapping (Next.js App Router)
| Concern | Mechanism |
|---|---|
| Per-page head | `generateMetadata()` reading from one config/CMS |
| JSON-LD | `<script type="application/ld+json">` via one `JsonLd` helper |
| Sitemap | `app/sitemap.ts` from the same route/collection source |
| Robots | `app/robots.ts` |
| Canonical host | `metadataBase` + `canonical()` helper, non-www or www (pick one), no trailing slash |
| Redirects | `redirects()` in `next.config.ts`, one table derived from config |
| Verification | GSC `verification.other` in root metadata |

## Single source of truth — `src/lib/site.config.ts`
- `brand`, `legalName`, `domain` (canonical origin, https, no trailing slash)
- default description, default OG image, logo
- NAP: email, phone, full address (we have a real public office)
- `canonical(path)`, `absoluteUrl(path)` helpers
- `nav` + `footer` items (short label + long label on the same item)
- service registry (drives services hub, sitemap, breadcrumbs, Service JSON-LD)
- redirect table

Blog posts come from Sanity; the sitemap merges static config routes + published CMS docs.

## Design system (from screenshots)
- Navy `#0A1B2E`-ish base, deep-teal hero gradient, emerald `#12B981`/`#19C37D` accent, off-white `#F6F8FA` alt sections.
- Rounded-pill buttons: green primary (dark text), dark/ghost secondary.
- Eyebrow pill chips with icon (`SERVICES`, `HOW WE WORK`, `INDUSTRIES SERVED`, `FAQ`, `LET'S TALK`).
- Big bold display headings with occasional italic-green accent word.
- Service cards: one featured dark card + white bordered cards, green icon chip, green-check list, "Learn more" link.
- Stat blocks, trust-logo strip, industries grid (dark), review cards (green stars), 4-step "how we work", FAQ accordion.
- Complete responsive **desktop** layouts (multi-column) — not 1:1 screenshot replicas.

## Page inventory (routes)
Home `/` · Services hub `/services` · Accounting & Payroll `/services/accounting-payroll` · Corporate Tax `/services/corporate-tax` · Financial Statements & Assurance `/services/financial-statements-assurance` · Business Advisory `/services/business-advisory` · Personal Tax `/services/personal-tax` · CRA Representation & Tax Disputes `/services/cra-representation` · Tax Planning `/services/tax-planning` · About `/about` · Industries `/industries` · Resources index `/resources` + article `/resources/[slug]` · Contact `/contact` · Privacy Policy `/privacy`.

## Analytics / conversion
- Google Ads global tag `AW-11251511415` once, globally (gtag). **No GA4** (no `G-` id provided).
- GSC verification meta `BucageN2FS3_1eKy_IR6hBaRezaZVqanXinetTIbfJo`.
- Conversion events: quote-form success, phone-click (`tel:`), email-click (`mailto:`), Client Portal click.
- Client Portal link opens new tab with `rel="noopener noreferrer"`.

## Build order (small, reviewable commits)
1. Scaffold Next + TS + Tailwind, base config, `.gitignore`.
2. `site.config.ts` single source of truth + SEO helpers (`canonical`, `absoluteUrl`, `JsonLd`, metadata builder).
3. Design tokens + primitives (Button, Pill/Eyebrow, Container, Section, Card).
4. Header + Footer + analytics + root layout JSON-LD (Organization, WebSite, LocalBusiness).
5. Home page.
6. Services hub + 7 service detail pages (config-driven template).
7. About, Industries, Contact, Privacy.
8. Sanity schema (page, post, author) + Studio + resources index/article + sitemap merge.
9. Contact/quote form (server action interface) + conversion events.
10. `sitemap.ts`, `robots.ts`, redirects, build gates (validate required SEO fields, unique slugs).
11. Validate: build, Lighthouse-ish checks, a11y, metadata, sitemap, mobile+desktop.

## Non-negotiables honored
KISS/DRY/YAGNI: 3 small SEO files, one config, one JSON-LD helper. No RSS, tag pages, OG-image gen, FAQ JSON-LD, hreflang, author pages, or related-ranking engine (content doesn't warrant them). No fake schema types (no Review/AggregateRating/FAQPage). One h1 per page, visible breadcrumbs match BreadcrumbList, root-relative internal links.
