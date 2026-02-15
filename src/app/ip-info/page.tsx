"use client";

import { useState, useEffect } from "react";
import CopyButton from "@/components/CopyButton";

interface BrowserInfo {
  userAgent: string;
  platform: string;
  language: string;
  languages: string;
  cookiesEnabled: string;
  onLine: string;
  screenResolution: string;
  windowSize: string;
  colorDepth: string;
  timezone: string;
  timezoneOffset: string;
}

export default function IpInfo() {
  const [info, setInfo] = useState<BrowserInfo | null>(null);

  useEffect(() => {
    setInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages.join(", "),
      cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
      onLine: navigator.onLine ? "Yes" : "No",
      screenResolution: `${screen.width} x ${screen.height}`,
      windowSize: `${window.innerWidth} x ${window.innerHeight}`,
      colorDepth: `${screen.colorDepth}-bit`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: `UTC${new Date().getTimezoneOffset() > 0 ? "-" : "+"}${Math.abs(new Date().getTimezoneOffset() / 60)}`,
    });
  }, []);

  const fields = info
    ? [
        { label: "User Agent", value: info.userAgent },
        { label: "Platform", value: info.platform },
        { label: "Language", value: info.language },
        { label: "All Languages", value: info.languages },
        { label: "Cookies Enabled", value: info.cookiesEnabled },
        { label: "Online", value: info.onLine },
        { label: "Screen Resolution", value: info.screenResolution },
        { label: "Window Size", value: info.windowSize },
        { label: "Color Depth", value: info.colorDepth },
        { label: "Timezone", value: info.timezone },
        { label: "UTC Offset", value: info.timezoneOffset },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browser & Device Info</h1>
        <p className="text-muted">View your user agent, screen info, timezone, and browser details.</p>
      </div>

      {info ? (
        <div className="space-y-3">
          {fields.map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-xs text-muted block">{label}</span>
                <span className="text-sm font-mono break-all">{value}</span>
              </div>
              <div className="shrink-0"><CopyButton text={value} /></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted py-20">Loading...</div>
      )}
    </div>
  );
}
