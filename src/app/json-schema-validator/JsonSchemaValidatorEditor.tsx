"use client";

import { useState, useCallback } from "react";

/* ─── Lightweight JSON Schema Draft-07 Validator ─── */

interface ValidationError {
  path: string;
  message: string;
  line?: number;
}

function getType(val: unknown): string {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val;
}

function matchesFormat(val: string, fmt: string): boolean {
  switch (fmt) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    case "uri":
    case "uri-reference":
      return /^https?:\/\/.+/.test(val);
    case "date":
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    case "date-time":
      return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val);
    case "ipv4":
      return /^(\d{1,3}\.){3}\d{1,3}$/.test(val);
    case "ipv6":
      return /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/.test(val);
    case "uuid":
      return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(val);
    default:
      return true;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validate(data: any, schema: any, path: string, errors: ValidationError[]): void {
  if (!schema || typeof schema !== "object") return;

  // type
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actualType = getType(data);
    const typeMatch = types.some((t: string) => {
      if (t === "integer") return actualType === "number" && Number.isInteger(data);
      return t === actualType;
    });
    if (!typeMatch) {
      errors.push({
        path,
        message: `Expected type "${schema.type}" but got "${getType(data)}"`,
      });
      return; // no point continuing if type is wrong
    }
  }

  // enum
  if (schema.enum) {
    if (!schema.enum.some((v: unknown) => JSON.stringify(v) === JSON.stringify(data))) {
      errors.push({
        path,
        message: `Value must be one of: ${JSON.stringify(schema.enum)}`,
      });
    }
  }

  // const
  if ("const" in schema) {
    if (JSON.stringify(data) !== JSON.stringify(schema.const)) {
      errors.push({
        path,
        message: `Value must be ${JSON.stringify(schema.const)}`,
      });
    }
  }

  // string checks
  if (typeof data === "string") {
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      errors.push({ path, message: `String must be at least ${schema.minLength} characters` });
    }
    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      errors.push({ path, message: `String must be at most ${schema.maxLength} characters` });
    }
    if (schema.pattern) {
      const re = new RegExp(schema.pattern);
      if (!re.test(data)) {
        errors.push({ path, message: `String must match pattern "${schema.pattern}"` });
      }
    }
    if (schema.format) {
      if (!matchesFormat(data, schema.format)) {
        errors.push({ path, message: `String does not match format "${schema.format}"` });
      }
    }
  }

  // number checks
  if (typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push({ path, message: `Value must be >= ${schema.minimum}` });
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push({ path, message: `Value must be <= ${schema.maximum}` });
    }
    if (schema.exclusiveMinimum !== undefined && data <= schema.exclusiveMinimum) {
      errors.push({ path, message: `Value must be > ${schema.exclusiveMinimum}` });
    }
    if (schema.exclusiveMaximum !== undefined && data >= schema.exclusiveMaximum) {
      errors.push({ path, message: `Value must be < ${schema.exclusiveMaximum}` });
    }
    if (schema.multipleOf !== undefined && data % schema.multipleOf !== 0) {
      errors.push({ path, message: `Value must be a multiple of ${schema.multipleOf}` });
    }
  }

  // array checks
  if (Array.isArray(data)) {
    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push({ path, message: `Array must have at least ${schema.minItems} items` });
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      errors.push({ path, message: `Array must have at most ${schema.maxItems} items` });
    }
    if (schema.uniqueItems) {
      const seen = new Set(data.map((d: unknown) => JSON.stringify(d)));
      if (seen.size !== data.length) {
        errors.push({ path, message: `Array items must be unique` });
      }
    }
    if (schema.items) {
      data.forEach((item: unknown, i: number) => {
        validate(item, schema.items, `${path}[${i}]`, errors);
      });
    }
  }

  // object checks
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    // required
    if (schema.required && Array.isArray(schema.required)) {
      for (const key of schema.required) {
        if (!(key in data)) {
          errors.push({ path: path ? `${path}.${key}` : key, message: `Required property "${key}" is missing` });
        }
      }
    }

    // properties
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in data) {
          validate(data[key], propSchema, path ? `${path}.${key}` : key, errors);
        }
      }
    }

    // additionalProperties
    if (schema.additionalProperties === false && schema.properties) {
      const allowed = new Set(Object.keys(schema.properties));
      for (const key of Object.keys(data)) {
        if (!allowed.has(key)) {
          errors.push({ path: path ? `${path}.${key}` : key, message: `Additional property "${key}" is not allowed` });
        }
      }
    } else if (typeof schema.additionalProperties === "object" && schema.properties) {
      const allowed = new Set(Object.keys(schema.properties));
      for (const key of Object.keys(data)) {
        if (!allowed.has(key)) {
          validate(data[key], schema.additionalProperties, path ? `${path}.${key}` : key, errors);
        }
      }
    }

    // minProperties / maxProperties
    if (schema.minProperties !== undefined && Object.keys(data).length < schema.minProperties) {
      errors.push({ path, message: `Object must have at least ${schema.minProperties} properties` });
    }
    if (schema.maxProperties !== undefined && Object.keys(data).length > schema.maxProperties) {
      errors.push({ path, message: `Object must have at most ${schema.maxProperties} properties` });
    }
  }
}

function findLineForPath(jsonStr: string, path: string): number | undefined {
  if (!path) return undefined;
  const segments = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  const lastKey = segments[segments.length - 1];
  const lines = jsonStr.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"${lastKey}"`)) {
      return i + 1;
    }
  }
  return undefined;
}

function runSchemaValidation(
  jsonStr: string,
  schemaStr: string
): { valid: boolean; errors: ValidationError[]; parseError?: string } {
  let data: unknown;
  let schema: unknown;

  try {
    data = JSON.parse(jsonStr);
  } catch (e) {
    return { valid: false, errors: [], parseError: `Invalid JSON document: ${(e as Error).message}` };
  }

  try {
    schema = JSON.parse(schemaStr);
  } catch (e) {
    return { valid: false, errors: [], parseError: `Invalid JSON Schema: ${(e as Error).message}` };
  }

  const errors: ValidationError[] = [];
  validate(data, schema, "", errors);

  // Try to add line numbers
  for (const err of errors) {
    err.line = findLineForPath(jsonStr, err.path);
  }

  return { valid: errors.length === 0, errors };
}

/* ─── Sample Data ─── */

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zip": "12345"
  },
  "hobbies": ["reading", "cycling", "cooking"],
  "isActive": true
}`;

const SAMPLE_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "age", "email"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "address": {
      "type": "object",
      "required": ["street", "city"],
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zip": { "type": "string", "pattern": "^[0-9]{5}$" }
      }
    },
    "hobbies": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1
    },
    "isActive": {
      "type": "boolean"
    }
  }
}`;

/* ─── Component ─── */

export default function JsonSchemaValidatorEditor() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [schemaInput, setSchemaInput] = useState(SAMPLE_SCHEMA);
  const [result, setResult] = useState<{
    valid: boolean;
    errors: ValidationError[];
    parseError?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleValidate = useCallback(() => {
    if (!jsonInput.trim() || !schemaInput.trim()) {
      setResult(null);
      return;
    }
    setResult(runSchemaValidation(jsonInput, schemaInput));
  }, [jsonInput, schemaInput]);

  const copyResult = () => {
    if (!result) return;
    const text = result.parseError
      ? result.parseError
      : result.valid
      ? "✅ Valid — JSON matches the schema."
      : result.errors.map((e) => `${e.path || "(root)"}: ${e.message}${e.line ? ` (line ${e.line})` : ""}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen">
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>
              JSONBolt
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/#tools" style={{ color: "var(--text-secondary)" }}>All Tools</a>
          </nav>
        </div>
      </header>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Schema Validator</h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Validate your JSON document against a JSON Schema (Draft-07). Paste both below and click Validate.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <button
              onClick={() => {
                setJsonInput(SAMPLE_JSON);
                setSchemaInput(SAMPLE_SCHEMA);
                setResult(null);
              }}
              className="btn"
            >
              📋 Sample
            </button>
            <button
              onClick={() => {
                setJsonInput("");
                setSchemaInput("");
                setResult(null);
              }}
              className="btn"
            >
              🗑️ Clear
            </button>
            <button onClick={handleValidate} className="btn-primary btn">
              ✅ Validate
            </button>
            <button onClick={copyResult} className="btn" disabled={!result}>
              {copied ? "✅ Copied!" : "📋 Copy Result"}
            </button>
          </div>

          {result && (
            <div
              className="mb-4 p-4 rounded-lg text-sm"
              style={{
                background: result.valid
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
                border: `1px solid ${result.valid ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                color: result.valid ? "#22c55e" : "var(--error)",
              }}
            >
              {result.parseError ? (
                <p>⚠️ {result.parseError}</p>
              ) : result.valid ? (
                <p>✅ <strong>Valid</strong> — JSON document matches the schema.</p>
              ) : (
                <div>
                  <p className="mb-2 font-semibold">❌ Validation failed — {result.errors.length} error{result.errors.length > 1 ? "s" : ""} found:</p>
                  <ul className="space-y-1 ml-4">
                    {result.errors.map((err, i) => (
                      <li key={i}>
                        <code style={{ color: "var(--accent)" }}>{err.path || "(root)"}</code>
                        {err.line && <span className="opacity-60"> (line {err.line})</span>}
                        {": "}
                        {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                JSON Document
              </label>
              <textarea
                className="editor-textarea flex-1"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON document here..."
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                JSON Schema
              </label>
              <textarea
                className="editor-textarea flex-1"
                value={schemaInput}
                onChange={(e) => setSchemaInput(e.target.value)}
                placeholder="Paste your JSON Schema here..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About JSON Schema Validator</h2>
          <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            JSON Schema Validator by JSONBolt lets you validate any JSON document against a JSON Schema definition.
            It supports JSON Schema Draft-07 keywords including type, required, properties, items, minLength,
            maxLength, minimum, maximum, enum, pattern, format, and more. All validation runs entirely in your
            browser — your data never leaves your computer.
          </p>

          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <ul className="mb-8 space-y-2">
            {[
              "JSON Schema Draft-07 validation",
              "Supports type, required, properties, items, enum, pattern, format",
              "Numeric constraints: minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf",
              "String constraints: minLength, maxLength, pattern, format",
              "Array constraints: minItems, maxItems, uniqueItems",
              "Object constraints: required, additionalProperties, minProperties, maxProperties",
              "Format validation: email, uri, date, date-time, ipv4, ipv6, uuid",
              "Detailed error messages with paths and line numbers",
              "Pre-loaded examples to get started quickly",
              "100% client-side — your data stays private",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent)" }}>✓</span> {f}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
          <ul className="mb-8 space-y-2">
            {[
              "Validating API request/response payloads against a contract",
              "Testing JSON Schema definitions before using them in code",
              "Verifying configuration files match expected structure",
              "Learning JSON Schema syntax with instant feedback",
              "Debugging data validation failures in applications",
            ].map((u) => (
              <li key={u} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span>→</span> {u}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          {[
            {
              q: "What JSON Schema drafts are supported?",
              a: "JSONBolt's schema validator supports the most commonly used keywords from JSON Schema Draft-07, including type, required, properties, items, enum, pattern, format, and numeric/string/array constraints.",
            },
            {
              q: "Does this validator support $ref?",
              a: "Currently, $ref (schema references) is not supported. All schema definitions should be inline. This keeps the tool simple and fast for most common validation use cases.",
            },
            {
              q: "Is my data sent to a server?",
              a: "No. All validation runs 100% in your browser using JavaScript. Your JSON documents and schemas never leave your computer.",
            },
            {
              q: "What formats are supported for string validation?",
              a: "The format keyword supports: email, uri, date, date-time, ipv4, ipv6, and uuid. Other format values are accepted but not validated.",
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="mb-4 p-4 rounded-lg"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border)",
              }}
            >
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <footer
        className="border-t px-4 py-8 text-center text-sm"
        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      >
        <p>
          ⚡ <a href="/" style={{ color: "var(--accent)" }}>JSONBolt</a> — Free JSON tools for developers.
          Also try{" "}
          <a
            href="https://snapog-teal.vercel.app"
            className="underline"
            style={{ color: "var(--accent)" }}
          >
            SnapOG
          </a>{" "}
          for beautiful social preview images.
        </p>
      </footer>
    </main>
  );
}
