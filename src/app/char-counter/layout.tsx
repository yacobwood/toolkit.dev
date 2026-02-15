import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter — Word Counter — Free Online Tool",
  description: "Count characters, words, sentences, paragraphs, and estimate reading time. Free, instant, no sign-up required.",
  openGraph: { title: "Character Counter — Free Online Tool", description: "Count characters, words, and estimate reading time." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
