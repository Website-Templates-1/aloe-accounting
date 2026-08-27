import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import { services } from "@/lib/site.config";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Accounting, payroll, corporate and personal tax, financial statements, assurance, advisory, CRA representation, and tax planning from a licensed Brampton CPA firm.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your business needs from a CPA firm."
        intro="From day-to-day bookkeeping to assurance and proactive tax strategy: senior-level expertise, tailored to your business and never outsourced."
        crumbs={crumbs}
      />
      <Section tone="surface">
        <Container>
          <div className="relative mb-12 aspect-[3/1] w-full overflow-hidden rounded-card border border-border-soft">
            <Image
              src="/photos/calculator-receipts.jpg"
              alt="Reviewing receipts with a calculator at ALOE Accounting and Tax"
              fill
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
        <ServicesGrid heading={false} />
      </Section>
      <CtaBand />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={itemListSchema(
          services.map((s) => ({
            name: s.title,
            path: `/services/${s.slug}`,
          })),
        )}
      />
    </>
  );
}
