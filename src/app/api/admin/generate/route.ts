import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  requireSession,
  hasCronSecret,
  sameOrigin,
  rateLimit,
} from "@/lib/admin-guard";
import { generateDraft } from "@/lib/generation/generate";
import { commitFiles } from "@/lib/github";

export async function POST(request: NextRequest) {
  // Dual auth: an owner session (manual button) OR the cron bearer secret.
  const session = await requireSession();
  const cron = await hasCronSecret();
  if (!session && !cron)
    return new NextResponse("Unauthorized", { status: 401 });
  // Session (browser) calls must be same-origin; cron calls send no Origin.
  if (session && !cron && !(await sameOrigin()))
    return new NextResponse("Bad origin", { status: 403 });

  if (!rateLimit("generate", 10, 60 * 60_000))
    return new NextResponse("Rate limited", { status: 429 });

  try {
    const result = await generateDraft();
    await commitFiles(result.files, `Add draft: ${result.slug}`);
    if (session)
      return NextResponse.redirect(
        new URL(`/admin?generated=${result.slug}`, request.url),
        303,
      );
    return NextResponse.json({ ok: true, slug: result.slug });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Generation failed";
    if (session)
      return NextResponse.redirect(
        new URL(`/admin?error=${encodeURIComponent(msg)}`, request.url),
        303,
      );
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
