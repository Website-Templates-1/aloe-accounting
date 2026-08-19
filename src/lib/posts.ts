/**
 * In-repo blog/resource registry — "Git is the database".
 *
 * Posts are Markdown files with front matter under `content/resources/*.md`.
 * Adding/approving a post is a file change committed to the repo; the public
 * accessors below drive the route, metadata, JSON-LD, and sitemap with no other
 * wiring. Drafts live in the same folder, marked `status: draft`, and are
 * excluded from every public accessor.
 *
 * This module is build-time + server-only (reads the filesystem, renders
 * Markdown). It must never be imported by a Client Component.
 */
import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Drop raw HTML blocks/inline HTML so authored or AI content cannot inject
// <script> or arbitrary markup. Markdown syntax still renders normally.
marked.use({ gfm: true, renderer: { html: () => "" } });

export type PostStatus = "draft" | "published";

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
  status: PostStatus;
  /** Raw Markdown body (used by the admin editor). */
  bodyMarkdown: string;
  /** Sanitized HTML rendered from the Markdown (used by the renderer). */
  bodyHtml: string;
}

/** Front matter shape as stored on disk (body is separate). */
export interface PostFrontmatter {
  title: string;
  slug: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  status: PostStatus;
}

export const RESOURCES_DIR = path.join(process.cwd(), "content", "resources");

/* ------------------------------------------------------------------ */
/* Markdown rendering — raw HTML disabled so authored/AI content can    */
/* never inject <script> or arbitrary markup.                           */
/* ------------------------------------------------------------------ */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

/* ------------------------------------------------------------------ */
/* Parsing + validation (throws on bad data → fails the build loudly)   */
/* ------------------------------------------------------------------ */
const isStatus = (v: unknown): v is PostStatus =>
  v === "draft" || v === "published";

/** Parse one Markdown file's contents into a Post. `expectedSlug` is the filename. */
export function parsePost(raw: string, expectedSlug: string): Post {
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;
  const where = expectedSlug || fm.slug || "(unknown)";

  if (!fm.title?.trim()) throw new Error(`Post "${where}" is missing a title.`);
  if (!fm.slug?.trim()) throw new Error(`Post "${where}" is missing a slug.`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug))
    throw new Error(`Post "${where}" slug must be kebab-case.`);
  if (fm.slug !== expectedSlug)
    throw new Error(
      `Post "${where}": front-matter slug "${fm.slug}" must match filename "${expectedSlug}".`,
    );
  if (!fm.metaDescription?.trim())
    throw new Error(`Post "${where}" is missing a metaDescription.`);
  if (!fm.excerpt?.trim())
    throw new Error(`Post "${where}" is missing an excerpt.`);
  if (!fm.publishedAt || Number.isNaN(Date.parse(fm.publishedAt)))
    throw new Error(`Post "${where}" has an invalid publishedAt date.`);
  if (!isStatus(fm.status))
    throw new Error(`Post "${where}" status must be "draft" or "published".`);

  return {
    slug: fm.slug,
    title: fm.title,
    metaDescription: fm.metaDescription,
    excerpt: fm.excerpt,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    author: fm.author,
    status: fm.status,
    bodyMarkdown: content.trim(),
    bodyHtml: renderMarkdown(content),
  };
}

/* ------------------------------------------------------------------ */
/* Filesystem loader (build time + server render)                       */
/* ------------------------------------------------------------------ */
function loadAll(): Post[] {
  let files: string[];
  try {
    files = fs.readdirSync(RESOURCES_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return []; // no content dir yet — empty blog
  }
  const seen = new Set<string>();
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(RESOURCES_DIR, file), "utf8");
    const post = parsePost(raw, slug);
    if (seen.has(post.slug))
      throw new Error(`Duplicate post slug: "${post.slug}".`);
    seen.add(post.slug);
    return post;
  });
  return posts;
}

const all = loadAll();

const isPublished = (p: Post) =>
  p.status === "published" && Date.parse(p.publishedAt) <= Date.now();

const byNewest = (a: Post, b: Post) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/* ------------------------------------------------------------------ */
/* Public accessors (same contract the router + sitemap depend on)      */
/* ------------------------------------------------------------------ */

export function getAllPosts(): Post[] {
  return all.filter(isPublished).sort(byNewest);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Admin/preview only — includes drafts and future-dated posts. */
export function getPostBySlugIncludingDrafts(slug: string): Post | undefined {
  return all.find((p) => p.slug === slug);
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
