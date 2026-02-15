"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function optimizeSVG(svg: string): string {
  let result = svg;
  // Remove XML declaration
  result = result.replace(/<\?xml[^?]*\?>\s*/g, "");
  // Remove comments
  result = result.replace(/<!--[\s\S]*?-->/g, "");
  // Remove metadata, title, desc
  result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
  result = result.replace(/<title[\s\S]*?<\/title>/gi, "");
  result = result.replace(/<desc[\s\S]*?<\/desc>/gi, "");
  // Remove editor-specific attributes
  result = result.replace(/\s*(inkscape|sodipodi|sketch|xmlns:(?:inkscape|sodipodi|sketch|xlink|dc|cc|rdf|svg))[^=]*="[^"]*"/gi, "");
  // Remove data- attributes
  result = result.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");
  // Remove empty groups
  result = result.replace(/<g>\s*<\/g>/g, "");
  // Remove id attributes (optional - can be useful to keep)
  // Collapse whitespace
  result = result.replace(/\s+/g, " ");
  result = result.replace(/>\s+</g, "><");
  // Clean up self-closing tags
  result = result.replace(/\s*\/>/g, "/>");
  return result.trim();
}

export default function SvgOptimizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleOptimize = () => {
    setOutput(optimizeSVG(input));
  };

  const savedBytes = input.length - output.length;
  const savedPercent = input.length > 0 ? ((savedBytes / input.length) * 100).toFixed(1) : "0";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SVG Optimizer</h1>
        <p className="text-muted">Minify SVG code by removing metadata, comments, and unnecessary attributes.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={handleOptimize} className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">Optimize</button>
        {output && <span className="flex items-center text-sm text-muted">Saved {savedBytes} bytes ({savedPercent}%)</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input SVG</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<svg>...</svg>" className="w-full h-72 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Optimized SVG</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder="Optimized SVG..." className="w-full h-72 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none" spellCheck={false} />
        </div>
      </div>

      {output && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <label className="text-sm font-medium mb-2 block">Input Preview</label>
            <div className="flex items-center justify-center p-4 bg-background rounded-lg min-h-[120px]" dangerouslySetInnerHTML={{ __html: input }} />
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <label className="text-sm font-medium mb-2 block">Output Preview</label>
            <div className="flex items-center justify-center p-4 bg-background rounded-lg min-h-[120px]" dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        </div>
      )}
    </div>
  );
}
