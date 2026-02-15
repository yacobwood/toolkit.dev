import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.slug}
      className="group block rounded-xl border border-border bg-surface p-6 hover:border-accent hover:bg-surface-hover transition-all"
    >
      <div className="text-2xl font-mono font-bold text-accent mb-3">
        {tool.icon}
      </div>
      <h2 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
        {tool.name}
      </h2>
      <p className="text-sm text-muted">{tool.description}</p>
    </Link>
  );
}
