"use client";

import { useState, useCallback, useMemo } from "react";

/* ─── JSONPath Utilities ─── */

function toDotNotation(segments: (string | number)[]): string {
  let path = "$";
  for (const seg of segments) {
    if (typeof seg === "number") {
      path += `[${seg}]`;
    } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(seg)) {
      path += `.${seg}`;
    } else {
      path += `["${seg.replace(/"/g, '\\"')}"]`;
    }
  }
  return path;
}

function toBracketNotation(segments: (string | number)[]): string {
  if (segments.length === 0) return "$";
  let path = "$";
  for (const seg of segments) {
    if (typeof seg === "number") {
      path += `[${seg}]`;
    } else {
      path += `["${seg.replace(/"/g, '\\"')}"]`;
    }
  }
  return path;
}

/* ─── Tree Node type ─── */

interface TreeNode {
  key: string;
  value: unknown;
  type: string;
  segments: (string | number)[];
  children?: TreeNode[];
  expanded?: boolean;
}

function buildTree(data: unknown, segments: (string | number)[] = []): TreeNode[] {
  if (data === null || data === undefined) return [];

  if (Array.isArray(data)) {
    return data.map((item, i) => {
      const childSegments = [...segments, i];
      const type = getDisplayType(item);
      return {
        key: `[${i}]`,
        value: item,
        type,
        segments: childSegments,
        children: (typeof item === "object" && item !== null) ? buildTree(item, childSegments) : undefined,
      };
    });
  }

  if (typeof data === "object") {
    return Object.entries(data).map(([key, val]) => {
      const childSegments = [...segments, key];
      const type = getDisplayType(val);
      return {
        key,
        value: val,
        type,
        segments: childSegments,
        children: (typeof val === "object" && val !== null) ? buildTree(val, childSegments) : undefined,
      };
    });
  }

  return [];
}

function getDisplayType(val: unknown): string {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val;
}

function getPreview(val: unknown): string {
  if (val === null) return "null";
  if (typeof val === "string") return `"${val.length > 40 ? val.slice(0, 40) + "…" : val}"`;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) return `[${val.length} items]`;
  if (typeof val === "object") return `{${Object.keys(val).length} keys}`;
  return String(val);
}

/* ─── JSONPath query engine ─── */

function queryJsonPath(data: unknown, pathStr: string): { matches: { path: string; value: unknown }[]; error?: string } {
  try {
    const cleanPath = pathStr.trim();
    if (!cleanPath.startsWith("$")) {
      return { matches: [], error: "Path must start with $" };
    }

    // Parse path into segments
    const rest = cleanPath.slice(1); // remove $
    if (!rest) return { matches: [{ path: "$", value: data }] };

    const segments: (string | number)[] = [];
    const regex = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)|(\[(\d+)\])|(\["([^"]+)"\])/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(rest)) !== null) {
      if (match.index !== lastIndex) {
        return { matches: [], error: `Unexpected characters at position ${lastIndex + 1}` };
      }
      if (match[1] !== undefined) {
        segments.push(match[1]);
      } else if (match[3] !== undefined) {
        segments.push(parseInt(match[3], 10));
      } else if (match[5] !== undefined) {
        segments.push(match[5]);
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex !== rest.length) {
      return { matches: [], error: `Unable to parse path after position ${lastIndex + 1}` };
    }

    let current: unknown = data;
    for (const seg of segments) {
      if (current === null || current === undefined) {
        return { matches: [] };
      }
      if (typeof seg === "number") {
        if (!Array.isArray(current)) return { matches: [] };
        current = current[seg];
      } else {
        if (typeof current !== "object" || current === null || Array.isArray(current)) return { matches: [] };
        current = (current as Record<string, unknown>)[seg];
      }
    }

    if (current === undefined) return { matches: [] };

    return { matches: [{ path: toDotNotation(segments), value: current }] };
  } catch {
    return { matches: [], error: "Invalid JSONPath expression" };
  }
}

/* ─── Sample ─── */

const SAMPLE_JSON = `{
  "store": {
    "name": "Book Haven",
    "location": "Springfield",
    "book": [
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J.R.R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      },
      {
        "category": "nonfiction",
        "author": "Stephen Hawking",
        "title": "A Brief History of Time",
        "isbn": "0-553-38016-8",
        "price": 15.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`;

/* ─── Tree Node Component ─── */

function TreeNodeComponent({
  node,
  selectedPath,
  onSelect,
  expandedPaths,
  toggleExpand,
}: {
  node: TreeNode;
  selectedPath: string | null;
  onSelect: (node: TreeNode) => void;
  expandedPaths: Set<string>;
  toggleExpand: (path: string) => void;
}) {
  const pathKey = toDotNotation(node.segments);
  const isExpanded = expandedPaths.has(pathKey);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedPath === pathKey;

  return (
    <div className="tree-node">
      <div
        className="flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:opacity-80"
        style={{
          background: isSelected ? "rgba(59, 130, 246, 0.15)" : "transparent",
          borderLeft: isSelected ? "2px solid var(--accent)" : "2px solid transparent",
        }}
        onClick={() => {
          onSelect(node);
          if (hasChildren) toggleExpand(pathKey);
        }}
      >
        {hasChildren ? (
          <span
            className="text-xs select-none"
            style={{ color: "var(--text-secondary)", width: "1em", textAlign: "center" }}
          >
            {isExpanded ? "▼" : "▶"}
          </span>
        ) : (
          <span style={{ width: "1em" }} />
        )}
        <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>
          {node.key}
        </span>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          : {getPreview(node.value)}
        </span>
        <span
          className="text-xs ml-auto px-1 rounded"
          style={{
            background: "var(--bg-tertiary)",
            color: "var(--text-secondary)",
            fontSize: "0.65rem",
          }}
        >
          {node.type}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4 border-l" style={{ borderColor: "var(--border)" }}>
          {node.children!.map((child, i) => (
            <TreeNodeComponent
              key={`${pathKey}-${i}`}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */

export default function JsonPathFinderEditor() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [parseError, setParseError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [queryPath, setQueryPath] = useState("");
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(["$.store", "$.store.book"]));
  const [copied, setCopied] = useState(false);

  const parsedData = useMemo(() => {
    try {
      const data = JSON.parse(jsonInput);
      setParseError(null);
      return data;
    } catch (e) {
      setParseError((e as Error).message);
      return null;
    }
  }, [jsonInput]);

  const tree = useMemo(() => {
    if (!parsedData) return [];
    return buildTree(parsedData);
  }, [parsedData]);

  const handleSelect = useCallback((node: TreeNode) => {
    setSelectedNode(node);
  }, []);

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    if (!parsedData) return;
    const paths = new Set<string>();
    const collect = (nodes: TreeNode[]) => {
      for (const n of nodes) {
        if (n.children) {
          paths.add(toDotNotation(n.segments));
          collect(n.children);
        }
      }
    };
    collect(tree);
    setExpandedPaths(paths);
  }, [parsedData, tree]);

  const collapseAll = useCallback(() => {
    setExpandedPaths(new Set());
  }, []);

  const handleQuery = useCallback(() => {
    if (!parsedData || !queryPath.trim()) {
      setQueryResult(null);
      setQueryError(null);
      return;
    }
    const res = queryJsonPath(parsedData, queryPath);
    if (res.error) {
      setQueryError(res.error);
      setQueryResult(null);
    } else if (res.matches.length === 0) {
      setQueryError(null);
      setQueryResult("No matches found");
    } else {
      setQueryError(null);
      setQueryResult(
        res.matches.map((m) => JSON.stringify(m.value, null, 2)).join("\n\n")
      );
    }
  }, [parsedData, queryPath]);

  const copyPath = (notation: "dot" | "bracket") => {
    if (!selectedNode) return;
    const text = notation === "dot"
      ? toDotNotation(selectedNode.segments)
      : toBracketNotation(selectedNode.segments);
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Path Finder</h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Paste JSON, click any node in the tree to see its JSONPath. Query paths to find matching values.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <button
              onClick={() => {
                setJsonInput(SAMPLE_JSON);
                setSelectedNode(null);
                setExpandedPaths(new Set(["$.store", "$.store.book"]));
              }}
              className="btn"
            >
              📋 Sample
            </button>
            <button
              onClick={() => {
                setJsonInput("");
                setSelectedNode(null);
                setQueryPath("");
                setQueryResult(null);
                setQueryError(null);
              }}
              className="btn"
            >
              🗑️ Clear
            </button>
            <button onClick={expandAll} className="btn">
              📂 Expand All
            </button>
            <button onClick={collapseAll} className="btn">
              📁 Collapse All
            </button>
          </div>

          {parseError && (
            <div
              className="mb-4 p-3 rounded-lg text-sm"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "var(--error)",
              }}
            >
              ⚠️ Invalid JSON: {parseError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Left: JSON Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                JSON Input
              </label>
              <textarea
                className="editor-textarea flex-1"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON here..."
                spellCheck={false}
              />
            </div>

            {/* Right: Tree View */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                Tree View — click a node to get its path
              </label>
              <div
                className="flex-1 rounded-lg overflow-auto font-mono text-sm p-3"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  minHeight: "300px",
                  maxHeight: "500px",
                }}
              >
                {tree.length > 0 ? (
                  tree.map((node, i) => (
                    <TreeNodeComponent
                      key={i}
                      node={node}
                      selectedPath={selectedNode ? toDotNotation(selectedNode.segments) : null}
                      onSelect={handleSelect}
                      expandedPaths={expandedPaths}
                      toggleExpand={toggleExpand}
                    />
                  ))
                ) : (
                  <p style={{ color: "var(--text-secondary)" }}>
                    {jsonInput.trim() ? "Unable to parse JSON" : "Paste JSON to see the tree"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Selected Path Display */}
          {selectedNode && (
            <div
              className="mb-4 p-4 rounded-lg"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-sm font-semibold">Selected Path</span>
                <div className="flex gap-2">
                  <button onClick={() => copyPath("dot")} className="btn text-xs">
                    {copied ? "✅ Copied!" : "📋 Copy Dot"}
                  </button>
                  <button onClick={() => copyPath("bracket")} className="btn text-xs">
                    📋 Copy Bracket
                  </button>
                </div>
              </div>
              <div className="space-y-1 font-mono text-sm">
                <p>
                  <span style={{ color: "var(--text-secondary)" }}>Dot: </span>
                  <span style={{ color: "var(--accent)" }}>{toDotNotation(selectedNode.segments)}</span>
                </p>
                <p>
                  <span style={{ color: "var(--text-secondary)" }}>Bracket: </span>
                  <span style={{ color: "var(--accent)" }}>{toBracketNotation(selectedNode.segments)}</span>
                </p>
                <p>
                  <span style={{ color: "var(--text-secondary)" }}>Value: </span>
                  <span>{typeof selectedNode.value === "object" ? JSON.stringify(selectedNode.value, null, 2) : String(selectedNode.value)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Path Query */}
          <div
            className="p-4 rounded-lg"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <label className="text-sm font-semibold mb-2 block">JSONPath Query</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg font-mono text-sm"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
                value={queryPath}
                onChange={(e) => setQueryPath(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery()}
                placeholder="e.g. $.store.book[0].title"
              />
              <button onClick={handleQuery} className="btn-primary btn">
                🔍 Query
              </button>
            </div>
            {queryError && (
              <div className="text-sm" style={{ color: "var(--error)" }}>
                ⚠️ {queryError}
              </div>
            )}
            {queryResult && !queryError && (
              <pre
                className="text-sm font-mono p-3 rounded overflow-auto"
                style={{
                  background: "var(--bg-tertiary)",
                  color: "var(--text)",
                  maxHeight: "200px",
                }}
              >
                {queryResult}
              </pre>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About JSON Path Finder</h2>
          <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            JSON Path Finder by JSONBolt helps you navigate complex JSON structures visually. Paste your JSON,
            explore it as an interactive tree, and click any node to instantly see its JSONPath in both dot
            notation and bracket notation. You can also query your JSON using JSONPath expressions to find
            matching values. All processing happens locally in your browser.
          </p>

          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <ul className="mb-8 space-y-2">
            {[
              "Interactive tree view of JSON structure",
              "Click any node to see its JSONPath instantly",
              "Both dot notation ($.store.book) and bracket notation ($[\"store\"][\"book\"])",
              "JSONPath query input to find values by path",
              "Expand/collapse all nodes with one click",
              "Shows data types for each node (string, number, object, array, etc.)",
              "Handles deeply nested and complex JSON structures",
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
              "Finding the exact path to a value in a complex API response",
              "Building JSONPath expressions for data extraction",
              "Exploring unfamiliar JSON data structures",
              "Debugging nested JSON objects and arrays",
              "Generating paths for use in jq, JavaScript, or Python",
            ].map((u) => (
              <li key={u} className="flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                <span>→</span> {u}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          {[
            {
              q: "What is JSONPath?",
              a: "JSONPath is an expression language for navigating and querying JSON documents, similar to XPath for XML. It uses dot notation ($.store.book[0].title) or bracket notation ($[\"store\"][\"book\"][0][\"title\"]) to specify paths to values within a JSON structure.",
            },
            {
              q: "What's the difference between dot and bracket notation?",
              a: "Dot notation ($.store.book) is shorter and more readable. Bracket notation ($[\"store\"][\"book\"]) is more universal and handles special characters in keys. Both refer to the same path.",
            },
            {
              q: "Can I query with wildcards like $.store.book[*].title?",
              a: "Currently, this tool supports direct path queries without wildcards. Type a specific path like $.store.book[0].title to get the matching value.",
            },
            {
              q: "Is my data sent to a server?",
              a: "No. All processing happens 100% in your browser using JavaScript. Your JSON data never leaves your computer.",
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
