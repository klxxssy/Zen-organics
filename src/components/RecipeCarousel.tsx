"use client";

import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { recipes } from "@/content/site";
import { ImageSlot } from "./ImageSlot";

// Fondo sólido de cada receta (la comida va encima)
const recipeBg = ["bg-gold", "bg-terracotta", "bg-sage"];

/** Carrusel de recetas con scroll nativo (swipe en mobile), flechas y puntos. */
export function RecipeCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [overflow, setOverflow] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setOverflow(el.scrollWidth > el.clientWidth + 4);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + 24)));
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={track}
        onScroll={update}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:mx-0 md:px-0"
      >
        {recipes.map((r, i) => (
          <li key={r.id} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/3)]">
            <article className="group h-full overflow-hidden rounded-3xl bg-bone text-charcoal">
              <div className={`relative flex aspect-[4/3] items-center justify-center ${recipeBg[i % recipeBg.length]}`}>
                <ImageSlot
                  src={r.image}
                  alt={r.title}
                  ratio="1/1"
                  label="Foto plato"
                  tone="warm"
                  sizes="(min-width: 1024px) 20vw, 60vw"
                  className="w-[56%] rounded-full shadow-[0_24px_40px_-18px_rgb(43_43_43/0.55)] ring-4 ring-bone/70"
                  innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-forest px-3 py-1 text-xs font-bold text-cream">{r.tag}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sage-tint px-3 py-1 text-xs font-bold text-forest">
                    <Clock aria-hidden className="size-3.5" />
                    {r.time}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-forest">{r.title}</h3>
                <ol className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-charcoal/80">
                  {r.steps.map((step, n) => (
                    <li key={n} className="flex gap-2">
                      <span aria-hidden className="font-bold text-sage-deep">{n + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {overflow && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Receta anterior"
            onClick={() => scrollTo(Math.max(0, active - 1))}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-cream text-forest transition-colors hover:bg-gold"
          >
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          <div className="flex gap-2">
            {recipes.map((r, i) => (
              <button
                key={r.id}
                type="button"
                aria-label={`Ir a la receta ${i + 1}`}
                aria-current={i === active}
                onClick={() => scrollTo(i)}
                className={`h-2.5 cursor-pointer rounded-full transition-[width,background-color] ${i === active ? "w-7 bg-gold" : "w-2.5 bg-cream/50"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Receta siguiente"
            onClick={() => scrollTo(Math.min(recipes.length - 1, active + 1))}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-cream text-forest transition-colors hover:bg-gold"
          >
            <ArrowRight aria-hidden className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
