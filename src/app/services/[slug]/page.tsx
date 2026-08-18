import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, ButtonLink, ArrowLink } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLd,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/jsonld";
import { services, getService, contact } from "@/lib/site.config";

/** Prerender every service at build. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={service.summary}
        crumbs={crumbs}
      >
        <ButtonLink href="/contact" variant="primary" withArrow>
          Get a quote
        </ButtonLink>
      </PageHero>

      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* Main */}
            <div>
              <p className="text-lg leading-relaxed text-slate-body">
                {service.intro}
              </p>

              <h2 className="mt-12 text-2xl font-bold text-ink">
                {service.bulletsHeading}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-2xl border border-border-soft bg-white p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                      <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                        <path
                          d="M4 10.5l3.5 3.5L16 6"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-ink">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-border-soft bg-surface-alt p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-navy-950">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-ink">
                  Talk to a CPA about {service.title.toLowerCase()}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">
                  Book a complimentary 30-minute consultation, or reach us
                  directly — we respond within one business day.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/contact" variant="dark" withArrow>
                    Book a consultation
                  </ButtonLink>
                  <a
                    href={contact.phoneHref}
                    className="text-center text-sm font-semibold text-brand-700 hover:text-brand-600"
                  >
                    Call {contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related services */}
      <Section tone="alt">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-ink">Related services</h2>
            <ArrowLink href="/services">All services</ArrowLink>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group flex flex-col gap-3 rounded-card border border-border-soft bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <span className="font-bold text-ink group-hover:text-brand-700">
                  {r.title}
                </span>
                <span className="text-sm text-slate-body">{r.summary}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.metaDescription,
          path,
        })}
      />
    </>
  );
}
