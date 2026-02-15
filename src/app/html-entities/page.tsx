"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

const REVERSE_MAP: Record<string, string> = {};
for (const [char, entity] of Object.entries(ENTITY_MAP)) {
  REVERSE_MAP[entity] = char;
}

function encodeEntities(text: string): string {
  return text.replace(/[&<>"'`=/]/g, (char) => ENTITY_MAP[char] || char);
}

function decodeEntities(text: string): string {
  // Named entities
  let result = text;
  for (const [entity, char] of Object.entries(REVERSE_MAP)) {
    result = result.split(entity).join(char);
  }
  // Numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_m, code) =>
    String.fromCharCode(parseInt(code))
  );
  // Numeric entities (hex)
  result = result.replace(/&#x([a-fA-F0-9]+);/g, (_m, code) =>
    String.fromCharCode(parseInt(code, 16))
  );
  return result;
}

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = (value: string, currentMode: "encode" | "decode") => {
    setInput(value);
    if (!value) {
      setOutput("");
      return;
    }
    if (currentMode === "encode") {
      setOutput(encodeEntities(value));
    } else {
      setOutput(decodeEntities(value));
    }
  };

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    process(input, newMode);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HTML Entity Encoder</h1>
        <p className="text-muted">
          Encode and decode HTML entities like &amp;amp; &amp;lt; &amp;gt; in
          real time.
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
            {mode === "encode" ? "Plain HTML" : "Encoded HTML"}
          </label>
          <textarea
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            placeholder={
              mode === "encode"
                ? '<div class="hello">World</div>'
                : "&lt;div class=&quot;hello&quot;&gt;World&lt;/div&gt;"
            }
            className="w-full h-64 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              {mode === "encode" ? "Encoded Output" : "Decoded HTML"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-64 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <label className="text-sm font-medium mb-3 block">
          Common HTML Entities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-mono">
          {Object.entries(ENTITY_MAP).map(([char, entity]) => (
            <div key={char} className="flex justify-between">
              <span className="text-accent">{char === " " ? "space" : char}</span>
              <span className="text-muted">{entity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
