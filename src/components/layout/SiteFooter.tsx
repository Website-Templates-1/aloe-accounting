"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

/** Public footer — hidden on /admin so the panel is just chips + content. */
export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Footer />;
}
