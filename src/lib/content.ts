/**
 * Editorial content that isn't structural config: stats, process, trust
 * markers, testimonials, FAQ. Kept in one place so copy edits are trivial.
 *
 * NOTE ON HONESTY:
 *  - Stats and trust markers are owner-approved (see docs/MISSING_INFO.md).
 *  - Testimonials render as visible HTML only. No Review/AggregateRating
 *    JSON-LD is emitted anywhere on the site.
 *  - FAQs render as visible HTML only. No FAQPage JSON-LD.
 */

export interface Stat {
  value: string;
  label: string;
}

/** Owner-approved headline metrics (confirm accuracy before launch). */
export const stats: Stat[] = [
  { value: "10+", label: "Years of CPA experience" },
  { value: "98%", label: "Client retention" },
  { value: "100+", label: "Clients served" },
];

/**
 * Trust badges — official accreditation logos supplied by the firm.
 * `wide` flags the horizontal wordmark so the strip can size it consistently
 * against the portrait seals.
 */
// width/height are the assets' intrinsic pixel dimensions — passed to
// next/image so the box is reserved (no CLS) and the display size is set
// responsively in CSS via a fixed height + w-auto.
export const trustLogos = [
  {
    src: "/trust/bbb.png",
    alt: "BBB Accredited Business",
    wide: false,
    width: 187,
    height: 300,
  },
  {
    src: "/trust/cpa.png",
    alt: "CPA Chartered Professional Accountants Ontario",
    wide: true,
    width: 392,
    height: 129,
  },
  {
    src: "/trust/quickbooks.png",
    alt: "QuickBooks Certified ProAdvisor",
    wide: false,
    width: 226,
    height: 300,
  },
];

export interface Step {
  number: string;
  title: string;
  body: string;
}

export const howWeWork: Step[] = [
  {
    number: "01",
    title: "Discovery call",
    body: "A 30-minute conversation to understand your business, current setup, and where you want to be.",
  },
  {
    number: "02",
    title: "Tailored proposal",
    body: "A clear scope, fixed-fee pricing, and a roadmap, with no surprises and no per-email billing.",
  },
  {
    number: "03",
    title: "Seamless onboarding",
    body: "We set up your cloud accounting, bring your records current, and connect the tools you already use.",
  },
  {
    number: "04",
    title: "Ongoing partnership",
    body: "Proactive, senior-level support with clear communication and deadlines you can rely on.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/**
 * Owner-approved testimonials from supplied materials.
 * A third recent Google review is still pending (see docs/MISSING_INFO.md).
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Khushpreet is extremely reliable and dependable. She can be counted on to work very hard at anything she's asked to do. I would highly recommend her for anyone's accounting and compliance needs.",
    name: "Ari K.",
    role: "Business Owner",
  },
  {
    quote:
      "Amazing service! It was my first year filing taxes as a small business owner and confusing as it can be, she made the process seamless and guided me through every step.",
    name: "Small Business Client",
    role: "Personal & Corporate Tax",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Where is ALOE based and who do you serve?",
    a: "We are based in Brampton, Ontario, and serve clients across the Greater Toronto Area and Canada, both in-person and through secure cloud-based workflows.",
  },
  {
    q: "What does onboarding look like?",
    a: "It starts with a short discovery call, followed by a tailored, fixed-fee proposal. Once you're ready, we set up your cloud accounting, bring your records current, and connect the tools you already use.",
  },
  {
    q: "Do you work with sole proprietors and incorporated businesses?",
    a: "Yes. We work with sole proprietors, incorporated businesses, professional corporations (including PRECs), and not-for-profits, and we tailor our services to your structure and stage of growth.",
  },
  {
    q: "How is pricing structured?",
    a: "Pricing is transparent and typically fixed-fee, agreed up front in your proposal. No unexpected surprises and no per-email billing.",
  },
  {
    q: "Are you a licensed CPA firm?",
    a: "Yes. ALOE Accounting and Tax is a licensed public accounting firm in Ontario, upholding the professional standards and ethics of the CPA profession.",
  },
];

/** About-page FAQ. */
export const aboutFaqs: Faq[] = [
  {
    q: "Where is ALOE located?",
    a: "We're at 285 Steeles Ave W, Suite 201 in Brampton, Ontario, and serve clients across the GTA and Canada, in person and through secure cloud-based workflows.",
  },
  {
    q: "Who will I be working with?",
    a: "Our lead CPA, Khushpreet Sran, and our team. You get senior-level attention on your engagement, not a hand-off to junior staff you never meet.",
  },
  {
    q: "Is ALOE a licensed CPA firm?",
    a: "Yes. ALOE Accounting and Tax is a licensed public accounting firm in Ontario, upholding the standards and ethics of the CPA profession.",
  },
  {
    q: "What industries do you work with?",
    a: "A diverse range, including professional services (physicians, dentists, lawyers, PRECs), retail, transportation, manufacturing, and not-for-profits.",
  },
];

/** Industries-page FAQ. */
export const industriesFaqs: Faq[] = [
  {
    q: "What if my industry isn't listed?",
    a: "The industries shown are where we have particular depth, but we work with businesses across many sectors. Reach out and we'll tell you honestly whether we're a good fit.",
  },
  {
    q: "Do you understand the tax rules specific to my sector?",
    a: "Yes. Different industries carry different tax and reporting considerations, and we tailor our work to yours, whether you're in transportation, retail, professional services, or beyond.",
  },
  {
    q: "Do you work with professional corporations (PRECs, medical, dental, legal)?",
    a: "We do. Professional services, including physicians, dentists, lawyers, and PRECs, are a core part of our practice, including owner-manager tax strategy.",
  },
];

/** About-page founder (from approved copy). */
export const founder = {
  name: "Khushpreet Sran, CPA",
  jobTitle: "Lead CPA",
  image: "/khushpreet-sran.jpg",
  /** Credentials visible in the supplied portrait — owner-approved. */
  credentials: "CPA · Bachelor of Business Administration, Wilfrid Laurier University",
  bio: [
    "Khushpreet is the lead CPA at ALOE Accounting and Tax, bringing experience across audit, taxation, bookkeeping, payroll, and financial reporting to every engagement.",
    "She has worked with clients across the GTA and Canada, serving retail, professional services, transportation, manufacturing, and not-for-profits, and is known for clear communication, dependability, and going above and beyond for the people she works with.",
  ],
};
