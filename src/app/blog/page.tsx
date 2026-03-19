import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — JSON Tips, Tutorials & Tools | JSONBolt",
  description: "Guides and tutorials about JSON formatting, validation, conversion, and working with JSON data effectively.",
};

const posts = [
  {
    slug: "best-json-formatters-2026",
    title: "7 Best JSON Formatters in 2026 (Free & Online)",
    description: "A comprehensive comparison of the best free online JSON formatters. Find the right tool for your workflow.",
    date: "March 19, 2026",
    readTime: "5 min read",
  },
  {
    slug: "json-to-yaml-guide",
    title: "How to Convert JSON to YAML: Complete Guide",
    description: "Everything you need to know about converting between JSON and YAML, with examples for Kubernetes and Docker.",
    date: "March 19, 2026",
    readTime: "4 min read",
  },
];

export default function BlogIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="mb-10" style={{ color: "var(--text-secondary)" }}>
        Guides and tutorials for working with JSON data.
      </p>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-lg transition-all hover:translate-y-[-2px]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3 mb-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 hover:underline">{post.title}</h2>
            <p style={{ color: "var(--text-secondary)" }}>{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
