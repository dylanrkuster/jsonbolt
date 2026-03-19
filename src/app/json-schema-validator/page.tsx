import type { Metadata } from "next";
import JsonSchemaValidatorEditor from "./JsonSchemaValidatorEditor";

export const metadata: Metadata = {
  title: "JSON Schema Validator — Validate JSON Against Schema Online | JSONBolt",
  description:
    "Validate JSON documents against JSON Schema (Draft-07) instantly. Free online JSON schema validator with detailed error messages, line numbers, and descriptions. 100% client-side.",
  keywords: [
    "json schema validator",
    "validate json against schema",
    "json schema online",
    "json schema draft-07",
    "json schema validation",
    "json schema checker",
    "json schema tester",
  ],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-schema-validator" },
};

export default function JsonSchemaValidatorPage() {
  return <JsonSchemaValidatorEditor />;
}
