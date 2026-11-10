import type { Metadata } from "next";
import { DM_Sans, Lilita_One } from "next/font/google";
import "./globals.css";

const lilita = Lilita_One({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-lilita", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Organics",
  description: "Abre el tofu y conoce la tienda.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${lilita.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
