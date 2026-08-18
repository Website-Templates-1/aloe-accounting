import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { ValuesGrid } from "@/components/sections/blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, aboutPageSchema } from "@/lib/jsonld";
import { founder } from "@/lib/content";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const aboutStats = [
  { value: "12+", label: "Years experience" },
  { value: "GTA", label: "Service region" },
  { value: "CPA", label: "Fully licensed" },
];

export const metadata: Metadata = buildMetadata({
  title: "About Our Firm",
  description:
    "Meet ALOE Accounting and Tax — a licensed Brampton CPA firm led by Khushpreet Sran, CPA, delivering accounting, tax, and advisory across the GTA and Canada.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet ALOE"
        title="Accounting that works for your business — not the other way around."
        intro="A progressive, licensed public accounting firm in Brampton, Ontario, combining technical expertise with a practical, business-minded approach."
        crumbs={crumbs}
      />

      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="prose-aloe max-w-none">
              <p>
                ALOE Accounting and Tax is a licensed public accounting firm
                based in Brampton, Ontario. With deep experience across
                bookkeeping, financial statements, payroll, and tax, we bring
                the precision your business needs and the perspective your future
                demands.
              </p>
              <p>
                We provide tailored accounting, tax, financial reporting,
                payroll, and advisory services to businesses across the GTA and
                remotely throughout Canada. Our experience spans a diverse range
                of industries — including professional services (physicians,
                dentists, lawyers, PRECs), consulting, retail, transportation,
                manufacturing, and not-for-profits.
              </p>
              <p>
                Our senior accountant, <strong>{founder.name}</strong>, has
                worked with clients across the GTA and Canada, bringing both
                technical depth and a broader understanding of the businesses we
                serve. Whether you&apos;re building a new business or scaling an
                established one, we provide the insight, support, and practical
                guidance needed to make confident financial decisions.
              </p>
              <p>
                Your business is unique and your accounting should be too. We
                take the time to understand your business, explain your numbers,
                and provide guidance you can actually use — so you can focus on
                the part of your business you really enjoy.
              </p>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-border-soft bg-surface-alt p-8">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-slate-body">
                  At a glance
                </p>
                <dl className="mt-6 space-y-6">
                  {aboutStats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className="block text-3xl font-extrabold text-ink">
                          {s.value}
                        </span>
                        <span className="mt-1 block text-xs font-semibold uppercase tracking-eyebrow text-slate-body">
                          {s.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Lead CPA */}
      <Section tone="alt">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-card border border-border-soft bg-white shadow-sm lg:mx-0">
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.jobTitle} at ALOE Accounting and Tax`}
                  width={1024}
                  height={1280}
                  sizes="(min-width: 1024px) 400px, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Eyebrow>Lead CPA</Eyebrow>
              <h2 className="h-display mt-5 text-3xl sm:text-4xl">
                {founder.name}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-eyebrow text-brand-700">
                {founder.jobTitle}
              </p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-body">
                {founder.bio.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <p className="mt-6 border-t border-border-soft pt-6 text-sm font-medium text-ink">
                {founder.credentials}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <ValuesGrid />
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={aboutPageSchema({
          path: "/about",
          person: {
            name: founder.name,
            jobTitle: founder.jobTitle,
            image: founder.image,
            alumniOf: "Wilfrid Laurier University",
            credential: "Chartered Professional Accountant (CPA)",
          },
        })}
      />
    </>
  );
}
