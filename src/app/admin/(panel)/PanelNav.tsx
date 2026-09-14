"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Primary admin section nav. Highlights the current section so Reviews is
 * discoverable alongside the Blog dashboard. Kept minimal and consistent with
 * the existing header tokens.
 */
const SECTIONS = [
  { href: "/admin", label: "Blog", match: (p: string) => p === "/admin" },
  {
    href: "/admin/reviews",
    label: "Reviews",
    match: (p: string) => p === "/admin/reviews" || p.startsWith("/admin/reviews/"),
  },
];

export function PanelNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 text-sm">
      {SECTIONS.map((s) => {
        const active = s.match(pathname);
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "font-semibold text-ink"
                : "text-slate-body hover:text-ink"
            }
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
