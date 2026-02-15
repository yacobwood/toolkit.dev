"use client";

import { useState, useMemo } from "react";
import CopyButton from "@/components/CopyButton";

interface Entry {
  pattern: string;
  description: string;
  example: string;
  category: string;
}

const ENTRIES: Entry[] = [
  // Character Classes
  { pattern: ".", description: "Any character except newline", example: "a.c → abc, aXc", category: "Character Classes" },
  { pattern: "\\d", description: "Digit (0-9)", example: "\\d+ → 123", category: "Character Classes" },
  { pattern: "\\D", description: "Non-digit", example: "\\D+ → abc", category: "Character Classes" },
  { pattern: "\\w", description: "Word character (a-z, A-Z, 0-9, _)", example: "\\w+ → hello_1", category: "Character Classes" },
  { pattern: "\\W", description: "Non-word character", example: "\\W → @, #, !", category: "Character Classes" },
  { pattern: "\\s", description: "Whitespace (space, tab, newline)", example: "a\\sb → a b", category: "Character Classes" },
  { pattern: "\\S", description: "Non-whitespace", example: "\\S+ → hello", category: "Character Classes" },
  { pattern: "[abc]", description: "Character set — matches a, b, or c", example: "[aeiou] → vowels", category: "Character Classes" },
  { pattern: "[^abc]", description: "Negated set — not a, b, or c", example: "[^0-9] → non-digits", category: "Character Classes" },
  { pattern: "[a-z]", description: "Range — any lowercase letter", example: "[A-Z] → uppercase", category: "Character Classes" },
  // Anchors
  { pattern: "^", description: "Start of string/line", example: "^Hello → Hello world", category: "Anchors" },
  { pattern: "$", description: "End of string/line", example: "world$ → Hello world", category: "Anchors" },
  { pattern: "\\b", description: "Word boundary", example: "\\bcat\\b → the cat sat", category: "Anchors" },
  { pattern: "\\B", description: "Non-word boundary", example: "\\Bcat → concatenate", category: "Anchors" },
  // Quantifiers
  { pattern: "*", description: "0 or more", example: "ab*c → ac, abc, abbc", category: "Quantifiers" },
  { pattern: "+", description: "1 or more", example: "ab+c → abc, abbc", category: "Quantifiers" },
  { pattern: "?", description: "0 or 1 (optional)", example: "colou?r → color, colour", category: "Quantifiers" },
  { pattern: "{n}", description: "Exactly n times", example: "a{3} → aaa", category: "Quantifiers" },
  { pattern: "{n,}", description: "n or more times", example: "a{2,} → aa, aaa, aaaa", category: "Quantifiers" },
  { pattern: "{n,m}", description: "Between n and m times", example: "a{2,4} → aa, aaa, aaaa", category: "Quantifiers" },
  { pattern: "*?", description: "Lazy 0 or more (non-greedy)", example: "<.*?> → first tag only", category: "Quantifiers" },
  // Groups & Lookaround
  { pattern: "(abc)", description: "Capturing group", example: "(\\d+)-(\\d+) → groups", category: "Groups & Lookaround" },
  { pattern: "(?:abc)", description: "Non-capturing group", example: "(?:ab)+ → abab", category: "Groups & Lookaround" },
  { pattern: "(?=abc)", description: "Positive lookahead", example: "\\d(?=px) → 5 in 5px", category: "Groups & Lookaround" },
  { pattern: "(?!abc)", description: "Negative lookahead", example: "\\d(?!px) → not before px", category: "Groups & Lookaround" },
  { pattern: "(?<=abc)", description: "Positive lookbehind", example: "(?<=\\$)\\d+ → after $", category: "Groups & Lookaround" },
  { pattern: "(?<!abc)", description: "Negative lookbehind", example: "(?<!\\$)\\d+ → not after $", category: "Groups & Lookaround" },
  { pattern: "\\1", description: "Backreference to group 1", example: "(\\w+)\\s\\1 → the the", category: "Groups & Lookaround" },
  // Alternation & Escapes
  { pattern: "a|b", description: "Alternation — a or b", example: "cat|dog → matches either", category: "Alternation & Escapes" },
  { pattern: "\\.", description: "Escaped dot (literal .)", example: "3\\.14 → 3.14", category: "Alternation & Escapes" },
  { pattern: "\\\\", description: "Escaped backslash", example: "C:\\\\ → C:\\", category: "Alternation & Escapes" },
  // Flags
  { pattern: "g", description: "Global — find all matches", example: "/a/g → all a's", category: "Flags" },
  { pattern: "i", description: "Case insensitive", example: "/hello/i → Hello, HELLO", category: "Flags" },
  { pattern: "m", description: "Multiline — ^ and $ per line", example: "/^start/m → each line", category: "Flags" },
  { pattern: "s", description: "Dotall — . matches newlines", example: "/a.b/s → a\\nb", category: "Flags" },
  // Common Patterns
  { pattern: "^[\\w.-]+@[\\w.-]+\\.\\w+$", description: "Email (basic)", example: "user@example.com", category: "Common Patterns" },
  { pattern: "^https?://", description: "URL (starts with http/https)", example: "https://example.com", category: "Common Patterns" },
  { pattern: "^\\d{1,3}(\\.\\d{1,3}){3}$", description: "IPv4 address", example: "192.168.1.1", category: "Common Patterns" },
  { pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$", description: "Hex color", example: "#ff5733, #abc", category: "Common Patterns" },
  { pattern: "^\\d{4}-\\d{2}-\\d{2}$", description: "Date (YYYY-MM-DD)", example: "2024-01-15", category: "Common Patterns" },
];

export default function RegexCheatSheet() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return ENTRIES;
    const q = search.toLowerCase();
    return ENTRIES.filter(
      (e) => e.pattern.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.example.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, Entry[]> = {};
    for (const e of filtered) {
      if (!groups[e.category]) groups[e.category] = [];
      groups[e.category].push(e);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Regex Cheat Sheet</h1>
        <p className="text-muted">Quick reference for regex syntax with searchable examples.</p>
      </div>

      <div className="mb-6">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patterns, descriptions, or examples..." className="w-full p-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, entries]) => (
          <div key={category}>
            <h2 className="text-lg font-bold mb-3 text-accent">{category}</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              {entries.map((e, i) => (
                <div key={i} className={`grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[120px_1fr_1fr] gap-2 px-4 py-2.5 items-center ${i > 0 ? "border-t border-border" : ""}`}>
                  <div className="flex items-center gap-1">
                    <code className="text-sm font-mono text-accent font-bold">{e.pattern}</code>
                    <CopyButton text={e.pattern} />
                  </div>
                  <span className="text-sm">{e.description}</span>
                  <span className="text-xs text-muted font-mono">{e.example}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted py-12">No entries match your search.</div>
      )}
    </div>
  );
}
