"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/CopyButton";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, options: Record<string, boolean>): string {
  let charset = "";
  if (options.uppercase) charset += CHARS.uppercase;
  if (options.lowercase) charset += CHARS.lowercase;
  if (options.numbers) charset += CHARS.numbers;
  if (options.symbols) charset += CHARS.symbols;
  if (!charset) charset = CHARS.lowercase;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

function getStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "bg-error", width: "w-1/4" };
  if (score <= 3) return { label: "Fair", color: "bg-yellow-500", width: "w-1/2" };
  if (score <= 4) return { label: "Strong", color: "bg-accent", width: "w-3/4" };
  return { label: "Very Strong", color: "bg-success", width: "w-full" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>(() => [
    generatePassword(16, { uppercase: true, lowercase: true, numbers: true, symbols: true }),
  ]);

  const generate = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generatePassword(length, options)));
  }, [length, options, count]);

  const strength = passwords[0] ? getStrength(passwords[0]) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
        <p className="text-muted">Generate secure random passwords with customizable rules.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Length: {length}</label>
            </div>
            <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full accent-accent" />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>4</span><span>64</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(options).map(([optKey, value]) => {
              const enabledCount = Object.values(options).filter(Boolean).length;
              const isLastEnabled = value && enabledCount <= 1;
              return (
                <button key={optKey} onClick={() => { if (isLastEnabled) return; setOptions((prev) => ({ ...prev, [optKey]: !prev[optKey as keyof typeof prev] })); }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${value ? "bg-accent text-white" : "border border-border bg-surface hover:bg-surface-hover"} ${isLastEnabled ? "opacity-60 cursor-not-allowed" : ""}`}>
                  {optKey}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-muted">Count:</label>
            <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-20 p-2 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent" />
            <button onClick={generate} className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
              Generate
            </button>
          </div>
        </div>

        {strength && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
              <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
            </div>
            <span className="text-sm font-medium">{strength.label}</span>
          </div>
        )}

        <div className="rounded-xl border border-border bg-surface divide-y divide-border">
          {passwords.map((pw, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-mono break-all">{pw}</span>
              <div className="ml-3 shrink-0"><CopyButton text={pw} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
