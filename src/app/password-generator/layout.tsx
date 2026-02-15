import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator — Free Online Tool",
  description: "Generate secure random passwords with customizable length, character sets, and strength indicator. Free, no sign-up required.",
  openGraph: { title: "Password Generator — Free Online Tool", description: "Generate secure random passwords. Free and instant." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
