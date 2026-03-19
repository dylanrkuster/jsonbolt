import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "JSON Minifier Online — Compress JSON Free | JSONBolt",
  description: "Minify JSON by removing whitespace and formatting. Reduce JSON file size instantly. Free online JSON compressor, no signup required.",
  keywords: ["json minifier", "minify json", "compress json", "json compressor", "reduce json size"],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-minifier" },
};

const SAMPLE = `{
  "name": "JSONBolt",
  "version": "1.0.0",
  "description": "Fast JSON tools",
  "features": [
    "format",
    "validate",
    "convert"
  ],
  "config": {
    "theme": "dark",
    "indent": 2
  }
}`;

export default function JsonMinifierPage() {
  return (
    <ToolPage
      title="JSON Minifier Online"
      description="Compress JSON by removing all whitespace and formatting. Reduce file size for production use."
      inputLabel="Paste JSON to minify"
      outputLabel="Minified JSON"
      toolType="minify"
      sampleInput={SAMPLE}
      longDescription="JSON Minifier by JSONBolt removes all unnecessary whitespace, line breaks, and indentation from your JSON data, producing the smallest possible output. This is essential for reducing payload sizes in API responses, configuration files, and data storage. Minified JSON loads faster and uses less bandwidth."
      features={[
        "Instant minification with live preview",
        "Shows size reduction statistics",
        "Validates JSON before minifying",
        "Handles deeply nested structures",
        "One-click copy of minified output",
        "100% client-side processing",
      ]}
      useCases={[
        "Reducing API response payload sizes",
        "Optimizing JSON configuration for production",
        "Preparing JSON for URL parameters or cookies",
        "Minimizing storage space for JSON data",
        "Compressing JSON before network transmission",
      ]}
    />
  );
}
