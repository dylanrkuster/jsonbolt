import type { Metadata } from "next";
import JsonPathFinderEditor from "./JsonPathFinderEditor";

export const metadata: Metadata = {
  title: "JSON Path Finder — Find JSONPath Online | JSONBolt",
  description:
    "Find JSONPath expressions by clicking on any node in your JSON. Copy dot notation and bracket notation paths. Query JSON with JSONPath expressions. Free, client-side.",
  keywords: [
    "json path finder",
    "jsonpath online",
    "json path query",
    "jsonpath expression",
    "json path tool",
    "json path generator",
    "find json path",
  ],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-path-finder" },
};

export default function JsonPathFinderPage() {
  return <JsonPathFinderEditor />;
}
