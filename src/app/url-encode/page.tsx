"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function UrlEncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = (value: string, currentMode: "encode" | "decode") => {
    setInput(value);
    setError("");
    if (!value) {
      setOutput("");
      return;
    }
    try {
      if (currentMode === "encode") {
        setOutput(encodeURIComponent(value));
      } else {
        setOutput(decodeURIComponent(value));
      }
    } catch {
      setError(
        currentMode === "decode"
          ? "Invalid URL-encoded string"
          : "Could not encode input"
      );
      setOutput("");
    }
  };

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    process(input, newMode);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">URL Encode / Decode</h1>
        <p className="text-muted">
          Encode or decode URL-safe strings in real time.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => switchMode("encode")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === "encode"
              ? "bg-accent text-white"
              : "border border-border bg-surface hover:bg-surface-hover"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => switchMode("decode")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === "decode"
              ? "bg-accent text-white"
              : "border border-border bg-surface hover:bg-surface-hover"
          }`}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {mode === "encode" ? "Plain Text" : "URL-Encoded String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Enter URL-encoded string to decode..."
            }
            className="w-full h-64 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              {mode === "encode" ? "URL-Encoded Output" : "Decoded Text"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-64 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none"
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
