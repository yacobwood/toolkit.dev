import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff Checker — Free Online Tool",
  description:
    "Compare two blocks of text and see differences highlighted line-by-line. Free, instant, no sign-up required.",
  openGraph: {
    title: "Text Diff Checker — Free Online Tool",
    description: "Compare two texts and highlight the differences. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
