# Inventory of Missing / To-Confirm Factual Information

The build proceeds with sensible, honest defaults. Items below are either **missing** (needed before launch) or **to-confirm** (used because supplied materials were declared owner-approved, but they conflict with each other or with the approved copy doc, so please verify).

## 1. Contact info — verified against Google Business Profile (one discrepancy to reconcile)
Cross-checked the confirmed details against the Google Business Profile via the Places API:
| Field | Google says | Config uses | Status |
|---|---|---|---|
| Phone | (647) 631-9700 | (647) 631-9700 | ✅ match |
| Address | 285 Steeles Ave W (no suite) | 285 Steeles Ave W., Suite 201 | using confirmed |
| **Postal code** | **L6Y 0P8** | **L6Y 0B5** | ⚠️ **mismatch — please reconcile** |
| Website | www.aloeaccountingandtax.com | aloeaccountingandtax.com (non-www) | see item 7 |

Kept your confirmed values (Suite 201, L6Y 0B5) since you explicitly confirmed them. **Please confirm the correct postal code** (Google shows L6Y 0P8, your confirmed details say L6Y 0B5) — one is likely a typo, and NAP consistency matters for local SEO. Email is not in Google; `info@aloecpa.com` retained.

## 2. Metrics shown in screenshots — CONFIRM these are accurate
These appear in the Lovable-generated hero/about, **not** in the approved copy doc. Declared owner-approved, so used as-is, but they are the highest-risk "invented metric" candidates:
- `12+ years CPA practice / experience`
- `400+ returns filed annually`
- `98% client retention`
If any is not literally true, tell me and I'll remove or adjust. (These are on-page only — **no** ratings/metrics schema is emitted.)

## 3. Reviews — now pulled from Google Business Profile
Reviews are fetched live from the firm's Google Business Profile (Place ID
`ChIJiYpKWNo_K4gR7WwrTBJ5amo`) via the Google Places API and shown with Google
attribution. **Still needed:** a Google Maps Platform API key with **Places API
(New)** enabled, set as `GOOGLE_MAPS_API_KEY`. Until then the site shows the
owner-approved static testimonials as a fallback. Displayed as visible HTML
only; **no** Review/AggregateRating JSON-LD (Google policy + honesty).

## 4. Certifications / trust logos — ADDED (owner-approved)
Added a trust-badge row (home + hero areas) with **BBB Accredited Business**, **CPA (Chartered Professional Accountant)**, and **QuickBooks Certified ProAdvisor**. These are clean **in-house badge marks** (`public/trust/*.svg`), not official trademark files. For pixel-perfect fidelity, drop official brand assets (from BBB / CPA Ontario / Intuit) into `public/trust/` to replace them. Please confirm ALOE currently holds each of these accreditations.

## 5. Social profiles (`sameAs` in Organization JSON-LD)
None provided. Omitted (honesty). Send LinkedIn / Google Business / Instagram URLs to include real ones.

## 6. Team / founder — DONE
**Khushpreet Sran, CPA** (Lead CPA) now has a photo + profile section on `/about`, and is included as a `Person` in the AboutPage JSON-LD with her real headshot, `alumniOf` (Wilfrid Laurier University), and `hasCredential` (CPA). Credentials are sourced from the framed diplomas visible in the supplied portrait. Confirm title wording ("Lead CPA") if you'd prefer "Senior Accountant".

## 7. Domain / canonical host
Approved doc lists `https://aloeaccountingandtax.com/`. Set as canonical origin (non-www, no trailing slash). Confirm this is the final production domain and www-vs-non-www preference.

## 8. Blog / resources content
No articles supplied, and **no CMS** is used (Sanity was removed at owner's request). Posts live in an in-repo registry (`src/lib/posts.ts`), currently empty; the Resources index shows an empty state. A blog approach is a future decision — provide initial posts (or confirm launching with zero) and the preferred authoring method.

## 9. FAQ content
Screenshots show FAQ questions (where based/who served, onboarding, sole-prop vs incorporated, pricing…). I'll use the visible, owner-approved answers where legible; please supply the full final FAQ Q&A text. Visible HTML only — **no** FAQPage schema.

## 10. Business hours & service pricing
- Hours: **DONE** — pulled from the Google Business Profile (Mon–Fri 9:00 AM–5:30 PM, closed weekends). Shown on the Contact page and emitted as `openingHoursSpecification` in the ProfessionalService JSON-LD. Stored in `businessHours` in `site.config.ts`; update there if hours change.
- Pricing: still no public starting prices → **no** `Offer` in Service schema (unchanged).

## 11. Email delivery
Per instructions, the form uses a secure provider-agnostic interface but is **not** connected to live email/DNS/credentials. Provide provider choice (Resend/SES/etc.) + destination inbox at deployment time.

## 12. OG / social share image — DONE
Generated a proper **1200×630 PNG** (`public/og-default.png`) with the real ALOE logo centered on white. Used for all OpenGraph/Twitter cards. Swap for a richer custom design later if desired, but this is production-ready.
