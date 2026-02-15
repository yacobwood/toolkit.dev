"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

interface Stop {
  color: string;
  position: number;
}

export default function GradientGenerator() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { color: "#3b82f6", position: 0 },
    { color: "#8b5cf6", position: 50 },
    { color: "#ec4899", position: 100 },
  ]);

  const updateStop = (index: number, field: keyof Stop, value: string | number) => {
    setStops((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addStop = () => {
    if (stops.length >= 6) return;
    setStops((prev) => [...prev, { color: "#22c55e", position: 75 }]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const stopsStr = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
  const gradient = type === "linear" ? `linear-gradient(${angle}deg, ${stopsStr})` : `radial-gradient(circle, ${stopsStr})`;
  const css = `background: ${gradient};`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gradient Generator</h1>
        <p className="text-muted">Build CSS gradients visually and copy the code.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <div className="flex gap-2">
              {(["linear", "radial"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)} className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${type === t ? "bg-accent text-white" : "border border-border bg-surface hover:bg-surface-hover"}`}>
                  {t}
                </button>
              ))}
            </div>

            {type === "linear" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Angle</label>
                  <span className="text-sm font-mono text-muted">{angle}deg</span>
                </div>
                <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full accent-accent" />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Color Stops</label>
                {stops.length < 6 && (
                  <button onClick={addStop} className="px-2 py-1 text-xs font-medium rounded-md border border-border hover:bg-surface-hover transition-colors">+ Add</button>
                )}
              </div>
              {stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input type="color" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border shrink-0" />
                  <input type="text" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)} className="w-24 p-2 rounded-lg border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
                  <input type="range" min={0} max={100} value={stop.position} onChange={(e) => updateStop(i, "position", parseInt(e.target.value))} className="flex-1 accent-accent" />
                  <span className="text-xs text-muted w-8 text-right">{stop.position}%</span>
                  {stops.length > 2 && (
                    <button onClick={() => removeStop(i)} className="text-muted hover:text-error text-sm">x</button>
                  )}
                </div>
              ))}
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
          <div className="w-full aspect-square rounded-xl" style={{ background: gradient }} />
        </div>
      </div>
    </div>
  );
}
