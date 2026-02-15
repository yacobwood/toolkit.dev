import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "String Case Converter — camelCase snake_case kebab-case — Free Online Tool",
  description: "Convert between camelCase, snake_case, kebab-case, PascalCase, and more. Free, instant, no sign-up required.",
  openGraph: { title: "String Case Converter — Free Online Tool", description: "Convert between string case formats. Free and instant." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
