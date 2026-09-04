import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services, industries, values } from "@/lib/site.config";
import { stats, trustLogos, howWeWork } from "@/lib/content";

/* ---------------------------------------------------------------- */
/* Stats row (on dark)                                              */
/* ---------------------------------------------------------------- */
export function StatsRow({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const value = tone === "dark" ? "text-white" : "text-ink";
  const label = tone === "dark" ? "text-white/55" : "text-slate-body";
  return (
    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className={`block text-4xl font-extrabold sm:text-5xl ${value}`}>
              {s.value}
            </span>
            <span
              className={`mt-2 block text-xs font-semibold uppercase tracking-eyebrow ${label}`}
            >
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- */
/* Trust strip                                                      */
/* ---------------------------------------------------------------- */
export function TrustStrip() {
  return (
    <div className="border-y border-border-soft bg-white py-8">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-evenly">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-eyebrow text-slate-body">
            <Icon name="shield" className="h-4 w-4 text-brand" />
            Accredited &amp; trusted
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-12">
            {trustLogos.map((logo) => (
              <li key={logo.src} className="flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`w-auto ${logo.wide ? "h-10 sm:h-11" : "h-14 sm:h-16"}`}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Services grid (home + hub)                                       */
/* ---------------------------------------------------------------- */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  const [featured, ...rest] = services;
  return (
    <Container>
      {heading && (
        <SectionHeading
          eyebrow="Services"
          title="Full-spectrum financial clarity,"
          accent="tailored to your firm."
          intro="Whether you're filing your first return or restructuring a multi-entity group, ALOE provides senior-level expertise, never outsourced."
        />
      )}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="lg:row-span-2">
          <ServiceCard service={featured} featured />
        </div>
        {rest.map((s, i) => (
          <ServiceCard
            key={s.slug}
            service={s}
            className={i === 4 ? "lg:col-start-2" : undefined}
          />
        ))}
      </div>
    </Container>
  );
}

/* ---------------------------------------------------------------- */
/* Values ("Why choose ALOE")                                       */
/* ---------------------------------------------------------------- */
const valueIcons = ["clipboard-check", "user", "shield", "trending-up", "calendar-clock"];
export function ValuesGrid() {
  return (
    <Container>
      <SectionHeading
        eyebrow="Why choose ALOE"
        title="The standards we hold"
        accent="every engagement to."
        intro={
          <>
            <strong className="font-bold text-brand">A</strong>ssets ={" "}
            <strong className="font-bold text-brand">L</strong>iabilities +{" "}
            <strong className="font-bold text-brand">O</strong>wner&apos;s{" "}
            <strong className="font-bold text-brand">E</strong>quity. Your
            numbers should do more than balance. They should help you move your
            business forward.
          </>
        }
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-border-soft bg-border-soft sm:grid-cols-2 lg:grid-cols-6">
        {values.map((v, i) => (
          <div
            key={v.title}
            className={`flex flex-col gap-4 bg-white p-8 ${
              i < 3 ? "lg:col-span-2" : "lg:col-span-3"
            } ${i === values.length - 1 ? "sm:col-span-2" : ""}`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon name={valueIcons[i % valueIcons.length]} className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-ink">{v.title}</h3>
            <p className="text-sm leading-relaxed text-slate-body">{v.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ---------------------------------------------------------------- */
/* How we work (4 steps)                                            */
/* ---------------------------------------------------------------- */
export function HowWeWork() {
  return (
    <Container>
      <SectionHeading
        eyebrow="How we work"
        title="A simple, transparent"
        accent="four-step engagement."
      />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howWeWork.map((step) => (
          <li
            key={step.number}
            className="flex flex-col gap-4 rounded-card border border-border-soft bg-white p-8"
          >
            <span className="text-4xl font-extrabold text-brand-300">
              {step.number}
            </span>
            <h3 className="text-lg font-bold text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed text-slate-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}

/* ---------------------------------------------------------------- */
/* Industries grid (dark)                                           */
/* ---------------------------------------------------------------- */
export function IndustriesGrid({
  withHeading = true,
  linkToPage = false,
}: {
  withHeading?: boolean;
  linkToPage?: boolean;
}) {
  return (
    <Container>
      {withHeading && (
        <SectionHeading
          tone="dark"
          eyebrow="Industries served"
          title="Specialized expertise across"
          accent="Canadian industries."
          intro="From single-truck operators to multi-location retailers, we speak your sector's language and know its tax landscape."
        />
      )}
      <div
        className={`${withHeading ? "mt-12 " : ""}grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {industries.map((ind) => (
          <div key={ind.name} className="flex flex-col gap-3 bg-navy-900 p-8">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-brand-400 ring-1 ring-white/10">
              <Icon name={ind.icon} className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-white">{ind.name}</h3>
            <p className="text-sm leading-relaxed text-white/60">{ind.blurb}</p>
          </div>
        ))}
      </div>
      {linkToPage && (
        <div className="mt-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 rounded-pill border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore industries
          </Link>
        </div>
      )}
    </Container>
  );
}

