import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireSession, sameOrigin } from "@/lib/admin-guard";
import { deleteTopic } from "@/lib/backlog";

export async function POST(request: NextRequest) {
  if (!(await requireSession()))
    return new NextResponse("Unauthorized", { status: 401 });
  if (!(await sameOrigin()))
    return new NextResponse("Bad origin", { status: 403 });

  const form = await request.formData();
  const topic = String(form.get("topic") ?? "").trim();
  if (!topic) return new NextResponse("Missing topic", { status: 400 });

  try {
    await deleteTopic(topic);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.redirect(
      new URL(`/admin/backlog?error=${encodeURIComponent(msg)}`, request.url),
      303,
    );
  }
  return NextResponse.redirect(new URL("/admin/backlog?deleted=1", request.url), 303);
}
