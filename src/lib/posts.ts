/**
 * In-repo blog/resource registry — no CMS.
 *
 * This is a deliberately small placeholder seam: a real blog solution will
 * be designed later. For now it keeps the SEO pipeline whole — adding one
 * entry here creates the route, metadata, and sitemap entry with no other
 * wiring. Required fields and unique slugs are validated at build time.
 */

export interface Post {
  slug: string;
  title: string;
  /** ~140–160 char meta description. */
  metaDescription: string;
  /** Short summary for the Resources index. */
  excerpt: string;
  /** ISO date. Future-dated or draft posts never reach production. */
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  draft?: boolean;
  /** Simple paragraph body for now; richer rendering is a future decision. */
  body?: string[];
}

/** Add posts here. Empty until the blog approach is decided. */
const posts: Post[] = [];

/* ------------------------------------------------------------------ */
/* Build-time validation (fails the build on bad data)                 */
/* ------------------------------------------------------------------ */
function validate(list: Post[]): Post[] {
  const seen = new Set<string>();
  for (const p of list) {
    const where = p.slug || p.title || "(unknown)";
    if (!p.title?.trim()) throw new Error(`Post "${where}" is missing a title.`);
    if (!p.slug?.trim()) throw new Error(`Post "${where}" is missing a slug.`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))
      throw new Error(`Post "${where}" slug must be kebab-case.`);
    if (!p.metaDescription?.trim())
      throw new Error(`Post "${where}" is missing a metaDescription.`);
    if (!p.publishedAt || Number.isNaN(Date.parse(p.publishedAt)))
      throw new Error(`Post "${where}" has an invalid publishedAt date.`);
    if (seen.has(p.slug)) throw new Error(`Duplicate post slug: "${p.slug}".`);
    seen.add(p.slug);
  }
  return list;
}

const validated = validate(posts);

const isPublished = (p: Post) =>
  !p.draft && Date.parse(p.publishedAt) <= Date.now();

const byNewest = (a: Post, b: Post) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/* ------------------------------------------------------------------ */
/* Public accessors (same contract the router + sitemap depend on)     */
/* ------------------------------------------------------------------ */

export function getAllPosts(): Post[] {
  return validated.filter(isPublished).sort(byNewest);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getSitemapPosts(): {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}[] {
  return getAllPosts().map(({ slug, publishedAt, updatedAt }) => ({
    slug,
    publishedAt,
    updatedAt,
  }));
}
