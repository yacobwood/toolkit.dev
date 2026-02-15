import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron Expression Parser — Free Online Tool",
  description: "Parse cron expressions, see plain English descriptions and next run times. Free, instant, no sign-up required.",
  openGraph: { title: "Cron Expression Parser — Free Online Tool", description: "Parse cron expressions with plain English descriptions." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
