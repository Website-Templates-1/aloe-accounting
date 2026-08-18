import type { Metadata } from "next";
import { Container, ButtonLink, ArrowLink } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(21,197,140,0.14),transparent_55%)]"
      />
      <Container className="relative flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="text-xs font-bold uppercase tracking-eyebrow text-brand">
          404
        </p>
        <h1 className="h-display mt-4 text-4xl sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">
          The page may have moved or no longer exists. Let&apos;s get you back on
          track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/" variant="primary" withArrow>
            Back to home
          </ButtonLink>
          <ArrowLink href="/services" tone="brand" className="text-brand-300">
            Browse services
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
