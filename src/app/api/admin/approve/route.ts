import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireSession, sameOrigin } from "@/lib/admin-guard";
import { approvePost } from "@/lib/blog-admin";

export async function POST(request: NextRequest) {
  if (!(await requireSession()))
    return new NextResponse("Unauthorized", { status: 401 });
  if (!(await sameOrigin()))
    return new NextResponse("Bad origin", { status: 403 });

  const form = await request.formData();
  const slug = String(form.get("slug") ?? "").trim();
  if (!slug) return new NextResponse("Missing slug", { status: 400 });

  try {
    await approvePost(slug);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Approve failed";
    return NextResponse.redirect(
      new URL(`/admin?error=${encodeURIComponent(msg)}`, request.url),
      303,
    );
  }
  return NextResponse.redirect(new URL("/admin?approved=1", request.url), 303);
}
