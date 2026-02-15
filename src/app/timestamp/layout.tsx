import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter — Unix to Date — Free Online Tool",
  description:
    "Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds. Free, instant, no sign-up.",
  openGraph: {
    title: "Timestamp Converter — Free Online Tool",
    description: "Convert between Unix timestamps and human-readable dates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
