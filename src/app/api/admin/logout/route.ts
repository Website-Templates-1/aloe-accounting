import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { endSession } from "@/lib/auth";
import { sameOrigin } from "@/lib/admin-guard";

export async function POST(request: NextRequest) {
  if (!(await sameOrigin()))
    return new NextResponse("Bad origin", { status: 403 });
  await endSession();
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
