import type { Metadata } from "next";
import { site, canonical, absoluteUrl } from "@/lib/site.config";

interface PageMetaInput {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/services/corporate-tax". */
  path: string;
  ogType?: "website" | "article";
  /** Override OG image (relative or absolute). */
  image?: string;
  noindex?: boolean;
  /** article-only */
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * The one canonical metadata builder. Every page's generateMetadata()
 * calls this — unique title, description, canonical, OG, Twitter, robots.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogType = "website",
  image,
  noindex = false,
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = canonical(path);
  const ogImage = absoluteUrl(image ?? site.ogImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      siteName: site.brand,
      title,
      description,
      url,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.brand }],
      ...(ogType === "article"
        ? { publishedTime, modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
