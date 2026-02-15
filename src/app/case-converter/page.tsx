"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function splitWords(input: string): string[] {
  // Handle camelCase, PascalCase
  let result = input.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Handle snake_case, kebab-case
  result = result.replace(/[_-]/g, " ");
  // Split on spaces
  return result.split(/\s+/).filter(Boolean);
}

const converters: { label: string; key: string; fn: (words: string[]) => string }[] = [
  {
    label: "camelCase",
    key: "camel",
    fn: (words) => words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join(""),
  },
  {
    label: "PascalCase",
    key: "pascal",
    fn: (words) => words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(""),
  },
  {
    label: "snake_case",
    key: "snake",
    fn: (words) => words.map((w) => w.toLowerCase()).join("_"),
  },
  {
    label: "SCREAMING_SNAKE",
    key: "screaming",
    fn: (words) => words.map((w) => w.toUpperCase()).join("_"),
  },
  {
    label: "kebab-case",
    key: "kebab",
    fn: (words) => words.map((w) => w.toLowerCase()).join("-"),
  },
  {
    label: "Title Case",
    key: "title",
    fn: (words) => words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" "),
  },
  {
    label: "UPPERCASE",
    key: "upper",
    fn: (words) => words.map((w) => w.toUpperCase()).join(" "),
  },
  {
    label: "lowercase",
    key: "lower",
    fn: (words) => words.map((w) => w.toLowerCase()).join(" "),
  },
  {
    label: "dot.case",
    key: "dot",
    fn: (words) => words.map((w) => w.toLowerCase()).join("."),
  },
  {
    label: "path/case",
    key: "path",
    fn: (words) => words.map((w) => w.toLowerCase()).join("/"),
  },
];

export default function CaseConverter() {
  const [input, setInput] = useState("");

  const words = splitWords(input);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">String Case Converter</h1>
        <p className="text-muted">Convert between camelCase, snake_case, kebab-case, PascalCase, and more.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="myVariableName, my_variable_name, my-variable-name..." className="w-full p-4 rounded-lg border border-border bg-surface text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>

        {input && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {converters.map(({ label, key, fn }) => {
              const result = fn(words);
              return (
                <div key={key} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted font-medium">{label}</label>
                    <CopyButton text={result} />
                  </div>
                  <p className="text-sm font-mono break-all">{result}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
