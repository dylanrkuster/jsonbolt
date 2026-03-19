import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Format and Debug API Responses: A Developer's Guide | JSONBolt",
  description:
    "Learn to format, pretty-print, and debug JSON API responses using curl, jq, browser DevTools, and online tools. Practical examples with real APIs.",
  keywords: [
    "format api response",
    "json api response",
    "pretty print json",
    "debug api response",
    "curl json format",
    "jq json",
    "api response formatting",
    "json pretty print",
    "format json response",
  ],
  alternates: { canonical: "https://jsonbolt.vercel.app/blog/api-response-formatting" },
  openGraph: {
    title: "How to Format and Debug API Responses: A Developer's Guide",
    description: "Format, pretty-print, and debug JSON API responses using curl, jq, DevTools, and online tools.",
    url: "https://jsonbolt.vercel.app/blog/api-response-formatting",
    type: "article",
    images: [
      {
        url: "https://api.snapog.com/v1/image?url=https://jsonbolt.vercel.app/blog/api-response-formatting",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Format and Debug API Responses: A Developer's Guide",
    description: "Format, pretty-print, and debug JSON API responses using curl, jq, DevTools, and online tools.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Format and Debug API Responses: A Developer's Guide",
  description:
    "Learn to format, pretty-print, and debug JSON API responses using curl, jq, browser DevTools, and online tools.",
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  author: { "@type": "Organization", name: "JSONBolt" },
  publisher: { "@type": "Organization", name: "JSONBolt", url: "https://jsonbolt.vercel.app" },
  mainEntityOfPage: "https://jsonbolt.vercel.app/blog/api-response-formatting",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I pretty-print a JSON API response in the terminal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pipe your curl output to jq: `curl -s https://api.example.com/data | jq '.'` — this formats the JSON with proper indentation and syntax highlighting. You can also use `python -m json.tool` if jq isn't installed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I format JSON in Chrome DevTools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open DevTools (F12), go to the Network tab, click on the API request, then click the 'Preview' tab to see formatted JSON. You can also go to the 'Response' tab and click the '{}' button to pretty-print raw JSON.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best tool to format JSON online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSONBolt's JSON Formatter is a free, fast, client-side tool that formats, validates, and beautifies JSON instantly. No data is sent to any server — everything runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How do I debug a malformed JSON API response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First, use a JSON validator to find the exact syntax error. Common issues include trailing commas, single quotes instead of double quotes, unescaped characters, and missing brackets. JSONBolt's validator shows the exact line and character where parsing fails.",
      },
    },
    {
      "@type": "Question",
      name: "Can I format XML API responses the same way?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but with different tools. Use `xmllint --format` in the terminal, or paste XML into an online formatter. For APIs returning XML, you can convert to JSON first using JSONBolt's JSON to XML converter for easier inspection.",
      },
    },
  ],
};

export default function ApiResponseFormatting() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <article className="prose-invert max-w-none">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span>June 28, 2026</span>
            <span>•</span>
            <span>10 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How to Format and Debug API Responses: A Developer&apos;s Guide
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Every developer works with APIs. And every developer has stared at a wall of
            minified JSON wondering what went wrong. This guide covers every tool and technique
            you need to format, inspect, and debug API responses like a pro.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-10 p-4 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>TABLE OF CONTENTS</h2>
          <ol className="space-y-1 text-sm list-decimal list-inside" style={{ color: "var(--accent)" }}>
            <li><a href="#why-formatting" className="hover:underline">Why API Response Formatting Matters</a></li>
            <li><a href="#curl-jq" className="hover:underline">Terminal: curl + jq</a></li>
            <li><a href="#jq-recipes" className="hover:underline">Essential jq Recipes</a></li>
            <li><a href="#devtools" className="hover:underline">Browser DevTools</a></li>
            <li><a href="#online-tools" className="hover:underline">Online Formatting Tools</a></li>
            <li><a href="#common-formats" className="hover:underline">Common API Response Formats</a></li>
            <li><a href="#error-handling" className="hover:underline">Debugging Error Responses</a></li>
            <li><a href="#validation" className="hover:underline">Validating API Responses</a></li>
            <li><a href="#real-world" className="hover:underline">Real-World API Examples</a></li>
            <li><a href="#editor-tools" className="hover:underline">IDE & Editor Tools</a></li>
            <li><a href="#automation" className="hover:underline">Automating Response Inspection</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ol>
        </nav>

        {/* Section 1: Why Formatting */}
        <section id="why-formatting" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Why API Response Formatting Matters</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Modern APIs return minified JSON by default — no whitespace, no newlines, just a
            dense blob of data designed for machines. That&apos;s great for bandwidth. It&apos;s terrible
            for humans trying to debug why their app is broken at 2 AM.
          </p>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Here&apos;s what a typical API response looks like raw:
          </p>
          <pre className="my-4 text-sm overflow-x-auto">{`{"data":[{"id":1,"name":"Alice","email":"alice@example.com","roles":["admin","editor"],"metadata":{"lastLogin":"2026-06-28T14:30:00Z","loginCount":142}},{"id":2,"name":"Bob","email":"bob@example.com","roles":["viewer"],"metadata":{"lastLogin":"2026-06-27T09:15:00Z","loginCount":23}}],"pagination":{"page":1,"perPage":20,"total":2},"status":"success"}`}</pre>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Now the same data, formatted:
          </p>
          <pre className="my-4 text-sm overflow-x-auto">{`{
  "data": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "roles": ["admin", "editor"],
      "metadata": {
        "lastLogin": "2026-06-28T14:30:00Z",
        "loginCount": 142
      }
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com",
      "roles": ["viewer"],
      "metadata": {
        "lastLogin": "2026-06-27T09:15:00Z",
        "loginCount": 23
      }
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 2
  },
  "status": "success"
}`}</pre>
          <p style={{ color: "var(--text-secondary)" }}>
            Night and day. Formatting reveals structure, makes fields scannable, and turns
            debugging from a guessing game into a visual inspection. Let&apos;s explore every
            tool available to make this happen.
          </p>
        </section>

        {/* Section 2: curl + jq */}
        <section id="curl-jq" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Terminal: curl + jq</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            The fastest way to inspect an API response is from the command line.{" "}
            <code>curl</code> makes the request; <code>jq</code> formats the output.
          </p>

          <h3 className="text-lg font-semibold mb-2">Basic Usage</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Fetch and pretty-print JSON
curl -s https://api.github.com/users/octocat | jq '.'

# With headers visible (-i) and silent progress (-s)
curl -si https://api.example.com/users | jq '.'

# POST request with JSON body
curl -s -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","email":"alice@example.com"}' | jq '.'

# With authentication
curl -s -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.example.com/protected | jq '.'`}</pre>

          <h3 className="text-lg font-semibold mb-2">Without jq Installed</h3>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            If you can&apos;t install <code>jq</code>, Python&apos;s standard library has you covered:
          </p>
          <pre className="my-4 text-sm overflow-x-auto">{`# Python's json.tool module
curl -s https://api.github.com/users/octocat | python3 -m json.tool

# Node.js one-liner
curl -s https://api.example.com/data | node -e "
  let d='';process.stdin.on('data',c=>d+=c);
  process.stdin.on('end',()=>console.log(JSON.stringify(JSON.parse(d),null,2)))
"`}</pre>

          <h3 className="text-lg font-semibold mb-2">Saving Formatted Output</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Save formatted JSON to a file
curl -s https://api.example.com/data | jq '.' > response.json

# Save both headers and formatted body
curl -sD headers.txt https://api.example.com/data | jq '.' > body.json`}</pre>
        </section>

        {/* Section 3: jq Recipes */}
        <section id="jq-recipes" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. Essential jq Recipes</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            <code>jq</code> isn&apos;t just a pretty-printer — it&apos;s a full JSON query language.
            Here are the recipes every developer should know:
          </p>

          <pre className="my-4 text-sm overflow-x-auto">{`# Extract a single field
curl -s https://api.github.com/users/octocat | jq '.login'
# Output: "octocat"

# Extract nested fields
curl -s https://api.github.com/users/octocat | jq '{name: .name, repos: .public_repos}'
# Output: { "name": "The Octocat", "repos": 8 }

# Filter array elements
curl -s https://api.github.com/users/octocat/repos | jq '.[].name'
# Output: list of repo names

# Get the first 3 items
curl -s https://api.github.com/users/octocat/repos | jq '[:3]'

# Filter by condition
curl -s https://api.github.com/users/octocat/repos | jq '[.[] | select(.stargazers_count > 100)]'

# Count array length
curl -s https://api.github.com/users/octocat/repos | jq 'length'

# Get just the keys of an object
curl -s https://api.github.com/users/octocat | jq 'keys'

# Flatten nested structure
curl -s https://api.example.com/data | jq '[.data[] | {id, name, email}]'

# Sort by field
curl -s https://api.example.com/data | jq '[.items | sort_by(.created_at)]'

# Compact output (minify)
curl -s https://api.example.com/data | jq -c '.'

# Raw strings (no quotes)
curl -s https://api.github.com/users/octocat | jq -r '.login'
# Output: octocat (without quotes)`}</pre>

          <div className="p-4 rounded-lg mt-4" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>💡 Pro Tip</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Use <code>jq -e</code> to set a non-zero exit code when the result is <code>false</code> or <code>null</code>.
              This is invaluable in shell scripts: <code>curl -s ... | jq -e &apos;.error&apos; &amp;&amp; echo &quot;API returned an error!&quot;</code>
            </p>
          </div>
        </section>

        {/* Section 4: DevTools */}
        <section id="devtools" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Browser DevTools</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Every modern browser includes powerful tools for inspecting API responses. Here&apos;s
            how to use them effectively.
          </p>

          <h3 className="text-lg font-semibold mb-2">Chrome / Edge DevTools</h3>
          <ol className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li><strong style={{ color: "var(--text)" }}>1.</strong> Open DevTools: <code>F12</code> or <code>Cmd+Option+I</code> (Mac) / <code>Ctrl+Shift+I</code> (Windows)</li>
            <li><strong style={{ color: "var(--text)" }}>2.</strong> Go to the <strong style={{ color: "var(--text)" }}>Network</strong> tab</li>
            <li><strong style={{ color: "var(--text)" }}>3.</strong> Filter by <code>Fetch/XHR</code> to see only API requests</li>
            <li><strong style={{ color: "var(--text)" }}>4.</strong> Click on any request to inspect it</li>
            <li><strong style={{ color: "var(--text)" }}>5.</strong> Use the <strong style={{ color: "var(--text)" }}>Preview</strong> tab for auto-formatted, collapsible JSON</li>
            <li><strong style={{ color: "var(--text)" }}>6.</strong> Use the <strong style={{ color: "var(--text)" }}>Response</strong> tab for raw text (click <code>{`{}`}</code> to pretty-print)</li>
          </ol>

          <h3 className="text-lg font-semibold mb-2">Chrome Console Tricks</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`// Fetch and log formatted response directly in console
fetch('https://api.github.com/users/octocat')
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)));

// Or use console.table for arrays
fetch('https://api.github.com/users/octocat/repos')
  .then(r => r.json())
  .then(data => console.table(data.map(r => ({
    name: r.name,
    stars: r.stargazers_count,
    language: r.language
  }))));

// Copy response to clipboard
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => copy(JSON.stringify(data, null, 2)));
// Now paste it anywhere!`}</pre>

          <h3 className="text-lg font-semibold mb-2">Firefox DevTools</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Firefox&apos;s Network tab has a dedicated <strong style={{ color: "var(--text)" }}>JSON viewer</strong> that&apos;s
            arguably better than Chrome&apos;s. It shows the formatted JSON with collapsible sections,
            raw data, and a headers panel — all in one view. Filter with the search box at the
            top to find specific keys or values instantly.
          </p>
        </section>

        {/* Section 5: Online Tools */}
        <section id="online-tools" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Online Formatting Tools</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Sometimes you just need to paste JSON and see it formatted. Online tools are perfect
            for quick inspection, sharing with teammates, or working on a machine where you can&apos;t
            install software.
          </p>

          <h3 className="text-lg font-semibold mb-2">What to Look For</h3>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• <strong style={{ color: "var(--text)" }}>Client-side processing</strong> — Your data should never leave your browser. Avoid tools that send JSON to a server.</li>
            <li>• <strong style={{ color: "var(--text)" }}>Syntax highlighting</strong> — Color-coded keys, strings, numbers, and booleans.</li>
            <li>• <strong style={{ color: "var(--text)" }}>Error detection</strong> — When JSON is malformed, the tool should pinpoint the error.</li>
            <li>• <strong style={{ color: "var(--text)" }}>Tree view</strong> — Collapsible sections for navigating large responses.</li>
            <li>• <strong style={{ color: "var(--text)" }}>Minify option</strong> — Compress JSON for use in requests or configs.</li>
          </ul>

          <div className="p-6 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--accent)" }}>
            <h3 className="text-lg font-semibold mb-2">Format JSON Instantly</h3>
            <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              JSONBolt&apos;s{" "}
              <Link href="/json-formatter" style={{ color: "var(--accent)" }} className="underline">
                JSON Formatter
              </Link>{" "}
              does all of the above — beautify, minify, validate, and inspect JSON. 100% client-side,
              dark mode, keyboard shortcuts, and it handles massive files without breaking a sweat.
            </p>
            <Link
              href="/json-formatter"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-sm"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              Open JSON Formatter →
            </Link>
          </div>
        </section>

        {/* Section 6: Common Formats */}
        <section id="common-formats" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">6. Common API Response Formats</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Not all API responses look the same. Understanding common patterns helps you
            parse them faster.
          </p>

          <h3 className="text-lg font-semibold mb-2">Standard Envelope Pattern</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`{
  "status": "success",
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100,
    "requestId": "req_abc123"
  }
}`}</pre>

          <h3 className="text-lg font-semibold mb-2">JSON:API Specification</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`{
  "data": [
    {
      "type": "articles",
      "id": "1",
      "attributes": {
        "title": "JSON vs XML",
        "body": "..."
      },
      "relationships": {
        "author": {
          "data": { "type": "people", "id": "42" }
        }
      }
    }
  ],
  "included": [
    {
      "type": "people",
      "id": "42",
      "attributes": { "name": "Alice" }
    }
  ]
}`}</pre>

          <h3 className="text-lg font-semibold mb-2">GraphQL Response</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`{
  "data": {
    "user": {
      "name": "Alice",
      "posts": [
        { "title": "Hello World", "likes": 42 }
      ]
    }
  },
  "errors": null
}`}</pre>

          <h3 className="text-lg font-semibold mb-2">Error Response Pattern</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "must be a valid email address"
      },
      {
        "field": "age",
        "message": "must be a positive integer"
      }
    ]
  },
  "requestId": "req_xyz789"
}`}</pre>
        </section>

        {/* Section 7: Error Handling */}
        <section id="error-handling" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">7. Debugging Error Responses</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            When an API returns an error, the response body is your best diagnostic tool. Here&apos;s
            a systematic approach to debugging:
          </p>

          <h3 className="text-lg font-semibold mb-2">Step 1: Check the HTTP Status Code</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Show status code with curl
curl -s -o /dev/null -w "%{http_code}" https://api.example.com/users

# Show status + headers + body
curl -si https://api.example.com/users | head -20`}</pre>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm" style={{ color: "var(--text-secondary)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--text)" }}>Code</th>
                  <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--text)" }}>Meaning</th>
                  <th className="text-left py-2 font-medium" style={{ color: "var(--text)" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["400", "Bad Request", "Check your request body/params"],
                  ["401", "Unauthorized", "Check API key/token"],
                  ["403", "Forbidden", "Check permissions/scopes"],
                  ["404", "Not Found", "Check endpoint URL"],
                  ["422", "Unprocessable", "Read validation errors in body"],
                  ["429", "Rate Limited", "Back off, check Retry-After header"],
                  ["500", "Server Error", "Not your fault — retry or report"],
                  ["502/503", "Gateway Error", "Service is down — retry with backoff"],
                ].map(([code, meaning, action]) => (
                  <tr key={code} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4"><code style={{ color: "var(--accent)" }}>{code}</code></td>
                    <td className="py-2 pr-4">{meaning}</td>
                    <td className="py-2">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mb-2">Step 2: Inspect the Error Body</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Always format error responses — they contain crucial info
curl -s https://api.example.com/users \\
  -H "Authorization: Bearer expired_token" | jq '.'

# Output might be:
{
  "error": "token_expired",
  "message": "Your access token has expired. Refresh it at /auth/token.",
  "expired_at": "2026-06-28T12:00:00Z"
}`}</pre>

          <h3 className="text-lg font-semibold mb-2">Step 3: Compare Request vs Documentation</h3>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Common mistakes that cause API errors:
          </p>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• Missing <code>Content-Type: application/json</code> header on POST/PUT requests</li>
            <li>• Sending <code>form-urlencoded</code> data when the API expects JSON</li>
            <li>• Wrong HTTP method (GET vs POST)</li>
            <li>• Camel case vs snake case field names (<code>firstName</code> vs <code>first_name</code>)</li>
            <li>• Sending a string where a number is expected (<code>&quot;42&quot;</code> vs <code>42</code>)</li>
            <li>• Missing required fields</li>
          </ul>
        </section>

        {/* Section 8: Validation */}
        <section id="validation" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">8. Validating API Responses</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Formatting shows you the data. Validation tells you if it&apos;s <em>correct</em>.
          </p>

          <h3 className="text-lg font-semibold mb-2">Is It Valid JSON?</h3>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Sometimes APIs return malformed JSON — truncated responses, HTML error pages, or
            mixed content. First, verify the response is actually valid JSON:
          </p>
          <pre className="my-4 text-sm overflow-x-auto">{`# jq will error on invalid JSON
curl -s https://api.example.com/data | jq '.' 2>&1
# parse error: Expected value before ']' at line 5, column 12

# Or use JSONBolt's validator for a visual error report`}</pre>

          <h3 className="text-lg font-semibold mb-2">Common JSON Syntax Errors</h3>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• <strong style={{ color: "var(--text)" }}>Trailing commas:</strong> <code>{`{"a": 1, "b": 2,}`}</code> — JSON forbids trailing commas</li>
            <li>• <strong style={{ color: "var(--text)" }}>Single quotes:</strong> <code>{`{'name': 'Alice'}`}</code> — JSON requires double quotes</li>
            <li>• <strong style={{ color: "var(--text)" }}>Unquoted keys:</strong> <code>{`{name: "Alice"}`}</code> — All keys must be double-quoted</li>
            <li>• <strong style={{ color: "var(--text)" }}>Unescaped characters:</strong> Newlines, tabs, and backslashes inside strings</li>
            <li>• <strong style={{ color: "var(--text)" }}>Comments:</strong> <code>{`{"name": "Alice" // comment}`}</code> — JSON has no comments</li>
            <li>• <strong style={{ color: "var(--text)" }}>Truncation:</strong> Response cut off mid-stream (check Content-Length header)</li>
          </ul>

          <div className="p-6 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--accent)" }}>
            <h3 className="text-lg font-semibold mb-2">Validate JSON Instantly</h3>
            <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              Paste your API response into JSONBolt&apos;s{" "}
              <Link href="/json-validator" style={{ color: "var(--accent)" }} className="underline">
                JSON Validator
              </Link>{" "}
              to get instant syntax validation with exact error positions. Works with
              any size payload, entirely in your browser.
            </p>
            <Link
              href="/json-validator"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-sm"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              Open JSON Validator →
            </Link>
          </div>
        </section>

        {/* Section 9: Real-World Examples */}
        <section id="real-world" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">9. Real-World API Examples</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Let&apos;s work with actual public APIs to practice formatting and inspection.
          </p>

          <h3 className="text-lg font-semibold mb-2">GitHub API</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Get user info, extract key fields
curl -s https://api.github.com/users/octocat | jq '{
  login: .login,
  name: .name,
  repos: .public_repos,
  followers: .followers,
  created: .created_at
}'

# Output:
{
  "login": "octocat",
  "name": "The Octocat",
  "repos": 8,
  "followers": 13000,
  "created": "2011-01-25T18:44:36Z"
}`}</pre>

          <h3 className="text-lg font-semibold mb-2">JSONPlaceholder (Testing API)</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Get all posts by user 1, show titles only
curl -s https://jsonplaceholder.typicode.com/posts?userId=1 | jq '.[].title'

# Get a specific post with comments count
curl -s https://jsonplaceholder.typicode.com/posts/1 | jq '.'
curl -s https://jsonplaceholder.typicode.com/posts/1/comments | jq 'length'`}</pre>

          <h3 className="text-lg font-semibold mb-2">Open Meteo Weather API</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Get current weather for New York
curl -s "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true" | jq '.current_weather'

# Output:
{
  "temperature": 28.5,
  "windspeed": 12.3,
  "winddirection": 180,
  "weathercode": 1,
  "time": "2026-06-28T14:00"
}`}</pre>

          <h3 className="text-lg font-semibold mb-2">Working with Paginated APIs</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`# Fetch page 1, check if more pages exist
RESPONSE=$(curl -s "https://api.example.com/items?page=1&per_page=50")

# Extract pagination info
echo $RESPONSE | jq '.meta.pagination'

# Loop through all pages (bash)
PAGE=1
while true; do
  RESPONSE=$(curl -s "https://api.example.com/items?page=$PAGE")
  ITEMS=$(echo $RESPONSE | jq '.data | length')
  echo "Page $PAGE: $ITEMS items"
  
  HAS_MORE=$(echo $RESPONSE | jq '.meta.hasMore')
  [ "$HAS_MORE" = "false" ] && break
  PAGE=$((PAGE + 1))
done`}</pre>
        </section>

        {/* Section 10: Editor Tools */}
        <section id="editor-tools" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">10. IDE & Editor Tools</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Your code editor can be a powerful JSON formatting tool:
          </p>

          <h3 className="text-lg font-semibold mb-2">VS Code</h3>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• <strong style={{ color: "var(--text)" }}>Format Document:</strong> <code>Shift+Alt+F</code> (Windows) / <code>Shift+Option+F</code> (Mac) — instantly formats JSON files</li>
            <li>• <strong style={{ color: "var(--text)" }}>REST Client extension:</strong> Send HTTP requests and view formatted responses directly in the editor</li>
            <li>• <strong style={{ color: "var(--text)" }}>Thunder Client:</strong> Full-featured API testing GUI inside VS Code</li>
            <li>• <strong style={{ color: "var(--text)" }}>Command Palette:</strong> <code>Cmd+Shift+P</code> → &quot;Format Document&quot; works on any .json file</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">JetBrains IDEs (WebStorm, IntelliJ)</h3>
          <ul className="space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            <li>• Built-in JSON formatter: <code>Cmd+Alt+L</code></li>
            <li>• HTTP Client: Create <code>.http</code> files to save and replay API requests</li>
            <li>• JSON Path evaluation built into the IDE</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Vim / Neovim</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`" Format JSON in current buffer
:%!jq '.'

" Format selected lines
:'<,'>!jq '.'

" Or with Python
:%!python3 -m json.tool`}</pre>
        </section>

        {/* Section 11: Automation */}
        <section id="automation" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">11. Automating Response Inspection</h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            For production systems, you want automated checks — not manual formatting.
          </p>

          <h3 className="text-lg font-semibold mb-2">Shell Script: API Health Check</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`#!/bin/bash
# api-check.sh — Monitor API responses

API_URL="https://api.example.com/health"
RESPONSE=$(curl -s -w "\\n%{http_code}" "$API_URL")
BODY=$(echo "$RESPONSE" | sed '$d')
STATUS=$(echo "$RESPONSE" | tail -1)

if [ "$STATUS" -ne 200 ]; then
  echo "❌ API returned $STATUS"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 1
fi

# Validate expected fields exist
echo "$BODY" | jq -e '.status == "healthy"' > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "⚠️  API responded 200 but status is not healthy:"
  echo "$BODY" | jq '.'
  exit 1
fi

echo "✅ API is healthy"`}</pre>

          <h3 className="text-lg font-semibold mb-2">Node.js: Response Logger</h3>
          <pre className="my-4 text-sm overflow-x-auto">{`// Pretty-print all API responses during development
const originalFetch = globalThis.fetch;

globalThis.fetch = async (...args) => {
  const response = await originalFetch(...args);
  const clone = response.clone();
  
  try {
    const data = await clone.json();
    console.log(
      \`\\n📡 \${response.status} \${args[0]}\\n\`,
      JSON.stringify(data, null, 2)
    );
  } catch {
    // Not JSON — ignore
  }
  
  return response;
};`}</pre>
        </section>

        {/* Section 12: FAQ */}
        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">12. Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I pretty-print a JSON API response in the terminal?</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Pipe your curl output to jq: <code>curl -s https://api.example.com/data | jq &apos;.&apos;</code>.
                This formats the JSON with proper indentation and syntax highlighting. If jq isn&apos;t
                installed, use <code>python3 -m json.tool</code> as a fallback — it&apos;s available on
                virtually every system with Python.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I format JSON in Chrome DevTools?</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Open DevTools (<code>F12</code>), go to the Network tab, click on the API request,
                then click the &quot;Preview&quot; tab to see auto-formatted JSON with collapsible sections.
                The &quot;Response&quot; tab shows raw text — click the <code>{`{}`}</code> icon to
                pretty-print it.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the best tool to format JSON online?</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                <Link href="/json-formatter" style={{ color: "var(--accent)" }} className="underline">
                  JSONBolt&apos;s JSON Formatter
                </Link>{" "}
                is fast, free, and runs entirely in your browser — no data is sent to any server.
                It handles large files, shows syntax errors, and supports both beautify and minify
                operations with keyboard shortcuts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I debug a malformed JSON API response?</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                First, use a{" "}
                <Link href="/json-validator" style={{ color: "var(--accent)" }} className="underline">
                  JSON validator
                </Link>{" "}
                to find the exact syntax error. Common issues include trailing commas, single quotes
                instead of double quotes, unescaped special characters, and missing brackets. The
                validator will show the exact line and character where parsing fails.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I format XML API responses the same way?</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Yes, but with different tools. In the terminal, use <code>xmllint --format -</code> instead
                of jq. For online formatting, you can paste XML into a formatter, or convert it to JSON
                first using JSONBolt&apos;s{" "}
                <Link href="/json-to-xml" style={{ color: "var(--accent)" }} className="underline">
                  JSON to XML converter
                </Link>{" "}
                for easier inspection.
              </p>
            </div>
          </div>
        </section>

        {/* More Tools Section */}
        <section className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <h3 className="font-semibold mb-3">More JSON Tools</h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>→ <Link href="/json-formatter" style={{ color: "var(--accent)" }}>JSON Formatter</Link> — Beautify and format JSON</li>
            <li>→ <Link href="/json-validator" style={{ color: "var(--accent)" }}>JSON Validator</Link> — Validate JSON syntax</li>
            <li>→ <Link href="/json-minifier" style={{ color: "var(--accent)" }}>JSON Minifier</Link> — Compress JSON for production</li>
            <li>→ <Link href="/json-diff" style={{ color: "var(--accent)" }}>JSON Diff</Link> — Compare two JSON objects</li>
            <li>→ <Link href="/json-path-finder" style={{ color: "var(--accent)" }}>JSON Path Finder</Link> — Navigate JSON with JSONPath</li>
            <li>→ <Link href="/blog/json-vs-xml" style={{ color: "var(--accent)" }}>JSON vs XML Comparison</Link></li>
            <li>→ <Link href="/blog/best-json-formatters-2026" style={{ color: "var(--accent)" }}>Best JSON Formatters 2026</Link></li>
          </ul>
        </section>
      </article>
    </>
  );
}
