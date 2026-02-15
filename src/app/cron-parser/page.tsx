"use client";

import { useState, useMemo } from "react";

const FIELD_NAMES = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"];
const FIELD_RANGES: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function describeField(field: string, index: number): string {
  if (field === "*") return `every ${FIELD_NAMES[index].toLowerCase()}`;
  if (field.includes("/")) {
    const [, step] = field.split("/");
    return `every ${step} ${FIELD_NAMES[index].toLowerCase()}(s)`;
  }
  if (field.includes(",")) {
    const parts = field.split(",").map((p) => formatFieldValue(p.trim(), index));
    return parts.join(", ");
  }
  if (field.includes("-")) {
    const [start, end] = field.split("-");
    return `${formatFieldValue(start, index)} through ${formatFieldValue(end, index)}`;
  }
  return `at ${FIELD_NAMES[index].toLowerCase()} ${formatFieldValue(field, index)}`;
}

function formatFieldValue(val: string, index: number): string {
  const num = parseInt(val);
  if (isNaN(num)) return val;
  if (index === 3) return MONTH_NAMES[num] || val;
  if (index === 4) return DAY_NAMES[num] || val;
  return val;
}

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid: expected 5 fields (minute hour day month weekday)";

  const descs: string[] = [];
  const [min, hour, dom, month, dow] = parts;

  // Time description
  if (min === "*" && hour === "*") {
    descs.push("Every minute");
  } else if (min !== "*" && hour === "*") {
    descs.push(`At minute ${min} of every hour`);
  } else if (min === "*" && hour !== "*") {
    descs.push(`Every minute during hour ${hour}`);
  } else {
    descs.push(`At ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`);
  }

  if (dom !== "*") descs.push(`on day ${dom} of the month`);
  if (month !== "*") descs.push(`in ${describeField(month, 3)}`);
  if (dow !== "*") descs.push(`on ${describeField(dow, 4)}`);

  return descs.join(", ");
}

function getNextRuns(expr: string, count: number): Date[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const runs: Date[] = [];
  const now = new Date();
  const check = new Date(now);
  check.setSeconds(0, 0);
  check.setMinutes(check.getMinutes() + 1);

  const maxIterations = 525600; // 1 year of minutes
  for (let i = 0; i < maxIterations && runs.length < count; i++) {
    if (matchesCron(check, parts)) {
      runs.push(new Date(check));
    }
    check.setMinutes(check.getMinutes() + 1);
  }

  return runs;
}

function matchesCron(date: Date, parts: string[]): boolean {
  const values = [date.getMinutes(), date.getHours(), date.getDate(), date.getMonth() + 1, date.getDay()];
  return parts.every((part, i) => matchesField(part, values[i], FIELD_RANGES[i]));
}

function matchesField(field: string, value: number, [min, max]: [number, number]): boolean {
  if (field === "*") return true;
  if (field.includes("/")) {
    const [base, step] = field.split("/");
    const start = base === "*" ? min : parseInt(base);
    const s = parseInt(step);
    for (let v = start; v <= max; v += s) {
      if (v === value) return true;
    }
    return false;
  }
  if (field.includes(",")) {
    return field.split(",").some((p) => matchesField(p.trim(), value, [min, max]));
  }
  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number);
    return value >= start && value <= end;
  }
  return parseInt(field) === value;
}

export default function CronParser() {
  const [expr, setExpr] = useState("*/15 * * * *");

  const description = useMemo(() => describeCron(expr), [expr]);
  const nextRuns = useMemo(() => getNextRuns(expr, 5), [expr]);
  const parts = expr.trim().split(/\s+/);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cron Expression Parser</h1>
        <p className="text-muted">Parse cron expressions and see next run times in plain English.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Cron Expression</label>
          <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="*/15 * * * *" className="w-full p-4 rounded-lg border border-border bg-surface text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-accent" spellCheck={false} />
        </div>

        {parts.length === 5 && (
          <div className="grid grid-cols-5 gap-2">
            {parts.map((part, i) => (
              <div key={i} className="rounded-lg border border-border bg-surface p-3 text-center">
                <div className="text-lg font-mono font-bold text-accent">{part}</div>
                <div className="text-xs text-muted mt-1">{FIELD_NAMES[i]}</div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-2 block">Plain English</label>
          <p className="text-lg">{description}</p>
        </div>

        {nextRuns.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-5">
            <label className="text-sm font-medium mb-3 block">Next 5 Runs</label>
            <div className="space-y-2">
              {nextRuns.map((date, i) => (
                <div key={i} className="flex items-center justify-between text-sm font-mono">
                  <span className="text-muted">{i + 1}.</span>
                  <span>{date.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-border bg-surface p-5">
          <label className="text-sm font-medium mb-3 block">Quick Reference</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-mono">
            {[
              ["* * * * *", "Every minute"],
              ["0 * * * *", "Every hour"],
              ["0 0 * * *", "Every day at midnight"],
              ["0 0 * * 0", "Every Sunday at midnight"],
              ["*/5 * * * *", "Every 5 minutes"],
              ["0 9-17 * * 1-5", "Hourly, 9-5, weekdays"],
            ].map(([cron, desc]) => (
              <button key={cron} onClick={() => setExpr(cron)} className="flex justify-between px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors text-left">
                <span className="text-accent">{cron}</span>
                <span className="text-muted">{desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
