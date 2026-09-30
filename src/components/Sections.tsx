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

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-4 text-sm font-medium tracking-wide text-sage-deep">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{text}</p>}
    </Reveal>
  );
}

const benefitIcons = { leaf: Leaf, sprout: Sprout, utensils: UtensilsCrossed, mapPin: MapPin };

export function Benefits() {
  return (
    <section id="beneficios" className={`bg-bone ${sectionY}`}>
      <div className={container}>
        <SectionHeading eyebrow="Por qué Zen Organics" title="Lo esencial, bien hecho." />
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = benefitIcons[b.icon];
            return (
              <Reveal as="li" key={b.title} delay={i * 80} className="border-t border-sand pt-8">
                <Icon aria-hidden className="mb-6 size-7 text-sage" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/75">{b.text}</p>
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
            <Reveal
              as="li"
              key={p.id}
              delay={i * 80}
              className="flex flex-col overflow-hidden rounded-3xl border border-sand bg-bone"
            >
              <ImageSlot
                src={p.image}
                alt={`Envase de ${p.name}`}
                ratio="4/5"
                label="Foto producto"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="text-sm text-charcoal/60">{p.format}</p>
                <h3 className="mt-1 font-serif text-2xl">{p.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-charcoal/75">{p.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <RetailerLink retailer={lider} location="producto" product={p.id}>
                    Comprar en Líder
                  </RetailerLink>
                  <OtherRetailersButton product={p.id} productName={p.name} />
                </div>
              </div>
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
            <Reveal as="li" key={r.id} delay={i * 80}>
              <article>
                <ImageSlot
                  src={r.image}
                  alt={r.title}
                  ratio="4/3"
                  label="Foto receta"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="rounded-2xl"
                />
                <div className="mt-6 flex items-center gap-2 text-sm text-sage-deep">
                  <Clock aria-hidden className="size-4" />
                  <span>{r.time}</span>
                </div>
                <h3 className="mt-2 font-serif text-2xl">{r.title}</h3>
                <ol className="mt-4 space-y-2 text-charcoal/75">
                  {r.steps.map((s, n) => (
                    <li key={n} className="flex gap-3 leading-relaxed">
                      <span className="font-serif text-sage">{n + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-2xl">¿Te dieron ganas?</p>
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
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-6 font-serif text-xl md:text-2xl">
                {f.q}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-sage-deep transition-transform duration-300 group-open:rotate-45"
                />
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
                  className="flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border border-sand px-4 text-center transition-colors hover:border-sage-deep"
                >
                  {r.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.logo} alt={r.name} className="max-h-10 w-auto" loading="lazy" />
                  ) : (
                    <>
                      <span className="font-serif text-lg leading-tight">{r.name}</span>
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
    <section id="cta-final" className="bg-charcoal py-24 text-bone md:py-32" data-final-cta>
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
        <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">{finalCta.title}</h2>
        <p className="mt-5 text-lg text-bone/75">{finalCta.text}</p>
        <RetailerLink retailer={lider} location="cta_final" size="lg" variant="inverse" className="mt-10">
          {finalCta.cta}
        </RetailerLink>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-bone pb-28 pt-16 lg:pb-12">
      <div className={`${container} grid gap-10 md:grid-cols-3`}>
        <div>
          <p className="font-serif text-2xl">Zen Organics</p>
          <p className="mt-3 max-w-xs text-charcoal/70">Tofu orgánico hecho en Chile.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-sage-deep">Contacto</p>
          <ul className="space-y-2 text-charcoal/80">
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-sage-deep">Síguenos</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contact.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/80 underline-offset-4 hover:text-charcoal hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${container} mt-12 border-t border-sand pt-6 text-sm text-charcoal/60`}>
        © {new Date().getFullYear()} Zen Organics. Todos los derechos reservados.
      </div>
    </footer>
  );
}
