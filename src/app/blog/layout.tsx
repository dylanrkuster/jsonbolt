export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>JSONBolt</span>
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" style={{ color: "var(--text-secondary)" }}>Tools</a>
            <a href="/blog" style={{ color: "var(--accent)" }}>Blog</a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">{children}</main>
      <footer className="border-t px-4 py-8 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        <p>⚡ <a href="/" style={{ color: "var(--accent)" }}>JSONBolt</a> — Free JSON tools for developers</p>
      </footer>
    </div>
  );
}
