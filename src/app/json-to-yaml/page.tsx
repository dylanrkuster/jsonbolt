import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "JSON to YAML Converter Online — Free | JSONBolt",
  description: "Convert JSON to YAML instantly. Free online JSON to YAML converter for Kubernetes configs, Docker Compose, CI/CD pipelines, and more.",
  keywords: ["json to yaml", "json to yaml converter", "convert json to yaml online", "json yaml", "json2yaml"],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-to-yaml" },
};

const SAMPLE = `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "my-app",
    "labels": {
      "app": "my-app",
      "version": "v1"
    }
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "matchLabels": {
        "app": "my-app"
      }
    }
  }
}`;

export default function JsonToYamlPage() {
  return (
    <ToolPage
      title="JSON to YAML Converter"
      description="Convert JSON to YAML format instantly. Perfect for Kubernetes, Docker Compose, and CI/CD configurations."
      inputLabel="Paste JSON"
      outputLabel="YAML Output"
      toolType="json2yaml"
      sampleInput={SAMPLE}
      longDescription="JSON to YAML Converter by JSONBolt transforms your JSON data into clean, readable YAML format. YAML is the standard format for Kubernetes manifests, Docker Compose files, GitHub Actions workflows, and many other DevOps tools. This converter handles nested objects, arrays, multiline strings, and all YAML-specific formatting automatically."
      features={[
        "Instant conversion with live preview",
        "Clean YAML output with proper indentation",
        "Handles complex nested structures",
        "Supports arrays, objects, and all JSON data types",
        "Perfect for Kubernetes and Docker configurations",
        "100% browser-based — no server processing",
      ]}
      useCases={[
        "Converting API responses to Kubernetes manifests",
        "Creating Docker Compose files from JSON configs",
        "Preparing GitHub Actions workflow files",
        "Converting JSON configs to Ansible playbooks",
        "Migrating configuration formats between systems",
      ]}
    />
  );
}
