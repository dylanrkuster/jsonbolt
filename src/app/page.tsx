import JsonEditor from "@/components/JsonEditor";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--accent)" }}>
                JSONBolt
              </h1>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Fast JSON tools for developers
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="#tools"
              className="hover:underline"
              style={{ color: "var(--text-secondary)" }}
            >
              All Tools
            </a>
            <a
              href="https://github.com/dylanrkuster/jsonbolt"
              target="_blank"
              rel="noopener"
              className="hover:underline"
              style={{ color: "var(--text-secondary)" }}
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero + Editor */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Format, Validate & Convert JSON{" "}
            <span style={{ color: "var(--accent)" }}>Instantly</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Free, fast, and private. Paste your JSON and get results in
            milliseconds. No signup, no tracking, no nonsense.
          </p>
        </div>
        <JsonEditor />
      </section>

      {/* SEO Content: All Tools */}
      <section id="tools" className="px-4 py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">All JSON Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "✨",
                title: "JSON Formatter",
                desc: "Beautify minified JSON with customizable indentation. Supports 2-space, 4-space, and tab formatting.",
              },
              {
                icon: "📦",
                title: "JSON Minifier",
                desc: "Compress JSON by removing whitespace. Reduce file size for production use and API responses.",
              },
              {
                icon: "✅",
                title: "JSON Validator",
                desc: "Validate JSON syntax with precise error locations. Find and fix issues instantly with line numbers.",
              },
              {
                icon: "🔤",
                title: "Sort JSON Keys",
                desc: "Alphabetically sort all keys in your JSON. Works recursively on nested objects.",
              },
              {
                icon: "🔄",
                title: "JSON to YAML",
                desc: "Convert JSON to YAML format. Perfect for Kubernetes configs, Docker Compose, and CI/CD pipelines.",
              },
              {
                icon: "🔄",
                title: "YAML to JSON",
                desc: "Convert YAML back to JSON. Validate your YAML by converting to strict JSON format.",
              },
              {
                icon: "📊",
                title: "JSON to CSV",
                desc: "Convert JSON arrays to CSV format. Export API data to spreadsheets in seconds.",
              },
              {
                icon: "📄",
                title: "JSON to XML",
                desc: "Transform JSON to XML format. Bridge modern APIs with legacy systems effortlessly.",
              },
            ].map((tool) => (
              <div key={tool.title} className="tool-card">
                <div className="text-2xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold mb-2">{tool.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO FAQ */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "What is JSON formatting?",
              a: "JSON formatting (also called beautifying or pretty-printing) adds proper indentation and line breaks to compressed JSON data, making it human-readable. JSONBolt formats your JSON instantly in the browser with customizable indent levels.",
            },
            {
              q: "Is my data safe?",
              a: "Yes. All processing happens locally in your browser. Your JSON data never leaves your computer — nothing is sent to any server. JSONBolt is 100% client-side.",
            },
            {
              q: "What's the maximum JSON file size?",
              a: "JSONBolt can handle JSON files up to several megabytes directly in your browser. For extremely large files (100MB+), we recommend using a desktop tool like jq.",
            },
            {
              q: "Can I convert JSON to other formats?",
              a: "Yes! JSONBolt supports conversion between JSON and YAML, CSV, and XML. Just select the appropriate tool tab and paste your data.",
            },
            {
              q: "Is JSONBolt free?",
              a: "Yes, JSONBolt is completely free with no usage limits. No signup required, no ads, no premium tier.",
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="mb-4 p-4 rounded-lg"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-4 py-8 text-center text-sm"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <p>
          ⚡ JSONBolt — Built for developers who value speed. Free and{" "}
          <a
            href="https://github.com/dylanrkuster/jsonbolt"
            target="_blank"
            rel="noopener"
            className="underline"
            style={{ color: "var(--accent)" }}
          >
            open source
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
