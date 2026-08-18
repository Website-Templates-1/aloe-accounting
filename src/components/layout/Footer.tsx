import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { footerNav, contact, site } from "@/lib/site.config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-soft bg-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand / blurb */}
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-body">
              Chartered Professional Accountants in Brampton, Ontario. Precision
              accounting, tax, and advisory for Canadian businesses.
            </p>
          </div>

          {/* Practice */}
          <nav aria-label="Practice">
            <h2 className="text-xs font-bold uppercase tracking-eyebrow text-ink">
              {footerNav.practice.heading}
            </h2>
            <ul className="mt-5 space-y-3">
              {footerNav.practice.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-body transition-colors hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Firm */}
          <nav aria-label="Firm">
            <h2 className="text-xs font-bold uppercase tracking-eyebrow text-ink">
              {footerNav.firm.heading}
            </h2>
            <ul className="mt-5 space-y-3">
              {footerNav.firm.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-body transition-colors hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-eyebrow text-ink">
              Contact
            </h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-slate-body">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  285 Steeles Ave W., Suite 201
                  <br />
                  Brampton, ON L6Y 0B5
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <TrackedLink
                  href={contact.phoneHref}
                  event="phone_click"
                  className="transition-colors hover:text-brand-700"
                >
                  {contact.phoneDisplay}
                </TrackedLink>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <TrackedLink
                  href={contact.emailHref}
                  event="email_click"
                  className="break-all transition-colors hover:text-brand-700"
                >
                  {contact.email}
                </TrackedLink>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border-soft pt-8 text-sm text-slate-body sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-700">
              Privacy Policy
            </Link>
            <TrackedLink
              href={contact.portalUrl}
              event="portal_click"
              external
              className="font-semibold text-brand-700 hover:text-brand-600"
            >
              Client Portal
            </TrackedLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
