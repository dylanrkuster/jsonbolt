import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "JSON Validator Online — Check JSON Syntax Free | JSONBolt",
  description: "Validate JSON syntax instantly with precise error locations. Free online JSON validator with line numbers and error descriptions. No signup required.",
  keywords: ["json validator", "validate json online", "json syntax checker", "json lint", "check json"],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-validator" },
};

const SAMPLE = `{
  "name": "JSONBolt",
  "valid": true,
  "count": 42
}`;

export default function JsonValidatorPage() {
  return (
    <ToolPage
      title="JSON Validator Online"
      description="Check if your JSON is valid with precise error locations. Instantly find and fix syntax issues."
      inputLabel="Paste JSON to validate"
      outputLabel="Validation Result"
      toolType="validate"
      sampleInput={SAMPLE}
      longDescription="JSON Validator by JSONBolt checks your JSON for syntax errors and reports exact positions where issues occur. It catches missing commas, unmatched brackets, invalid escape sequences, trailing commas, and other common JSON mistakes. When your JSON is valid, it also formats it for easy reading."
      features={[
        "Instant validation as you type",
        "Precise error positions with line and column numbers",
        "Catches all common JSON syntax errors",
        "Auto-formats valid JSON for readability",
        "Handles nested objects and arrays of any depth",
        "100% browser-based — no data sent to servers",
      ]}
      useCases={[
        "Debugging malformed API responses",
        "Validating configuration files before deployment",
        "Checking JSON data exports for integrity",
        "Verifying hand-edited JSON files",
        "Testing JSON payloads before sending to APIs",
      ]}
    />
  );
}
