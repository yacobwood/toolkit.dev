import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester — Free Online Tool",
  description:
    "Test regular expressions online with live matching, group highlighting, and flag toggles. Free, instant, no sign-up.",
  openGraph: {
    title: "Regex Tester — Free Online Tool",
    description:
      "Test regex patterns with live matching and group highlighting. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
