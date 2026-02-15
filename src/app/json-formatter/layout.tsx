import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool",
  description:
    "Format, minify, and validate JSON online for free. Syntax highlighting, error detection, and instant results. No sign-up required.",
  openGraph: {
    title: "JSON Formatter & Validator — Free Online Tool",
    description:
      "Format, minify, and validate JSON online for free. Instant results, no sign-up.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
