"use client";

import { useState, useMemo } from "react";

export default function CharCounter() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, "").length;
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const sentences = input.trim() ? (input.match(/[.!?]+/g) || []).length || (input.trim() ? 1 : 0) : 0;
    const paragraphs = input.trim() ? input.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const lines = input ? input.split("\n").length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    // Character frequency
    const freq: Record<string, number> = {};
    for (const char of input.toLowerCase()) {
      if (/[a-z0-9]/.test(char)) {
        freq[char] = (freq[char] || 0) + 1;
      }
    }

    const topChars = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { characters, charactersNoSpaces, words, sentences, paragraphs, lines, readingTime, speakingTime, topChars };
  }, [input]);

  const statCards = [
    { label: "Characters", value: stats.characters },
    { label: "No Spaces", value: stats.charactersNoSpaces },
    { label: "Words", value: stats.words },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
    { label: "Reading Time", value: `${stats.readingTime}m` },
    { label: "Speaking Time", value: `${stats.speakingTime}m` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Character Counter</h1>
        <p className="text-muted">Count characters, words, sentences, paragraphs, and estimate reading time.</p>
      </div>

      <div className="space-y-4">
        <div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Start typing or paste text here..." className="w-full h-48 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-surface p-4 text-center">
              <div className="text-2xl font-bold font-mono text-accent">{value}</div>
              <div className="text-xs text-muted mt-1">{label}</div>
            </div>
          ))}
        </div>

        {stats.topChars.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-5">
            <label className="text-sm font-medium mb-3 block">Top Characters</label>
            <div className="space-y-2">
              {stats.topChars.map(([char, count]) => (
                <div key={char} className="flex items-center gap-3">
                  <span className="w-8 text-center font-mono font-bold text-accent">{char}</span>
                  <div className="flex-1 h-4 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(count / stats.characters) * 100}%` }} />
                  </div>
                  <span className="text-sm text-muted font-mono w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
