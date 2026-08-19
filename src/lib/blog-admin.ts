/**
 * Admin-side blog operations against the live content store (GitHub or local
 * fallback). Unlike `posts.ts` (build-time, published-only), this reads drafts
 * too and performs writes. Server-only.
 */
import "server-only";
import matter from "gray-matter";
import {
  parsePost,
  renderMarkdown,
  type Post,
  type PostFrontmatter,
} from "@/lib/posts";
import { listDir, readFile, writeFile } from "@/lib/github";

const DIR = "content/resources";
const filePath = (slug: string) => `${DIR}/${slug}.md`;

/** Every post (incl. drafts), read live from the store. */
export async function listAllPosts(): Promise<Post[]> {
  const names = (await listDir(DIR)).filter((n) => n.endsWith(".md"));
  const posts = await Promise.all(
    names.map(async (name) => {
      const slug = name.replace(/\.md$/, "");
      const file = await readFile(filePath(slug));
      if (!file) return null;
      try {
        return parsePost(file.text, slug);
      } catch {
        return null; // skip malformed files in listings
      }
    }),
  );
  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function getPostForEdit(slug: string): Promise<Post | null> {
  const file = await readFile(filePath(slug));
  if (!file) return null;
  try {
    return parsePost(file.text, slug);
  } catch {
    return null;
  }
}

function serialize(fm: PostFrontmatter, body: string): string {
  // Keep a stable key order in the front matter.
  const ordered: Record<string, unknown> = {
    title: fm.title,
    slug: fm.slug,
    metaDescription: fm.metaDescription,
    excerpt: fm.excerpt,
    publishedAt: fm.publishedAt,
    ...(fm.updatedAt ? { updatedAt: fm.updatedAt } : {}),
    ...(fm.author ? { author: fm.author } : {}),
    status: fm.status,
  };
  return matter.stringify(`\n${body.trim()}\n`, ordered);
}

/** Validate + persist an edited post. Throws on invalid content. */
export async function savePost(
  slug: string,
  fm: PostFrontmatter,
  body: string,
  message: string,
): Promise<void> {
  const withUpdate: PostFrontmatter = {
    ...fm,
    slug,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  const text = serialize(withUpdate, body);
  parsePost(text, slug); // throws if the result is invalid
  renderMarkdown(body); // surfaces any Markdown parse error early
  await writeFile(filePath(slug), text, message);
}

/** Flip a draft to published (the approval action). */
export async function approvePost(slug: string): Promise<void> {
  const file = await readFile(filePath(slug));
  if (!file) throw new Error(`Post "${slug}" not found.`);
  const { data, content } = matter(file.text);
  const fm = data as PostFrontmatter;
  fm.status = "published";
  fm.slug = slug;
  await savePost(slug, fm, content, `Approve & publish: ${slug}`);
}
