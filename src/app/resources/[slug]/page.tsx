import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, blogPostingSchema } from "@/lib/jsonld";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/format";

/** Only known posts render; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  return buildMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/resources/${post.slug}`,
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function ArticlePage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

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
        </div>
      </PageHero>

      <Section tone="surface">
        <Container className="max-w-3xl">
          <div className="prose-aloe">
            {post.body && post.body.length > 0 ? (
              post.body.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
        </Container>
      </Section>

      <CtaBand />

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
  );
}
