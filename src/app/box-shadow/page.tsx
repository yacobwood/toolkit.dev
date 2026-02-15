"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function BoxShadowGenerator() {
  const [offsetX, setOffsetX] = useState(4);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${(alpha / 100).toFixed(2)})`;
  };

  const shadow = `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  const sliders = [
    { label: "Offset X", value: offsetX, set: setOffsetX, min: -50, max: 50 },
    { label: "Offset Y", value: offsetY, set: setOffsetY, min: -50, max: 50 },
    { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
    { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
    { label: "Opacity", value: opacity, set: setOpacity, min: 0, max: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Box Shadow Generator</h1>
        <p className="text-muted">Build CSS box shadows visually and copy the code.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            {sliders.map(({ label, value, set, min, max }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">{label}</label>
                  <span className="text-sm font-mono text-muted">{value}{label === "Opacity" ? "%" : "px"}</span>
                </div>
                <input type="range" min={min} max={max} value={value} onChange={(e) => set(parseInt(e.target.value))} className="w-full accent-accent" />
              </div>
            ))}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Color</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border" />
              </div>
              <button onClick={() => setInset(!inset)} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${inset ? "bg-accent text-white border-accent" : "border-border bg-surface hover:bg-surface-hover"}`}>
                Inset
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">CSS Code</label>
              <CopyButton text={css} />
            </div>
            <code className="text-sm font-mono break-all">{css}</code>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-4 block">Preview</label>
          <div className="flex items-center justify-center min-h-[400px] bg-background rounded-lg">
            <div className="w-48 h-48 rounded-xl bg-surface border border-border" style={{ boxShadow: shadow }} />
          </div>
        </div>
      </div>
    </div>
  );
}
