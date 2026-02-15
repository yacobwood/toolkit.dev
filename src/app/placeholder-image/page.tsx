"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CopyButton from "@/components/CopyButton";

export default function PlaceholderImage() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [bgColor, setBgColor] = useState("#e5e7eb");
  const [textColor, setTextColor] = useState("#6b7280");
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState("");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const label = text || `${width} x ${height}`;
    const fontSize = Math.max(12, Math.min(width, height) / 8);
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, width / 2, height / 2);

    setDataUrl(canvas.toDataURL("image/png"));
  }, [width, height, bgColor, textColor, text]);

  useEffect(() => { draw(); }, [draw]);

  const download = () => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `placeholder-${width}x${height}.png`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Placeholder Image Generator</h1>
        <p className="text-muted">Generate placeholder images with custom size, color, and text.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <input type="number" min={1} max={2000} value={width} onChange={(e) => setWidth(Math.min(2000, parseInt(e.target.value) || 1))} className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input type="number" min={1} max={2000} value={height} onChange={(e) => setHeight(Math.min(2000, parseInt(e.target.value) || 1))} className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text (optional)</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={`${width} x ${height}`} className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Background</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer" />
                  <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 p-2 rounded-lg border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Text Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer" />
                  <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1 p-2 rounded-lg border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[[100, 100], [200, 200], [400, 300], [800, 600], [1200, 630], [1920, 1080]].map(([w, h]) => (
                <button key={`${w}x${h}`} onClick={() => { setWidth(w); setHeight(h); }} className="px-3 py-1.5 text-xs font-mono rounded-md border border-border hover:bg-surface-hover transition-colors">
                  {w}x{h}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={download} className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">Download PNG</button>
            {dataUrl && <CopyButton text={dataUrl} />}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-4 block">Preview</label>
          <div className="flex items-center justify-center bg-background rounded-lg p-4 min-h-[300px]">
            <canvas ref={canvasRef} className="max-w-full max-h-[400px] rounded-lg" style={{ imageRendering: "auto" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
