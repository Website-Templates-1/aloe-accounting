import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site.config";

/**
 * ALOE logo — the firm's real horizontal wordmark (icon + "ALOE Accounting
 * and Tax"). Always rendered on white surfaces (header + footer). The source
 * is transparent, so no background handling is required.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.brand} — home`}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/aloe-logo.png"
        alt={site.brand}
        width={407}
        height={127}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
