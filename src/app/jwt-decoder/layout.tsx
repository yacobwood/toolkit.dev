import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder — Free Online Tool",
  description:
    "Decode JWT tokens and inspect header, payload, signature, and expiration. Free, instant, no sign-up required.",
  openGraph: {
    title: "JWT Decoder — Free Online Tool",
    description: "Decode JWT tokens and inspect header, payload, and expiration.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
