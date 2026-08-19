import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbSchema, blogPostingSchema } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

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
            })}
          />
        </>
      )}
    </>
  );
}
