"use client";

import { useState, useCallback, useEffect } from "react";
import {
  formatJSON,
  minifyJSON,
  validateJSON,
  jsonToYaml,
  yamlToJson,
  jsonToCsv,
  jsonToXml,
  sortJsonKeys,
} from "@/lib/transforms";

export type ToolType =
  | "format"
  | "minify"
  | "validate"
  | "json2yaml"
  | "yaml2json"
  | "json2csv"
  | "json2xml"
  | "sort";

interface ToolPageProps {
  title: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  toolType: ToolType;
  sampleInput: string;
  longDescription: string;
  features: string[];
  useCases: string[];
}

function runTransform(toolType: ToolType, input: string): { output: string; error: string | null } {
  switch (toolType) {
    case "format":
      return formatJSON(input, 2);
    case "minify":
      return minifyJSON(input);
    case "validate": {
      const v = validateJSON(input);
      if (v.valid) {
        const formatted = formatJSON(input, 2);
        return { output: `✅ Valid JSON\n\n${formatted.output}`, error: null };
      }
      return {
        output: `❌ Invalid JSON\n\n${v.error}${v.position ? `\nLine ${v.position.line}, Column ${v.position.column}` : ""}`,
        error: v.error,
      };
    }
    case "json2yaml":
      return jsonToYaml(input);
    case "yaml2json":
      return yamlToJson(input);
    case "json2csv":
      return jsonToCsv(input);
    case "json2xml":
      return jsonToXml(input);
    case "sort":
      return sortJsonKeys(input);
    default:
      return formatJSON(input, 2);
  }
}

export default function ToolPage({
  title,
  description,
  inputLabel,
  outputLabel,
  toolType,
  sampleInput,
  longDescription,
  features,
  useCases,
}: ToolPageProps) {
  const [input, setInput] = useState(sampleInput);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const doTransform = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    const result = runTransform(toolType, input);
    setOutput(result.output);
    setError(result.error);
  }, [input, toolType]);

  useEffect(() => {
    doTransform();
  }, [doTransform]);

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen">
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>JSONBolt</span>
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/#tools" style={{ color: "var(--text-secondary)" }}>All Tools</a>
          </nav>
        </div>
      </header>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>{description}</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setInput(sampleInput)} className="btn">📋 Sample</button>
            <button onClick={() => { setInput(""); setOutput(""); setError(null); }} className="btn">🗑️ Clear</button>
            <button onClick={copyOutput} className="btn-primary btn" disabled={!output}>
              {copied ? "✅ Copied!" : "📋 Copy Output"}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "var(--error)",
            }}>⚠️ {error}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>{inputLabel}</label>
              <textarea className="editor-textarea flex-1" value={input} onChange={(e) => setInput(e.target.value)} placeholder={inputLabel + "..."} spellCheck={false} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>{outputLabel}</label>
              <textarea className="editor-textarea flex-1" value={output} readOnly placeholder="Output will appear here..." spellCheck={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About This Tool</h2>
          <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{longDescription}</p>

          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <ul className="mb-8 space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent)" }}>✓</span> {f}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
          <ul className="space-y-2">
            {useCases.map((u) => (
              <li key={u} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span>→</span> {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t px-4 py-8 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        <p>⚡ <a href="/" style={{ color: "var(--accent)" }}>JSONBolt</a> — Free JSON tools for developers</p>
      </footer>
    </main>
  );
}
