"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeJWT(token: string): DecodedJWT {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT: expected 3 parts separated by dots");
  }

  const decodeBase64Url = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    return atob(base64);
  };

  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));
  const signature = parts[2];

  return { header, payload, signature };
}

function formatTimestamp(value: unknown): string | null {
  if (typeof value !== "number") return null;
  // Heuristic: if it looks like a Unix timestamp (after year 2000, before 2100)
  if (value > 946684800 && value < 4102444800) {
    return new Date(value * 1000).toUTCString();
  }
  return null;
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState("");

  const decode = (value: string) => {
    setInput(value);
    setError("");
    setDecoded(null);
    if (!value.trim()) return;

    try {
      setDecoded(decodeJWT(value));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const timeFields = ["exp", "iat", "nbf", "auth_time"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">JWT Decoder</h1>
        <p className="text-muted">
          Paste a JWT token to decode its header, payload, and check expiration.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">JWT Token</label>
          <textarea
            value={input}
            onChange={(e) => decode(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-28 p-4 rounded-lg border border-border bg-surface text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent break-all"
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">
            {error}
          </div>
        )}

        {decoded && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Header</label>
                <CopyButton
                  text={JSON.stringify(decoded.header, null, 2)}
                />
              </div>
              <pre className="text-sm font-mono text-muted whitespace-pre-wrap break-all">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Payload</label>
                <CopyButton
                  text={JSON.stringify(decoded.payload, null, 2)}
                />
              </div>
              <pre className="text-sm font-mono text-muted whitespace-pre-wrap break-all">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>

            {Object.entries(decoded.payload)
              .filter(
                ([key, val]) =>
                  timeFields.includes(key) && formatTimestamp(val)
              )
              .length > 0 && (
              <div className="lg:col-span-2 rounded-xl border border-border bg-surface p-5">
                <label className="text-sm font-medium mb-3 block">
                  Timestamps
                </label>
                <div className="space-y-2">
                  {Object.entries(decoded.payload)
                    .filter(([key]) => timeFields.includes(key))
                    .map(([key, val]) => {
                      const formatted = formatTimestamp(val);
                      if (!formatted) return null;
                      const isExpired =
                        key === "exp" &&
                        typeof val === "number" &&
                        val * 1000 < Date.now();
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="font-mono font-medium">{key}</span>
                          <span className="text-muted">
                            {formatted}
                            {key === "exp" && (
                              <span
                                className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                                  isExpired
                                    ? "bg-error/10 text-error"
                                    : "bg-success/10 text-success"
                                }`}
                              >
                                {isExpired ? "Expired" : "Valid"}
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            <div className="lg:col-span-2 rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Signature</label>
                <CopyButton text={decoded.signature} />
              </div>
              <p className="text-sm font-mono text-muted break-all">
                {decoded.signature}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
