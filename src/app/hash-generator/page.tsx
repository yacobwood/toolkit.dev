"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

async function hash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface HashResult {
  label: string;
  algorithm: string;
  value: string;
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<HashResult[]>([]);
  const [uppercase, setUppercase] = useState(false);

  const generate = async (text: string) => {
    setInput(text);
    if (!text) {
      setResults([]);
      return;
    }

    const algorithms: { label: string; algorithm: string }[] = [
      { label: "SHA-1", algorithm: "SHA-1" },
      { label: "SHA-256", algorithm: "SHA-256" },
      { label: "SHA-384", algorithm: "SHA-384" },
      { label: "SHA-512", algorithm: "SHA-512" },
    ];

    const hashes = await Promise.all(
      algorithms.map(async ({ label, algorithm }) => ({
        label,
        algorithm,
        value: await hash(algorithm, text),
      }))
    );

    setResults(hashes);
  };

  const formatHash = (value: string) =>
    uppercase ? value.toUpperCase() : value;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
        <p className="text-muted">
          Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => generate(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUppercase(!uppercase)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              uppercase
                ? "bg-accent text-white border-accent"
                : "border-border bg-surface hover:bg-surface-hover"
            }`}
          >
            UPPERCASE
          </button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.algorithm}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">{result.label}</label>
                  <CopyButton text={formatHash(result.value)} />
                </div>
                <p className="text-sm font-mono text-muted break-all">
                  {formatHash(result.value)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
