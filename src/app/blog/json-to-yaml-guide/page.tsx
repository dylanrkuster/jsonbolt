import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert JSON to YAML: Complete Guide (2026) | JSONBolt",
  description:
    "Learn how to convert JSON to YAML for Kubernetes, Docker Compose, and CI/CD. Includes examples, syntax comparison, and a free online converter.",
  keywords: [
    "json to yaml",
    "convert json to yaml",
    "json vs yaml",
    "json yaml difference",
    "kubernetes yaml from json",
    "json to yaml online",
  ],
  alternates: { canonical: "https://jsonbolt.vercel.app/blog/json-to-yaml-guide" },
};

export default function JsonToYamlGuide() {
  return (
    <article className="prose-invert max-w-none">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span>March 19, 2026</span>
          <span>•</span>
          <span>4 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          How to Convert JSON to YAML: Complete Guide
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          YAML and JSON are both data serialization formats, but they serve different purposes. Here&apos;s
          everything you need to know about converting between them.
        </p>
      </div>

      <div className="space-y-8" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            JSON vs YAML: Key Differences
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left py-3 pr-4">Feature</th>
                  <th className="text-left py-3 pr-4">JSON</th>
                  <th className="text-left py-3">YAML</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Syntax", "Brackets and braces", "Indentation-based"],
                  ["Comments", "Not supported", "Supported (#)"],
                  ["Data types", "String, number, boolean, null, array, object", "All JSON types + dates, timestamps"],
                  ["Readability", "Good for machines", "Good for humans"],
                  ["File size", "Larger (brackets add bytes)", "Smaller (no brackets)"],
                  ["Use case", "APIs, data exchange", "Configuration files"],
                ].map(([feature, json, yaml]) => (
                  <tr key={feature} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-3 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>{feature}</td>
                    <td className="py-3 pr-4">{json}</td>
                    <td className="py-3">{yaml}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            When to Convert JSON to YAML
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong style={{ color: "var(--text-primary)" }}>Kubernetes manifests:</strong> Kubernetes uses YAML for all configuration. If your data source is JSON (like an API response), you&apos;ll need to convert.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Docker Compose:</strong> Docker Compose files are YAML. Converting from JSON templates is common in CI/CD pipelines.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>GitHub Actions:</strong> Workflow files use YAML syntax exclusively.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Ansible playbooks:</strong> Configuration management with Ansible requires YAML.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Human editing:</strong> YAML is often easier for humans to read and edit, especially for configuration files.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Example: JSON to YAML Conversion
          </h2>
          <p className="mb-4">Here&apos;s a practical example of converting a Kubernetes Deployment from JSON to YAML:</p>

          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>JSON Input:</h3>
          <pre className="mb-4 p-4 rounded-lg text-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
{`{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "my-app",
    "labels": {
      "app": "my-app"
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
}`}
          </pre>

          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>YAML Output:</h3>
          <pre className="mb-4 p-4 rounded-lg text-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Methods to Convert JSON to YAML
          </h2>

          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            1. Online Tool (Fastest)
          </h3>
          <p className="mb-4">
            Use <a href="/json-to-yaml" style={{ color: "var(--accent)" }}>JSONBolt&apos;s JSON to YAML converter</a> to
            convert instantly in your browser. Paste JSON, get YAML. No installation needed.
          </p>

          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            2. Command Line (yq)
          </h3>
          <pre className="mb-4 p-4 rounded-lg text-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
{`# Install yq
brew install yq

# Convert file
yq -P input.json > output.yaml

# Convert from stdin
cat input.json | yq -P`}
          </pre>

          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            3. Python
          </h3>
          <pre className="mb-4 p-4 rounded-lg text-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
{`import json
import yaml

with open('input.json') as f:
    data = json.load(f)

with open('output.yaml', 'w') as f:
    yaml.dump(data, f, default_flow_style=False)`}
          </pre>

          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            4. Node.js
          </h3>
          <pre className="mb-4 p-4 rounded-lg text-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
{`const yaml = require('js-yaml');
const fs = require('fs');

const json = JSON.parse(fs.readFileSync('input.json', 'utf8'));
fs.writeFileSync('output.yaml', yaml.dump(json));`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong style={{ color: "var(--text-primary)" }}>Indentation matters:</strong> YAML uses spaces (not tabs!) for indentation. Most tools default to 2 spaces.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>String quoting:</strong> YAML doesn&apos;t require quotes for most strings, but some values (like &quot;yes&quot;, &quot;no&quot;, &quot;true&quot;) need quoting to avoid being interpreted as booleans.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Multi-line strings:</strong> JSON uses \\n for newlines. YAML has multiple multi-line string syntaxes (|, &gt;, |-, &gt;-).</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Null handling:</strong> JSON uses null. YAML interprets null, ~, and empty values as null.</li>
          </ul>
        </section>

        <section className="p-6 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--accent)" }}>
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Try It Now
          </h2>
          <p className="mb-3">
            Convert JSON to YAML instantly with JSONBolt — free, fast, and private. No signup required.
          </p>
          <a href="/json-to-yaml" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent)", color: "#000" }}>
            → Open JSON to YAML Converter
          </a>
        </section>
      </div>
    </article>
  );
}
