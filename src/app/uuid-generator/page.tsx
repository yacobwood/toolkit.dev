"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/CopyButton";

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>(() => [generateUUID()]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  }, [count]);

  const format = (uuid: string) => {
    let result = uuid;
    if (noDashes) result = result.replace(/-/g, "");
    if (uppercase) result = result.toUpperCase();
    return result;
  };

  const allFormatted = uuids.map(format).join("\n");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UUID Generator</h1>
        <p className="text-muted">
          Generate random v4 UUIDs. Bulk generation supported.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={generate}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            Generate
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted">Count:</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) =>
                setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))
              }
              className="w-20 p-2 rounded-lg border border-border bg-surface text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

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

          <button
            onClick={() => setNoDashes(!noDashes)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              noDashes
                ? "bg-accent text-white border-accent"
                : "border-border bg-surface hover:bg-surface-hover"
            }`}
          >
            No Dashes
          </button>

          {uuids.length > 0 && <CopyButton text={allFormatted} />}
        </div>

        <div className="rounded-xl border border-border bg-surface divide-y divide-border">
          {uuids.map((uuid, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm font-mono break-all">
                {format(uuid)}
              </span>
              <div className="ml-3 shrink-0">
                <CopyButton text={format(uuid)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
