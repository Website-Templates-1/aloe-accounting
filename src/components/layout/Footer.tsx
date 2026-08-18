import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { footerNav, contact, site, socialLinks } from "@/lib/site.config";

// lucide 1.x dropped brand icons, so social glyphs are inline SVGs.
const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13.66.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
} as const;

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
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.brand} on ${social.label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border-soft text-slate-body transition-colors hover:border-navy-900 hover:text-navy-900"
                  >
                    {socialIcons[social.icon]}
                  </a>
                </li>
              ))}
            </ul>
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
