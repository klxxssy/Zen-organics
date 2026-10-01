import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Benefits,
  Faq,
  FinalCta,
  Footer,
  Learn,
  Products,
  Recipes,
  StickerBadges,
  WhereToBuy,
} from "@/components/Sections";
import { Marquee } from "@/components/Marquee";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StickerBadges />
        <Benefits />
        <Learn />
        <Products />
        <Marquee />
        <Recipes />
        <Faq />
        <WhereToBuy />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
