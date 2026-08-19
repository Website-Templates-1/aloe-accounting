import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Independent re-check — never trust the proxy alone.
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="border-b border-border-soft bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-bold text-ink">
            ALOE admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-body hover:text-ink">
              View site
            </Link>
            <form method="post" action="/api/admin/logout">
              <button className="font-semibold text-brand-700 hover:text-brand-800">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
