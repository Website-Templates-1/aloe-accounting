## 1. Contact info — verified against Google Business Profile (one discrepancy to reconcile)

Cross-checked the confirmed details against the Google Business Profile via the Places API:


| Field           | Google says                                                         | Config uses                        | Status                             |
| --------------- | ------------------------------------------------------------------- | ---------------------------------- | ---------------------------------- |
| Phone           | (647) 631-9700                                                      | (647) 631-9700                     | ✅ match                            |
| Address         | 285 Steeles Ave W (no suite)                                        | 285 Steeles Ave W., Suite 201      | using confirmed                    |
| **Postal code** | **L6Y 0P8**                                                         | **L6Y 0B5**                        | ⚠️ **mismatch — please reconcile** |
| Website         | [www.aloeaccountingandtax.com](http://www.aloeaccountingandtax.com) | aloeaccountingandtax.com (non-www) | see item 7                         |


Kept your confirmed values (Suite 201, L6Y 0B5) since you explicitly confirmed them. **Please confirm the correct postal code** (Google shows L6Y 0P8, your confirmed details say L6Y 0B5) — one is likely a typo, and NAP consistency matters for local SEO. Email is not in Google; `info@aloecpa.com` retained.

## 7. Domain / canonical host

Approved doc lists `https://aloeaccountingandtax.com/`. Set as canonical origin (non-www, no trailing slash). Confirm this is the final production domain and www-vs-non-www preference.

## 8. Blog / resources content

No articles supplied, and **no CMS** is used (Sanity was removed at owner's request). Posts live in an in-repo registry (`src/lib/posts.ts`), currently empty; the Resources index shows an empty state. A blog approach is a future decision — provide initial posts (or confirm launching with zero) and the preferred authoring method.

## 9. FAQ content

Screenshots show FAQ questions (where based/who served, onboarding, sole-prop vs incorporated, pricing…). I'll use the visible, owner-approved answers where legible; please supply the full final FAQ Q&A text. Visible HTML only — **no** FAQPage schema.

## 11. Email delivery

Per instructions, the form uses a secure provider-agnostic interface but is **not** connected to live email/DNS/credentials. Provide provider choice (Resend/SES/etc.) + destination inbox at deployment time.

