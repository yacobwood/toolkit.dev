"use client";

import { useState, useMemo } from "react";

interface DiffLine {
  type: "equal" | "added" | "removed";
  text: string;
  lineNum: { left?: number; right?: number };
}

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");

  // Simple LCS-based diff
  const m = linesA.length;
  const n = linesB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = m,
    j = n;

  const stack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      stack.push({
        type: "equal",
        text: linesA[i - 1],
        lineNum: { left: i, right: j },
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({
        type: "added",
        text: linesB[j - 1],
        lineNum: { right: j },
      });
      j--;
    } else {
      stack.push({
        type: "removed",
        text: linesA[i - 1],
        lineNum: { left: i },
      });
      i--;
    }
  }

  while (stack.length) result.push(stack.pop()!);
  return result;
}

export default function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const MAX_LINES = 5000;
  const leftLineCount = left.split("\n").length;
  const rightLineCount = right.split("\n").length;
  const limitExceeded = leftLineCount > MAX_LINES || rightLineCount > MAX_LINES;

  const diff = useMemo(() => {
    if (!left && !right) return [];
    if (left.split("\n").length > MAX_LINES || right.split("\n").length > MAX_LINES) return [];
    return computeDiff(left, right);
  }, [left, right]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const unchanged = diff.filter((d) => d.type === "equal").length;
    return { added, removed, unchanged };
  }, [diff]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Text Diff</h1>
        <p className="text-muted">
          Compare two blocks of text and see the differences highlighted.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Original</label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste original text here..."
            className="w-full h-48 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Modified</label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste modified text here..."
            className="w-full h-48 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>
      </div>

      {limitExceeded && (
        <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          Input exceeds {MAX_LINES.toLocaleString()} lines. Please reduce the input size.
        </div>
      )}

      {diff.length > 0 && (
        <>
          <div className="flex gap-4 mb-4 text-sm">
            <span className="text-success">+{stats.added} added</span>
            <span className="text-error">-{stats.removed} removed</span>
            <span className="text-muted">{stats.unchanged} unchanged</span>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              {diff.map((line, i) => (
                <div
                  key={i}
                  className={`flex text-sm font-mono ${
                    line.type === "added"
                      ? "bg-success/10"
                      : line.type === "removed"
                      ? "bg-error/10"
                      : ""
                  }`}
                >
                  <span className="w-12 shrink-0 text-right pr-2 py-0.5 text-muted select-none border-r border-border text-xs leading-6">
                    {line.lineNum.left ?? ""}
                  </span>
                  <span className="w-12 shrink-0 text-right pr-2 py-0.5 text-muted select-none border-r border-border text-xs leading-6">
                    {line.lineNum.right ?? ""}
                  </span>
                  <span
                    className={`w-6 shrink-0 text-center py-0.5 font-bold leading-6 ${
                      line.type === "added"
                        ? "text-success"
                        : line.type === "removed"
                        ? "text-error"
                        : "text-muted"
                    }`}
                  >
                    {line.type === "added"
                      ? "+"
                      : line.type === "removed"
                      ? "-"
                      : " "}
                  </span>
                  <span className="py-0.5 px-2 whitespace-pre leading-6">
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
