import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Online Tool",
  description:
    "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free, instant, no sign-up required.",
  openGraph: {
    title: "Lorem Ipsum Generator — Free Online Tool",
    description: "Generate lorem ipsum placeholder text. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
