import { ArrowRight } from "lucide-react";
import { hero, lider } from "@/content/site";
import { RetailerLink } from "./RetailerLink";
import { PrismaHero } from "./ui/prisma-hero";

/** Hero: componente Prisma Hero (21st.dev) con contenido y tracking de Zen Organics. */
export function Hero() {
  return (
    <PrismaHero
      // pt = altura del header grande (80px / 112px): el header nunca tapa el hero
      className="px-3 pb-3 pt-20 md:px-6 md:pb-6 lg:pt-28"
      id="inicio"
      sectionProps={{ "data-hero": true }}
      title={hero.title}
      description={hero.subtitle}
      backgroundImage={hero.backgroundImage}
      cta={
        <RetailerLink
          retailer={lider}
          location="hero"
          variant="plain"
          className="cta-shadow group inline-flex items-center gap-2 rounded-full bg-gold py-1 pl-5 pr-1 text-sm font-semibold text-charcoal transition-all hover:gap-3 sm:text-base"
        >
          {hero.cta}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
            <ArrowRight aria-hidden className="h-4 w-4 text-cream" />
          </span>
        </RetailerLink>
      }
    />
  );
}
