import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chmod Calculator — Unix File Permissions — Free Online Tool",
  description: "Calculate Unix file permissions with an interactive chmod calculator. Convert between octal and symbolic notation. Free, no sign-up.",
  openGraph: { title: "Chmod Calculator — Free Online Tool", description: "Interactive Unix file permissions calculator." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
