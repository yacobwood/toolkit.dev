"use client";

import { useState, useMemo } from "react";

interface Shortcut {
  keys: string;
  action: string;
  category: string;
  app: string;
}

const SHORTCUTS: Shortcut[] = [
  // Mac General
  { keys: "Cmd + C", action: "Copy", category: "Basics", app: "Mac" },
  { keys: "Cmd + V", action: "Paste", category: "Basics", app: "Mac" },
  { keys: "Cmd + X", action: "Cut", category: "Basics", app: "Mac" },
  { keys: "Cmd + Z", action: "Undo", category: "Basics", app: "Mac" },
  { keys: "Cmd + Shift + Z", action: "Redo", category: "Basics", app: "Mac" },
  { keys: "Cmd + A", action: "Select all", category: "Basics", app: "Mac" },
  { keys: "Cmd + F", action: "Find", category: "Basics", app: "Mac" },
  { keys: "Cmd + S", action: "Save", category: "Basics", app: "Mac" },
  { keys: "Cmd + W", action: "Close window/tab", category: "Basics", app: "Mac" },
  { keys: "Cmd + Q", action: "Quit application", category: "Basics", app: "Mac" },
  { keys: "Cmd + Tab", action: "Switch applications", category: "Navigation", app: "Mac" },
  { keys: "Cmd + Space", action: "Spotlight search", category: "Navigation", app: "Mac" },
  { keys: "Cmd + ,", action: "Open preferences", category: "Navigation", app: "Mac" },
  { keys: "Ctrl + Cmd + F", action: "Toggle fullscreen", category: "Navigation", app: "Mac" },
  { keys: "Cmd + Shift + 3", action: "Screenshot (full)", category: "Screenshots", app: "Mac" },
  { keys: "Cmd + Shift + 4", action: "Screenshot (selection)", category: "Screenshots", app: "Mac" },
  { keys: "Cmd + Shift + 5", action: "Screenshot toolbar", category: "Screenshots", app: "Mac" },
  // VS Code
  { keys: "Cmd + P", action: "Quick open file", category: "Files", app: "VS Code" },
  { keys: "Cmd + Shift + P", action: "Command palette", category: "Files", app: "VS Code" },
  { keys: "Cmd + B", action: "Toggle sidebar", category: "View", app: "VS Code" },
  { keys: "Cmd + J", action: "Toggle terminal", category: "View", app: "VS Code" },
  { keys: "Cmd + \\", action: "Split editor", category: "View", app: "VS Code" },
  { keys: "Cmd + D", action: "Select next occurrence", category: "Editing", app: "VS Code" },
  { keys: "Cmd + Shift + L", action: "Select all occurrences", category: "Editing", app: "VS Code" },
  { keys: "Alt + Up/Down", action: "Move line up/down", category: "Editing", app: "VS Code" },
  { keys: "Cmd + Shift + K", action: "Delete line", category: "Editing", app: "VS Code" },
  { keys: "Cmd + /", action: "Toggle comment", category: "Editing", app: "VS Code" },
  { keys: "Cmd + Shift + F", action: "Search across files", category: "Search", app: "VS Code" },
  { keys: "F12", action: "Go to definition", category: "Navigation", app: "VS Code" },
  { keys: "Cmd + Click", action: "Go to definition", category: "Navigation", app: "VS Code" },
  { keys: "Ctrl + -", action: "Navigate back", category: "Navigation", app: "VS Code" },
  { keys: "Cmd + Shift + E", action: "Explorer panel", category: "Panels", app: "VS Code" },
  { keys: "Cmd + Shift + G", action: "Source control", category: "Panels", app: "VS Code" },
  { keys: "Cmd + Shift + X", action: "Extensions", category: "Panels", app: "VS Code" },
  // Chrome
  { keys: "Cmd + T", action: "New tab", category: "Tabs", app: "Chrome" },
  { keys: "Cmd + Shift + T", action: "Reopen closed tab", category: "Tabs", app: "Chrome" },
  { keys: "Cmd + L", action: "Focus address bar", category: "Navigation", app: "Chrome" },
  { keys: "Cmd + R", action: "Reload page", category: "Navigation", app: "Chrome" },
  { keys: "Cmd + Shift + R", action: "Hard reload", category: "Navigation", app: "Chrome" },
  { keys: "Cmd + Option + I", action: "Open DevTools", category: "Developer", app: "Chrome" },
  { keys: "Cmd + Option + J", action: "Open Console", category: "Developer", app: "Chrome" },
  { keys: "Cmd + Shift + C", action: "Inspect element", category: "Developer", app: "Chrome" },
  { keys: "Cmd + [", action: "Back", category: "Navigation", app: "Chrome" },
  { keys: "Cmd + ]", action: "Forward", category: "Navigation", app: "Chrome" },
  { keys: "Cmd + 1-9", action: "Switch to tab #", category: "Tabs", app: "Chrome" },
  // Terminal
  { keys: "Ctrl + C", action: "Cancel / kill process", category: "Process", app: "Terminal" },
  { keys: "Ctrl + Z", action: "Suspend process", category: "Process", app: "Terminal" },
  { keys: "Ctrl + D", action: "EOF / exit shell", category: "Process", app: "Terminal" },
  { keys: "Ctrl + L", action: "Clear screen", category: "Navigation", app: "Terminal" },
  { keys: "Ctrl + R", action: "Reverse search history", category: "History", app: "Terminal" },
  { keys: "Ctrl + A", action: "Go to beginning of line", category: "Cursor", app: "Terminal" },
  { keys: "Ctrl + E", action: "Go to end of line", category: "Cursor", app: "Terminal" },
  { keys: "Ctrl + W", action: "Delete word before cursor", category: "Editing", app: "Terminal" },
  { keys: "Ctrl + U", action: "Delete line before cursor", category: "Editing", app: "Terminal" },
];

const APPS = ["Mac", "VS Code", "Chrome", "Terminal"];

export default function KeyboardShortcuts() {
  const [search, setSearch] = useState("");
  const [activeApp, setActiveApp] = useState("Mac");

  const filtered = useMemo(() => {
    let results = SHORTCUTS.filter((s) => s.app === activeApp);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) => s.keys.toLowerCase().includes(q) || s.action.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      );
    }
    return results;
  }, [search, activeApp]);

  const grouped = useMemo(() => {
    const groups: Record<string, Shortcut[]> = {};
    for (const s of filtered) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Keyboard Shortcuts</h1>
        <p className="text-muted">Common keyboard shortcuts for Mac, VS Code, Chrome, and Terminal.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {APPS.map((app) => (
          <button key={app} onClick={() => setActiveApp(app)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeApp === app ? "bg-accent text-white" : "border border-border bg-surface hover:bg-surface-hover"}`}>
            {app}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shortcuts..." className="w-full p-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, shortcuts]) => (
          <div key={category}>
            <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">{category}</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              {shortcuts.map((s, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
                  <span className="text-sm">{s.action}</span>
                  <kbd className="px-2.5 py-1 rounded-md bg-surface-hover border border-border text-xs font-mono font-medium">{s.keys}</kbd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted py-12">No shortcuts match your search.</div>
      )}
    </div>
  );
}
