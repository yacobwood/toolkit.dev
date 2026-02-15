import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator — SHA-1 SHA-256 SHA-512 — Free Online Tool",
  description:
    "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text online for free. Instant results, no sign-up required.",
  openGraph: {
    title: "Hash Generator — Free Online Tool",
    description: "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
