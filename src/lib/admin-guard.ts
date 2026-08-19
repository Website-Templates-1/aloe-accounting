/**
 * Shared helpers for the admin API routes: independent auth re-check,
 * same-origin (CSRF) check, and a best-effort in-memory rate limiter.
 * Server-only.
 */
import "server-only";
import { headers } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { isAuthenticated } from "@/lib/auth";

/** Reject cross-origin POSTs (defense-in-depth alongside SameSite=Strict). */
export async function sameOrigin(): Promise<boolean> {
  const h = await headers();
  const origin = h.get("origin");
  if (!origin) return true; // non-browser callers (cron) send no Origin
  const host = h.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function requireSession(): Promise<boolean> {
  return isAuthenticated();
}

/** Constant-time bearer check for the cron-triggered generator. */
export async function hasCronSecret(): Promise<boolean> {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const h = await headers();
  const auth = h.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(secret, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

const hits = new Map<string, { count: number; resetAt: number }>();

/** Best-effort per-key limiter (per instance; fine for a single-owner admin). */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}
