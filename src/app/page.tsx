import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits, Faq, FinalCta, Footer, Products, Recipes, WhereToBuy } from "@/components/Sections";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Products />
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
