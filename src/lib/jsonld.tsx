import {
  site,
  contact,
  socialProfiles,
  businessHours,
  googleBusiness,
  absoluteUrl,
} from "@/lib/site.config";

/**
 * One JSON-LD helper: serializes a plain object into a script tag.
 * No packages. Used site-wide and per-page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is our own trusted, static data. Escape `<` so a literal
      // "</script>" in any field can't break out of the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Schema builders — only types we can honestly support.               */
/* ------------------------------------------------------------------ */

/** Site-wide Organization (real contact + real profiles only). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: site.legalName,
    url: site.domain,
    logo: absoluteUrl(site.logo),
    email: contact.email,
    telephone: contact.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };
}

/** WebSite — name + url only. No SearchAction (no real /search). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand,
    url: site.domain,
  };
}

/**
 * AccountingService — this IS a real local business with real NAP.
 * (AccountingService is Google's specific subtype; primaryType is "accounting".)
 * No aggregateRating / review (won't fake). No priceRange invented.
 */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.brand,
    url: site.domain,
    image: absoluteUrl(site.ogImage),
    logo: absoluteUrl(site.logo),
    email: contact.email,
    telephone: contact.phoneHref.replace("tel:", ""),
    hasMap: googleBusiness.mapUrl,
    areaServed: googleBusiness.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: googleBusiness.geo.latitude,
      longitude: googleBusiness.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...businessHours.openDays],
        opens: businessHours.opens,
        closes: businessHours.closes,
      },
    ],
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList matching the visible breadcrumbs. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Service page schema (no Offer — no real public starting price). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.name,
    areaServed: contact.serviceArea,
    provider: {
      "@type": "ProfessionalService",
      name: site.brand,
      url: site.domain,
    },
  };
}

/** BlogPosting for an article. dateModified only when supplied. */
export function blogPostingSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  /** Author name; the firm authors posts, so this maps to an Organization. */
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    image: absoluteUrl(opts.image ?? site.ogImage),
    author: {
      "@type": "Organization",
      name: opts.author?.trim() || site.brand,
      url: site.domain,
    },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      logo: { "@type": "ImageObject", url: absoluteUrl(site.logo) },
    },
  };
}

/** ItemList for an index (e.g. resources, services hub). */
export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}

/** AboutPage. Founder Person included only when caller passes real data. */
export function aboutPageSchema(opts: {
  path: string;
  person?: {
    name: string;
    jobTitle: string;
    image?: string;
    alumniOf?: string;
    credential?: string;
  };
}) {
  const p = opts.person;
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absoluteUrl(opts.path),
    about: {
      "@type": "Organization",
      name: site.brand,
      url: site.domain,
    },
    ...(p
      ? {
          mainEntity: {
            "@type": "Person",
            name: p.name,
            jobTitle: p.jobTitle,
            ...(p.image ? { image: absoluteUrl(p.image) } : {}),
            worksFor: { "@type": "Organization", name: site.brand },
            ...(p.alumniOf
              ? {
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: p.alumniOf,
                  },
                }
              : {}),
            ...(p.credential
              ? {
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    credentialCategory: "professional license",
                    name: p.credential,
                  },
                }
              : {}),
          },
        }
      : {}),
  };
}
