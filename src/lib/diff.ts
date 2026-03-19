export interface DiffResult {
  type: "added" | "removed" | "changed" | "unchanged";
  path: string;
  oldValue?: unknown;
  newValue?: unknown;
}

export function diffJSON(
  leftStr: string,
  rightStr: string
): { diffs: DiffResult[]; error: string | null; summary: string } {
  try {
    const left = JSON.parse(leftStr);
    const right = JSON.parse(rightStr);
    const diffs: DiffResult[] = [];
    deepDiff(left, right, "", diffs);

    const added = diffs.filter((d) => d.type === "added").length;
    const removed = diffs.filter((d) => d.type === "removed").length;
    const changed = diffs.filter((d) => d.type === "changed").length;
    const unchanged = diffs.filter((d) => d.type === "unchanged").length;

    const summary =
      diffs.length === 0
        ? "Objects are identical"
        : `${added} added, ${removed} removed, ${changed} changed, ${unchanged} unchanged`;

    return { diffs, error: null, summary };
  } catch (e) {
    return {
      diffs: [],
      error: e instanceof Error ? e.message : "Invalid JSON",
      summary: "",
    };
  }
}

function deepDiff(
  left: unknown,
  right: unknown,
  path: string,
  diffs: DiffResult[]
): void {
  if (left === right) {
    if (typeof left !== "object" || left === null) {
      diffs.push({ type: "unchanged", path, oldValue: left, newValue: right });
    }
    return;
  }

  if (
    typeof left !== typeof right ||
    left === null ||
    right === null ||
    Array.isArray(left) !== Array.isArray(right)
  ) {
    diffs.push({ type: "changed", path, oldValue: left, newValue: right });
    return;
  }

  if (typeof left !== "object") {
    diffs.push({ type: "changed", path, oldValue: left, newValue: right });
    return;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLen = Math.max(left.length, right.length);
    for (let i = 0; i < maxLen; i++) {
      const childPath = path ? `${path}[${i}]` : `[${i}]`;
      if (i >= left.length) {
        diffs.push({ type: "added", path: childPath, newValue: right[i] });
      } else if (i >= right.length) {
        diffs.push({ type: "removed", path: childPath, oldValue: left[i] });
      } else {
        deepDiff(left[i], right[i], childPath, diffs);
      }
    }
    return;
  }

  const leftObj = left as Record<string, unknown>;
  const rightObj = right as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(leftObj), ...Object.keys(rightObj)]);

  for (const key of allKeys) {
    const childPath = path ? `${path}.${key}` : key;
    if (!(key in leftObj)) {
      diffs.push({ type: "added", path: childPath, newValue: rightObj[key] });
    } else if (!(key in rightObj)) {
      diffs.push({ type: "removed", path: childPath, oldValue: leftObj[key] });
    } else {
      deepDiff(leftObj[key], rightObj[key], childPath, diffs);
    }
  }
}

export function formatDiffOutput(diffs: DiffResult[], summary: string): string {
  if (diffs.length === 0) return "✅ Objects are identical";

  const lines: string[] = [`📊 ${summary}`, ""];

  const grouped = {
    added: diffs.filter((d) => d.type === "added"),
    removed: diffs.filter((d) => d.type === "removed"),
    changed: diffs.filter((d) => d.type === "changed"),
  };

  if (grouped.added.length > 0) {
    lines.push("➕ ADDED:");
    for (const d of grouped.added) {
      lines.push(`  ${d.path}: ${JSON.stringify(d.newValue)}`);
    }
    lines.push("");
  }

  if (grouped.removed.length > 0) {
    lines.push("➖ REMOVED:");
    for (const d of grouped.removed) {
      lines.push(`  ${d.path}: ${JSON.stringify(d.oldValue)}`);
    }
    lines.push("");
  }

  if (grouped.changed.length > 0) {
    lines.push("✏️ CHANGED:");
    for (const d of grouped.changed) {
      lines.push(`  ${d.path}:`);
      lines.push(`    - ${JSON.stringify(d.oldValue)}`);
      lines.push(`    + ${JSON.stringify(d.newValue)}`);
    }
  }

  return lines.join("\n");
}
