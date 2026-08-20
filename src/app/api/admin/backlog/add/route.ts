import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireSession, sameOrigin } from "@/lib/admin-guard";
import { addTopics } from "@/lib/backlog";

export async function POST(request: NextRequest) {
  if (!(await requireSession()))
    return new NextResponse("Unauthorized", { status: 401 });
  if (!(await sameOrigin()))
    return new NextResponse("Bad origin", { status: 403 });

  const form = await request.formData();
  const topic = String(form.get("topic") ?? "").trim();
  const notes = String(form.get("notes") ?? "").trim();
  if (!topic)
    return NextResponse.redirect(
      new URL("/admin/backlog?error=Enter+a+topic", request.url),
      303,
    );

  try {
    const added = await addTopics([{ topic, notes }]);
    const q = added ? `added=${added}` : "error=That+topic+is+already+in+the+backlog";
    return NextResponse.redirect(new URL(`/admin/backlog?${q}`, request.url), 303);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Add failed";
    return NextResponse.redirect(
      new URL(`/admin/backlog?error=${encodeURIComponent(msg)}`, request.url),
      303,
    );
  }
}
