import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { IndustriesGrid } from "@/components/sections/blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Specialized CPA expertise across Canadian industries — retail & e-commerce, transportation, manufacturing, professional services, not-for-profits, and real estate & trusts.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries served"
        title="Specialized expertise across Canadian industries."
        intro="From single-truck operators to multi-location retailers — we speak your sector's language and know its tax landscape."
        crumbs={crumbs}
      />
      <Section tone="navy">
        <IndustriesGrid withHeading={false} />
      </Section>
      <CtaBand />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
