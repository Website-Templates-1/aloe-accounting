import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Reusable FAQ section — accessible native <details> accordion (works with no
 * JS). Visible HTML only; the site deliberately emits NO FAQPage JSON-LD
 * (Google deprecated FAQ rich results for non-gov/health sites), so the value
 * here is on-page content depth + "people also ask" coverage.
 */
export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Questions, answered.",
  intro = "Can't find what you're looking for? Reach out and we'll respond within one business day.",
}: {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <Container>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p className="mt-5 text-slate-body">{intro}</p>
          <ArrowLink href="/contact" className="mt-6">
            Ask us anything
          </ArrowLink>
        </div>
        <div className="divide-y divide-border-soft overflow-hidden rounded-card border border-border-soft bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5 [&_svg]:open:rotate-180">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-ink">
                {f.q}
                <svg
                  className="h-5 w-5 shrink-0 text-slate-body transition-transform"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Container>
  );
}
