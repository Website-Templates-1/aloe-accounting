import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/jsonld";

/**
 * Dark inner-page hero. Renders the single <h1> for the page plus
 * visible breadcrumbs. Desktop-complete (constrained measure, generous space).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* subtle teal radial wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(21,197,140,0.14),transparent_55%)]"
      />
      <Container className="relative py-14 sm:py-20">
        <Breadcrumbs crumbs={crumbs} tone="dark" />
        <div className="mt-8 max-w-3xl">
          {eyebrow && (
            <div className="mb-5">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="h-display text-4xl sm:text-5xl md:text-[3.25rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
              {intro}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
