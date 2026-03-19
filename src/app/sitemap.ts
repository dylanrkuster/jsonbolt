import type { MetadataRoute } from "next";

const BASE_URL = "https://jsonbolt.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "",
    "/json-formatter",
    "/json-validator",
    "/json-minifier",
    "/json-to-yaml",
    "/yaml-to-json",
    "/json-to-csv",
    "/json-to-xml",
    "/json-diff",
  ];

  return tools.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
