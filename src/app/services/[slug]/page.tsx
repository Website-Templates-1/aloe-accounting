import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Section,
  ButtonLink,
  ArrowLink,
  SectionHeading,
} from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PeopleAlsoSearch } from "@/components/sections/PeopleAlsoSearch";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
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

/** Small green check used across lists. */
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
  const siblings = services.filter((s) => s.slug !== service.slug);
  const related = siblings.slice(0, 3);
  const relatedSearches = [
    ...siblings.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    { label: "Industries we serve", href: "/industries" },
    { label: "About our Brampton CPA firm", href: "/about" },
    { label: "Book a free consultation", href: "/contact" },
  ];

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

      {/* Overview + what's included */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
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
                      <Check className="h-3.5 w-3.5" />
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
                  directly. We respond within one business day.
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

      {/* Benefits & outcomes */}
      {service.benefits && service.benefits.length > 0 && (
        <Section tone="alt">
          <Container>
            <SectionHeading
              eyebrow="Benefits"
              title="What you gain"
              accent={`with ${service.title.toLowerCase()}.`}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <div
                  key={b.title}
                  className="flex flex-col gap-4 rounded-card border border-border-soft bg-white p-8"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-ink">{b.title}</h3>
                  <p className="leading-relaxed text-slate-body">{b.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Who it's for */}
      {service.whoFor && service.whoFor.length > 0 && (
        <Section tone="surface">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeading eyebrow="Who it's for" title="Is this right for you?" />
                <p className="mt-5 text-lg leading-relaxed text-slate-body">
                  We tailor {service.title.toLowerCase()} to your situation. It&apos;s
                  a strong fit if you recognise yourself below, and if you&apos;re
                  not sure, a quick call will tell us both.
                </p>
                <ArrowLink href="/industries" className="mt-6">
                  See the industries we serve
                </ArrowLink>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {service.whoFor.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-3 rounded-2xl border border-border-soft bg-white p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-ink">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      {/* How it works / process */}
      {service.process && service.process.length > 0 && (
        <Section tone="alt">
          <Container>
            <SectionHeading
              eyebrow="How it works"
              title="What to expect"
              accent="when you work with us."
            />
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col gap-4 rounded-card border border-border-soft bg-white p-8"
                >
                  <span className="text-4xl font-extrabold text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-body">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <Section tone="surface">
          <FaqSection
            faqs={service.faqs}
            title={`${service.title}: questions, answered.`}
          />
        </Section>
      )}

      {/* Related services + people also search for */}
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
          <div className="mt-14 border-t border-border-soft pt-10">
            <PeopleAlsoSearch items={relatedSearches} />
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
