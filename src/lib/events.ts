import { analytics } from "@/lib/site.config";

/**
 * Conversion-ready event layer for Google Ads.
 *
 * Each conversion event has a stable name plus an optional Google Ads
 * conversion label. Labels are filled in from the Ads account at launch;
 * until then events still fire as plain gtag events (visible in the tag
 * assistant / dataLayer), so nothing needs rewiring later.
 */
export type ConversionEvent =
  | "quote_form_success"
  | "phone_click"
  | "email_click"
  | "portal_click";

/** Map event → Google Ads conversion label ("AW-xxxx/LABEL"). Fill at launch. */
const conversionLabels: Partial<Record<ConversionEvent, string>> = {
  // quote_form_success: "XXXXXXXX",
  // phone_click: "XXXXXXXX",
  // email_click: "XXXXXXXX",
  // portal_click: "XXXXXXXX",
};

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
}

/** Fire a conversion-ready event. Safe no-op if gtag is unavailable. */
export function trackConversion(
  event: ConversionEvent,
  params: Record<string, unknown> = {},
): void {
  const g = gtag();
  if (!g) return;

  // Always emit a named event (useful for GA4/analytics + debugging).
  g("event", event, params);

  // If a Google Ads conversion label exists, emit the conversion too.
  const label = conversionLabels[event];
  if (label && analytics.googleAdsId) {
    g("event", "conversion", {
      send_to: `${analytics.googleAdsId}/${label}`,
      ...params,
    });
  }
}
