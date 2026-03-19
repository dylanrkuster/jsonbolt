import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSONBolt — Fast JSON Formatter, Validator & Converter",
  description:
    "Format, validate, minify, and convert JSON instantly. Free online JSON formatter with JSON to YAML, CSV, and XML conversion. Built for developers.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json to yaml",
    "json to csv",
    "json minifier",
    "json converter",
    "online json formatter",
    "json tool",
  ],
  openGraph: {
    title: "JSONBolt — Fast JSON Formatter, Validator & Converter",
    description:
      "Format, validate, minify, and convert JSON instantly. Free online tools built for developers.",
    type: "website",
    url: "https://jsonbolt.vercel.app",
    siteName: "JSONBolt",
    images: [{
      url: "https://snapog-teal.vercel.app/api/og?title=JSONBolt&description=Fast+JSON+Formatter,+Validator+%26+Converter&theme=dark&template=product&siteName=jsonbolt.vercel.app&accent=%23f59e0b",
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONBolt — Fast JSON Formatter & Converter",
    description: "Format, validate, minify, and convert JSON instantly. Free.",
    images: ["https://snapog-teal.vercel.app/api/og?title=JSONBolt&description=Fast+JSON+Formatter,+Validator+%26+Converter&theme=dark&template=product&siteName=jsonbolt.vercel.app&accent=%23f59e0b"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "JSONBolt",
              "url": "https://jsonbolt.vercel.app",
              "description": "Free online JSON formatter, validator, and converter. Format, minify, validate, diff, and convert JSON instantly.",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "JSON Formatter & Beautifier",
                "JSON Validator",
                "JSON Minifier",
                "JSON Diff & Compare",
                "JSON Schema Validator",
                "JSON Path Finder",
                "JSON to YAML Converter",
                "YAML to JSON Converter",
                "JSON to CSV Converter",
                "JSON to XML Converter"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
