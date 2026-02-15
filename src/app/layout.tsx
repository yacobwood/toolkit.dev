import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ToolKit.dev — Free Developer Tools",
    template: "%s | ToolKit.dev",
  },
  description:
    "Free online developer tools: JSON formatter, Base64 encoder, regex tester, color converter, and more.",
  openGraph: {
    title: "ToolKit.dev — Free Developer Tools",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder, regex tester, color converter, and more.",
    type: "website",
    url: "https://toolkit.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolKit.dev — Free Developer Tools",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder, regex tester, color converter, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
