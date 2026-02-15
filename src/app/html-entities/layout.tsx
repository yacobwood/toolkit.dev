import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder — Free Online Tool",
  description:
    "Encode and decode HTML entities online. Convert special characters to HTML entities and back. Free, instant, no sign-up.",
  openGraph: {
    title: "HTML Entity Encoder & Decoder — Free Online Tool",
    description: "Encode and decode HTML entities. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
