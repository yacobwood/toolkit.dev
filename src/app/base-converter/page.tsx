"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

interface BaseValues {
  decimal: string;
  binary: string;
  octal: string;
  hex: string;
}

function convert(value: string, fromBase: number): BaseValues | null {
  if (!value.trim()) return null;
  try {
    const num = parseInt(value, fromBase);
    if (isNaN(num)) return null;
    return {
      decimal: num.toString(10),
      binary: num.toString(2),
      octal: num.toString(8),
      hex: num.toString(16).toUpperCase(),
    };
  } catch {
    return null;
  }
}

const bases = [
  { label: "Decimal", key: "decimal" as const, base: 10, placeholder: "e.g. 255" },
  { label: "Binary", key: "binary" as const, base: 2, placeholder: "e.g. 11111111" },
  { label: "Octal", key: "octal" as const, base: 8, placeholder: "e.g. 377" },
  { label: "Hexadecimal", key: "hex" as const, base: 16, placeholder: "e.g. FF" },
];

export default function BaseConverter() {
  const [values, setValues] = useState<BaseValues>({
    decimal: "",
    binary: "",
    octal: "",
    hex: "",
  });
  const [error, setError] = useState("");

  const handleChange = (key: keyof BaseValues, value: string, base: number) => {
    setError("");
    if (!value.trim()) {
      setValues({ decimal: "", binary: "", octal: "", hex: "" });
      return;
    }
    const result = convert(value, base);
    if (!result) {
      setError(`Invalid ${key} number`);
      setValues((prev) => ({ ...prev, [key]: value }));
      return;
    }
    setValues(result);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Number Base Converter</h1>
        <p className="text-muted">
          Convert between binary, octal, decimal, and hexadecimal. Type in any
          field to convert.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bases.map(({ label, key, base, placeholder }) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">
                {label}{" "}
                <span className="text-muted font-normal">(base {base})</span>
              </label>
              {values[key] && <CopyButton text={values[key]} />}
            </div>
            <input
              type="text"
              value={values[key]}
              onChange={(e) => handleChange(key, e.target.value, base)}
              placeholder={placeholder}
              className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
              spellCheck={false}
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm font-mono">
          {error}
        </div>
      )}
    </div>
  );
}
