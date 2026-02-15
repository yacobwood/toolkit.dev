import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Minifier — Free Online Tool",
  description:
    "Minify CSS by removing whitespace, comments, and unnecessary characters. Free, instant, no sign-up required.",
  openGraph: {
    title: "CSS Minifier — Free Online Tool",
    description: "Minify CSS by stripping whitespace and comments. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
