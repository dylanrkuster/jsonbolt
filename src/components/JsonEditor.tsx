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
  TransformResult,
} from "@/lib/transforms";

type Tool =
  | "format"
  | "minify"
  | "validate"
  | "json2yaml"
  | "yaml2json"
  | "json2csv"
  | "json2xml"
  | "sort";

interface ToolConfig {
  id: Tool;
  label: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
}

const tools: ToolConfig[] = [
  {
    id: "format",
    label: "Format",
    description: "Beautify JSON",
    inputLabel: "Paste JSON",
    outputLabel: "Formatted JSON",
  },
  {
    id: "minify",
    label: "Minify",
    description: "Compress JSON",
    inputLabel: "Paste JSON",
    outputLabel: "Minified JSON",
  },
  {
    id: "validate",
    label: "Validate",
    description: "Check JSON",
    inputLabel: "Paste JSON to validate",
    outputLabel: "Validation Result",
  },
  {
    id: "sort",
    label: "Sort Keys",
    description: "Alphabetize",
    inputLabel: "Paste JSON",
    outputLabel: "Sorted JSON",
  },
  {
    id: "json2yaml",
    label: "JSON → YAML",
    description: "Convert",
    inputLabel: "Paste JSON",
    outputLabel: "YAML Output",
  },
  {
    id: "yaml2json",
    label: "YAML → JSON",
    description: "Convert",
    inputLabel: "Paste YAML",
    outputLabel: "JSON Output",
  },
  {
    id: "json2csv",
    label: "JSON → CSV",
    description: "Convert",
    inputLabel: "Paste JSON array",
    outputLabel: "CSV Output",
  },
  {
    id: "json2xml",
    label: "JSON → XML",
    description: "Convert",
    inputLabel: "Paste JSON",
    outputLabel: "XML Output",
  },
];

const SAMPLE_JSON = `{
  "name": "JSONBolt",
  "version": "1.0.0",
  "description": "Fast JSON tools for developers",
  "features": ["format", "validate", "convert"],
  "config": {
    "theme": "dark",
    "indent": 2,
    "sortKeys": false
  },
  "stats": {
    "users": 0,
    "tools": 8
  }
}`;

export default function JsonEditor() {
  const [activeTool, setActiveTool] = useState<Tool>("format");
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<TransformResult["stats"] | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const transform = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setStats(null);
      return;
    }

    let result: TransformResult;

    switch (activeTool) {
      case "format":
        result = formatJSON(input, indent);
        break;
      case "minify":
        result = minifyJSON(input);
        break;
      case "validate": {
        const validation = validateJSON(input);
        setOutput(
          validation.valid
            ? "✅ Valid JSON"
            : `❌ Invalid JSON\n\n${validation.error}${
                validation.position
                  ? `\nLine ${validation.position.line}, Column ${validation.position.column}`
                  : ""
              }`
        );
        setError(validation.valid ? null : validation.error ?? null);
        setStats({
          lines: input.split("\n").length,
          bytes: new Blob([input]).size,
          parseTimeMs: 0,
        });
        return;
      }
      case "json2yaml":
        result = jsonToYaml(input);
        break;
      case "yaml2json":
        result = yamlToJson(input);
        break;
      case "json2csv":
        result = jsonToCsv(input);
        break;
      case "json2xml":
        result = jsonToXml(input);
        break;
      case "sort":
        result = sortJsonKeys(input);
        break;
      default:
        result = formatJSON(input, indent);
    }

    setOutput(result.output);
    setError(result.error);
    setStats(result.stats);
  }, [input, activeTool, indent]);

  useEffect(() => {
    transform();
  }, [transform]);

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearInput = () => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
  };

  const loadSample = () => {
    setInput(SAMPLE_JSON);
  };

  const downloadOutput = () => {
    const extensions: Record<string, string> = {
      json2yaml: "yaml",
      json2csv: "csv",
      json2xml: "xml",
      yaml2json: "json",
    };
    const ext = extensions[activeTool] || "json";
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  const currentTool = tools.find((t) => t.id === activeTool)!;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tool Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 p-1 rounded-lg" style={{ background: "var(--bg-secondary)" }}>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`tab rounded-md ${activeTool === tool.id ? "active" : ""}`}
            style={
              activeTool === tool.id
                ? { background: "var(--bg-tertiary)", borderBottomColor: "var(--accent)" }
                : {}
            }
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {activeTool === "format" && (
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="btn text-sm"
              style={{ background: "var(--bg-tertiary)" }}
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          )}
          <button onClick={loadSample} className="btn">
            📋 Sample
          </button>
          <button onClick={clearInput} className="btn">
            🗑️ Clear
          </button>
          <label className="btn cursor-pointer">
            📂 Upload
            <input
              type="file"
              accept=".json,.yaml,.yml,.csv,.xml,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyOutput} className="btn-primary btn" disabled={!output}>
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          <button onClick={downloadOutput} className="btn" disabled={!output}>
            ⬇️ Download
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && activeTool !== "validate" && (
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

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
            {currentTool.inputLabel}
          </label>
          <textarea
            className="editor-textarea flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentTool.inputLabel + "..."}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
            {currentTool.outputLabel}
          </label>
          <textarea
            className="editor-textarea flex-1"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            spellCheck={false}
          />
        </div>
      </div>

      {/* Status Bar */}
      {stats && (
        <div className="status-bar mt-2 rounded-lg">
          <span>
            {stats.lines} lines • {formatBytes(stats.bytes)}
          </span>
          {stats.parseTimeMs > 0 && <span>• {stats.parseTimeMs}ms</span>}
          {!error && activeTool !== "validate" && (
            <span style={{ color: "var(--success)" }}>• ✓ Valid</span>
          )}
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
