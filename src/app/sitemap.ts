import type { MetadataRoute } from "next";
import { absoluteUrl, staticRoutes, services } from "@/lib/site.config";
import { getSitemapPosts } from "@/lib/posts";

/**
 * One sitemap, generated from the same sources the router uses:
 * static routes + the service registry + published posts. Draft and
 * future-dated posts are already excluded by getSitemapPosts().
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Static + service pages: no tracked modification date, so we omit
  // lastModified rather than restamp it to build time on every deploy (a
  // churning, misleading freshness signal). Posts carry real dates.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = getSitemapPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...postEntries];
}
