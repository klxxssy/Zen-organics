import { Clock, Leaf, MapPin, Plus, Sprout, UtensilsCrossed } from "lucide-react";
import {
  allRetailers,
  benefits,
  contact,
  faqs,
  finalCta,
  lider,
  products,
  recipes,
} from "@/content/site";
import { ImageSlot } from "./ImageSlot";
import { OtherRetailersButton } from "./OtherRetailersButton";
import { RetailerLink } from "./RetailerLink";
import { Reveal } from "./Reveal";

const container = "mx-auto max-w-7xl px-5 md:px-8";
const sectionY = "py-20 md:py-28 lg:py-32";

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p
        className={`mb-5 inline-flex items-center gap-2 text-sm font-medium tracking-wide ${
          dark ? "text-bone/85" : "text-sage-deep"
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

export function Benefits() {
  return (
    <section id="beneficios" className={`relative isolate overflow-hidden bg-forest ${sectionY}`}>
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
    </section>
  );
}

export function Products() {
  return (
    <section id="productos" className={sectionY}>
      <div className={container}>
        <SectionHeading
          eyebrow="Nuestros productos"
          title="Elige tu tofu."
          text="Disponibles en Líder y otros puntos de venta."
        />
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 90} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-3xl bg-bone shadow-[0_1px_0_var(--color-sand)] ring-1 ring-sand transition-[translate,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgb(47_64_48/0.45)]">
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
    </section>
  );
}

export function Recipes() {
  return (
    <section id="recetas" className={`bg-bone ${sectionY}`}>
      <div className={container}>
        <SectionHeading
          eyebrow="Cómo prepararlo"
          title="Tres ideas rápidas para empezar."
          text="Recetas simples para el día a día."
        />
        <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
          {recipes.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 90}>
              <article className="group">
                <div className="relative">
                  <ImageSlot
                    src={r.image}
                    alt={r.title}
                    ratio="4/3"
                    label="Foto receta"
                    tone="warm"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="rounded-3xl"
                    innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
                  />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-bone px-3 py-1.5 text-sm font-medium text-charcoal shadow-sm">
                    <Clock aria-hidden className="size-4 text-sage-deep" />
                    {r.time}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl text-forest">{r.title}</h3>
                <ol className="mt-4 space-y-2 text-charcoal/75">
                  {r.steps.map((s, n) => (
                    <li key={n} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-charcoal"
                      >
                        {n + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-3xl text-forest">¿Te dieron ganas?</p>
          <RetailerLink retailer={lider} location="recetas">
            Encuéntralo en Líder
          </RetailerLink>
        </Reveal>
      </div>
    </section>
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
    <section id="preguntas" className={sectionY}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas." />
        <Reveal className="border-t border-sand">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-sand">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-6 font-serif text-xl text-forest transition-colors hover:text-sage-deep md:text-2xl">
                {f.q}
                <span
                  aria-hidden
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-forest/25 text-forest transition-[rotate,background-color,border-color] duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-charcoal"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <div className="pb-7 pr-10 text-lg leading-relaxed text-charcoal/75">
                <p>{f.a}</p>
                {"showRetailerLink" in f && f.showRetailerLink && (
                  <RetailerLink
                    retailer={lider}
                    location="faq"
                    variant="plain"
                    className="mt-4 inline-flex font-medium text-sage-deep underline underline-offset-4"
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
    </section>
  );
}

/** B: franja de puntos de venta. Logos solo con permiso confirmado; si no, nombre en texto. */
export function WhereToBuy() {
  return (
    <section id="donde-comprar" className="border-y border-sand bg-bone py-16 md:py-20">
      <div className={container}>
        <Reveal>
          <p className="mb-10 text-center text-sm font-medium tracking-wide text-sage-deep">
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
    </section>
  );
}

export function FinalCta() {
  return (
    <section
      id="cta-final"
      className="grain relative isolate overflow-hidden bg-forest py-24 text-bone md:py-36"
      data-final-cta
    >
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
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal pb-28 pt-16 text-bone lg:pb-12">
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
