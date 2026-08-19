import type { NextConfig } from "next";
import { redirects as redirectTable } from "./src/lib/site.config";

const nextConfig: NextConfig = {
  // Clean URLs: one host, no trailing slash.
  trailingSlash: false,

  // Host-level 301s, derived from the single redirect table in site.config.
  async redirects() {
    return [
      // Canonical host: force non-www → www (matches site.domain).
      {
        source: "/:path*",
        has: [{ type: "host", value: "aloeaccountingandtax.com" }],
        destination: "https://www.aloeaccountingandtax.com/:path*",
        permanent: true,
      },
      ...redirectTable.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: r.permanent,
      })),
    ];
  },
};

export default nextConfig;
