"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { tools } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          ToolKit<span className="text-accent">.dev</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle tools menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" />
                ) : (
                  <path d="M3 5h14M3 10h14M3 15h14" />
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[480px] rounded-xl border border-border bg-surface shadow-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[70vh] overflow-y-auto">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.slug}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-md bg-accent-light text-accent text-xs font-mono font-bold shrink-0">
                      {tool.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {tool.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
