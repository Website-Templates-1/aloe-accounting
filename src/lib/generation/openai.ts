/**
 * Thin OpenAI wrapper — the only file to change if the provider ever changes.
 * Uses Structured Outputs so the model reliably returns our post shape.
 * Server-only (holds OPENAI_API_KEY).
 */
import "server-only";
import OpenAI from "openai";

export interface GeneratedPost {
  title: string;
  slug: string;
  metaDescription: string;
  excerpt: string;
  bodyMarkdown: string;
}

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    slug: {
      type: "string",
      description: "kebab-case, lowercase, hyphen-separated",
    },
    metaDescription: { type: "string", description: "~140-160 chars" },
    excerpt: { type: "string" },
    bodyMarkdown: {
      type: "string",
      description: "Markdown only; no raw HTML or front matter",
    },
  },
  required: ["title", "slug", "metaDescription", "excerpt", "bodyMarkdown"],
} as const;

export async function generateBlogPost(
  system: string,
  user: string,
): Promise<GeneratedPost> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL || "gpt-4o";

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: {
      type: "json_schema",
      json_schema: { name: "blog_post", strict: true, schema },
    },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned no content.");
  return JSON.parse(content) as GeneratedPost;
}
