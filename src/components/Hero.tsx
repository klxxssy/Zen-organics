import { ArrowDown } from "lucide-react";
import { hero, lider } from "@/content/site";
import { HeroVisual } from "./HeroVisual";
import { ImageSlot } from "./ImageSlot";
import { MeshBackground } from "./MeshBackground";
import { RetailerLink } from "./RetailerLink";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-16 md:pt-20" data-hero>
      <MeshBackground className="-z-10" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:px-8 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:py-16">
        <div className="max-w-xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-bone/80 px-4 py-1.5 text-sm font-medium text-forest backdrop-blur-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-gold" />
            {hero.kicker}
          </p>
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.02] tracking-tight text-forest text-balance sm:text-6xl lg:text-[5.25rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/80">{hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <RetailerLink retailer={lider} location="hero" size="lg">
              {hero.cta}
            </RetailerLink>
            <a
              href="#productos"
              className="inline-flex min-h-12 items-center justify-center gap-2 text-[15px] font-medium text-charcoal underline-offset-4 hover:underline"
            >
              {hero.secondary}
              <ArrowDown aria-hidden className="size-4" />
            </a>
          </div>
        </div>

        {/* Mobile/tablet: imagen fija. Desktop: modelo 3D diferido. */}
        <div className="relative lg:hidden">
          <ImageSlot
            src={null}
            alt="Envase de tofu Zen Organics"
            ratio="1/1"
            label="Foto producto hero"
            sizes="(max-width: 1024px) 100vw, 0px"
            priority
            className="rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(47_64_48/0.45)]"
          />
        </div>
        <div className="relative hidden aspect-square w-full lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
