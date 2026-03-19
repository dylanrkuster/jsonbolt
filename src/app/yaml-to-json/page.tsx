import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "YAML to JSON Converter Online — Free | JSONBolt",
  description: "Convert YAML to JSON instantly. Free online YAML to JSON converter. Validate YAML syntax by converting to strict JSON format.",
  keywords: ["yaml to json", "yaml to json converter", "convert yaml to json", "yaml json", "yaml2json"],
  alternates: { canonical: "https://jsonbolt.vercel.app/yaml-to-json" },
};

const SAMPLE = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app`;

export default function YamlToJsonPage() {
  return (
    <ToolPage
      title="YAML to JSON Converter"
      description="Convert YAML to JSON format instantly. Validate YAML by converting to strict JSON."
      inputLabel="Paste YAML"
      outputLabel="JSON Output"
      toolType="yaml2json"
      sampleInput={SAMPLE}
      longDescription="YAML to JSON Converter by JSONBolt transforms YAML data into properly formatted JSON. This is useful for validating YAML syntax (since JSON is stricter), preparing data for APIs that require JSON, or converting configuration files between formats. The converter handles all YAML features including anchors, multiline strings, and complex nested structures."
      features={[
        "Instant YAML to JSON conversion",
        "Validates YAML syntax during conversion",
        "Formatted JSON output with proper indentation",
        "Handles complex YAML features (anchors, multiline)",
        "Supports all YAML data types",
        "100% client-side — your data stays private",
      ]}
      useCases={[
        "Validating Kubernetes manifests by converting to JSON",
        "Preparing YAML config data for REST APIs",
        "Converting CI/CD pipeline configs for programmatic access",
        "Debugging YAML parsing issues",
        "Migrating from YAML to JSON configuration format",
      ]}
    />
  );
}
