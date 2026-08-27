import Image from "next/image";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { contact } from "@/lib/site.config";

/**
 * Reusable closing CTA. Dark band with the two primary conversions:
 * book a consultation (contact) and email the team.
 */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_85%_100%,rgba(21,197,140,0.16),transparent_55%)]"
      />
      <Container className="relative py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-eyebrow text-brand">
              Let&apos;s talk
            </p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl md:text-[2.75rem]">
              Bring clarity to your numbers.{" "}
              <span className="italic text-brand">Starting today.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Book a complimentary 30-minute consultation. No pressure, no
              obligation, just clear, senior-level guidance on your next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Book a consultation
              </ButtonLink>
              <TrackedLink
                href={contact.emailHref}
                event="email_click"
                className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Email the team
              </TrackedLink>
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-card border border-white/10 lg:block">
            <Image
              src="/photos/khush-cta.jpg"
              alt="Khushpreet Sran, CPA and founder of ALOE Accounting and Tax"
              fill
              sizes="30vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
