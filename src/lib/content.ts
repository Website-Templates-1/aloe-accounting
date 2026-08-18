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
  { value: "12+", label: "Years CPA practice" },
  { value: "400+", label: "Returns filed annually" },
  { value: "98%", label: "Client retention" },
];

/** Text trust markers (logos pending asset delivery). */
export const trustMarkers: string[] = [
  "CPA Ontario",
  "CPA Canada",
  "QuickBooks ProAdvisor",
  "Xero Certified",
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
    body: "A clear scope, fixed-fee pricing, and a roadmap — no surprises, no per-email billing.",
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
    a: "We are based in Brampton, Ontario, and serve clients across the Greater Toronto Area and Canada — both in-person and through secure cloud-based workflows.",
  },
  {
    q: "What does onboarding look like?",
    a: "It starts with a short discovery call, followed by a tailored, fixed-fee proposal. Once you're ready, we set up your cloud accounting, bring your records current, and connect the tools you already use.",
  },
  {
    q: "Do you work with sole proprietors and incorporated businesses?",
    a: "Yes. We work with sole proprietors, incorporated businesses, professional corporations (including PRECs), and not-for-profits — and we tailor our services to your structure and stage of growth.",
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

/** About-page founder (from approved copy). */
export const founder = {
  name: "Khushpreet Sran, CPA",
  jobTitle: "Senior Accountant",
};
