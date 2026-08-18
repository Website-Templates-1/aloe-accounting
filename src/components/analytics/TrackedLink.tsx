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
  onClick,
}: {
  href: string;
  event: ConversionEvent;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  /** Extra handler run alongside conversion tracking (e.g. close a menu). */
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        trackConversion(event);
        onClick?.();
      }}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
