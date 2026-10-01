import { ChevronDown, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { buyBanner, faqs, footerLinks, guides, intro, lider, press, social, stickers, stores } from "@/content/zen";
import { BuyButton } from "./BuyButton";
import { Photo } from "./Photo";
import { PopWords } from "./PopWords";
import { RangeGrid } from "./RangeGrid";
import { RecipeSlider } from "./RecipeSlider";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./SocialIcon";
import { Ticker } from "./Ticker";

/** Bloque de color inclinado (como las tarjetas grandes de tofoo.co.uk). El contenido va recto. */
function TiltBlock({
  id,
  color,
  tilt = -1.2,
  children,
  className = "",
}: {
  id: string;
  color: string;
  tilt?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className="relative overflow-x-clip px-4 py-10 md:px-10 md:py-16">
      <div aria-hidden className={`absolute inset-x-4 inset-y-10 rounded-[2rem] md:inset-x-10 md:inset-y-16 md:rounded-[3rem] ${color}`} style={{ rotate: `${tilt}deg` }} />
      <div className={`relative mx-auto max-w-6xl px-2 py-14 md:px-8 md:py-20 ${className}`}>{children}</div>
    </section>
  );
}

function BigTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <h2 className={`font-display text-[13vw] leading-[0.9] sm:text-6xl lg:text-7xl ${className}`}>
      <PopWords text={text} />
    </h2>
  );
}

/* ------------------------------------------------------------ Intro */

export function Intro() {
  return (
    <section id="nosotros" className="px-6 pb-8 pt-14 text-center md:pt-20">
      <Reveal className="mx-auto max-w-3xl">
        <BigTitle text={intro.title} className="text-charcoal" />
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] md:text-sm">{intro.kicker}</p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-charcoal/80">{intro.text}</p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ Stickers */

const stickerTilt = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1", "-rotate-3"];

export function Stickers() {
  return (
    <div className="py-8">
      <Ticker label="atributos" speed={50}>
        {stickers.map((s, i) => (
          <li key={s.text} className="px-3 py-4">
            <span
              className={`inline-block whitespace-nowrap border-[3px] border-bone px-5 py-3 font-display text-xl leading-none shadow-[4px_5px_0_rgb(0_0_0/0.18)] md:text-2xl ${s.bg} ${s.shape} ${stickerTilt[i % stickerTilt.length]}`}
            >
              {s.text}
            </span>
          </li>
        ))}
      </Ticker>
    </div>
  );
}

/* ------------------------------------------------------------ Prensa */

export function Press() {
  return (
    <section aria-labelledby="prensa-t" className="px-6 pb-6 pt-10 text-center">
      <Reveal>
        <h2 id="prensa-t" className="font-display text-4xl md:text-5xl">
          <PopWords text="Nos han destacado en" />
        </h2>
        {/* [PLACEHOLDER] logos de medios (con permiso) */}
        <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {press.map((p) => (
            <li key={p} className="font-display text-lg text-charcoal/55 grayscale md:text-xl">
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ Aprende */

export function Guides() {
  return (
    <TiltBlock id="aprende" color="bg-forest" tilt={-1.4} className="on-dark text-center text-cream">
      <Reveal>
        <BigTitle text={guides.title} />
        <p className="mt-4 text-base font-bold md:text-lg">{guides.text}</p>
      </Reveal>
      <ul className="mt-12 grid gap-10 text-left md:grid-cols-3 md:gap-6">
        {guides.items.map((g, i) => (
          <Reveal as="li" key={g.id} delay={i * 100}>
            <article className="relative rounded-3xl bg-bone px-5 pb-6 pt-10 text-charcoal shadow-[8px_10px_0_-2px_rgb(0_0_0/0.2)]">
              {/* Pestaña tipo etiqueta */}
              <p className="absolute -top-5 left-5 -rotate-3 rounded-xl bg-charcoal px-4 py-2 font-display text-2xl text-cream">{g.tab}</p>
              <div className="relative mx-auto w-[85%]">
                <div aria-hidden className={`absolute inset-[6%] [border-radius:42%_58%_46%_54%/55%_44%_56%_45%] ${g.blob}`} />
                <Photo src={null} alt={g.tab} ratio="1/1" label="Foto tofu" sizes="25vw" className="relative scale-90 rounded-[38%]" />
                <span className="absolute bottom-2 left-0 -rotate-6 rounded-lg bg-charcoal px-3 py-1 font-display text-lg text-cream">{g.label}</span>
              </div>
              <details className="group mt-6">
                <summary className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl bg-charcoal px-5 text-sm font-bold uppercase tracking-wide text-cream shadow-[0_6px_0_-2px_rgb(0_0_0/0.18)]">
                  {g.cta}
                  <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <ol className="mt-4 space-y-2">
                  {g.steps.map((st, n) => (
                    <li key={n} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-gold text-xs font-extrabold">
                        {n + 1}
                      </span>
                      {st}
                    </li>
                  ))}
                </ol>
              </details>
            </article>
          </Reveal>
        ))}
      </ul>
    </TiltBlock>
  );
}

/* ------------------------------------------------------------ Productos */

export function Range() {
  return (
    <TiltBlock id="productos" color="bg-sage-deep" tilt={1.2} className="on-dark text-center text-cream">
      <Reveal>
        <BigTitle text="Nuestra línea" />
      </Reveal>
      <RangeGrid />
    </TiltBlock>
  );
}

/* ------------------------------------------------------------ Dónde comprar */

function StoreTile({ s, i }: { s: (typeof stores)[number]; i: number }) {
  return (
    <li className="px-4 py-2">
      <BuyButton
        store={s}
        location="donde_comprar"
        look="bare"
        className="flex h-16 min-w-44 flex-col items-center justify-center px-4 text-center grayscale transition-[filter] hover:grayscale-0"
      >
        {s.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.logo} alt={s.name} className="max-h-10 w-auto" loading="lazy" />
        ) : (
          <>
            <span className={`whitespace-nowrap font-display text-2xl ${i % 2 ? "text-terracotta" : "text-forest"}`}>{s.name}</span>
            <span className="text-[10px] font-bold uppercase text-charcoal/60">[PLACEHOLDER] logo</span>
          </>
        )}
      </BuyButton>
    </li>
  );
}

export function WhereToBuy() {
  const row = [...stores, ...stores];
  return (
    <section id="donde-comprar" aria-label="Dónde comprar" className="space-y-2 py-10">
      <h2 className="sr-only">Dónde comprar</h2>
      <Ticker label="puntos de venta" speed={34}>
        {row.map((s, i) => (
          <StoreTile key={`a${i}`} s={s} i={i} />
        ))}
      </Ticker>
      <Ticker label="puntos de venta (segunda fila)" speed={34} reverse>
        {row.map((s, i) => (
          <StoreTile key={`b${i}`} s={s} i={i + 1} />
        ))}
      </Ticker>
    </section>
  );
}

/* ------------------------------------------------------------ Recetas */

export function Recipes() {
  return (
    <section id="recetas" className="cut-both bg-sage py-[12vw] text-charcoal [--cut:6vw] md:py-[9vw]">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-10">
        <Reveal>
          <BigTitle text="Recetas para todos" />
          <p className="mt-4 text-[19px] font-bold">Ideas simples con Zen Organics, para cualquier día.</p>
        </Reveal>
        <RecipeSlider />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Banner de compra */

export function BuyBanner() {
  return (
    <TiltBlock id="comprar" color="bg-forest" tilt={-1} className="on-dark text-cream">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <BigTitle text={buyBanner.title} />
          <p className="mt-5 max-w-md text-lg">{buyBanner.text}</p>
          <BuyButton store={lider} location="banner" look="light" size="lg" className="mt-8">
            {buyBanner.cta}
          </BuyButton>
        </Reveal>
        <Reveal delay={120} className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute inset-0 rotate-6 rounded-[2rem] bg-terracotta" />
          <Photo src={null} alt="Envase de tofu Zen Organics" ratio="4/5" label="Envase" kind="pack" sizes="30vw" className="relative -rotate-3 rounded-[2rem] border-4 border-bone" />
        </Reveal>
      </div>
    </TiltBlock>
  );
}

/* ------------------------------------------------------------ Preguntas */

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <TiltBlock id="preguntas" color="bg-terracotta" tilt={1} className="text-center">
      <Reveal>
        {/* bone sobre terracota solo en texto grande */}
        <BigTitle text="Tenemos todas las respuestas" className="mx-auto max-w-3xl text-bone" />
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 text-left">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl bg-bone shadow-[6px_7px_0_-2px_rgb(0_0_0/0.18)]">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 font-bold">
              {f.q}
              <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-charcoal text-cream transition-transform group-open:rotate-45">
                <Plus className="size-4" />
              </span>
            </summary>
            <div className="px-5 pb-5 leading-relaxed text-charcoal/85">
              <p>{f.a}</p>
              {"buy" in f && f.buy && (
                <BuyButton store={lider} location="faq" size="sm" className="mt-4">
                  Ir a Líder
                </BuyButton>
              )}
            </div>
          </details>
        ))}
      </Reveal>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </TiltBlock>
  );
}

/* ------------------------------------------------------------ Redes */

export function Social() {
  return (
    <section aria-labelledby="redes-t" className="px-6 pb-24 pt-10 text-center">
      <Reveal>
        <h2 id="redes-t" className="font-display text-5xl md:text-6xl">
          <PopWords text={social.title} />
        </h2>
        <p className="mt-3 text-base font-bold">{social.text}</p>
        <ul className="mt-6 flex justify-center gap-3">
          {social.links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="inline-flex size-12 items-center justify-center rounded-xl bg-charcoal text-cream transition-transform hover:-translate-y-1"
              >
                <SocialIcon id={l.id} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ Footer */

export function SiteFooter() {
  return (
    <footer data-final-cta className="cut-top relative overflow-hidden bg-gold pb-28 pt-[14vw] [--cut:8vw] md:pb-16 md:pt-[10vw]">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-2">
        <div>
          <a
            href="#inicio"
            className="inline-flex h-28 w-40 flex-col items-center justify-center bg-cream font-display leading-[0.85] text-forest [border-radius:58%_42%_55%_45%/52%_48%_52%_48%]"
          >
            <span className="text-4xl">Zen</span>
            <span className="text-lg">Organics</span>
          </a>
          <nav aria-label="Pie de página" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs font-extrabold uppercase tracking-[0.08em] underline-offset-4 hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mt-6 flex gap-2">
            {social.links.map((l) => (
              <li key={l.id}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="inline-flex size-10 items-center justify-center rounded-lg bg-charcoal text-cream">
                  <SocialIcon id={l.id} small />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-bold">© {new Date().getFullYear()} Zen Organics</p>
        </div>
        {/* Plato que asoma desde la esquina */}
        <div aria-hidden className="relative hidden lg:block">
          <Photo src={null} alt="" ratio="1/1" label="Plato con tofu (PNG recortado)" sizes="35vw" className="absolute -bottom-32 -right-10 w-[75%] -rotate-12 rounded-full" />
        </div>
      </div>
    </footer>
  );
}
