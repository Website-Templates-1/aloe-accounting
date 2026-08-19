/**
 * Owner credential verification + session cookie helpers.
 *
 * Single owner; credentials live in env vars: OWNER_USERNAME and
 * OWNER_PASSWORD_HASH (format "saltHex:hashHex" from scrypt). Server-only.
 */
import "server-only";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSession,
  verifySession,
} from "@/lib/session";

const KEYLEN = 64;

function safeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Verify a username/password against the env-configured owner credentials. */
export function verifyCredentials(username: string, password: string): boolean {
  const owner = process.env.OWNER_USERNAME;
  const stored = process.env.OWNER_PASSWORD_HASH;
  if (!owner || !stored) return false;

  const usernameOk = safeEqualStr(username, owner);

  const [saltHex, hashHex] = stored.split(":");
  let passwordOk = false;
  if (saltHex && hashHex) {
    try {
      const expected = Buffer.from(hashHex, "hex");
      const actual = scryptSync(password, Buffer.from(saltHex, "hex"), KEYLEN);
      passwordOk =
        expected.length === actual.length && timingSafeEqual(actual, expected);
    } catch {
      passwordOk = false;
    }
  }
  // Evaluate both regardless of order (avoid short-circuit timing leaks).
  return usernameOk && passwordOk;
}

/** Set the signed session cookie (call from a Route Handler). */
export async function startSession(username: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** True if the current request carries a valid owner session. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value) !== null;
}
