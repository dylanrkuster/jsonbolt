import yaml from "js-yaml";

export interface TransformResult {
  output: string;
  error: string | null;
  stats: {
    lines: number;
    bytes: number;
    parseTimeMs: number;
  };
}

export function formatJSON(input: string, indent: number = 2): TransformResult {
  const start = performance.now();
  try {
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed, null, indent);
    return {
      output,
      error: null,
      stats: {
        lines: output.split("\n").length,
        bytes: new Blob([output]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: input,
      error: e instanceof Error ? e.message : "Invalid JSON",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

export function minifyJSON(input: string): TransformResult {
  const start = performance.now();
  try {
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed);
    return {
      output,
      error: null,
      stats: {
        lines: 1,
        bytes: new Blob([output]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: input,
      error: e instanceof Error ? e.message : "Invalid JSON",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

export function validateJSON(input: string): {
  valid: boolean;
  error: string | null;
  position?: { line: number; column: number };
} {
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (e) {
    if (e instanceof SyntaxError) {
      const match = e.message.match(/position (\d+)/i);
      if (match) {
        const pos = parseInt(match[1]);
        const before = input.substring(0, pos);
        const line = before.split("\n").length;
        const column = pos - before.lastIndexOf("\n");
        return {
          valid: false,
          error: e.message,
          position: { line, column },
        };
      }
      return { valid: false, error: e.message };
    }
    return { valid: false, error: "Invalid JSON" };
  }
}

export function jsonToYaml(input: string): TransformResult {
  const start = performance.now();
  try {
    const parsed = JSON.parse(input);
    const output = yaml.dump(parsed, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
    });
    return {
      output,
      error: null,
      stats: {
        lines: output.split("\n").length,
        bytes: new Blob([output]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

export function yamlToJson(input: string): TransformResult {
  const start = performance.now();
  try {
    const parsed = yaml.load(input);
    const output = JSON.stringify(parsed, null, 2);
    return {
      output,
      error: null,
      stats: {
        lines: output.split("\n").length,
        bytes: new Blob([output]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Invalid YAML",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

export function jsonToCsv(input: string): TransformResult {
  const start = performance.now();
  try {
    const parsed = JSON.parse(input);
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    if (arr.length === 0) {
      return {
        output: "",
        error: "Empty array",
        stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
      };
    }

    const headers = [
      ...new Set(arr.flatMap((item) => Object.keys(item))),
    ];

    const escapeCsv = (val: unknown): string => {
      const str = val === null || val === undefined ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const lines = [
      headers.map(escapeCsv).join(","),
      ...arr.map((row) =>
        headers.map((h) => escapeCsv(row[h])).join(",")
      ),
    ];

    const output = lines.join("\n");
    return {
      output,
      error: null,
      stats: {
        lines: lines.length,
        bytes: new Blob([output]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

function jsonToXmlNode(obj: unknown, rootName: string = "root"): string {
  if (obj === null || obj === undefined) return `<${rootName}/>`;
  if (typeof obj !== "object") return `<${rootName}>${escapeXml(String(obj))}</${rootName}>`;

  if (Array.isArray(obj)) {
    return obj.map((item) => jsonToXmlNode(item, "item")).join("\n");
  }

  const entries = Object.entries(obj as Record<string, unknown>);
  const inner = entries
    .map(([key, val]) => {
      const safeName = key.replace(/[^a-zA-Z0-9_-]/g, "_");
      if (Array.isArray(val)) {
        return val.map((item) => jsonToXmlNode(item, safeName)).join("\n");
      }
      return jsonToXmlNode(val, safeName);
    })
    .join("\n");

  return `<${rootName}>\n${inner
    .split("\n")
    .map((l) => "  " + l)
    .join("\n")}\n</${rootName}>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function jsonToXml(input: string): TransformResult {
  const start = performance.now();
  try {
    const parsed = JSON.parse(input);
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsonToXmlNode(parsed);
    return {
      output: xml,
      error: null,
      stats: {
        lines: xml.split("\n").length,
        bytes: new Blob([xml]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Conversion failed",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

export function sortJsonKeys(input: string): TransformResult {
  const start = performance.now();
  try {
    const parsed = JSON.parse(input);
    const sorted = sortObj(parsed);
    const output = JSON.stringify(sorted, null, 2);
    return {
      output,
      error: null,
      stats: {
        lines: output.split("\n").length,
        bytes: new Blob([output]).size,
        parseTimeMs: Math.round((performance.now() - start) * 100) / 100,
      },
    };
  } catch (e) {
    return {
      output: input,
      error: e instanceof Error ? e.message : "Invalid JSON",
      stats: { lines: 0, bytes: 0, parseTimeMs: 0 },
    };
  }
}

function sortObj(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObj);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortObj((obj as Record<string, unknown>)[key]);
        return acc;
      }, {} as Record<string, unknown>);
  }
  return obj;
}
