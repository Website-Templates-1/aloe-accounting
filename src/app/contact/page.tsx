import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { contact, businessHours } from "@/lib/site.config";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Book a complimentary consultation with a Brampton CPA. Call, email, or visit us at 285 Steeles Ave W., Suite 201 — we reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's talk"
        title="Bring clarity to your numbers."
        intro="Book a complimentary 30-minute consultation. No pressure, no obligation — just clear, senior-level guidance on your next step. Reach us by email, phone, or in person."
        crumbs={crumbs}
      />

      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            {/* Contact methods */}
            <div className="flex flex-col gap-4">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value={
                  <TrackedLink
                    href={contact.phoneHref}
                    event="phone_click"
                    className="hover:text-brand-700"
                  >
                    {contact.phoneDisplay}
                  </TrackedLink>
                }
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={
                  <TrackedLink
                    href={contact.emailHref}
                    event="email_click"
                    className="break-all hover:text-brand-700"
                  >
                    {contact.email}
                  </TrackedLink>
                }
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Office"
                value={
                  <span>
                    285 Steeles Ave W., Suite 201
                    <br />
                    Brampton, ON L6Y 0B5
                  </span>
                }
              />

              <div className="flex items-start gap-4 rounded-card border border-border-soft bg-white p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-eyebrow text-slate-body">
                    Hours
                  </p>
                  <dl className="mt-2 space-y-1">
                    {businessHours.display.map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between gap-6 text-sm"
                      >
                        <dt className="text-slate-body">{row.label}</dt>
                        <dd className="font-semibold text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-2 rounded-card border border-border-soft bg-surface-alt p-6">
                <p className="text-sm font-semibold text-ink">
                  Existing client?
                </p>
                <p className="mt-1 text-sm text-slate-body">
                  Securely upload documents and messages through our client
                  portal.
                </p>
                <TrackedLink
                  href={contact.portalUrl}
                  event="portal_click"
                  external
                  className="mt-4 inline-flex items-center gap-2 rounded-pill bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Open Client Portal
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-card border border-border-soft bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Send us a message</h2>
              <p className="mt-2 text-slate-body">
                Tell us a little about your business and how we can help.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-card border border-border-soft bg-white p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-eyebrow text-slate-body">
          {label}
        </p>
        <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
