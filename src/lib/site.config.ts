/**
 * ALOE Accounting & Tax — single source of truth.
 *
 * Brand, NAP, canonical host, navigation, footer, the service registry,
 * and the redirect table all live here. Sitemap, JSON-LD, metadata, nav,
 * and redirects read from this module. Never hand-maintain a parallel list.
 */

/* ------------------------------------------------------------------ */
/* Core identity                                                       */
/* ------------------------------------------------------------------ */

export const site = {
  brand: "ALOE Accounting and Tax",
  shortBrand: "ALOE CPA",
  legalName: "ALOE Accounting and Tax",
  /** Canonical origin: https, non-www, NO trailing slash. Pick one host, stick to it. */
  domain: "https://aloeaccountingandtax.com",
  locale: "en_CA",
  htmlLang: "en-CA",
  defaultTitle: "ALOE Accounting and Tax | Brampton CPA Firm",
  titleTemplate: "%s | ALOE Accounting and Tax",
  defaultDescription:
    "ALOE Accounting and Tax is a licensed Brampton CPA firm offering accounting, payroll, corporate & personal tax, assurance, and advisory across the GTA and Canada.",
  /** OG image path (relative). Replace when real artwork is supplied. */
  ogImage: "/og-default.svg",
  logo: "/aloe-logo.png",
} as const;

/* ------------------------------------------------------------------ */
/* NAP — name, address, phone (real, public office)                    */
/* ------------------------------------------------------------------ */

export const contact = {
  phoneDisplay: "(647) 631-9700",
  phoneHref: "tel:+16476319700",
  email: "info@aloecpa.com",
  emailHref: "mailto:info@aloecpa.com",
  /** Secure client portal (external). */
  portalUrl:
    "https://app.mycpacrm.com/drop/31cca604-1cb9-4a4b-8469-52fb9e314640",
  address: {
    street: "285 Steeles Ave W., Suite 201",
    city: "Brampton",
    region: "ON",
    regionName: "Ontario",
    postalCode: "L6Y 0B5",
    country: "CA",
    countryName: "Canada",
  },
  /** Human-readable one-liner. */
  addressLine: "285 Steeles Ave W., Suite 201, Brampton, ON L6Y 0B5",
  serviceArea: "Greater Toronto Area and across Canada",
} as const;

/* ------------------------------------------------------------------ */
/* Analytics / verification                                            */
/* ------------------------------------------------------------------ */

export const analytics = {
  /** Google Ads global tag. No GA4 until a G- measurement id is supplied. */
  googleAdsId: "AW-11251511415",
  googleSearchConsoleVerification: "BucageN2FS3_1eKy_IR6hBaRezaZVqanXinetTIbfJo",
} as const;

/** Real, verified social profiles only. Empty until owner supplies them. */
export const socialProfiles: string[] = [];

/**
 * Google Business Profile — source for live reviews (via Places API).
 * Live fetch activates when GOOGLE_MAPS_API_KEY is set; otherwise the site
 * falls back to the static testimonials in content.ts.
 */
export const googleBusiness = {
  placeId: "ChIJiYpKWNo_K4gR7WwrTBJ5amo",
  /** Public link to the firm's Google reviews (attribution + "read more"). */
  profileUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJiYpKWNo_K4gR7WwrTBJ5amo",
  /** Only surface reviews at/above this rating (Google shows all anyway). */
  minRating: 4,
  /** Max reviews to display (Places API returns up to 5). */
  count: 3,
} as const;

/* ------------------------------------------------------------------ */
/* Service registry — drives hub, detail pages, nav, sitemap, JSON-LD  */
/* ------------------------------------------------------------------ */

export type ServiceIcon =
  | "calculator"
  | "building"
  | "clipboard-check"
  | "trending-up"
  | "user"
  | "shield"
  | "calendar-clock";

export interface ServiceDef {
  slug: string;
  /** Page h1 / primary title. */
  title: string;
  /** Short label for nav/cards. */
  navLabel: string;
  icon: ServiceIcon;
  /** ~140–160 char meta description. */
  metaDescription: string;
  /** One-line summary for cards and hub. */
  summary: string;
  /** Lead paragraph (approved copy). */
  intro: string;
  /** Bulleted scope (approved copy). */
  bullets: string[];
  /** Label for the bullet block, e.g. "Our services include". */
  bulletsHeading: string;
}

export const services: ServiceDef[] = [
  {
    slug: "accounting-payroll",
    title: "Accounting & Payroll",
    navLabel: "Accounting & Payroll",
    icon: "calculator",
    metaDescription:
      "Tailored accounting and payroll for GTA businesses — full-cycle bookkeeping, QBO payroll and remittances, year-end entries, and financial statement preparation.",
    summary:
      "Accurate, current financial records — from day-to-day bookkeeping to year-end reporting.",
    intro:
      "We provide tailored accounting and payroll solutions designed to keep your financial records accurate, current, and ready when you need them. From day-to-day bookkeeping to year-end reporting, we handle the details so you can focus on your business.",
    bulletsHeading: "Our services include",
    bullets: [
      "Full-cycle bookkeeping & account reconciliations",
      "Payroll processing through QBO & payroll remittances",
      "Year-end adjusting entries",
      "Financial statement preparation",
      "Compilation engagements",
      "Ongoing accounting support & advisory",
    ],
  },
  {
    slug: "corporate-tax",
    title: "Corporate Tax",
    navLabel: "Corporate Tax",
    icon: "building",
    metaDescription:
      "Proactive corporate tax for Canadian businesses — T2 returns, GST/HST compliance, tax-efficient structuring, owner-manager planning, and CRA support.",
    summary:
      "A proactive approach to corporate tax — compliance plus decisions that manage your position year-round.",
    intro:
      "We take a proactive approach to corporate tax, helping you meet your filing obligations while identifying opportunities to manage your tax position effectively. Our approach goes beyond compliance to support better financial decisions throughout the year.",
    bulletsHeading: "Our services include",
    bullets: [
      "Corporate income tax returns",
      "GST/HST compliance",
      "Tax planning & advisory",
      "Tax-efficient business structuring",
      "Owner-manager tax planning",
      "CRA correspondence & support",
    ],
  },
  {
    slug: "financial-statements-assurance",
    title: "Financial Statements & Assurance",
    navLabel: "Financial Statements & Assurance",
    icon: "clipboard-check",
    metaDescription:
      "Clear, credible financial statements and assurance from a Brampton CPA firm — compilation, review, and audit engagements prepared to professional standards.",
    summary:
      "Clear, credible financial information — prepared to the standard you expect from a CPA firm.",
    intro:
      "Clear, credible financial information is essential to making informed business decisions. We prepare financial statements tailored to your needs and provide assurance services with the professionalism and attention to detail you expect from a CPA firm.",
    bulletsHeading: "Our services include",
    bullets: [
      "Financial statement preparation",
      "Compilation engagements",
      "Review engagements",
      "Audit engagements",
    ],
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    navLabel: "Business Advisory",
    icon: "trending-up",
    metaDescription:
      "Business advisory for owners — financial analysis, cash flow planning, budgeting and forecasting, and performance analysis to guide confident decisions.",
    summary:
      "Financial statements that shape what comes next — analysis, planning, and owner advisory.",
    intro:
      "Your financial statements shouldn't just report the past, they should help shape what comes next. We work with business owners to understand their numbers, evaluate opportunities, and make informed decisions with confidence.",
    bulletsHeading: "Our services include",
    bullets: [
      "Financial analysis & reporting",
      "Cash flow planning",
      "Budgeting & forecasting",
      "Business performance analysis",
      "Tax and business planning",
      "Ongoing owner advisory",
    ],
  },
  {
    slug: "personal-tax",
    title: "Personal Tax",
    navLabel: "Personal Tax",
    icon: "user",
    metaDescription:
      "Personal tax for business owners — T1 returns, owner-manager remuneration planning, and investment income reporting aligned with your corporate strategy.",
    summary:
      "Personal tax that complements your corporate strategy — considered together, not in isolation.",
    intro:
      "For our corporate clients, we provide personal tax services designed to complement their broader business and tax strategy. We consider your personal and corporate tax positions together to help you make informed decisions.",
    bulletsHeading: "Our services include",
    bullets: [
      "T1 personal income tax returns",
      "Tax planning for business owners",
      "Owner-manager remuneration planning",
      "Investment and other income reporting",
      "Tax advisory and support",
    ],
  },
  {
    slug: "cra-representation",
    title: "CRA Representation & Tax Disputes",
    navLabel: "CRA Representation",
    icon: "shield",
    metaDescription:
      "CRA representation and tax dispute support — audit assistance, reassessments, notices of objection, and clear communication with the CRA on your behalf.",
    summary:
      "We understand the issue, prepare the documentation, and communicate with the CRA on your behalf.",
    intro:
      "Dealing with the CRA can be complex and time-consuming. We work with you to understand the issue, prepare the appropriate documentation, and communicate with the CRA on your behalf.",
    bulletsHeading: "Our services include",
    bullets: [
      "CRA audit support",
      "Review and reassessment assistance",
      "CRA correspondence",
      "Notice of objection support",
      "Tax account reviews",
      "Representation and communication with CRA",
    ],
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    navLabel: "Tax Planning",
    icon: "calendar-clock",
    metaDescription:
      "Proactive tax planning for businesses and owners — remuneration strategies, tax-efficient decisions, year-end planning, and restructuring considerations.",
    summary:
      "Effective tax planning starts well before the filing deadline — anticipate, don't react.",
    intro:
      "Effective tax planning starts well before the filing deadline. We assess your business and personal circumstances to identify opportunities, anticipate tax implications, and help you make decisions with tax in mind.",
    bulletsHeading: "Our approach includes",
    bullets: [
      "Corporate and personal tax planning",
      "Owner-manager remuneration strategies",
      "Tax-efficient business decisions",
      "Year-end tax planning",
      "Transaction and restructuring considerations",
      "Ongoing tax advisory",
    ],
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Industries (approved copy)                                          */
/* ------------------------------------------------------------------ */

export interface IndustryDef {
  name: string;
  icon: "store" | "truck" | "factory" | "briefcase" | "heart" | "landmark";
  blurb: string;
}

export const industries: IndustryDef[] = [
  {
    name: "Retail & E-commerce",
    icon: "store",
    blurb:
      "Inventory, sales-tax, and multi-channel bookkeeping for single stores through multi-location retailers.",
  },
  {
    name: "Transportation",
    icon: "truck",
    blurb:
      "Owner-operators and fleets — fuel, per-diem, and compliance handled with sector-specific know-how.",
  },
  {
    name: "Manufacturing",
    icon: "factory",
    blurb:
      "Costing, margins, and reporting that keep production-driven businesses in control of their numbers.",
  },
  {
    name: "Professional Services",
    icon: "briefcase",
    blurb:
      "Physicians, dentists, lawyers, PRECs, and consultants — including owner-manager tax strategy.",
  },
  {
    name: "Not-for-Profits",
    icon: "heart",
    blurb:
      "Fund accounting, board-ready statements, and assurance tailored to the not-for-profit sector.",
  },
  {
    name: "Real Estate & Trusts",
    icon: "landmark",
    blurb:
      "Structuring, reporting, and tax planning for real estate holdings and trust arrangements.",
  },
];

/* ------------------------------------------------------------------ */
/* Values (approved copy — "What Sets Us Apart")                       */
/* ------------------------------------------------------------------ */

export const values = [
  {
    title: "Quality",
    body: "Quality is more than completing an engagement — it is building a relationship you can rely on. We communicate clearly, meet deadlines, and deliver work with care. Our pricing is transparent, with no unexpected surprises.",
  },
  {
    title: "Customization & Collaboration",
    body: "No two businesses are the same. We work collaboratively to understand what matters most to you and tailor our accounting, tax, and advisory services to your goals, operations, and stage of growth.",
  },
  {
    title: "Integrity & Professionalism",
    body: "Trust is the foundation of every client relationship. We uphold the professional standards and ethics of the CPA profession, approach every engagement with due diligence, and communicate with honesty.",
  },
  {
    title: "Responsiveness & Efficiency",
    body: "Your time matters. We strive to respond to client inquiries within one business day during regular business hours, combining streamlined processes with modern accounting technology.",
  },
  {
    title: "Technology with Purpose",
    body: "The right technology makes accounting simpler, not more complicated. We use cloud-based platforms and digital tools to streamline workflows and spend more time helping you make better decisions.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Navigation & footer (labels + routes in one place)                  */
/* ------------------------------------------------------------------ */

export interface NavItem {
  /** Short header label. */
  label: string;
  href: string;
  /** Optional longer footer label. */
  footerLabel?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  practice: {
    heading: "Practice",
    items: [
      { label: "Accounting & Payroll", href: "/services/accounting-payroll" },
      { label: "Corporate Tax", href: "/services/corporate-tax" },
      {
        label: "Financial Statements & Assurance",
        href: "/services/financial-statements-assurance",
      },
      { label: "Business Advisory", href: "/services/business-advisory" },
      { label: "Personal Tax", href: "/services/personal-tax" },
      { label: "CRA Representation", href: "/services/cra-representation" },
      { label: "Tax Planning", href: "/services/tax-planning" },
    ],
  },
  firm: {
    heading: "Firm",
    items: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Static indexable routes (non-service, non-post). Sitemap merges      */
/* these with services + published posts (src/lib/posts.ts).            */
/* ------------------------------------------------------------------ */

export interface StaticRoute {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}

export const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

/* ------------------------------------------------------------------ */
/* Redirect table — one list, consumed by next.config.ts               */
/* Legacy/renamed paths → canonical paths (301).                        */
/* ------------------------------------------------------------------ */

export interface RedirectDef {
  source: string;
  destination: string;
  permanent: boolean;
}

export const redirects: RedirectDef[] = [
  { source: "/services/assurance", destination: "/services/financial-statements-assurance", permanent: true },
  { source: "/services/cra", destination: "/services/cra-representation", permanent: true },
  { source: "/blog", destination: "/resources", permanent: true },
  { source: "/blog/:slug", destination: "/resources/:slug", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
];

/* ------------------------------------------------------------------ */
/* URL helpers                                                          */
/* ------------------------------------------------------------------ */

/** Absolute URL for any path (leading slash normalized, no trailing slash). */
export function absoluteUrl(path = "/"): string {
  const clean = "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean === "/" ? site.domain + "/" : site.domain + clean;
}

/** Canonical URL (same rule as absoluteUrl — non-trailing-slash origin). */
export function canonical(path = "/"): string {
  return absoluteUrl(path);
}
