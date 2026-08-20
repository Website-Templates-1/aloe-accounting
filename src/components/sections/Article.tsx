import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PeopleAlsoSearch } from "@/components/sections/PeopleAlsoSearch";
import { JsonLd, breadcrumbSchema, blogPostingSchema } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import {
  filterAllowedSearches,
  getRelatedPosts,
  type Post,
} from "@/lib/posts";

/**
 * Canonical article renderer shared by the public route
 * (`/resources/[slug]`) and the auth-gated admin preview
 * (`/admin/preview/[slug]`), so "what you approve is what ships".
 * In `preview` mode it shows a draft banner and omits JSON-LD.
 */
export function Article({
  post,
  preview = false,
}: {
  post: Post;
  preview?: boolean;
}) {
  const path = `/resources/${post.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: post.title, path },
  ];

  const faqs = post.faqs ?? [];
  const searches = filterAllowedSearches(post.peopleAlsoSearch);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <PageHero eyebrow="Resources" title={post.title} crumbs={crumbs}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.author && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </>
          )}
          {preview && (
            <span className="rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-eyebrow text-amber-200">
              {post.status} preview
            </span>
          )}
        </div>
      </PageHero>

      <Section tone="surface">
        <Container className="max-w-3xl">
          <div
            className="prose-aloe"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        </Container>
      </Section>

      {faqs.length > 0 && (
        <Section tone="surface">
          <FaqSection faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <Container>
            <SectionHeading eyebrow="Keep reading" title="Related content" />
            <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/resources/${r.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-card border border-border-soft bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
                  >
                    <time
                      dateTime={r.publishedAt}
                      className="text-xs font-semibold uppercase tracking-eyebrow text-slate-body"
                    >
                      {formatDate(r.publishedAt)}
                    </time>
                    <h3 className="text-xl font-bold text-ink group-hover:text-brand-700">
                      {r.title}
                    </h3>
                    <p className="text-slate-body">{r.excerpt}</p>
                    <span className="mt-auto pt-2 text-sm font-semibold text-brand-700">
                      Read article →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {searches.length > 0 && (
        <Section tone="surface">
          <Container>
            <PeopleAlsoSearch items={searches} />
          </Container>
        </Section>
      )}

      <CtaBand />

      {!preview && (
        <>
          <JsonLd data={breadcrumbSchema(crumbs)} />
          <JsonLd
            data={blogPostingSchema({
              title: post.title,
              description: post.metaDescription,
              path,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              author: post.author,
            })}
          />
        </>
      )}
    </>
  );
}
