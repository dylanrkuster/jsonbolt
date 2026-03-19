import type { Metadata } from "next";
import JsonDiffEditor from "./JsonDiffEditor";

export const metadata: Metadata = {
  title: "JSON Diff — Compare Two JSON Objects Online | JSONBolt",
  description:
    "Compare two JSON objects and find differences instantly. Free online JSON diff tool with added, removed, and changed field detection.",
  keywords: [
    "json diff",
    "compare json",
    "json compare",
    "json difference",
    "diff json online",
    "json diff tool",
  ],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-diff" },
};

export default function JsonDiffPage() {
  return <JsonDiffEditor />;
}
