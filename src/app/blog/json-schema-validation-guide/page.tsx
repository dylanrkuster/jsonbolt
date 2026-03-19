import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON Schema Validation: Complete Guide for Developers | JSONBolt",
  description:
    "Learn JSON Schema validation from basics to advanced. Draft-07 keywords, practical examples, and how to validate JSON against a schema online.",
  keywords: [
    "json schema validation",
    "json schema tutorial",
    "json schema draft-07",
    "validate json schema",
    "json schema examples",
    "json schema guide",
  ],
  alternates: { canonical: "https://jsonbolt.vercel.app/blog/json-schema-validation-guide" },
};

export default function JsonSchemaGuide() {
  return (
    <article className="prose-invert max-w-none">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span>March 19, 2026</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          JSON Schema Validation: The Complete Guide for Developers
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Everything you need to know about JSON Schema — from basic type validation
          to complex nested structures. With practical examples you can try right now.
        </p>
      </div>

      <nav className="mb-10 p-4 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>TABLE OF CONTENTS</h2>
        <ol className="space-y-1 text-sm list-decimal list-inside" style={{ color: "var(--accent)" }}>
          <li><a href="#what-is-json-schema" className="hover:underline">What is JSON Schema?</a></li>
          <li><a href="#why-validate" className="hover:underline">Why Validate JSON?</a></li>
          <li><a href="#basic-keywords" className="hover:underline">Basic Schema Keywords</a></li>
          <li><a href="#type-validation" className="hover:underline">Type Validation</a></li>
          <li><a href="#object-validation" className="hover:underline">Object Validation</a></li>
          <li><a href="#array-validation" className="hover:underline">Array Validation</a></li>
          <li><a href="#string-formats" className="hover:underline">String Formats & Patterns</a></li>
          <li><a href="#advanced" className="hover:underline">Advanced: Composition & References</a></li>
          <li><a href="#try-it" className="hover:underline">Try It Online</a></li>
        </ol>
      </nav>

      <section id="what-is-json-schema" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. What is JSON Schema?</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          JSON Schema is a vocabulary that lets you annotate and validate JSON documents.
          Think of it as a contract for your data — it defines what shape your JSON should
          have, what types each field should be, which fields are required, and what values
          are acceptable.
        </p>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          The most widely used version is <strong style={{ color: "var(--text)" }}>Draft-07</strong>,
          though newer drafts (2019-09, 2020-12) exist. Draft-07 remains the sweet spot
          of broad tooling support and feature richness.
        </p>
        <p style={{ color: "var(--text-secondary)" }}>
          A simple example: if your API expects a user object with a name (string) and
          age (number, minimum 0), your schema looks like this:
        </p>
        <pre className="my-4 text-sm overflow-x-auto">{`{
  "type": "object",
  "required": ["name", "age"],
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "age": { "type": "number", "minimum": 0 }
  }
}`}</pre>
      </section>

      <section id="why-validate" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Why Validate JSON?</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Without validation, bad data silently propagates through your system. Here are
          the most common use cases:
        </p>
        <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
          <li><strong style={{ color: "var(--text)" }}>API request/response validation</strong> — Catch malformed payloads before they hit your business logic.</li>
          <li><strong style={{ color: "var(--text)" }}>Configuration files</strong> — Validate config.json, package.json, or any structured config before deployment.</li>
          <li><strong style={{ color: "var(--text)" }}>Data pipeline quality</strong> — Ensure data flowing between services matches expected schemas.</li>
          <li><strong style={{ color: "var(--text)" }}>Form validation</strong> — Generate client-side validation rules from a single schema definition.</li>
          <li><strong style={{ color: "var(--text)" }}>Documentation</strong> — A schema IS documentation. It tells developers exactly what your API expects.</li>
        </ul>
      </section>

      <section id="basic-keywords" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Basic Schema Keywords</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Every JSON Schema starts with a few foundational keywords:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm" style={{ color: "var(--text-secondary)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--text)" }}>Keyword</th>
                <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--text)" }}>Purpose</th>
                <th className="text-left py-2 font-medium" style={{ color: "var(--text)" }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["type", "Data type constraint", '"type": "string"'],
                ["required", "Required properties", '"required": ["name"]'],
                ["properties", "Define object fields", '"properties": { "name": {...} }'],
                ["enum", "Allowed values", '"enum": ["red", "green", "blue"]'],
                ["const", "Exact value match", '"const": "active"'],
                ["description", "Human-readable docs", '"description": "User email"'],
                ["default", "Default value hint", '"default": 0'],
              ].map(([kw, purpose, example]) => (
                <tr key={kw} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-2 pr-4"><code style={{ color: "var(--accent)" }}>{kw}</code></td>
                  <td className="py-2 pr-4">{purpose}</td>
                  <td className="py-2"><code className="text-xs">{example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="type-validation" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Type Validation</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          JSON Schema supports seven primitive types:
        </p>
        <pre className="my-4 text-sm overflow-x-auto">{`// String with length constraints
{ "type": "string", "minLength": 1, "maxLength": 255 }

// Number with range
{ "type": "number", "minimum": 0, "maximum": 100, "multipleOf": 0.01 }

// Integer (no decimals)
{ "type": "integer", "minimum": 1 }

// Boolean
{ "type": "boolean" }

// Null
{ "type": "null" }

// Array (see section 6)
{ "type": "array", "items": { "type": "string" } }

// Object (see section 5)
{ "type": "object", "properties": { ... } }`}</pre>
        <p style={{ color: "var(--text-secondary)" }}>
          You can also allow multiple types: <code>{`"type": ["string", "null"]`}</code> accepts
          either a string or null — useful for optional fields in APIs.
        </p>
      </section>

      <section id="object-validation" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Object Validation</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Objects are the most common JSON structure. Here&apos;s a real-world example — a
          user registration schema:
        </p>
        <pre className="my-4 text-sm overflow-x-auto">{`{
  "type": "object",
  "required": ["email", "password", "name"],
  "additionalProperties": false,
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "description": "User's email address"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 128
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "age": {
      "type": "integer",
      "minimum": 13,
      "maximum": 150
    },
    "role": {
      "type": "string",
      "enum": ["user", "admin", "moderator"],
      "default": "user"
    }
  }
}`}</pre>
        <p style={{ color: "var(--text-secondary)" }}>
          Key keywords: <code>required</code> lists mandatory fields, <code>additionalProperties: false</code> rejects
          unknown fields, and each property has its own sub-schema.
        </p>
      </section>

      <section id="array-validation" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">6. Array Validation</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Arrays can be validated for item type, length, and uniqueness:
        </p>
        <pre className="my-4 text-sm overflow-x-auto">{`// Array of strings, 1-10 items, all unique
{
  "type": "array",
  "items": { "type": "string" },
  "minItems": 1,
  "maxItems": 10,
  "uniqueItems": true
}

// Array of objects (e.g., order line items)
{
  "type": "array",
  "items": {
    "type": "object",
    "required": ["productId", "quantity"],
    "properties": {
      "productId": { "type": "string" },
      "quantity": { "type": "integer", "minimum": 1 },
      "price": { "type": "number", "minimum": 0 }
    }
  }
}`}</pre>
      </section>

      <section id="string-formats" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">7. String Formats & Patterns</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          The <code>format</code> keyword validates common string patterns without writing regex:
        </p>
        <ul className="space-y-1 mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
          <li><code style={{ color: "var(--accent)" }}>email</code> — RFC 5322 email address</li>
          <li><code style={{ color: "var(--accent)" }}>uri</code> — Full URI</li>
          <li><code style={{ color: "var(--accent)" }}>date</code> — ISO 8601 date (YYYY-MM-DD)</li>
          <li><code style={{ color: "var(--accent)" }}>date-time</code> — ISO 8601 date-time</li>
          <li><code style={{ color: "var(--accent)" }}>ipv4</code> / <code style={{ color: "var(--accent)" }}>ipv6</code> — IP addresses</li>
          <li><code style={{ color: "var(--accent)" }}>uuid</code> — UUID format</li>
        </ul>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          For custom validation, use <code>pattern</code> with a regular expression:
        </p>
        <pre className="my-4 text-sm overflow-x-auto">{`// US phone number pattern
{ "type": "string", "pattern": "^\\\\d{3}-\\\\d{3}-\\\\d{4}$" }

// Hex color code
{ "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" }`}</pre>
      </section>

      <section id="advanced" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">8. Advanced: Composition Keywords</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          JSON Schema supports logical composition for complex validation:
        </p>
        <ul className="space-y-3 mb-4" style={{ color: "var(--text-secondary)" }}>
          <li>
            <strong style={{ color: "var(--text)" }}>allOf</strong> — Must match ALL schemas (like AND).
            Useful for extending a base schema.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>anyOf</strong> — Must match at least ONE schema (like OR).
            Great for polymorphic data.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>oneOf</strong> — Must match EXACTLY ONE schema (exclusive OR).
            For discriminated unions.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>not</strong> — Must NOT match the schema.
            For exclusion rules.
          </li>
        </ul>
        <pre className="my-4 text-sm overflow-x-auto">{`// Payment method: either credit card OR bank transfer
{
  "oneOf": [
    {
      "type": "object",
      "required": ["cardNumber", "expiry"],
      "properties": {
        "method": { "const": "card" },
        "cardNumber": { "type": "string", "pattern": "^\\\\d{16}$" },
        "expiry": { "type": "string", "format": "date" }
      }
    },
    {
      "type": "object",
      "required": ["iban"],
      "properties": {
        "method": { "const": "bank" },
        "iban": { "type": "string", "minLength": 15 }
      }
    }
  ]
}`}</pre>
      </section>

      <section id="try-it" className="mb-10 p-6 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--accent)" }}>
        <h2 className="text-2xl font-bold mb-3">9. Try It Online</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Ready to validate your JSON against a schema? Use JSONBolt&apos;s free{" "}
          <Link href="/json-schema-validator" style={{ color: "var(--accent)" }} className="underline">
            JSON Schema Validator
          </Link>{" "}
          — paste your JSON and schema, get instant validation with detailed error messages.
          100% client-side, no data leaves your browser.
        </p>
        <Link
          href="/json-schema-validator"
          className="inline-block px-6 py-3 rounded-lg font-semibold text-sm"
          style={{ background: "var(--accent)", color: "#000" }}
        >
          Open JSON Schema Validator →
        </Link>
      </section>

      <section className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <h3 className="font-semibold mb-3">More JSON Tools</h3>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <li>→ <Link href="/json-formatter" style={{ color: "var(--accent)" }}>JSON Formatter</Link> — Beautify and format JSON</li>
          <li>→ <Link href="/json-diff" style={{ color: "var(--accent)" }}>JSON Diff</Link> — Compare two JSON objects</li>
          <li>→ <Link href="/json-path-finder" style={{ color: "var(--accent)" }}>JSON Path Finder</Link> — Navigate JSON with JSONPath</li>
          <li>→ <Link href="/blog/best-json-formatters-2026" style={{ color: "var(--accent)" }}>Best JSON Formatters 2026</Link></li>
        </ul>
      </section>
    </article>
  );
}
