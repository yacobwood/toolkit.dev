"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function MarkdownTable() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, () => Array(3).fill(""))
  );

  const ensureSize = (newRows: number, newCols: number) => {
    setData((prev) => {
      const next: string[][] = [];
      for (let r = 0; r < newRows + 1; r++) {
        next[r] = [];
        for (let c = 0; c < newCols; c++) {
          next[r][c] = prev[r]?.[c] ?? "";
        }
      }
      return next;
    });
  };

  const updateCell = (r: number, c: number, value: string) => {
    setData((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = value;
      return next;
    });
  };

  const handleRows = (n: number) => {
    const v = Math.max(1, Math.min(20, n));
    setRows(v);
    ensureSize(v, cols);
  };

  const handleCols = (n: number) => {
    const v = Math.max(1, Math.min(10, n));
    setCols(v);
    ensureSize(rows, v);
  };

  const generateMarkdown = (): string => {
    const header = data[0]?.slice(0, cols) ?? [];
    const bodyRows = data.slice(1, rows + 1);

    const colWidths = Array.from({ length: cols }, (_, c) => {
      const headerLen = (header[c] || "Header").length;
      const maxBody = Math.max(...bodyRows.map((row) => (row[c] || "").length), 0);
      return Math.max(headerLen, maxBody, 3);
    });

    const pad = (s: string, w: number) => s + " ".repeat(Math.max(0, w - s.length));

    const headerLine = "| " + header.map((h, i) => pad(h || `Col ${i + 1}`, colWidths[i])).join(" | ") + " |";
    const separator = "| " + colWidths.map((w) => "-".repeat(w)).join(" | ") + " |";
    const body = bodyRows.map(
      (row) => "| " + row.slice(0, cols).map((cell, i) => pad(cell, colWidths[i])).join(" | ") + " |"
    );

    return [headerLine, separator, ...body].join("\n");
  };

  const markdown = generateMarkdown();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Markdown Table Generator</h1>
        <p className="text-muted">Edit the table visually and copy the markdown output.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted">Rows:</label>
            <input type="number" min={1} max={20} value={rows} onChange={(e) => handleRows(parseInt(e.target.value) || 1)} className="w-16 p-2 rounded-lg border border-border bg-surface text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted">Cols:</label>
            <input type="number" min={1} max={10} value={cols} onChange={(e) => handleCols(parseInt(e.target.value) || 1)} className="w-16 p-2 rounded-lg border border-border bg-surface text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-accent-light">
                {Array.from({ length: cols }, (_, c) => (
                  <th key={c} className="p-0">
                    <input type="text" value={data[0]?.[c] ?? ""} onChange={(e) => updateCell(0, c, e.target.value)} placeholder={`Col ${c + 1}`} className="w-full p-2.5 text-sm font-medium bg-transparent focus:outline-none focus:ring-2 focus:ring-accent text-center" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }, (_, r) => (
                <tr key={r} className="border-t border-border">
                  {Array.from({ length: cols }, (_, c) => (
                    <td key={c} className="p-0">
                      <input type="text" value={data[r + 1]?.[c] ?? ""} onChange={(e) => updateCell(r + 1, c, e.target.value)} placeholder="" className="w-full p-2.5 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-accent text-center" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Markdown Output</label>
            <CopyButton text={markdown} />
          </div>
          <pre className="p-4 rounded-lg border border-border bg-surface text-sm font-mono overflow-x-auto whitespace-pre">{markdown}</pre>
        </div>
      </div>
    </div>
  );
}
