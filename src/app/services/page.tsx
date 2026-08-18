import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
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
        intro="From day-to-day bookkeeping to assurance and proactive tax strategy — senior-level expertise, tailored to your business and never outsourced."
        crumbs={crumbs}
      />
      <Section tone="surface">
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
