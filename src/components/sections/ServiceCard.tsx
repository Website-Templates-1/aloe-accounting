import { Icon } from "@/components/ui/Icon";
import { ArrowLink } from "@/components/ui/primitives";
import type { ServiceDef } from "@/lib/site.config";

/** A single service card. `featured` renders the dark variant. */
export function ServiceCard({
  service,
  featured = false,
}: {
  service: ServiceDef;
  featured?: boolean;
}) {
  const href = `/services/${service.slug}`;
  if (featured) {
    return (
      <article className="group relative flex flex-col overflow-hidden rounded-card bg-navy-900 p-8 text-white sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(21,197,140,0.16),transparent_55%)]"
        />
        <div className="relative flex flex-col gap-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-navy-950">
            <Icon name={service.icon} className="h-6 w-6" />
          </span>
          <h3 className="text-2xl font-bold">{service.title}</h3>
          <p className="text-white/70">{service.summary}</p>
          <ul className="mt-1 space-y-2.5">
            {service.bullets.slice(0, 3).map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-white/85">
                <CheckDot />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <span className="text-sm font-semibold text-brand-400 group-hover:text-brand-300">
              Learn more →
            </span>
          </div>
        </div>
      </article>
    );
  }
  return (
    <article className="group flex flex-col gap-5 rounded-card border border-border-soft bg-white p-8 transition-shadow hover:shadow-lg hover:shadow-navy-900/5">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="text-xl font-bold text-ink">{service.title}</h3>
      <p className="text-slate-body">{service.summary}</p>
      <div className="mt-auto pt-2">
        <ArrowLink href={href}>Learn more</ArrowLink>
      </div>
    </article>
  );
}

function CheckDot() {
  return (
    <svg
      className="mt-1 h-4 w-4 shrink-0 text-brand-400"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
