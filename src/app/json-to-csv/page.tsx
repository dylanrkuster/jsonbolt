import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "JSON to CSV Converter Online — Free | JSONBolt",
  description: "Convert JSON arrays to CSV format instantly. Free online JSON to CSV converter. Export API data to spreadsheets in seconds.",
  keywords: ["json to csv", "json to csv converter", "convert json to csv", "json csv", "json array to csv"],
  alternates: { canonical: "https://jsonbolt.vercel.app/json-to-csv" },
};

const SAMPLE = `[
  { "name": "Alice", "email": "alice@example.com", "role": "Admin", "active": true },
  { "name": "Bob", "email": "bob@example.com", "role": "Editor", "active": true },
  { "name": "Charlie", "email": "charlie@example.com", "role": "Viewer", "active": false },
  { "name": "Diana", "email": "diana@example.com", "role": "Editor", "active": true }
]`;

export default function JsonToCsvPage() {
  return (
    <ToolPage
      title="JSON to CSV Converter"
      description="Convert JSON arrays to CSV format instantly. Export API data to spreadsheets in seconds."
      inputLabel="Paste JSON array"
      outputLabel="CSV Output"
      toolType="json2csv"
      sampleInput={SAMPLE}
      longDescription="JSON to CSV Converter by JSONBolt transforms JSON arrays of objects into comma-separated values (CSV) format. This is perfect for exporting API data to Excel or Google Sheets, creating reports from JSON data, or converting between data formats. The converter automatically detects all column headers and handles special characters, commas, and quotes in values."
      features={[
        "Automatic column header detection from JSON keys",
        "Handles special characters and escaping",
        "Supports nested objects (flattened to strings)",
        "Download CSV file with one click",
        "Instant conversion with live preview",
        "Works with any JSON array of objects",
      ]}
      useCases={[
        "Exporting API response data to Excel or Google Sheets",
        "Converting database JSON exports to CSV",
        "Creating reports from JSON data sources",
        "Preparing data for import into spreadsheet tools",
        "Converting webhook payload logs to analyzable format",
      ]}
    />
  );
}
