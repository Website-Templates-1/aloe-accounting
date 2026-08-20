import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/lib/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Admin + its API are noindex already; also keep crawlers out entirely.
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.domain,
  };
}
