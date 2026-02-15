"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/CopyButton";

function hexToRgb(hex: string): [number, number, number] | null {
  const match = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function ColorConverter() {
  const [rgb, setRgb] = useState<[number, number, number]>([59, 130, 246]);
  const [hex, setHex] = useState("#3b82f6");
  const [hsl, setHsl] = useState<[number, number, number]>(() => rgbToHsl(59, 130, 246));

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    r = clamp(r, 0, 255); g = clamp(g, 0, 255); b = clamp(b, 0, 255);
    setRgb([r, g, b]);
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  }, []);

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(...parsed));
    }
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    h = clamp(h, 0, 360); s = clamp(s, 0, 100); l = clamp(l, 0, 100);
    setHsl([h, s, l]);
    const newRgb = hslToRgb(h, s, l);
    setRgb(newRgb);
    setHex(rgbToHex(...newRgb));
  }, []);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFromHex(value);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Color Converter</h1>
        <p className="text-muted">
          Convert between HEX, RGB, and HSL color formats. Pick a color or type
          values directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium mb-2">
            Color Preview
          </label>
          <div
            className="w-full aspect-square rounded-xl border border-border shadow-inner"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex}
            onChange={handleColorPicker}
            className="w-full h-10 mt-3 rounded-lg cursor-pointer border border-border"
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">HEX</label>
              <CopyButton text={hex} />
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
              spellCheck={false}
            />
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">RGB</label>
              <CopyButton text={`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["R", "G", "B"] as const).map((label, i) => (
                <div key={label}>
                  <label className="block text-xs text-muted mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[i]}
                    onChange={(e) => {
                      const newRgb: [number, number, number] = [...rgb];
                      newRgb[i] = parseInt(e.target.value) || 0;
                      updateFromRgb(...newRgb);
                    }}
                    className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">HSL</label>
              <CopyButton text={`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { label: "H", max: 360, suffix: "\u00B0" },
                  { label: "S", max: 100, suffix: "%" },
                  { label: "L", max: 100, suffix: "%" },
                ] as const
              ).map((field, i) => (
                <div key={field.label}>
                  <label className="block text-xs text-muted mb-1">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={field.max}
                    value={hsl[i]}
                    onChange={(e) => {
                      const newHsl: [number, number, number] = [...hsl];
                      newHsl[i] = parseInt(e.target.value) || 0;
                      updateFromHsl(...newHsl);
                    }}
                    className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
