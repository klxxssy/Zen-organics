import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zen Organics · Tofu orgánico hecho en Chile",
  description:
    "Tofu orgánico elaborado en Chile. Proteína vegetal simple y versátil. Encuéntralo en Líder y otros puntos de venta.",
  openGraph: {
    title: "Zen Organics · Tofu orgánico hecho en Chile",
    description: "Proteína vegetal, simple y honesta. Encuéntralo en Líder.",
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F1EA",
};

// [PLACEHOLDER] ID de Google Tag Manager en la variable NEXT_PUBLIC_GTM_ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Activa animaciones solo con JS y prepara dataLayer antes de cualquier click
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
