import type { Metadata } from "next";
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
    url: "https://jsonbolt.dev",
    siteName: "JSONBolt",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONBolt — Fast JSON Formatter & Converter",
    description: "Format, validate, minify, and convert JSON instantly. Free.",
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
