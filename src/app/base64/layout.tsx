import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Free Online Tool",
  description:
    "Encode and decode Base64 strings online for free. Real-time conversion with UTF-8 support. No sign-up required.",
  openGraph: {
    title: "Base64 Encoder & Decoder — Free Online Tool",
    description:
      "Encode and decode Base64 strings online for free. Real-time conversion.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
