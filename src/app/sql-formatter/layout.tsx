import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQL Formatter — Free Online Tool",
  description: "Format and prettify SQL queries online for free. Keyword uppercasing and smart indentation. No sign-up required.",
  openGraph: { title: "SQL Formatter — Free Online Tool", description: "Format and prettify SQL queries. Free and instant." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
