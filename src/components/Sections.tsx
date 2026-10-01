import {
  ChevronDown,
  Clock,
  Dumbbell,
  Heart,
  Leaf,
  MapPin,
  Plus,
  Sparkles,
  Sprout,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  allRetailers,
  badges,
  benefits,
  contact,
  faqs,
  finalCta,
  learn,
  lider,
  products,
  recipes,
} from "@/content/site";
import { ImageSlot } from "./ImageSlot";
import { OtherRetailersButton } from "./OtherRetailersButton";
import { RetailerLink } from "./RetailerLink";
import { Reveal } from "./Reveal";

const container = "mx-auto max-w-7xl px-5 md:px-10";
const blockY = "py-16 md:py-24 lg:py-28";

type Tone = "forest" | "bone" | "tint";
const toneBg: Record<Tone, string> = { forest: "bg-forest text-bone", bone: "bg-bone", tint: "bg-sage-tint" };

/** Sección como bloque de color redondeado, separado del borde de la pantalla. */
function Block({
  id,
  tone,
  children,
  className = "",
  ...rest
}: {
  id: string;
  tone: Tone;
  children: ReactNode;
  className?: string;
} & Record<`data-${string}`, boolean | string>) {
  return (
    <section id={id} className="px-3 py-1.5 md:px-6 md:py-3" {...rest}>
      <div className={`relative isolate overflow-hidden rounded-[2rem] md:rounded-[3rem] ${toneBg[tone]} ${className}`}>
        {children}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  /** Texto claro para bloques forest */
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p
        className={`mb-5 inline-flex items-center gap-2 text-sm font-medium tracking-wide ${
          dark ? "text-bone/85" : "text-forest"
        }`}
      >
        <span aria-hidden className="h-px w-6 bg-gold" />
        {eyebrow}
        <span aria-hidden className="h-px w-6 bg-gold" />
      </p>
      <h2
        className={`font-serif text-4xl font-medium leading-tight tracking-tight text-balance md:text-6xl ${
          dark ? "text-bone" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-bone/80" : "text-charcoal/75"}`}>{text}</p>
      )}
    </Reveal>
  );
}

const benefitIcons = { leaf: Leaf, sprout: Sprout, utensils: UtensilsCrossed, mapPin: MapPin };

const badgeIcons = { dumbbell: Dumbbell, sprout: Sprout, mapPin: MapPin, leaf: Leaf, heart: Heart, sparkles: Sparkles };
const badgeTone = {
  gold: { box: "bg-gold text-charcoal", icon: "bg-charcoal/10" },
  forest: { box: "bg-forest text-bone", icon: "bg-bone/15" },
  sage: { box: "bg-sage-tint text-forest ring-2 ring-sage", icon: "bg-sage text-bone" },
  bone: { box: "bg-bone text-forest ring-1 ring-sand", icon: "bg-sage-tint" },
};
// Rotación sutil tipo sticker (no bloques inclinados)
const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2", "-rotate-[1.5deg]", "rotate-1"];

/** Fila de badges tipo sticker. Textos [PLACEHOLDER] hasta confirmarlos. */
export function StickerBadges() {
  return (
    <section aria-label="Atributos del producto" className="px-5 py-10 md:py-14">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-4 md:gap-x-5">
        {badges.map((b, i) => {
          const Icon = badgeIcons[b.icon];
          const t = badgeTone[b.tone];
          return (
            <Reveal as="li" key={b.label} delay={i * 60}>
              <span
                className={`inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold md:gap-2.5 md:py-2 md:pl-2 md:pr-5 shadow-[0_8px_18px_-10px_rgb(47_64_48/0.55)] transition-transform duration-300 hover:rotate-0 hover:scale-105 md:text-base ${t.box} ${tilts[i % tilts.length]}`}
              >
                <span className={`inline-flex size-8 items-center justify-center rounded-full ${t.icon}`}>
                  <Icon aria-hidden className="size-4" strokeWidth={2} />
                </span>
                {b.label}
              </span>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/** "Aprende a prepararlo": 3 guías con pasos desplegables. */
export function Learn() {
  return (
    <Block id="aprende" tone="tint" className={blockY}>
      <div className={container}>
        <SectionHeading eyebrow={learn.eyebrow} title={learn.title} text={learn.text} />
        <ul className="grid gap-6 md:grid-cols-3">
          {learn.cards.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 90} className="flex">
              <article className="group flex w-full flex-col rounded-3xl bg-bone p-3 shadow-[0_20px_40px_-30px_rgb(47_64_48/0.6)] transition-[translate] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5">
                <div className="relative">
                  <ImageSlot
                    src={c.image}
                    alt={c.title}
                    ratio="4/3"
                    label="Foto guía"
                    tone="warm"
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="rounded-[1.25rem]"
                    innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
                  />
                  <span className="absolute -top-2 left-4 -rotate-2 rounded-xl bg-forest px-4 py-2 font-serif text-lg text-bone shadow-md">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <h3 className="font-serif text-2xl text-forest">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal/80">{c.text}</p>
                  <details className="group/steps mt-5">
                    <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-forest px-5 text-[15px] font-semibold text-forest transition-colors hover:bg-forest hover:text-bone">
                      Ver pasos
                      <ChevronDown aria-hidden className="size-4 transition-transform duration-300 group-open/steps:rotate-180" />
                    </summary>
                    <ol className="mt-4 space-y-2 text-charcoal/80">
                      {c.steps.map((step, n) => (
                        <li key={n} className="flex gap-3 leading-relaxed">
                          <span
                            aria-hidden
                            className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-charcoal"
                          >
                            {n + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </details>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Block>
  );
}

export function Benefits() {
  return (
    <Block id="beneficios" tone="forest" className={blockY}>
      {/* Brillo cálido sutil para dar profundidad al verde */}
      <div
        aria-hidden
        className="absolute -right-[20%] -top-[30%] -z-10 size-[70vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_22%,transparent),transparent_65%)]"
      />
      <div className={container}>
        <SectionHeading dark eyebrow="Por qué Zen Organics" title="Lo esencial, bien hecho." />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = benefitIcons[b.icon];
            return (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 90}
                className="rounded-3xl border border-bone/10 bg-bone/[0.04] p-7 md:p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gold text-charcoal">
                    <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </span>
                  <span aria-hidden className="font-serif text-4xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-bone">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/80">{b.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Block>
  );
}

export function Products() {
  return (
    <Block id="productos" tone="bone" className={blockY}>
      <div className={container}>
        <SectionHeading
          eyebrow="Nuestros productos"
          title="Elige tu tofu."
          text="Disponibles en Líder y otros puntos de venta."
        />
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 90} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-3xl bg-cream ring-1 ring-sand transition-[translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgb(47_64_48/0.45)]">
                <div className="relative">
                  <ImageSlot
                    src={p.image}
                    alt={`Envase de ${p.name}`}
                    ratio="4/5"
                    label="Foto producto"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-charcoal">
                    {p.format}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="font-serif text-2xl text-forest">{p.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-charcoal/75">{p.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <RetailerLink retailer={lider} location="producto" product={p.id}>
                    Comprar en Líder
                  </RetailerLink>
                  <OtherRetailersButton product={p.id} productName={p.name} />
                </div>
              </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Block>
  );
}

// Fondo sólido de cada tarjeta de receta (la comida va encima)
const recipeBg = ["bg-gold", "bg-terracotta", "bg-sage"];

export function Recipes() {
  return (
    <Block id="recetas" tone="bone" className={blockY}>
      <div className={container}>
        <SectionHeading eyebrow="Recetas" title="Tres ideas rápidas para empezar." text="Recetas simples para el día a día." />
        <ul className="grid gap-6 md:grid-cols-3">
          {recipes.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 90} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-3xl bg-cream ring-1 ring-sand transition-[translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgb(47_64_48/0.45)]">
                {/* Comida sobre color sólido: aquí va la foto del plato recortada (PNG) */}
                <div className={`relative flex aspect-[4/3] items-center justify-center ${recipeBg[i % recipeBg.length]}`}>
                  <ImageSlot
                    src={r.image}
                    alt={r.title}
                    ratio="1/1"
                    label="Foto plato"
                    tone="warm"
                    sizes="(min-width: 768px) 22vw, 70vw"
                    className="w-[54%] rounded-full shadow-[0_24px_40px_-18px_rgb(43_43_43/0.55)] ring-4 ring-bone/70"
                    innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-110"
                  />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-bone px-3 py-1.5 text-sm font-semibold text-charcoal shadow-sm">
                    <Clock aria-hidden className="size-4 text-forest" />
                    {r.time}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-serif text-2xl text-forest">{r.title}</h3>
                  <ol className="mt-4 space-y-2 text-charcoal/80">
                    {r.steps.map((step, n) => (
                      <li key={n} className="flex gap-3 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-semibold text-bone"
                        >
                          {n + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-3xl text-forest">¿Te dieron ganas?</p>
          <RetailerLink retailer={lider} location="recetas" size="lg">
            Encuéntralo en Líder
          </RetailerLink>
        </Reveal>
      </div>
    </Block>
  );
}

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
    <Block id="preguntas" tone="tint" className={blockY}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas." />
        <Reveal className="border-t border-forest/20">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-forest/20">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-6 font-serif text-xl text-forest transition-opacity hover:opacity-80 md:text-2xl">
                {f.q}
                <span
                  aria-hidden
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-forest/25 text-forest transition-[rotate,background-color,border-color] duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-charcoal"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <div className="pb-7 pr-10 text-lg leading-relaxed text-charcoal/85">
                <p>{f.a}</p>
                {"showRetailerLink" in f && f.showRetailerLink && (
                  <RetailerLink
                    retailer={lider}
                    location="faq"
                    variant="plain"
                    className="mt-4 inline-flex font-semibold text-forest underline underline-offset-4"
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

/** B: franja de puntos de venta. Logos solo con permiso confirmado; si no, nombre en texto. */
export function WhereToBuy() {
  return (
    <Block id="donde-comprar" tone="bone" className="py-14 md:py-20">
      <div className={container}>
        <Reveal>
          <p className="mb-10 text-center text-sm font-medium tracking-wide text-forest">
            Dónde encontrarnos
          </p>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {allRetailers.map((r) => (
              <li key={r.id}>
                <RetailerLink
                  retailer={r}
                  location="donde_comprar"
                  variant="plain"
                  className="flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border border-sand bg-cream px-4 text-center transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_16px_30px_-20px_rgb(200_132_58/0.8)]"
                >
                  {r.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.logo} alt={r.name} className="max-h-10 w-auto" loading="lazy" />
                  ) : (
                    <>
                      <span className="font-serif text-lg leading-tight text-forest">{r.name}</span>
                      <span className="text-[11px] text-charcoal/60">[PLACEHOLDER] logo</span>
                    </>
                  )}
                </RetailerLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Block>
  );
}

export function FinalCta() {
  return (
    <Block id="cta-final" tone="forest" className="grain py-24 md:py-32" data-final-cta>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 size-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_30%,transparent),transparent_60%)]"
      />
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
        <h2 className="font-serif text-5xl font-medium leading-tight tracking-tight md:text-7xl">{finalCta.title}</h2>
        <p className="mt-5 text-lg text-bone/80">{finalCta.text}</p>
        <RetailerLink retailer={lider} location="cta_final" size="lg" className="mt-10 md:min-h-16 md:px-10 md:text-lg">
          {finalCta.cta}
        </RetailerLink>
      </Reveal>
    </Block>
  );
}

export function Footer() {
  return (
    <footer className="mt-3 bg-charcoal pb-28 pt-16 text-bone md:mt-6 lg:pb-12">
      <div className={`${container} grid gap-10 md:grid-cols-3`}>
        <div>
          <p className="font-serif text-2xl">Zen Organics</p>
          <p className="mt-3 max-w-xs text-bone/70">Tofu orgánico hecho en Chile.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gold">Contacto</p>
          <ul className="space-y-2 text-bone/80">
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gold">Síguenos</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contact.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${container} mt-12 border-t border-bone/15 pt-6 text-sm text-bone/60`}>
        © {new Date().getFullYear()} Zen Organics. Todos los derechos reservados.
      </div>
    </footer>
  );
}
