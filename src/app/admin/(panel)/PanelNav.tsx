"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chipIdle, chipOn } from "./ui";

/**
 * Admin navigation as a horizontally scrollable chip row on the page itself
 * (no site header). Section chips switch Blog / Reviews; View site and Sign
 * out sit on the same scroller so mobile never needs a hamburger.
 */
const SECTIONS = [
  {
    href: "/admin",
    label: "Blog",
    match: (p: string) =>
      p.startsWith("/admin") && !p.startsWith("/admin/reviews"),
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    match: (p: string) =>
      p === "/admin/reviews" || p.startsWith("/admin/reviews/"),
  },
];

function chipClass(active: boolean) {
  return `snap-start ${active ? chipOn : chipIdle}`;
}

export function PanelNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className="-mx-6 mb-8 overflow-x-auto px-6 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max snap-x snap-mandatory items-center gap-2">
        {SECTIONS.map((s) => {
          const active = s.match(pathname);
          return (
            <li key={s.href} className="flex">
              <Link
                href={s.href}
                aria-current={active ? "page" : undefined}
                className={chipClass(active)}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
        <li className="flex">
          <Link href="/" className={chipClass(false)}>
            View site
          </Link>
        </li>
        <li className="flex">
          <form method="post" action="/api/admin/logout" className="flex">
            <button type="submit" className={chipClass(false)}>
              Sign out
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
