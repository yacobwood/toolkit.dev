import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator — Free Online Tool",
  description:
    "Generate random v4 UUIDs online for free. Bulk generation, uppercase, and no-dash options. No sign-up required.",
  openGraph: {
    title: "UUID Generator — Free Online Tool",
    description: "Generate random v4 UUIDs online. Bulk generation supported. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
