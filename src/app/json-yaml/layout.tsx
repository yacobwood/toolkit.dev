import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter — Free Online Tool",
  description: "Convert between JSON and YAML formats online for free. Instant conversion, no sign-up required.",
  openGraph: { title: "JSON to YAML Converter — Free Online Tool", description: "Convert between JSON and YAML. Free and instant." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
