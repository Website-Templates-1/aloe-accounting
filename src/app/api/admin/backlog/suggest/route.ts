import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireSession, sameOrigin, rateLimit } from "@/lib/admin-guard";
import { readBacklog, addTopics } from "@/lib/backlog";
import { suggestTopics } from "@/lib/generation/openai";

export async function POST(request: NextRequest) {
  if (!(await requireSession()))
    return new NextResponse("Unauthorized", { status: 401 });
  if (!(await sameOrigin()))
    return new NextResponse("Bad origin", { status: 403 });
  if (!rateLimit("suggest-topics", 20, 60 * 60_000))
    return new NextResponse("Rate limited", { status: 429 });

  try {
    const existing = (await readBacklog()).topics.map((t) => t.topic);
    const ideas = await suggestTopics(5, existing);
    const added = await addTopics(ideas);
    return NextResponse.redirect(
      new URL(`/admin/backlog?suggested=${added}`, request.url),
      303,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Suggestion failed";
    return NextResponse.redirect(
      new URL(`/admin/backlog?error=${encodeURIComponent(msg)}`, request.url),
      303,
    );
  }
}
