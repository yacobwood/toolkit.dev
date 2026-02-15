import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter — HEX RGB HSL — Free Online Tool",
  description:
    "Convert colors between HEX, RGB, and HSL formats with a visual color picker. Free, instant, no sign-up.",
  openGraph: {
    title: "Color Converter — HEX RGB HSL — Free Online Tool",
    description:
      "Convert colors between HEX, RGB, and HSL with a visual picker. Free and instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
