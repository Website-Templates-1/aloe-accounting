import type { Metadata } from "next";
import Image from "next/image";
import { Container, ButtonLink, Section } from "@/components/ui/primitives";
import {
  StatsRow,
  TrustStrip,
  ServicesGrid,
  ValuesGrid,
  HowWeWork,
  IndustriesGrid,
} from "@/components/sections/blocks";
import { Reviews } from "@/components/sections/Reviews";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { intakeYear, site } from "@/lib/site.config";
import { faqs } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_120%_at_10%_0%,rgba(21,197,140,0.16),transparent_50%)]"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2.5 rounded-pill border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-eyebrow text-white/80">
                <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                Now accepting {intakeYear} clients
              </span>
              <h1 className="h-display mt-6 text-4xl sm:text-6xl md:text-[4.25rem]">
                Precision accounting for{" "}
                <span className="italic text-brand">ambitious</span> Canadian
                businesses.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
                ALOE is a Chartered Professional Accountant firm in Brampton,
                building clarity, compliance, and growth strategy for founders,
                family businesses, and not-for-profits across the GTA.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" variant="primary" withArrow>
                  Book a free consultation
                </ButtonLink>
                <ButtonLink href="/services" variant="ghost-dark">
                  Explore services
                </ButtonLink>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card border border-white/10 bg-white/5 lg:max-w-none">
              <Image
                src="/photos/hero-khush.jpg"
                alt="Khushpreet Sran, CPA and founder of ALOE Accounting and Tax"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-10">
            <StatsRow tone="dark" />
          </div>
        </Container>
      </section>

      <TrustStrip />

      <Section tone="surface">
        <ServicesGrid />
      </Section>

      <Section tone="alt">
        <ValuesGrid />
      </Section>

      <Section tone="surface">
        <HowWeWork />
      </Section>

      <Section tone="navy">
        <IndustriesGrid linkToPage />
      </Section>

      <Section tone="alt">
        <Reviews />
      </Section>

      <Section tone="surface">
        <FaqSection faqs={faqs} />
      </Section>

      <CtaBand />
    </>
  );
}
