"use client";

import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { recipes } from "@/content/zen";
import { Photo } from "./Photo";

/** Carrusel de recetas: swipe nativo, flechas cuadradas negras y cuadraditos de posición. */
export function RecipeSlider() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (el && first) setActive(Math.round(el.scrollLeft / (first.offsetWidth + 20)));
  }, []);

  useEffect(() => {
    sync();
  }, [sync]);

  const go = (n: number) => {
    const el = track.current;
    const target = el?.children[Math.max(0, Math.min(recipes.length - 1, n))] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const arrow =
    "absolute top-[38%] z-10 hidden size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-charcoal text-cream shadow-[0_6px_0_-2px_rgb(0_0_0/0.2)] transition-transform hover:scale-105 md:inline-flex";

  return (
    <div className="relative mt-10">
      <button type="button" aria-label="Recetas anteriores" onClick={() => go(active - 1)} className={`${arrow} -left-2 lg:-left-6`}>
        <ArrowLeft aria-hidden className="size-5" />
      </button>
      <ul
        ref={track}
        onScroll={sync}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-2 text-left [scrollbar-width:none] md:mx-6 md:px-0"
      >
        {recipes.map((r) => (
          <li key={r.id} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-2.5rem)/3)]">
            <article className="group h-full overflow-hidden rounded-3xl bg-bone shadow-[8px_10px_0_-2px_rgb(0_0_0/0.18)]">
              <div className={`flex aspect-[4/3] items-center justify-center ${r.bg}`}>
                <Photo src={null} alt={r.title} ratio="1/1" label="Plato" sizes="(min-width: 1024px) 18vw, 50vw" className="w-[58%] rounded-full border-4 border-bone transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" />
              </div>
              <div className="p-5">
                <div className="flex gap-2">
                  <span className="rounded-md bg-charcoal px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-cream">{r.tag}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-cream px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide">
                    <Clock aria-hidden className="size-3" />
                    {r.time}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight">{r.title}</h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <button type="button" aria-label="Recetas siguientes" onClick={() => go(active + 1)} className={`${arrow} -right-2 lg:-right-6`}>
        <ArrowRight aria-hidden className="size-5" />
      </button>
      <div className="mt-2 flex justify-center gap-2">
        {recipes.map((r, n) => (
          <button
            key={r.id}
            type="button"
            aria-label={`Ir a la receta ${n + 1}`}
            aria-current={n === active}
            onClick={() => go(n)}
            className={`size-3.5 cursor-pointer rounded-[3px] transition-[background-color,rotate] ${n === active ? "rotate-12 bg-cream" : "bg-charcoal"}`}
          />
        ))}
      </div>
    </div>
  );
}
