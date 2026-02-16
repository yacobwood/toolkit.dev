"use client";

import { useState, useMemo } from "react";

interface Match {
  value: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const matches: Match[] = useMemo(() => {
    if (!pattern || !testString) {
      setError("");
      return [];
    }
    if (testString.length > 100_000) {
      setError("Test string too long (max 100,000 characters)");
      return [];
    }
    try {
      const regex = new RegExp(pattern, flags);
      setError("");
      const results: Match[] = [];

      if (flags.includes("g")) {
        let match;
        let iterations = 0;
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (!match[0]) regex.lastIndex++;
          if (++iterations >= 10_000) {
            setError("Stopped after 10,000 matches (limit reached)");
            break;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }
      return results;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testString || matches.length === 0) return null;

    const parts: { text: string; highlight: boolean }[] = [];
    let lastIndex = 0;

    for (const match of matches) {
      if (match.index > lastIndex) {
        parts.push({
          text: testString.slice(lastIndex, match.index),
          highlight: false,
        });
      }
      parts.push({ text: match.value, highlight: true });
      lastIndex = match.index + match.value.length;
    }

    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), highlight: false });
    }

    return parts;
  }, [pattern, testString, matches]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Regex Tester</h1>
        <p className="text-muted">
          Test regular expressions with live matching and group highlighting.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Regular Expression
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center rounded-lg border border-border bg-surface focus-within:ring-2 focus-within:ring-accent">
              <span className="pl-3 text-muted font-mono text-sm">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 p-3 bg-transparent text-sm focus:outline-none"
                spellCheck={false}
              />
              <span className="pr-3 text-muted font-mono text-sm">
                /{flags}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {["g", "i", "m", "s"].map((flag) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`w-9 h-9 text-sm font-mono font-medium rounded-lg transition-colors ${
                flags.includes(flag)
                  ? "bg-accent text-white"
                  : "border border-border bg-surface hover:bg-surface-hover"
              }`}
            >
              {flag}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-40 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent font-mono"
            spellCheck={false}
          />
        </div>

        {highlightedText && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Match Highlighting
            </label>
            <div className="p-4 rounded-lg border border-border bg-surface font-mono text-sm whitespace-pre-wrap break-all">
              {highlightedText.map((part, i) =>
                part.highlight ? (
                  <mark
                    key={i}
                    className="bg-accent-light text-accent rounded px-0.5"
                  >
                    {part.text}
                  </mark>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </div>
          </div>
        )}

        {matches.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Matches ({matches.length})
            </label>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-hover text-left">
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Match</th>
                    <th className="px-4 py-2 font-medium">Index</th>
                    <th className="px-4 py-2 font-medium">Groups</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-2 text-muted">{i + 1}</td>
                      <td className="px-4 py-2 font-mono">{match.value}</td>
                      <td className="px-4 py-2 text-muted">{match.index}</td>
                      <td className="px-4 py-2 font-mono text-muted">
                        {match.groups.length > 0
                          ? match.groups.join(", ")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
