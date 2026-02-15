import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Base Converter — Binary Octal Decimal Hex — Free Online Tool",
  description:
    "Convert between binary, octal, decimal, and hexadecimal numbers. Free, instant, no sign-up required.",
  openGraph: {
    title: "Number Base Converter — Free Online Tool",
    description: "Convert between binary, octal, decimal, and hex. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
