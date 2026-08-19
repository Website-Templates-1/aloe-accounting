/**
 * Pure generation logic, framework-free: read system prompt + topic backlog,
 * ask OpenAI for one post, validate it, and return the files to commit
 * (the new draft + the updated backlog). Callable from a Route Handler, a
 * manual button, or a CLI/GitHub Action — none of them differ here.
 * Server-only.
 */
import "server-only";
import matter from "gray-matter";
import {
  parsePost,
  internalPathAllowlist,
  filterAllowedSearches,
  type PostFrontmatter,
} from "@/lib/posts";
import { readFile } from "@/lib/github";
import { generateBlogPost } from "@/lib/generation/openai";

const PROMPT_PATH = "content/_prompts/system.md";
const BACKLOG_PATH = "content/_backlog.json";

export interface BacklogTopic {
  topic: string;
  notes?: string;
  used?: boolean;
}
interface Backlog {
  topics: BacklogTopic[];
}

export interface GenerationResult {
  slug: string;
  files: { path: string; text: string }[];
}

export async function generateDraft(): Promise<GenerationResult> {
  const promptFile = await readFile(PROMPT_PATH);
  const backlogFile = await readFile(BACKLOG_PATH);
  if (!promptFile) throw new Error(`Missing ${PROMPT_PATH}`);
  if (!backlogFile) throw new Error(`Missing ${BACKLOG_PATH}`);

  const backlog = JSON.parse(backlogFile.text) as Backlog;
  const next = backlog.topics.find((t) => !t.used);
  if (!next) throw new Error("Topic backlog is empty — add topics to generate.");

  const allowedPaths = Array.from(internalPathAllowlist()).sort();
  const user = [
    `Chosen topic: ${next.topic}`,
    `Notes: ${next.notes ?? "(none)"}`,
    "",
    "Allowed internal paths for peopleAlsoSearch hrefs (copy verbatim; do NOT invent any others):",
    ...allowedPaths.map((p) => `- ${p}`),
  ].join("\n");
  const gen = await generateBlogPost(promptFile.text, user);

  // Sanitize enrichment before commit: drop malformed FAQs, drop any related
  // link not in the allowlist, normalize tags. A bad generation can never
  // produce a broken link or fail the build.
  const faqs = gen.faqs
    ?.map((f) => ({ question: f.question?.trim(), answer: f.answer?.trim() }))
    .filter((f) => f.question && f.answer) as PostFrontmatter["faqs"];
  const peopleAlsoSearch = filterAllowedSearches(gen.peopleAlsoSearch);
  const tags = Array.from(
    new Set((gen.tags ?? []).map((t) => t.trim().toLowerCase()).filter(Boolean)),
  );

  const today = new Date().toISOString().slice(0, 10);
  const fm: PostFrontmatter = {
    title: gen.title,
    slug: gen.slug,
    metaDescription: gen.metaDescription,
    excerpt: gen.excerpt,
    publishedAt: today,
    author: "ALOE Accounting and Tax",
    status: "draft",
    ...(faqs && faqs.length ? { faqs } : {}),
    ...(peopleAlsoSearch.length ? { peopleAlsoSearch } : {}),
    ...(tags.length ? { tags } : {}),
  };
  const text = matter.stringify(`\n${gen.bodyMarkdown.trim()}\n`, {
    title: fm.title,
    slug: fm.slug,
    metaDescription: fm.metaDescription,
    excerpt: fm.excerpt,
    publishedAt: fm.publishedAt,
    author: fm.author,
    status: fm.status,
    ...(fm.faqs ? { faqs: fm.faqs } : {}),
    ...(fm.peopleAlsoSearch ? { peopleAlsoSearch: fm.peopleAlsoSearch } : {}),
    ...(fm.tags ? { tags: fm.tags } : {}),
  });

  // First line of defense: never commit a post that would fail the build.
  parsePost(text, gen.slug);

  const updatedBacklog: Backlog = {
    topics: backlog.topics.map((t) =>
      t.topic === next.topic ? { ...t, used: true } : t,
    ),
  };

  return {
    slug: gen.slug,
    files: [
      { path: `content/resources/${gen.slug}.md`, text },
      {
        path: BACKLOG_PATH,
        text: JSON.stringify(updatedBacklog, null, 2) + "\n",
      },
    ],
  };
}
