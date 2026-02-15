"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const PERMS = ["r", "w", "x"] as const;
const ROLES = ["Owner", "Group", "Others"] as const;

function octalToPerms(octal: string): boolean[][] {
  const digits = octal.padStart(3, "0").split("").map(Number);
  return digits.map((d) => [!!(d & 4), !!(d & 2), !!(d & 1)]);
}

function permsToOctal(perms: boolean[][]): string {
  return perms
    .map((role) => role.reduce((acc, p, i) => acc + (p ? [4, 2, 1][i] : 0), 0))
    .join("");
}

function permsToSymbolic(perms: boolean[][]): string {
  return perms
    .map((role) => role.map((p, i) => (p ? PERMS[i] : "-")).join(""))
    .join("");
}

export default function ChmodCalculator() {
  const [perms, setPerms] = useState<boolean[][]>([
    [true, true, false],
    [true, false, false],
    [true, false, false],
  ]);

  const octal = permsToOctal(perms);
  const symbolic = permsToSymbolic(perms);

  const togglePerm = (role: number, perm: number) => {
    const next = perms.map((r) => [...r]);
    next[role][perm] = !next[role][perm];
    setPerms(next);
  };

  const handleOctalInput = (value: string) => {
    if (/^[0-7]{0,3}$/.test(value)) {
      if (value.length === 3) {
        setPerms(octalToPerms(value));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Chmod Calculator</h1>
        <p className="text-muted">Calculate Unix file permissions — toggle checkboxes or type an octal value.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">Octal</label>
              <CopyButton text={octal} />
            </div>
            <input type="text" value={octal} onChange={(e) => handleOctalInput(e.target.value)} maxLength={3} className="w-full p-4 rounded-lg border border-border bg-background text-3xl font-mono text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">Symbolic</label>
              <CopyButton text={`-${symbolic}`} />
            </div>
            <div className="p-4 rounded-lg border border-border bg-background text-3xl font-mono text-center tracking-wider">
              -{symbolic}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="grid grid-cols-4 gap-2 text-center text-sm font-medium mb-2">
            <div></div>
            {PERMS.map((p) => (
              <div key={p} className="uppercase text-muted">{p === "r" ? "Read" : p === "w" ? "Write" : "Execute"}</div>
            ))}
          </div>
          {ROLES.map((role, ri) => (
            <div key={role} className="grid grid-cols-4 gap-2 items-center py-2">
              <div className="text-sm font-medium">{role}</div>
              {PERMS.map((p, pi) => (
                <div key={p} className="flex justify-center">
                  <button
                    onClick={() => togglePerm(ri, pi)}
                    className={`w-10 h-10 rounded-lg font-mono font-bold text-sm transition-colors ${
                      perms[ri][pi]
                        ? "bg-accent text-white"
                        : "border border-border bg-surface hover:bg-surface-hover text-muted"
                    }`}
                  >
                    {perms[ri][pi] ? p : "-"}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-3 block">Command</label>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono">chmod {octal} filename</code>
            <CopyButton text={`chmod ${octal} filename`} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-3 block">Common Permissions</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
            {[
              ["755", "rwxr-xr-x", "Directories, executables"],
              ["644", "rw-r--r--", "Regular files"],
              ["600", "rw-------", "Private files"],
              ["777", "rwxrwxrwx", "Full access (careful!)"],
              ["700", "rwx------", "Owner-only executables"],
              ["444", "r--r--r--", "Read-only for all"],
            ].map(([oct, sym, desc]) => (
              <button key={oct} onClick={() => setPerms(octalToPerms(oct))} className="flex flex-col px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors text-left">
                <span className="text-accent">{oct} ({sym})</span>
                <span className="text-muted text-xs">{desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
