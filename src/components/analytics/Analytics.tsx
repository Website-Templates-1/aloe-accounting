import Script from "next/script";
import { analytics } from "@/lib/site.config";

/**
 * Google Ads global site tag — added once, globally.
 * No GA4 is configured (no G- measurement id was provided).
 */
export function Analytics() {
  const id = analytics.googleAdsId;
  if (!id) return null;
  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
