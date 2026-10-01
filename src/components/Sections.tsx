import { Dumbbell, Heart, Leaf, MapPin, Plus, Sparkles, Sprout } from "lucide-react";
import type { ReactNode } from "react";
import {
  allRetailers,
  badges,
  contact,
  faqs,
  finalCta,
  intro,
  learn,
  lider,
  nav,
  press,
  social,
} from "@/content/site";
import { ImageSlot } from "./ImageSlot";
import { LearnCard } from "./LearnCard";
import { MarqueeRow } from "./MarqueeRow";
import { ProductRange } from "./ProductRange";
import { RecipeCarousel } from "./RecipeCarousel";
import { RetailerLink } from "./RetailerLink";
import { Reveal } from "./Reveal";
import { Words } from "./Words";

const container = "mx-auto max-w-7xl px-5 md:px-10";
const blockY = "py-16 md:py-24";

type Tone = "forest" | "tint" | "gold" | "terracotta";
const toneBg: Record<Tone, string> = {
  forest: "bg-forest text-cream",
  tint: "bg-sage-tint text-forest",
  gold: "bg-gold text-charcoal",
  terracotta: "bg-terracotta text-bone",
};

/** Sección como bloque de color redondeado, separado del borde de la pantalla. */
function Block({ id, tone, children, className = "" }: { id: string; tone: Tone; children: ReactNode; className?: string }) {
  return (
    <section id={id} className="px-3 py-1.5 md:px-6 md:py-3">
      <div className={`relative isolate overflow-hidden rounded-[2rem] md:rounded-[3rem] ${toneBg[tone]} ${className}`}>
        {children}
      </div>
    </section>
  );
}

/** Título de sección grande en Lilita One, animado palabra por palabra. */
function SectionTitle({ title, text }: { title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <h2 className="font-display text-[2.6rem] leading-[1.02] text-balance md:text-6xl lg:text-7xl">
        <Words text={title} />
      </h2>
      {text && <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-relaxed">{text}</p>}
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Intro */

export function Intro() {
  return (
    <section id="nosotros" className="px-5 pb-10 pt-20 text-center md:pt-28">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="font-display text-5xl leading-none text-forest md:text-7xl">
          <Words text={intro.title} />
        </h2>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-forest md:text-sm">{intro.kicker}</p>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/80">{intro.text}</p>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- Stickers */

const badgeIcons = { dumbbell: Dumbbell, sprout: Sprout, mapPin: MapPin, leaf: Leaf, heart: Heart, sparkles: Sparkles };
const badgeTone = {
  gold: { box: "bg-gold text-charcoal", icon: "bg-charcoal/10" },
  forest: { box: "bg-forest text-bone", icon: "bg-bone/15" },
  sage: { box: "bg-sage-tint text-forest ring-2 ring-sage", icon: "bg-sage text-bone" },
  bone: { box: "bg-bone text-forest ring-1 ring-sand", icon: "bg-sage-tint" },
};
const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2", "-rotate-[1.5deg]", "rotate-1"];

/** Fila de stickers en movimiento (textos [PLACEHOLDER] hasta confirmarlos con la empresa). */
export function StickerRow() {
  return (
    <MarqueeRow label="atributos del producto" duration={45} className="py-4" buttonClassName="bg-forest text-cream">
      {badges.map((b, i) => {
        const Icon = badgeIcons[b.icon];
        const t = badgeTone[b.tone];
        return (
          <li key={b.label} className="px-3 py-3">
            <span
              className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl py-2 pl-2 pr-5 text-base font-bold shadow-[0_8px_18px_-10px_rgb(47_64_48/0.55)] ${t.box} ${tilts[i % tilts.length]}`}
            >
              <span className={`inline-flex size-9 items-center justify-center rounded-xl ${t.icon}`}>
                <Icon aria-hidden className="size-5" strokeWidth={2} />
              </span>
              {b.label}
            </span>
          </li>
        );
      })}
    </MarqueeRow>
  );
}

/* ---------------------------------------------------------------- Prensa */

export function Press() {
  return (
    <section aria-labelledby="prensa" className="px-5 pb-16 pt-12 md:pb-20">
      <Reveal className="mx-auto max-w-6xl text-center">
        <h2 id="prensa" className="font-display text-4xl text-forest md:text-5xl">
          {press.title}
        </h2>
        {/* [PLACEHOLDER] reemplazar por logos de medios (con permiso) */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {press.items.map((m) => (
            <li key={m} className="font-display text-lg text-charcoal/60 md:text-xl">
              {m}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- Aprende */

export function Learn() {
  return (
    <Block id="aprende" tone="gold" className={blockY}>
      <div className={container}>
        <SectionTitle title={learn.eyebrow} text={learn.text} />
        <ul className="grid gap-6 md:grid-cols-3">
          {learn.cards.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 90} className="flex">
              <LearnCard card={c} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Block>
  );
}

/* ---------------------------------------------------------------- Productos */

export function Products() {
  return (
    <Block id="productos" tone="tint" className={blockY}>
      <div className={container}>
        <SectionTitle title="Nuestra línea" text="Disponible en Líder y otros puntos de venta." />
        <ProductRange />
      </div>
    </Block>
  );
}

/* ---------------------------------------------------------------- Dónde comprar */

/** Puntos de venta en movimiento. Logos solo con permiso; si no, el nombre en texto. */
export function WhereToBuy() {
  return (
    <section id="donde-comprar" aria-labelledby="donde-comprar-titulo" className="py-12 md:py-16">
      <h2 id="donde-comprar-titulo" className="mb-6 text-center font-display text-4xl text-forest md:text-5xl">
        Encuéntranos en
      </h2>
      <MarqueeRow label="puntos de venta" duration={35} buttonClassName="bg-forest text-cream">
        {[...allRetailers, ...allRetailers].map((r, i) => (
          <li key={`${r.id}-${i}`} className="px-3 py-2">
            <RetailerLink
              retailer={r}
              location="donde_comprar"
              variant="plain"
              className="flex h-20 min-w-52 flex-col items-center justify-center rounded-2xl border border-sand bg-bone px-6 text-center transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-gold"
            >
              {r.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.logo} alt={r.name} className="max-h-10 w-auto" loading="lazy" />
              ) : (
                <>
                  <span className="whitespace-nowrap font-display text-xl text-forest">{r.name}</span>
                  <span className="text-[11px] text-charcoal/60">[PLACEHOLDER] logo</span>
                </>
              )}
            </RetailerLink>
          </li>
        ))}
      </MarqueeRow>
    </section>
  );
}

/* ---------------------------------------------------------------- Recetas */

export function Recipes() {
  return (
    <Block id="recetas" tone="forest" className={blockY}>
      <div className={container}>
        <SectionTitle title="Recetas para todos los días" text="Ideas simples para cocinar con Zen Organics." />
        <RecipeCarousel />
      </div>
    </Block>
  );
}

/* ---------------------------------------------------------------- Preguntas */

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Block id="preguntas" tone="terracotta" className={blockY}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        {/* bone sobre terracotta (4:1) solo en el título grande; preguntas y respuestas van sobre bone */}
        <SectionTitle title="Resolvemos tus dudas" />
        <Reveal className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-bone text-charcoal shadow-[0_10px_24px_-18px_rgb(0_0_0/0.6)]">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 px-6 py-4 text-lg font-bold text-forest">
                {f.q}
                <span
                  aria-hidden
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-cream transition-[rotate,background-color] duration-300 group-open:rotate-45 group-open:bg-gold group-open:text-charcoal"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-base leading-relaxed text-charcoal/85">
                <p>{f.a}</p>
                {"showRetailerLink" in f && f.showRetailerLink && (
                  <RetailerLink
                    retailer={lider}
                    location="faq"
                    variant="plain"
                    className="mt-3 inline-flex font-bold text-forest underline underline-offset-4"
                  >
                    Ir a Líder
                  </RetailerLink>
                )}
              </div>
            </details>
          ))}
        </Reveal>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Block>
  );
}

/* ---------------------------------------------------------------- Redes */

export function Social() {
  return (
    <section aria-labelledby="redes" className="px-5 py-20 text-center md:py-24">
      <Reveal>
        <h2 id="redes" className="font-display text-5xl text-forest md:text-6xl">
          <Words text={social.title} />
        </h2>
        <p className="mt-3 text-lg text-charcoal/75">{social.text}</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {contact.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-full bg-forest px-6 font-bold text-cream transition-[translate,background-color] duration-200 hover:-translate-y-0.5 hover:bg-sage-deep"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

export function Footer() {
  return (
    <footer className="px-3 pb-24 md:px-6 md:pb-6" data-final-cta>
      <div className="grain relative isolate grid gap-10 overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-cream md:rounded-[3rem] md:px-12 lg:grid-cols-[1.2fr_1fr] lg:px-16 lg:py-16">
        <div>
          <p className="font-display text-5xl leading-none md:text-7xl">Zen Organics</p>
          <p className="mt-4 max-w-sm text-lg text-cream/80">{finalCta.text}</p>
          <RetailerLink retailer={lider} location="footer" size="lg" className="mt-8">
            {finalCta.cta}
          </RetailerLink>

          <nav aria-label="Pie de página" className="mt-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="underline-offset-4 hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 space-y-1 text-sm text-cream/75">
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p className="pt-3 text-cream/60">© {new Date().getFullYear()} Zen Organics. Todos los derechos reservados.</p>
          </div>
        </div>

        {/* Plato que asoma desde la esquina como cierre */}
        <div aria-hidden className="relative hidden lg:block">
          <ImageSlot
            src={null}
            alt=""
            ratio="1/1"
            label="Foto plato (PNG recortado)"
            tone="warm"
            sizes="40vw"
            className="absolute -bottom-28 -right-20 w-[110%] rounded-full ring-8 ring-cream/10"
          />
        </div>
      </div>
    </footer>
  );
}
