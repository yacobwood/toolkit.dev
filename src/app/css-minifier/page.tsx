"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function minifyCSS(css: string): string {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // Remove newlines and extra whitespace
    .replace(/\s+/g, " ")
    // Remove space around selectors and braces
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*,\s*/g, ",")
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, "}")
    .trim();
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    setOutput(minifyCSS(input));
  };

  const savedBytes = input.length - output.length;
  const savedPercent =
    input.length > 0 ? ((savedBytes / input.length) * 100).toFixed(1) : "0";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CSS Minifier</h1>
        <p className="text-muted">
          Minify CSS by removing whitespace, comments, and unnecessary
          characters.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleMinify}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          Minify
        </button>
        {output && (
          <span className="flex items-center text-sm text-muted">
            Saved {savedBytes} bytes ({savedPercent}%)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input CSS</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`.container {\n  display: flex;\n  align-items: center;\n  /* Center content */\n  justify-content: center;\n}`}
            className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Minified Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Minified CSS will appear here..."
            className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
