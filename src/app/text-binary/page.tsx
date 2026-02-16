"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

type Mode = "binary" | "ascii" | "hex" | "octal";

function textTo(text: string, mode: Mode): string {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      switch (mode) {
        case "binary": return code.toString(2).padStart(8, "0");
        case "ascii": return code.toString();
        case "hex": return code.toString(16).padStart(2, "0").toUpperCase();
        case "octal": return code.toString(8).padStart(3, "0");
      }
    })
    .join(" ");
}

function fromText(encoded: string, mode: Mode): { result: string; error: string } {
  if (!encoded.trim()) return { result: "", error: "" };
  const parts = encoded.trim().split(/\s+/);
  try {
    const base = mode === "binary" ? 2 : mode === "ascii" ? 10 : mode === "hex" ? 16 : 8;
    const chars = parts.map((p) => {
      const code = parseInt(p, base);
      if (isNaN(code)) throw new Error(`Invalid ${mode} value: "${p}"`);
      return String.fromCharCode(code);
    });
    return { result: chars.join(""), error: "" };
  } catch (e) {
    return { result: "", error: (e as Error).message };
  }
}

const MODES: { key: Mode; label: string }[] = [
  { key: "binary", label: "Binary" },
  { key: "ascii", label: "ASCII / Decimal" },
  { key: "hex", label: "Hexadecimal" },
  { key: "octal", label: "Octal" },
];

export default function TextBinary() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("binary");
  const [direction, setDirection] = useState<"encode" | "decode">("encode");

  const decoded = direction === "decode" ? fromText(input, mode) : null;
  const output = direction === "encode" ? textTo(input, mode) : (decoded?.result ?? "");
  const error = decoded?.error ?? "";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Text to Binary / ASCII / Hex</h1>
        <p className="text-muted">Convert text to binary, ASCII codes, hexadecimal, or octal — and back.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setDirection(direction === "encode" ? "decode" : "encode")} className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
            {direction === "encode" ? "Text → Code" : "Code → Text"}
          </button>
          {MODES.map(({ key, label }) => (
            <button key={key} onClick={() => setMode(key)} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${mode === key ? "bg-accent text-white" : "border border-border bg-surface hover:bg-surface-hover"}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {direction === "encode" ? "Text Input" : `${MODES.find((m) => m.key === mode)?.label} Input`}
            </label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={direction === "encode" ? "Hello World" : "01001000 01100101 01101100 01101100 01101111"} className="w-full h-40 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                {direction === "encode" ? `${MODES.find((m) => m.key === mode)?.label} Output` : "Text Output"}
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <textarea value={output} readOnly placeholder="Result..." className="w-full h-40 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none" spellCheck={false} />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
