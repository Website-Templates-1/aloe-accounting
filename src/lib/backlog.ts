/**
 * Topic backlog store (content/_backlog.json) — the queue the AI generator
 * draws from. Read/append/write via the same content store as posts (GitHub in
 * prod, local-fs in dev). Server-only.
 */
import "server-only";
import { readFile, writeFile } from "@/lib/github";

export const BACKLOG_PATH = "content/_backlog.json";

export interface BacklogTopic {
  topic: string;
  notes?: string;
  used?: boolean;
}
export interface Backlog {
  topics: BacklogTopic[];
}

export async function readBacklog(): Promise<Backlog> {
  const f = await readFile(BACKLOG_PATH);
  if (!f) return { topics: [] };
  try {
    const j = JSON.parse(f.text) as Partial<Backlog>;
    return { topics: Array.isArray(j.topics) ? j.topics : [] };
  } catch {
    return { topics: [] };
  }
}

export function serializeBacklog(b: Backlog): string {
  return JSON.stringify(b, null, 2) + "\n";
}

export async function writeBacklog(b: Backlog, message: string): Promise<void> {
  await writeFile(BACKLOG_PATH, serializeBacklog(b), message);
}

export function unusedCount(b: Backlog): number {
  return b.topics.filter((t) => !t.used).length;
}

/**
 * Append topics, skipping blanks and case-insensitive duplicates. Returns how
 * many were actually added.
 */
export async function addTopics(
  items: { topic: string; notes?: string }[],
): Promise<number> {
  const b = await readBacklog();
  const seen = new Set(b.topics.map((t) => t.topic.trim().toLowerCase()));
  let added = 0;
  for (const it of items) {
    const topic = it.topic?.trim();
    if (!topic || seen.has(topic.toLowerCase())) continue;
    seen.add(topic.toLowerCase());
    b.topics.push({
      topic,
      ...(it.notes?.trim() ? { notes: it.notes.trim() } : {}),
      used: false,
    });
    added += 1;
  }
  if (added > 0) await writeBacklog(b, `Add ${added} backlog topic(s)`);
  return added;
}
