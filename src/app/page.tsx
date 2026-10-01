import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import {
  Faq,
  Footer,
  Intro,
  Learn,
  Press,
  Products,
  Recipes,
  Social,
  StickerRow,
  WhereToBuy,
} from "@/components/Sections";
import { StickyMobileCta } from "@/components/StickyMobileCta";

// Estructura inspirada en tofoo.co.uk, con la identidad de Zen Organics
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <Intro />
        <StickerRow />
        <Press />
        <Learn />
        <Products />
        <WhereToBuy />
        <Recipes />
        <Faq />
        <Social />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
