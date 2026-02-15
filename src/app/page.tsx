import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Free Developer <span className="text-accent">Tools</span>
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto">
          Fast, free, and private. No sign-up required. Everything runs in your
          browser.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </section>
    </div>
  );
}
