import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiger Tear Reveal",
  description: "A poster that rips in two as you scroll.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
