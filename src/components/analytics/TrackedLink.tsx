"use client";

import type { ReactNode } from "react";
import { trackConversion, type ConversionEvent } from "@/lib/events";

/**
 * Anchor that fires a conversion event on click. Used for tel:, mailto:,
 * and the external Client Portal link. External links get safe rel attrs.
 */
export function TrackedLink({
  href,
  event,
  external = false,
  className = "",
  children,
  ariaLabel,
}: {
  href: string;
  event: ConversionEvent;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackConversion(event)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
