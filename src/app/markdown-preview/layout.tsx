import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview — Free Online Tool",
  description:
    "Write markdown and see a live rendered preview side-by-side. Free, instant, no sign-up required.",
  openGraph: {
    title: "Markdown Preview — Free Online Tool",
    description: "Live markdown editor with instant rendered preview.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
