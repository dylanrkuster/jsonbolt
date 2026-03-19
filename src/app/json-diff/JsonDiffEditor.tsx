"use client";

import { useState, useCallback, useEffect } from "react";
import { diffJSON, formatDiffOutput } from "@/lib/diff";

const SAMPLE_LEFT = `{
  "name": "JSONBolt",
  "version": "1.0.0",
  "features": ["format", "validate", "convert"],
  "config": {
    "theme": "dark",
    "indent": 2,
    "maxSize": 1024
  },
  "deprecated": true
}`;

const SAMPLE_RIGHT = `{
  "name": "JSONBolt",
  "version": "2.0.0",
  "features": ["format", "validate", "convert", "diff"],
  "config": {
    "theme": "light",
    "indent": 2
  },
  "newFeature": true
}`;

export default function JsonDiffEditor() {
  const [left, setLeft] = useState(SAMPLE_LEFT);
  const [right, setRight] = useState(SAMPLE_RIGHT);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const compare = useCallback(() => {
    if (!left.trim() || !right.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    const result = diffJSON(left, right);
    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setError(null);
      setOutput(formatDiffOutput(result.diffs, result.summary));
    }
  }, [left, right]);

  useEffect(() => {
    compare();
  }, [compare]);

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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Diff — Compare JSON Objects</h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Paste two JSON objects to instantly see what&apos;s added, removed, and changed.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => { setLeft(SAMPLE_LEFT); setRight(SAMPLE_RIGHT); }}
              className="btn"
            >
              📋 Sample
            </button>
            <button
              onClick={() => { setLeft(""); setRight(""); setOutput(""); setError(null); }}
              className="btn"
            >
              🗑️ Clear
            </button>
            <button onClick={copyOutput} className="btn-primary btn" disabled={!output}>
              {copied ? "✅ Copied!" : "📋 Copy Result"}
            </button>
          </div>

          {error && (
            <div
              className="mb-4 p-3 rounded-lg text-sm"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "var(--error)",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                Original JSON (Left)
              </label>
              <textarea
                className="editor-textarea flex-1"
                value={left}
                onChange={(e) => setLeft(e.target.value)}
                placeholder="Paste original JSON..."
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                Modified JSON (Right)
              </label>
              <textarea
                className="editor-textarea flex-1"
                value={right}
                onChange={(e) => setRight(e.target.value)}
                placeholder="Paste modified JSON..."
                spellCheck={false}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Diff Result
            </label>
            <textarea
              className="editor-textarea"
              value={output}
              readOnly
              placeholder="Differences will appear here..."
              spellCheck={false}
              style={{ minHeight: "250px" }}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About JSON Diff</h2>
          <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            JSON Diff by JSONBolt compares two JSON objects and shows exactly what changed between them.
            It performs a deep recursive comparison, detecting added keys, removed keys, and changed values
            at every level of nesting. Perfect for debugging API changes, comparing config versions, or
            reviewing data migrations.
          </p>

          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <ul className="mb-8 space-y-2">
            {[
              "Deep recursive comparison of nested objects and arrays",
              "Detects added, removed, and changed fields",
              "Shows exact path to every difference",
              "Handles arrays with element-by-element comparison",
              "Summary statistics (X added, Y removed, Z changed)",
              "100% client-side — your data stays private",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent)" }}>✓</span> {f}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
          <ul className="space-y-2">
            {[
              "Comparing API response versions before and after changes",
              "Reviewing configuration file changes in deployments",
              "Debugging data migration differences",
              "Verifying JSON transformation outputs",
              "Comparing database export snapshots",
            ].map((u) => (
              <li key={u} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span>→</span> {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer
        className="border-t px-4 py-8 text-center text-sm"
        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      >
        <p>
          ⚡ <a href="/" style={{ color: "var(--accent)" }}>JSONBolt</a> — Free JSON tools for developers
        </p>
      </footer>
    </main>
  );
}
