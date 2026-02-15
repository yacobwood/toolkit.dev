"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

// Minimal JSON <-> YAML converter (no dependencies)
function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "boolean") return obj.toString();
  if (typeof obj === "number") return obj.toString();
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(":") || obj.includes("#") || obj.includes("'") || obj.includes('"') || obj.startsWith(" ") || obj.endsWith(" ")) {
      return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => `${pad}- ${jsonToYaml(item, indent + 1).trimStart()}`).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries
      .map(([key, val]) => {
        const valStr = jsonToYaml(val, indent + 1);
        if (typeof val === "object" && val !== null && (Array.isArray(val) ? val.length > 0 : Object.keys(val).length > 0)) {
          return `${pad}${key}:\n${valStr}`;
        }
        return `${pad}${key}: ${valStr}`;
      })
      .join("\n");
  }
  return String(obj);
}

function yamlToJson(yaml: string): unknown {
  const lines = yaml.split("\n");
  return parseYamlLines(lines, 0).value;
}

function parseYamlLines(lines: string[], startIndent: number): { value: unknown; consumed: number } {
  if (lines.length === 0) return { value: null, consumed: 0 };

  const firstLine = lines[0];
  const trimmed = firstLine.trim();

  // Empty or comment
  if (!trimmed || trimmed.startsWith("#")) {
    const rest = parseYamlLines(lines.slice(1), startIndent);
    return { value: rest.value, consumed: 1 + rest.consumed };
  }

  // Array
  if (trimmed.startsWith("- ")) {
    const arr: unknown[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const ltrimmed = line.trim();
      if (!ltrimmed || ltrimmed.startsWith("#")) { i++; continue; }
      const lineIndent = line.length - line.trimStart().length;
      if (lineIndent < startIndent && i > 0) break;
      if (!ltrimmed.startsWith("- ")) break;
      arr.push(parseYamlValue(ltrimmed.slice(2).trim()));
      i++;
    }
    return { value: arr, consumed: i };
  }

  // Object
  if (trimmed.includes(":")) {
    const obj: Record<string, unknown> = {};
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const ltrimmed = line.trim();
      if (!ltrimmed || ltrimmed.startsWith("#")) { i++; continue; }
      const lineIndent = line.length - line.trimStart().length;
      if (lineIndent < startIndent && i > 0) break;
      const colonIdx = ltrimmed.indexOf(":");
      if (colonIdx === -1) break;
      const key = ltrimmed.slice(0, colonIdx).trim();
      const valPart = ltrimmed.slice(colonIdx + 1).trim();
      if (valPart) {
        obj[key] = parseYamlValue(valPart);
        i++;
      } else {
        // Nested value on next lines
        i++;
        const childIndent = i < lines.length ? lines[i].length - lines[i].trimStart().length : startIndent + 2;
        const childLines: string[] = [];
        while (i < lines.length) {
          const cl = lines[i];
          const ct = cl.trim();
          if (!ct || ct.startsWith("#")) { childLines.push(cl); i++; continue; }
          const ci = cl.length - cl.trimStart().length;
          if (ci <= startIndent) break;
          childLines.push(cl);
          i++;
        }
        const child = parseYamlLines(childLines, childIndent);
        obj[key] = child.value;
      }
    }
    return { value: obj, consumed: i };
  }

  return { value: parseYamlValue(trimmed), consumed: 1 };
}

function parseYamlValue(val: string): unknown {
  if (val === "null" || val === "~") return null;
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "[]") return [];
  if (val === "{}") return {};
  if (/^-?\d+$/.test(val)) return parseInt(val);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return val;
}

export default function JsonYaml() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [error, setError] = useState("");

  const toYaml = () => {
    try {
      const parsed = JSON.parse(left);
      setRight(jsonToYaml(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const toJson = () => {
    try {
      const parsed = yamlToJson(right);
      setLeft(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">JSON to YAML</h1>
        <p className="text-muted">Convert between JSON and YAML formats.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={toYaml} className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
          JSON → YAML
        </button>
        <button onClick={toJson} className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-hover transition-colors">
          YAML → JSON
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">JSON</label>
            {left && <CopyButton text={left} />}
          </div>
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder='{"key": "value"}' className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">YAML</label>
            {right && <CopyButton text={right} />}
          </div>
          <textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="key: value" className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">{error}</div>
      )}
    </div>
  );
}
