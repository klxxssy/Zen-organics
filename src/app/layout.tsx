import type { Metadata } from "next";
import { DM_Sans, Lilita_One } from "next/font/google";
import "./globals.css";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"], variable: "--font-lilita", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Organics · Tofu orgánico hecho en Chile",
  description: "Tofu orgánico chileno. Abre el envase y conoce Zen Organics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${lilita.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
