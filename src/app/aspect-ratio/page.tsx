"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

const PRESETS = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "21:9", w: 21, h: 9 },
  { label: "3:2", w: 3, h: 2 },
  { label: "9:16", w: 9, h: 16 },
];

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [locked, setLocked] = useState<"width" | "height" | null>(null);

  const g = gcd(width, height);
  const ratioW = width / g;
  const ratioH = height / g;
  const ratio = `${ratioW}:${ratioH}`;
  const decimal = (width / height).toFixed(4);

  const handleWidth = (w: number) => {
    if (locked === "width") return;
    setWidth(w);
    if (locked !== "height" && ratioH > 0) {
      setHeight(Math.round((w / ratioW) * ratioH));
    }
  };

  const handleHeight = (h: number) => {
    if (locked === "height") return;
    setHeight(h);
    if (locked !== "width" && ratioW > 0) {
      setWidth(Math.round((h / ratioH) * ratioW));
    }
  };

  const applyPreset = (w: number, h: number) => {
    const scale = Math.max(width, height);
    const maxDim = Math.max(w, h);
    const factor = Math.round(scale / maxDim) || 1;
    setWidth(w * factor);
    setHeight(h * factor);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Aspect Ratio Calculator</h1>
        <p className="text-muted">Calculate aspect ratios and resize dimensions proportionally.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <input type="number" min={1} value={width} onChange={(e) => handleWidth(parseInt(e.target.value) || 1)} disabled={locked === "width"} className={`w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent ${locked === "width" ? "opacity-50 cursor-not-allowed" : ""}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input type="number" min={1} value={height} onChange={(e) => handleHeight(parseInt(e.target.value) || 1)} disabled={locked === "height"} className={`w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent ${locked === "height" ? "opacity-50 cursor-not-allowed" : ""}`} />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button onClick={() => setLocked(locked === "width" ? null : "width")} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${locked === "width" ? "bg-accent text-white border-accent" : "border-border hover:bg-surface-hover"}`}>
                Lock Width
              </button>
              <button onClick={() => setLocked(locked === "height" ? null : "height")} className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${locked === "height" ? "bg-accent text-white border-accent" : "border-border hover:bg-surface-hover"}`}>
                Lock Height
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold font-mono text-accent">{ratio}</span>
                <CopyButton text={ratio} />
              </div>
              <span className="text-xs text-muted">Aspect Ratio</span>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold font-mono text-accent">{decimal}</span>
                <CopyButton text={decimal} />
              </div>
              <span className="text-xs text-muted">Decimal</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <label className="text-sm font-medium mb-3 block">Presets</label>
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map(({ label, w, h }) => (
                <button key={label} onClick={() => applyPreset(w, h)} className="px-3 py-2 text-sm font-mono rounded-lg border border-border hover:bg-surface-hover transition-colors">{label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-4 block">Preview</label>
          <div className="flex items-center justify-center min-h-[400px] bg-background rounded-lg p-4">
            <div className="bg-accent/20 border-2 border-accent rounded-lg flex items-center justify-center" style={{ width: "100%", maxWidth: 300, aspectRatio: `${width} / ${height}` }}>
              <span className="text-sm font-mono text-accent">{width} x {height}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
