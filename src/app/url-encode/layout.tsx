import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder — Free Online Tool",
  description:
    "Encode and decode URL strings online for free. Real-time conversion with full Unicode support. No sign-up required.",
  openGraph: {
    title: "URL Encoder & Decoder — Free Online Tool",
    description: "Encode and decode URL strings online for free. Real-time conversion.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
