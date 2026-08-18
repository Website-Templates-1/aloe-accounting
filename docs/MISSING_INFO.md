# Inventory of Missing / To-Confirm Factual Information

The build proceeds with sensible, honest defaults. Items below are either **missing** (needed before launch) or **to-confirm** (used because supplied materials were declared owner-approved, but they conflict with each other or with the approved copy doc, so please verify).

## 1. Contact info conflict — RESOLVED to confirmed values (please sanity-check)
The Lovable screenshots show **different** contact details than the confirmed production details. I used the **confirmed** ones everywhere:
| Field | Screenshot (NOT used) | Confirmed (used) |
|---|---|---|
| Phone | (647) 651-9300 | **(647) 631-9700** |
| Email | info@aloeaccounting.com | **info@aloecpa.com** |
| Address | 285 Steeles Ave W, Suite 201, Brampton, ON L6Y 0B5 | same ✓ |

## 2. Metrics shown in screenshots — CONFIRM these are accurate
These appear in the Lovable-generated hero/about, **not** in the approved copy doc. Declared owner-approved, so used as-is, but they are the highest-risk "invented metric" candidates:
- `12+ years CPA practice / experience`
- `400+ returns filed annually`
- `98% client retention`
If any is not literally true, tell me and I'll remove or adjust. (These are on-page only — **no** ratings/metrics schema is emitted.)

## 3. Reviews — need source + permission
Approved copy says: *"Link to 5 star google review – 3 most recent with text."* Screenshots show quotes (e.g., "Khushpreet is extremely reliable…" — Ari K., Business Owner; "Amazing service! It was my first year filing taxes…"). Please provide:
- The 3 real review texts + reviewer display names (as you want them shown).
- The Google review/profile URL to link to.
Rendered as visible testimonials only; **no** Review/AggregateRating JSON-LD (Google deprecated it and we won't fake it).

## 4. Certifications / trust logos
Screenshots reference "Chartered Professional Accountants Canada / CPA Ontario" and "QuickBooks ProAdvisor." Confirm which badges ALOE may display and provide logo assets (or permission to use text-only trust markers). Currently rendered as **text trust markers**, no third-party logos, pending assets.

## 5. Social profiles (`sameAs` in Organization JSON-LD)
None provided. Omitted (honesty). Send LinkedIn / Google Business / Instagram URLs to include real ones.

## 6. Team / founder
About copy names **Khushpreet Sran, CPA** (senior accountant). Used in About body. Confirm title/spelling and whether to include a `Person` in AboutPage JSON-LD (only if accurate) and a headshot.

## 7. Domain / canonical host
Approved doc lists `https://aloeaccountingandtax.com/`. Set as canonical origin (non-www, no trailing slash). Confirm this is the final production domain and www-vs-non-www preference.

## 8. Blog / resources content
No articles supplied, and **no CMS** is used (Sanity was removed at owner's request). Posts live in an in-repo registry (`src/lib/posts.ts`), currently empty; the Resources index shows an empty state. A blog approach is a future decision — provide initial posts (or confirm launching with zero) and the preferred authoring method.

## 9. FAQ content
Screenshots show FAQ questions (where based/who served, onboarding, sole-prop vs incorporated, pricing…). I'll use the visible, owner-approved answers where legible; please supply the full final FAQ Q&A text. Visible HTML only — **no** FAQPage schema.

## 10. Business hours & service pricing
- Hours: "within one business day" response is stated; actual open hours not given → omitted from LocalBusiness `openingHours` until provided.
- No public starting prices given → **no** `Offer` in Service schema.

## 11. Email delivery
Per instructions, the form uses a secure provider-agnostic interface but is **not** connected to live email/DNS/credentials. Provide provider choice (Resend/SES/etc.) + destination inbox at deployment time.

## 12. OG / social share image
A simple, on-brand **placeholder** (`public/og-default.svg`, firm name + tagline only — no invented claims) is referenced so shares aren't broken. Replace with final 1200×630 PNG artwork before launch. Some scrapers don't render SVG OG images.
