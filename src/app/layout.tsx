import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd, organizationSchema, websiteSchema, professionalServiceSchema } from "@/lib/jsonld";
import { site, analytics } from "@/lib/site.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate,
  },
  description: site.defaultDescription,
  applicationName: site.brand,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: {
    other: {
      "google-site-verification": analytics.googleSearchConsoleVerification,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: site.locale,
    url: site.domain,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.htmlLang} className={`${geistSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Site-wide structured data */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={professionalServiceSchema()} />

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
