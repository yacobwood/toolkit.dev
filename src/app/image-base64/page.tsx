"use client";

import { useState, useRef } from "react";
import CopyButton from "@/components/CopyButton";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageBase64() {
  const [dataUri, setDataUri] = useState("");
  const [rawBase64, setRawBase64] = useState("");
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string; type: string } | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError("");
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large (${(file.size / 1048576).toFixed(1)} MB). Maximum size is 10 MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setDataUri(result);
      setRawBase64(result.split(",")[1] || "");
      setPreview(result);
      setFileInfo({
        name: file.name,
        size: file.size < 1024 ? `${file.size} B` : file.size < 1048576 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / 1048576).toFixed(1)} MB`,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) handleFile(file);
        break;
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10" onPaste={handlePaste}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Image to Base64</h1>
        <p className="text-muted">Convert images to Base64 data URIs for embedding in code. Drop, paste, or select a file.</p>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent transition-colors"
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
          <div className="text-4xl mb-3 text-muted">+</div>
          <p className="text-sm text-muted">Click to select, drag & drop, or paste an image</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        {preview && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-surface p-5">
              <label className="text-sm font-medium mb-3 block">Preview</label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="max-w-full max-h-64 rounded-lg mx-auto" />
              {fileInfo && (
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted text-center">
                  <div><span className="block font-medium text-foreground">{fileInfo.name}</span>Name</div>
                  <div><span className="block font-medium text-foreground">{fileInfo.size}</span>Size</div>
                  <div><span className="block font-medium text-foreground">{fileInfo.type}</span>Type</div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Data URI</label>
                  <CopyButton text={dataUri} />
                </div>
                <textarea value={dataUri} readOnly className="w-full h-28 p-3 rounded-lg border border-border bg-background text-xs font-mono resize-none focus:outline-none break-all" />
              </div>

              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Raw Base64</label>
                  <CopyButton text={rawBase64} />
                </div>
                <textarea value={rawBase64} readOnly className="w-full h-28 p-3 rounded-lg border border-border bg-background text-xs font-mono resize-none focus:outline-none break-all" />
              </div>

              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">HTML img Tag</label>
                  <CopyButton text={`<img src="${dataUri}" alt="" />`} />
                </div>
                <code className="text-xs font-mono text-muted break-all block">
                  {`<img src="${dataUri.slice(0, 50)}..." alt="" />`}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
