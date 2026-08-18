import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { site, contact } from "@/lib/site.config";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How ALOE Accounting and Tax collects, uses, and protects personal information in accordance with Canadian privacy legislation.",
  path: "/privacy",
});

const effectiveDate = "August 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Effective ${effectiveDate}. How we collect, use, and protect your personal information.`}
        crumbs={crumbs}
      />
      <Section tone="surface">
        <Container>
          <div className="prose-aloe mx-auto max-w-3xl">
            <p>
              {site.legalName} (&ldquo;ALOE&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) respects your privacy and is committed to
              protecting the personal information you share with us. This policy
              explains what we collect, how we use it, and the choices you have,
              consistent with applicable Canadian privacy legislation.
            </p>

            <h2>Information we collect</h2>
            <p>
              We collect information you provide directly — such as your name,
              email address, phone number, business details, and the contents of
              any message you send us through our contact form, by email, or by
              phone. We collect this information so we can respond to your
              enquiry and provide the services you request.
            </p>

            <h2>How we use your information</h2>
            <ul>
              <li>To respond to enquiries and provide requested services.</li>
              <li>To prepare proposals and administer client engagements.</li>
              <li>
                To meet our professional, legal, and regulatory obligations as a
                licensed CPA firm.
              </li>
              <li>To improve our website and communications.</li>
            </ul>

            <h2>Cookies and analytics</h2>
            <p>
              Our website uses Google&apos;s advertising and measurement tags to
              understand how visitors find and use the site and to measure the
              performance of our advertising. These tools may set cookies in your
              browser. You can control or block cookies through your browser
              settings; doing so will not prevent you from using the site.
            </p>

            <h2>How we protect your information</h2>
            <p>
              We use appropriate administrative, technical, and physical
              safeguards to protect personal information against loss, theft, and
              unauthorized access. Client documents shared through our secure
              client portal are transmitted over encrypted connections.
            </p>

            <h2>Sharing your information</h2>
            <p>
              We do not sell your personal information. We share it only as needed
              to deliver our services (for example, with the CRA on your behalf
              when you engage us to do so), with service providers who support our
              operations under confidentiality obligations, or where required by
              law.
            </p>

            <h2>Retention</h2>
            <p>
              We retain personal information only as long as necessary to fulfil
              the purposes described here and to meet professional and legal
              record-keeping requirements.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, subject to legal and professional
              limitations. To make a request or ask a question about this policy,
              contact us using the details below.
            </p>

            <h2>Contact us</h2>
            <p>
              {site.legalName}
              <br />
              {contact.addressLine}
              <br />
              Phone:{" "}
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <br />
              Email: <a href={contact.emailHref}>{contact.email}</a>
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The effective date at
              the top of this page indicates when it was last revised.
            </p>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
