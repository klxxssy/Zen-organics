import { HeroCarousel } from "@/components/zen/HeroCarousel";
import { BuyBanner, Faq, Guides, Intro, Press, Range, Recipes, SiteFooter, Social, Stickers, WhereToBuy } from "@/components/zen/Sections";
import { SiteHeader } from "@/components/zen/SiteHeader";
import { StickyBuy } from "@/components/zen/StickyBuy";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroCarousel />
        <Intro />
        <Stickers />
        <Press />
        <Guides />
        <Range />
        <WhereToBuy />
        <Recipes />
        <BuyBanner />
        <Faq />
        <Social />
      </main>
      <SiteFooter />
      <StickyBuy />
    </>
  );
}
