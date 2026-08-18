"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { primaryNav, contact } from "@/lib/site.config";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`text-sm font-semibold transition-colors hover:text-brand-700 ${
                      isActive(item.href) ? "text-brand-700" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <TrackedLink
              href={contact.portalUrl}
              event="portal_click"
              external
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Client Portal
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-border-soft text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border-soft bg-white md:hidden"
        >
          <Container className="py-6">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3.5 text-base font-semibold ${
                      isActive(item.href)
                        ? "bg-surface-alt text-brand-700"
                        : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <TrackedLink
              href={contact.portalUrl}
              event="portal_click"
              external
              onClick={close}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white"
            >
              Client Portal
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Container>
        </div>
      )}
    </header>
  );
}
