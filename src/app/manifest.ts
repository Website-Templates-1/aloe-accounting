import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand,
    short_name: site.shortBrand,
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1b2e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
