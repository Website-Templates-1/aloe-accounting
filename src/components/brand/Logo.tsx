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
    <div className={`flex min-w-0 items-center gap-2.5 sm:gap-4 ${className}`}>
      <Link
        href="/"
        aria-label={`${site.brand} home`}
        className="inline-flex shrink-0 items-center"
      >
        <Image
          src="/aloe-logo.png"
          alt={site.brand}
          width={407}
          height={127}
          priority
          className="h-8 w-auto sm:h-10"
        />
      </Link>
      <span aria-hidden="true" className="h-7 w-px shrink-0 bg-border-soft sm:h-8" />
      <Image
        src="/trust/cpa.png"
        alt="CPA Ontario member"
        width={392}
        height={129}
        priority
        className="h-5 w-auto shrink-0 sm:h-7"
      />
    </div>
  );
}
