import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "JSON to XML Converter Online — Free | JSONBolt",
  description: "Convert JSON to XML format instantly. Free online JSON to XML converter. Bridge modern APIs with legacy XML systems.",
  keywords: ["json to xml", "json to xml converter", "convert json to xml", "json xml", "json2xml"],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-to-xml" },
};

const SAMPLE = `{
  "bookstore": {
    "book": [
      { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925, "price": 12.99 },
      { "title": "1984", "author": "George Orwell", "year": 1949, "price": 11.99 },
      { "title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960, "price": 14.99 }
    ]
  }
}`;

export default function JsonToXmlPage() {
  return (
    <ToolPage
      title="JSON to XML Converter"
      description="Convert JSON to well-formed XML instantly. Bridge modern APIs with legacy XML-based systems."
      inputLabel="Paste JSON"
      outputLabel="XML Output"
      toolType="json2xml"
      sampleInput={SAMPLE}
      longDescription="JSON to XML Converter by JSONBolt transforms JSON data into well-formed XML with proper nesting and escaping. This is essential when integrating modern JSON-based APIs with legacy systems that require XML, creating SOAP requests, or generating XML configuration files from JSON data sources."
      features={[
        "Well-formed XML output with proper declaration",
        "Automatic escaping of special XML characters",
        "Handles nested objects and arrays",
        "Clean indentation for readability",
        "Supports all JSON data types",
        "Instant conversion in your browser",
      ]}
      useCases={[
        "Integrating JSON APIs with legacy XML systems",
        "Creating SOAP request bodies from JSON data",
        "Generating XML configuration files",
        "Converting JSON data for XML-based tools",
        "Preparing data for enterprise XML workflows",
      ]}
    />
  );
}
