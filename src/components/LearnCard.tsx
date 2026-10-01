import { ChevronDown } from "lucide-react";
import type { learn } from "@/content/site";
import { ImageSlot } from "./ImageSlot";

type Card = (typeof learn.cards)[number];

/** Tarjeta de guía: etiqueta tipo sticker, foto, texto y pasos desplegables. */
export function LearnCard({ card }: { card: Card }) {
  return (
    <article className="group flex w-full flex-col rounded-3xl bg-bone p-3 text-charcoal shadow-[0_24px_40px_-30px_rgb(43_43_43/0.7)] transition-[translate] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5">
      <div className="relative">
        <ImageSlot
          src={card.image}
          alt={card.title}
          ratio="4/3"
          label="Foto guía"
          tone="warm"
          sizes="(min-width: 768px) 30vw, 100vw"
          className="rounded-[1.25rem]"
          innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
        />
        <span className="absolute -top-3 left-4 -rotate-3 rounded-xl bg-forest px-4 py-2 font-display text-xl text-cream shadow-md">
          {card.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
        <h3 className="font-display text-2xl text-forest">{card.title}</h3>
        <p className="mt-2 leading-relaxed text-charcoal/80">{card.text}</p>
        <details className="group/steps mt-5">
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-forest px-5 text-[15px] font-bold text-cream transition-colors hover:bg-sage-deep">
            Ver pasos
            <ChevronDown aria-hidden className="size-4 transition-transform duration-300 group-open/steps:rotate-180" />
          </summary>
          <ol className="mt-4 space-y-2 text-charcoal/85">
            {card.steps.map((step, n) => (
              <li key={n} className="flex gap-3 leading-relaxed">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal"
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
  );
}
