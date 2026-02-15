import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Base64 Converter — Free Online Tool",
  description: "Convert images to Base64 data URIs for embedding in HTML, CSS, or code. Drag, drop, or paste. Free, no sign-up required.",
  openGraph: { title: "Image to Base64 Converter — Free Online Tool", description: "Convert images to Base64 data URIs. Free and instant." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
