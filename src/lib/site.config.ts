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
  /** Canonical origin: https, www, NO trailing slash. Pick one host, stick to it. */
  domain: "https://www.aloeaccountingandtax.com",
  locale: "en_CA",
  htmlLang: "en-CA",
  defaultTitle: "ALOE Accounting and Tax | Brampton CPA Firm",
  titleTemplate: "%s | ALOE Accounting and Tax",
  defaultDescription:
    "ALOE Accounting and Tax is a licensed Brampton CPA firm offering accounting, payroll, corporate & personal tax, assurance, and advisory across the GTA and Canada.",
  /** OG image path (relative). Replace when real artwork is supplied. */
  ogImage: "/og-default.png",
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
    postalCode: "L6Y 0P8",
    country: "CA",
    countryName: "Canada",
  },
  /** Human-readable one-liner. */
  addressLine: "285 Steeles Ave W., Suite 201, Brampton, ON L6Y 0P8",
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

/** Real, verified social profiles. Drives footer icons + JSON-LD sameAs. */
export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/aloeaccountingandtax",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aloeaccountingandtax/",
    icon: "linkedin",
  },
] as const;

/** sameAs list for Organization/ProfessionalService JSON-LD (derived). */
export const socialProfiles: string[] = socialLinks.map((s) => s.href);

/**
 * Google Business Profile — source for live reviews (via Places API).
 * Live fetch activates when GOOGLE_MAPS_API_KEY is set; otherwise the site
 * falls back to the static testimonials in content.ts.
 */
export const googleBusiness = {
  placeId: "ChIJiYpKWNo_K4gR7WwrTBJ5amo",
  /** Owner-shared public link to the Google Business Profile (fallback). */
  profileUrl: "https://share.google/EHEnobJTr5KfiPjI2",
  /** Canonical Google Maps link (cid) — used for schema `hasMap`. */
  mapUrl: "https://maps.google.com/?cid=7668074435045977325",
  /** Verified office coordinates (from Places API) for schema `geo`. */
  geo: { latitude: 43.6594316, longitude: -79.7398342 },
  /** Cities served (structured areaServed). */
  areaServed: ["Brampton", "Mississauga", "Caledon", "Toronto"],
  /** Only surface reviews at/above this rating (Google shows all anyway). */
  minRating: 4,
  /** Max reviews to display (Places API returns up to 5). */
  count: 3,
} as const;

/**
 * Business hours — sourced from the Google Business Profile (Places API).
 * Used for the Contact page and LocalBusiness openingHoursSpecification.
 * Update here if the firm changes its hours on Google.
 */
export const businessHours = {
  /** Days open (used for schema dayOfWeek + display). */
  openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  opens: "09:00",
  closes: "17:30",
  /** Human-readable rows for the Contact page. */
  display: [
    { label: "Monday – Friday", value: "9:00 AM – 5:30 PM" },
    { label: "Saturday – Sunday", value: "Closed" },
  ],
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
  /** Outcome-focused benefit cards (3–4). */
  benefits?: { title: string; body: string }[];
  /** Ideal clients / situations for this service (4–6). */
  whoFor?: string[];
  /** "What to expect" engagement steps (3–4). */
  process?: { title: string; body: string }[];
  /** Service-specific FAQ (visible HTML only — no FAQPage schema). */
  faqs?: { q: string; a: string }[];
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
    benefits: [
      {
        title: "Books that are always current",
        body: "Monthly reconciliations mean you're never scrambling at year-end — your numbers stay accurate and decision-ready whenever you need them.",
      },
      {
        title: "Payroll done right, on time",
        body: "QBO payroll, source deductions, and remittances handled correctly, so you avoid CRA penalties and your team is paid without fuss.",
      },
      {
        title: "A clean year-end handoff",
        body: "Organized records and year-end adjusting entries make tax time faster, smoother, and less expensive.",
      },
      {
        title: "More time on your business",
        body: "Offload day-to-day bookkeeping and administration so you can focus on running and growing your company.",
      },
    ],
    whoFor: [
      "Small and growing businesses that have outgrown DIY bookkeeping",
      "Owners running payroll for employees or themselves",
      "Businesses on QuickBooks Online, or ready to move to it",
      "Companies that want tidy, CRA-ready books all year — not just at tax time",
      "Anyone behind on their bookkeeping and needing a catch-up",
    ],
    process: [
      {
        title: "Onboarding & setup",
        body: "We review your current bookkeeping, set up or clean up your QBO file, and agree on a monthly workflow.",
      },
      {
        title: "Ongoing bookkeeping & payroll",
        body: "We reconcile accounts, process payroll and remittances, and keep your records current each period.",
      },
      {
        title: "Reporting",
        body: "You receive clear, up-to-date financial statements and management reports you can actually use.",
      },
      {
        title: "Year-end preparation",
        body: "We complete year-end adjusting entries and hand off clean records for tax filing.",
      },
    ],
    faqs: [
      {
        q: "Do you work in QuickBooks Online?",
        a: "Yes — we work primarily in QuickBooks Online, and can help you migrate to it. Bookkeeping, payroll, and remittances all live in one place so your records stay consistent.",
      },
      {
        q: "Can you catch up books that are behind?",
        a: "Absolutely. Catch-up and clean-up work is common. We'll bring your records current and reconcile prior periods before setting up an ongoing monthly workflow.",
      },
      {
        q: "How often will I receive financial statements?",
        a: "Typically monthly, though we tailor the cadence to your needs. You'll get clear, current statements you can actually use to make decisions.",
      },
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
    benefits: [
      {
        title: "Fewer year-end surprises",
        body: "By reviewing your position through the year, we help you anticipate what you'll owe — no last-minute shocks at filing time.",
      },
      {
        title: "A tax position managed all year",
        body: "Corporate tax isn't just a once-a-year form. We look for opportunities to manage your position as business decisions come up.",
      },
      {
        title: "Owner-manager tax efficiency",
        body: "We coordinate your corporate and personal tax so your salary and dividend mix and remuneration are structured sensibly.",
      },
      {
        title: "Confident CRA compliance",
        body: "Accurate T2 returns and GST/HST filings, prepared to CPA standards, keep your corporation onside with the CRA.",
      },
    ],
    whoFor: [
      "Incorporated businesses and Canadian-controlled private corporations (CCPCs)",
      "Owner-managers taking salary, dividends, or both",
      "Corporations registered for — or needing to register for — GST/HST",
      "Companies behind on T2 filings or facing CRA correspondence",
      "Businesses planning a transaction, purchase, or restructuring",
    ],
    process: [
      {
        title: "Review & scope",
        body: "We review your corporation's financials, prior returns, and structure to understand your full tax picture.",
      },
      {
        title: "Prepare & optimize",
        body: "We prepare your T2 and GST/HST filings while identifying deductions, credits, and planning opportunities.",
      },
      {
        title: "File & remit",
        body: "We file accurately and on time, and make sure you know what to remit and when.",
      },
      {
        title: "Plan ahead",
        body: "We flag decisions and strategies to manage next year's tax before the year closes.",
      },
    ],
    faqs: [
      {
        q: "When is my T2 corporate tax return due?",
        a: "A T2 return is generally due six months after your fiscal year-end, with any balance owing due two or three months after year-end depending on your corporation. We confirm your exact dates and keep you ahead of them.",
      },
      {
        q: "Should I pay myself salary or dividends?",
        a: "It depends on your income, cash flow, and goals — there's no single right answer. We look at your corporate and personal positions together to recommend a mix that fits you.",
      },
      {
        q: "Do you handle GST/HST filings too?",
        a: "Yes. We manage GST/HST registration, filing, and remittances alongside your corporate tax so everything stays consistent and compliant.",
      },
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
    benefits: [
      {
        title: "Statements stakeholders trust",
        body: "Financial statements prepared to professional standards give lenders, investors, and partners confidence in your numbers.",
      },
      {
        title: "The right level of assurance",
        body: "Whether you need a compilation, review, or audit, we scope the engagement to what your situation actually requires — no over-servicing.",
      },
      {
        title: "Clarity for better decisions",
        body: "Well-prepared statements aren't just for compliance; they help you understand and steer your business.",
      },
      {
        title: "Professional, on-time delivery",
        body: "Careful preparation and clear communication mean your reporting is ready when your bank, board, or deadline needs it.",
      },
    ],
    whoFor: [
      "Businesses whose lender or investors require financial statements",
      "Companies needing a compilation, review, or audit engagement",
      "Not-for-profits with board or funder reporting requirements",
      "Owners who want credible, well-structured year-end statements",
      "Businesses preparing for financing, a sale, or due diligence",
    ],
    process: [
      {
        title: "Determine the engagement",
        body: "We discuss your needs and your stakeholders' requirements to choose the right level of assurance.",
      },
      {
        title: "Gather & prepare",
        body: "We collect the necessary records and prepare your financial statements to the applicable standard.",
      },
      {
        title: "Review & finalize",
        body: "We perform the required procedures, resolve questions with you, and finalize the statements.",
      },
      {
        title: "Deliver & explain",
        body: "We deliver your statements and walk you through what they show.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between a compilation, review, and audit?",
        a: "They offer increasing levels of assurance. A compilation presents your information without assurance, a review provides limited assurance, and an audit provides the highest level. We help you choose the one your situation and stakeholders actually require.",
      },
      {
        q: "Does my business need audited financial statements?",
        a: "Not always — many small businesses need only a compilation or review. It usually depends on what your lender, investors, or bylaws require. We'll help you determine the right level.",
      },
      {
        q: "Can you prepare statements for my bank or investors?",
        a: "Yes. We prepare financial statements to professional standards that lenders, investors, and other stakeholders can rely on.",
      },
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
    benefits: [
      {
        title: "Decisions backed by numbers",
        body: "We turn your financial data into clear insight, so you can evaluate opportunities with confidence rather than guesswork.",
      },
      {
        title: "Cash flow you can see coming",
        body: "Cash flow planning and forecasting help you anticipate crunches and fund growth on your terms.",
      },
      {
        title: "A plan, not just a report",
        body: "Budgets and forecasts give you targets to steer toward and a way to measure how you're tracking.",
      },
      {
        title: "A sounding board that knows your business",
        body: "Ongoing advisory means you have a CPA to think through the big decisions with, as they come up.",
      },
    ],
    whoFor: [
      "Owners scaling an established business",
      "Entrepreneurs planning growth, hiring, or investment",
      "Businesses that want budgeting and forecasting, not just history",
      "Owners weighing a major decision, purchase, or expansion",
      "Companies that want a CPA involved beyond tax season",
    ],
    process: [
      {
        title: "Understand your goals",
        body: "We start with where you want to take the business and what decisions are on the table.",
      },
      {
        title: "Analyze the numbers",
        body: "We dig into your financials — margins, cash flow, and performance — to see what they're telling us.",
      },
      {
        title: "Build the plan",
        body: "We develop budgets, forecasts, and options tailored to your goals.",
      },
      {
        title: "Review & adjust",
        body: "We revisit the plan as things change, so it stays useful rather than static.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be a large company to benefit from advisory?",
        a: "No. Owners of small and growing businesses often benefit most — having a CPA to interpret your numbers and plan ahead is valuable at any size.",
      },
      {
        q: "What does business advisory actually include?",
        a: "It ranges from cash-flow planning and budgeting to forecasting, performance analysis, and thinking through major decisions. We tailor it to what you need.",
      },
      {
        q: "How is advisory different from bookkeeping or tax?",
        a: "Bookkeeping and tax look after compliance and history; advisory is forward-looking — using your numbers to help you make better decisions.",
      },
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
    benefits: [
      {
        title: "Personal and corporate tax, considered together",
        body: "We look at your T1 alongside your corporation, so decisions on salary, dividends, and timing make sense across both.",
      },
      {
        title: "Remuneration that fits your goals",
        body: "We help structure how you pay yourself to balance tax, cash flow, and long-term planning.",
      },
      {
        title: "All your income, handled correctly",
        body: "Investment, dividend, and other income reported accurately, so your return is complete and optimized.",
      },
      {
        title: "Advice you can act on",
        body: "Beyond filing, we flag planning opportunities relevant to your personal situation.",
      },
    ],
    whoFor: [
      "Owner-managers of our corporate clients",
      "Business owners taking a salary and dividend mix",
      "Individuals with investment or other income to report",
      "Owners who want personal and corporate tax coordinated",
      "People who want proactive advice, not just a filed return",
    ],
    process: [
      {
        title: "Gather your information",
        body: "We collect your slips and details, and factor in your corporate position where relevant.",
      },
      {
        title: "Prepare & optimize",
        body: "We prepare your T1, applying the credits and strategies that fit your situation.",
      },
      {
        title: "Review together",
        body: "We walk you through your return and answer your questions before filing.",
      },
      {
        title: "File & advise",
        body: "We file on time and note planning points to consider for next year.",
      },
    ],
    faqs: [
      {
        q: "Do you only do personal tax for business owners?",
        a: "Our personal tax work is designed to complement our corporate clients' business and tax strategy, so we focus on owner-managers and their families rather than standalone personal returns.",
      },
      {
        q: "Can you coordinate my personal and corporate taxes?",
        a: "Yes — that's the point. We consider both together so decisions on salary, dividends, and timing work in your favour across the board.",
      },
      {
        q: "When is my personal tax return due?",
        a: "Personal (T1) returns are generally due April 30. Self-employed individuals have until June 15 to file, though any balance owing is still due April 30. We keep you on track.",
      },
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
    benefits: [
      {
        title: "A professional in your corner",
        body: "You don't face the CRA alone — we deal with them on your behalf, so you're not navigating it under pressure.",
      },
      {
        title: "The issue understood, then addressed",
        body: "We take the time to understand what the CRA is asking and prepare the right documentation to respond.",
      },
      {
        title: "Clear, timely communication",
        body: "We manage correspondence and deadlines, so nothing slips and the matter keeps moving.",
      },
      {
        title: "Your rights and options protected",
        body: "From reassessments to notices of objection, we help you respond appropriately and pursue the options available to you.",
      },
    ],
    whoFor: [
      "Businesses or individuals under CRA audit or review",
      "Taxpayers who received a reassessment they disagree with",
      "Anyone needing to file a notice of objection",
      "People behind on filings or facing CRA correspondence",
      "Owners who want a CPA to handle the CRA on their behalf",
    ],
    process: [
      {
        title: "Understand the situation",
        body: "We review the CRA's request or assessment and your records to understand exactly what's at issue.",
      },
      {
        title: "Prepare the response",
        body: "We assemble the appropriate documentation and position, and agree on the approach with you.",
      },
      {
        title: "Represent you with the CRA",
        body: "We communicate with the CRA on your behalf and manage the back-and-forth.",
      },
      {
        title: "Resolve & prevent",
        body: "We work toward a resolution and flag steps to help avoid similar issues going forward.",
      },
    ],
    faqs: [
      {
        q: "Can you deal with the CRA on my behalf?",
        a: "Yes. With your authorization, we communicate with the CRA directly, manage correspondence, and represent you through audits, reviews, and disputes.",
      },
      {
        q: "What should I do if I received a reassessment?",
        a: "Don't ignore it — there are deadlines. Send it to us and we'll review it, explain your options, and help you respond, including filing a notice of objection if appropriate.",
      },
      {
        q: "I'm behind on my filings. Can you help?",
        a: "Yes. We help clients get caught up on overdue filings and work with the CRA to resolve the situation as smoothly as possible.",
      },
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
    benefits: [
      {
        title: "Plan before the deadline, not after",
        body: "Effective planning happens through the year, while there's still time to act — not scrambling at filing time.",
      },
      {
        title: "Decisions made with tax in mind",
        body: "We consider the tax impact of your business and personal decisions before you make them.",
      },
      {
        title: "A coordinated corporate and personal strategy",
        body: "We look at both sides together, so remuneration and timing work in your favour.",
      },
      {
        title: "Fewer surprises, more control",
        body: "Anticipating tax implications means better cash-flow planning and no unwelcome year-end shocks.",
      },
    ],
    whoFor: [
      "Incorporated owners planning remuneration and dividends",
      "Businesses approaching year-end wanting to manage their position",
      "Owners considering a transaction, restructuring, or major purchase",
      "People who want proactive strategy, not just compliance",
      "Clients coordinating corporate and personal tax decisions",
    ],
    process: [
      {
        title: "Assess your circumstances",
        body: "We review your business and personal situation to understand the full picture.",
      },
      {
        title: "Identify opportunities",
        body: "We pinpoint strategies — remuneration, timing, and structure — that fit your goals.",
      },
      {
        title: "Map the plan",
        body: "We lay out the decisions and their tax implications, so you know what to do and when.",
      },
      {
        title: "Revisit regularly",
        body: "We review the plan as circumstances and rules change, especially before year-end.",
      },
    ],
    faqs: [
      {
        q: "When should I start tax planning?",
        a: "Before year-end, and ideally throughout the year — that's when there's still time to act. Planning after the year closes leaves far fewer options.",
      },
      {
        q: "Isn't tax planning just for large businesses?",
        a: "No. Owner-managers of small and mid-sized businesses benefit significantly from proactive planning around remuneration, timing, and structure.",
      },
      {
        q: "How is tax planning different from filing my taxes?",
        a: "Filing reports what already happened; planning shapes what happens next — making decisions with tax in mind so you're not just reacting at the deadline.",
      },
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
  { label: "Blog", href: "/blog" },
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
      { label: "Blog", href: "/blog" },
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
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
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
  { source: "/resources", destination: "/blog", permanent: true },
  { source: "/resources/:slug", destination: "/blog/:slug", permanent: true },
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
