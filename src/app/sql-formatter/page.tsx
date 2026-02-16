"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING",
  "LIMIT", "OFFSET", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
  "OUTER JOIN", "FULL JOIN", "CROSS JOIN", "ON", "AS", "INSERT INTO",
  "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE",
  "DROP TABLE", "UNION", "UNION ALL", "EXCEPT", "INTERSECT", "IN", "NOT IN",
  "EXISTS", "NOT EXISTS", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL",
  "CASE", "WHEN", "THEN", "ELSE", "END", "DISTINCT", "COUNT", "SUM",
  "AVG", "MIN", "MAX", "WITH",
];

const NEWLINE_BEFORE = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING",
  "LIMIT", "OFFSET", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
  "OUTER JOIN", "FULL JOIN", "CROSS JOIN", "ON", "INSERT INTO", "VALUES",
  "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE",
  "UNION", "UNION ALL", "EXCEPT", "INTERSECT", "WITH",
];

const INDENT_AFTER = ["SELECT", "SET", "VALUES", "WITH"];

const SORTED_KEYWORDS = [...KEYWORDS].sort((a, b) => b.length - a.length);
const SORTED_NEWLINE_BEFORE = [...NEWLINE_BEFORE].sort((a, b) => b.length - a.length);

function formatSQL(sql: string): string {
  // Normalize whitespace
  let formatted = sql.replace(/\s+/g, " ").trim();

  // Uppercase keywords
  for (const kw of SORTED_KEYWORDS) {
    const regex = new RegExp(`\\b${kw.replace(/\s+/g, "\\s+")}\\b`, "gi");
    formatted = formatted.replace(regex, kw);
  }

  // Add newlines before certain keywords
  for (const kw of SORTED_NEWLINE_BEFORE) {
    const regex = new RegExp(`\\s+${kw.replace(/\s+/g, "\\s+")}\\b`, "g");
    formatted = formatted.replace(regex, `\n${kw}`);
  }

  // Indent lines after SELECT, SET, etc.
  const lines = formatted.split("\n");
  const result: string[] = [];
  let indent = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isIndentTrigger = INDENT_AFTER.some((kw) => trimmed.startsWith(kw));
    const isNewClause = NEWLINE_BEFORE.some((kw) => trimmed.startsWith(kw)) && !isIndentTrigger;

    if (isNewClause && indent > 0) indent--;

    result.push("  ".repeat(indent) + trimmed);

    if (isIndentTrigger) indent++;
  }

  return result.join("\n");
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = () => {
    setOutput(formatSQL(input));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SQL Formatter</h1>
        <p className="text-muted">Format and prettify SQL queries for readability.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={handleFormat} className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
          Format SQL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input SQL</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1 AND status = 'active' ORDER BY created_at DESC LIMIT 10" className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Formatted Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder="Formatted SQL will appear here..." className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none" spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
