import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, ArrowLink } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

export const metadata: Metadata = buildMetadata({
  title: "Resources",
  description:
    "Practical tax, accounting, and advisory insights for Canadian business owners from the team at ALOE Accounting and Tax.",
  path: "/resources",
});

export default function ResourcesPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Insights for Canadian business owners."
        intro="Practical guidance on tax, accounting, and building a business you can make confident decisions about."
        crumbs={crumbs}
      />

      <Section tone="surface">
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-card border border-dashed border-border-soft bg-surface-alt p-10 text-center">
              <h2 className="text-xl font-bold text-ink">Articles coming soon</h2>
              <p className="mt-3 text-slate-body">
                We&apos;re preparing practical resources for business owners. In
                the meantime, reach out with any question and we&apos;ll point
                you in the right direction.
              </p>
              <ArrowLink href="/contact" className="mt-6">
                Ask us a question
              </ArrowLink>
            </div>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/resources/${post.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-card border border-border-soft bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
                  >
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs font-semibold uppercase tracking-eyebrow text-slate-body"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <h2 className="text-xl font-bold text-ink group-hover:text-brand-700">
                      {post.title}
                    </h2>
                    <p className="text-slate-body">{post.excerpt}</p>
                    <span className="mt-auto pt-2 text-sm font-semibold text-brand-700">
                      Read article →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      {posts.length > 0 && (
        <JsonLd
          data={itemListSchema(
            posts.map((p) => ({ name: p.title, path: `/resources/${p.slug}` })),
          )}
        />
      )}
    </>
  );
}
