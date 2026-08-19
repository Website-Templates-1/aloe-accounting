/**
 * Pure generation logic, framework-free: read system prompt + topic backlog,
 * ask OpenAI for one post, validate it, and return the files to commit
 * (the new draft + the updated backlog). Callable from a Route Handler, a
 * manual button, or a CLI/GitHub Action — none of them differ here.
 * Server-only.
 */
import "server-only";
import matter from "gray-matter";
import { parsePost, type PostFrontmatter } from "@/lib/posts";
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

  const user = `Chosen topic: ${next.topic}\nNotes: ${next.notes ?? "(none)"}`;
  const gen = await generateBlogPost(promptFile.text, user);

  const today = new Date().toISOString().slice(0, 10);
  const fm: PostFrontmatter = {
    title: gen.title,
    slug: gen.slug,
    metaDescription: gen.metaDescription,
    excerpt: gen.excerpt,
    publishedAt: today,
    author: "ALOE Accounting and Tax",
    status: "draft",
  };
  const text = matter.stringify(`\n${gen.bodyMarkdown.trim()}\n`, {
    title: fm.title,
    slug: fm.slug,
    metaDescription: fm.metaDescription,
    excerpt: fm.excerpt,
    publishedAt: fm.publishedAt,
    author: fm.author,
    status: fm.status,
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
