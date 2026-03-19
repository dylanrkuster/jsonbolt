import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "JSON Formatter Online — Free JSON Beautifier | JSONBolt",
  description: "Format and beautify JSON instantly. Free online JSON formatter with 2-space, 4-space, and tab indentation. No signup, runs in your browser.",
  keywords: ["json formatter", "json beautifier", "format json online", "pretty print json", "json formatter online free"],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-formatter" },
};

const SAMPLE = `{"name":"JSONBolt","version":"1.0.0","features":["format","validate","convert"],"config":{"theme":"dark","indent":2}}`;

export default function JsonFormatterPage() {
  return (
    <ToolPage
      title="JSON Formatter Online"
      description="Paste minified or messy JSON and get perfectly formatted output instantly. Free, fast, private."
      inputLabel="Paste unformatted JSON"
      outputLabel="Formatted JSON"
      toolType="format"
      sampleInput={SAMPLE}
      longDescription="JSON Formatter by JSONBolt beautifies your JSON data with proper indentation and line breaks, making it easy to read and debug. All processing happens locally in your browser — your data never touches a server. Whether you're working with API responses, configuration files, or database exports, this tool handles it instantly."
      features={[
        "Instant formatting with live preview as you type",
        "Customizable indentation (2 spaces, 4 spaces, tabs)",
        "Syntax validation with error highlighting",
        "Handles large JSON files (several MB)",
        "100% client-side — your data stays private",
        "Copy formatted output with one click",
        "Upload JSON files directly",
      ]}
      useCases={[
        "Debugging API responses from REST or GraphQL endpoints",
        "Making minified JSON config files readable",
        "Preparing JSON for documentation or code reviews",
        "Formatting JSON logs for analysis",
        "Cleaning up JSON exports from databases",
      ]}
    />
  );
}
