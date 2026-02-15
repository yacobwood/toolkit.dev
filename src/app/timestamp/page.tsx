"use client";

import { useState, useEffect } from "react";
import CopyButton from "@/components/CopyButton";

export default function TimestampConverter() {
  const [unix, setUnix] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [now, setNow] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const update = () => setNow(Math.floor(Date.now() / 1000));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const fromUnix = (value: string) => {
    setUnix(value);
    setError("");
    if (!value.trim()) {
      setDateStr("");
      return;
    }
    const num = parseInt(value);
    if (isNaN(num)) {
      setError("Invalid Unix timestamp");
      setDateStr("");
      return;
    }
    // Detect milliseconds vs seconds
    const ts = num > 1e12 ? num : num * 1000;
    const date = new Date(ts);
    if (isNaN(date.getTime())) {
      setError("Invalid timestamp value");
      setDateStr("");
      return;
    }
    setDateStr(date.toISOString());
  };

  const fromDate = (value: string) => {
    setDateStr(value);
    setError("");
    if (!value.trim()) {
      setUnix("");
      return;
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      setError("Invalid date string");
      setUnix("");
      return;
    }
    setUnix(Math.floor(date.getTime() / 1000).toString());
  };

  const useNow = () => {
    const ts = Math.floor(Date.now() / 1000);
    setUnix(ts.toString());
    setDateStr(new Date(ts * 1000).toISOString());
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
        <p className="text-muted">
          Convert between Unix timestamps and human-readable dates.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm text-muted">Current Unix Timestamp</label>
            <p className="text-2xl font-mono font-bold">{now}</p>
          </div>
          <div className="flex gap-2">
            <CopyButton text={now.toString()} />
            <button
              onClick={useNow}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              Use Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Unix Timestamp</label>
            {unix && <CopyButton text={unix} />}
          </div>
          <input
            type="text"
            value={unix}
            onChange={(e) => fromUnix(e.target.value)}
            placeholder="e.g. 1700000000"
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-muted">
            Seconds or milliseconds since epoch
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Date String (ISO 8601)</label>
            {dateStr && <CopyButton text={dateStr} />}
          </div>
          <input
            type="text"
            value={dateStr}
            onChange={(e) => fromDate(e.target.value)}
            placeholder="e.g. 2024-01-15T12:00:00.000Z"
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-muted">
            ISO 8601, RFC 2822, or any parseable date format
          </p>
        </div>
      </div>

      {dateStr && !error && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-3 block">Parsed Details</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {(() => {
              const d = new Date(dateStr);
              if (isNaN(d.getTime())) return null;
              return (
                <>
                  <div>
                    <span className="text-muted block">UTC</span>
                    <span className="font-mono">{d.toUTCString()}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Local</span>
                    <span className="font-mono">{d.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Relative</span>
                    <span className="font-mono">
                      {(() => {
                        const diff = Math.floor((Date.now() - d.getTime()) / 1000);
                        if (Math.abs(diff) < 60) return `${Math.abs(diff)}s ${diff > 0 ? "ago" : "from now"}`;
                        if (Math.abs(diff) < 3600) return `${Math.floor(Math.abs(diff) / 60)}m ${diff > 0 ? "ago" : "from now"}`;
                        if (Math.abs(diff) < 86400) return `${Math.floor(Math.abs(diff) / 3600)}h ${diff > 0 ? "ago" : "from now"}`;
                        return `${Math.floor(Math.abs(diff) / 86400)}d ${diff > 0 ? "ago" : "from now"}`;
                      })()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block">Day of Week</span>
                    <span className="font-mono">
                      {d.toLocaleDateString("en-US", { weekday: "long" })}
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">
          {error}
        </div>
      )}
    </div>
  );
}
