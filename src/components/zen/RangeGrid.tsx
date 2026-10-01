"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import { lider, otherStores, productTypes, products, type Product } from "@/content/zen";
import { BuyButton } from "./BuyButton";
import { Photo } from "./Photo";

const cardTilt = ["-rotate-2", "rotate-1", "-rotate-1"];

/** Filtros tipo chip + tarjetas de producto (como "Our range" de tofoo.co.uk). */
export function RangeGrid() {
  const [type, setType] = useState(productTypes[0]);
  const [picked, setPicked] = useState<Product | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const list = type === productTypes[0] ? products : products.filter((p) => p.type === type);

  const openStores = (p: Product) => {
    setPicked(p);
    dialog.current?.showModal();
  };

  return (
    <>
      <div role="group" aria-label="Filtrar por tipo" className="mt-8 flex flex-wrap justify-center gap-2">
        {productTypes.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={type === t}
            onClick={() => setType(t)}
            className={`min-h-10 cursor-pointer rounded-full border-2 px-4 text-xs font-extrabold uppercase tracking-wide transition-colors ${
              type === t ? "border-charcoal bg-charcoal text-cream" : "border-cream text-cream hover:bg-cream/15"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-3 md:gap-8">
        {list.map((p, i) => (
          <li key={p.id} className={`transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] ${cardTilt[i % cardTilt.length]}`}>
            <article className="rounded-2xl bg-bone p-3 text-charcoal shadow-[8px_10px_0_-2px_rgb(0_0_0/0.2)]">
              <Photo src={p.image} alt={`Envase de ${p.name}`} ratio="1/1" label="Producto" kind="pack" sizes="(min-width: 768px) 25vw, 45vw" className="rounded-xl" />
              <h3 className="mt-3 font-display text-lg leading-tight md:text-xl">{p.name}</h3>
              <p className="text-xs font-bold text-charcoal/70">{p.format}</p>
              <div className="mt-3 flex flex-col gap-2">
                <BuyButton store={lider} location="producto" product={p.id} size="sm">
                  Comprar
                </BuyButton>
                <button type="button" onClick={() => openStores(p)} className="min-h-10 cursor-pointer text-xs font-bold underline underline-offset-4">
                  Otros puntos de venta
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <BuyButton store={lider} location="productos_cta" size="lg" className="mt-12">
        Comprar en Líder
      </BuyButton>

      <dialog
        ref={dialog}
        aria-labelledby="otros-t"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(92vw,26rem)] rounded-3xl bg-bone p-6 text-left text-charcoal"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="otros-t" className="font-display text-2xl">
            {picked?.name ?? "Puntos de venta"}
          </h3>
          <button type="button" aria-label="Cerrar" onClick={() => dialog.current?.close()} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg bg-charcoal text-cream">
            <X aria-hidden className="size-4" />
          </button>
        </div>
        <ul className="mt-5 flex flex-col gap-2">
          {otherStores.map((s) => (
            <li key={s.id}>
              <BuyButton store={s} location="otros_puntos" product={picked?.id} size="md" className="w-full">
                {s.name}
              </BuyButton>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
