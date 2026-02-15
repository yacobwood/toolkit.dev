"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setOutput("");
      setError("");
      alert("Valid JSON!");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">JSON Formatter & Validator</h1>
        <p className="text-muted">
          Paste your JSON to format, minify, or validate it instantly.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={format}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-hover transition-colors"
        >
          Minify
        </button>
        <button
          onClick={validate}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-hover transition-colors"
        >
          Validate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">
          {error}
        </div>
      )}
    </div>
  );
}
