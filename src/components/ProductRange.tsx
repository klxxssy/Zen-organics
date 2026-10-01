"use client";

import { useState } from "react";
import { lider, productCategories, products } from "@/content/site";
import { ImageSlot } from "./ImageSlot";
import { OtherRetailersButton } from "./OtherRetailersButton";
import { RetailerLink } from "./RetailerLink";

/** Línea de productos con filtros tipo chip (como "Our range" de tofoo.co.uk). */
export function ProductRange() {
  const [filter, setFilter] = useState(productCategories[0]);
  const shown = filter === productCategories[0] ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filtrar productos" className="mb-10 flex flex-wrap justify-center gap-2">
        {productCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`min-h-11 cursor-pointer rounded-full border-2 px-5 text-sm font-bold transition-colors ${
              filter === c ? "border-forest bg-forest text-cream" : "border-forest/40 text-forest hover:border-forest"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.id} className="flex">
            <article className="group flex w-full flex-col overflow-hidden rounded-3xl bg-bone text-charcoal shadow-[0_24px_40px_-30px_rgb(47_64_48/0.7)] transition-[translate] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2">
              <div className="relative p-3">
                <ImageSlot
                  src={p.image}
                  alt={`Envase de ${p.name}`}
                  ratio="1/1"
                  label="Foto producto"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="rounded-[1.25rem]"
                  innerClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
                />
                <span className="absolute left-6 top-6 rotate-[-3deg] rounded-full bg-gold px-3 py-1 text-xs font-bold text-charcoal">
                  {p.format}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
                <h3 className="font-display text-2xl text-forest">{p.name}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-charcoal/80">{p.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <RetailerLink retailer={lider} location="producto" product={p.id}>
                    Comprar en Líder
                  </RetailerLink>
                  <OtherRetailersButton product={p.id} productName={p.name} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
