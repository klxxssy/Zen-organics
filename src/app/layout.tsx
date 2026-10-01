import type { Metadata, Viewport } from "next";
import { DM_Sans, Lilita_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const lilita = Lilita_One({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-lilita", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Organics · Tofu orgánico hecho en Chile",
  description: "Tofu orgánico hecho en Chile. Encuéntralo en Líder y otros puntos de venta.",
  openGraph: { title: "Zen Organics", description: "Tofu orgánico hecho en Chile.", locale: "es_CL", type: "website" },
};

export const viewport: Viewport = { themeColor: "#C8843A" };

// [PLACEHOLDER] ID de Google Tag Manager en NEXT_PUBLIC_GTM_ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${lilita.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');window.dataLayer=window.dataLayer||[];",
          }}
        />
      </head>
      <body>
        {children}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
