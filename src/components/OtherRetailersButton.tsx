"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import { otherRetailers } from "@/content/site";
import { RetailerLink } from "./RetailerLink";

export function OtherRetailersButton({ product, productName }: { product: string; productName: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-charcoal px-6 text-[15px] font-semibold transition-colors duration-200 hover:bg-charcoal hover:text-bone"
      >
        Otros puntos de venta
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={`dlg-${product}`}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(92vw,28rem)] rounded-3xl bg-bone p-0 text-charcoal"
      >
        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-sage-deep">Puntos de venta</p>
              <h3 id={`dlg-${product}`} className="mt-1 font-serif text-2xl">
                {productName}
              </h3>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => dialog.current?.close()}
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cream"
            >
              <X className="size-5" />
            </button>
          </div>
          <ul className="mt-6 flex flex-col gap-3">
            {otherRetailers.map((r) => (
              <li key={r.id}>
                <RetailerLink retailer={r} location="otros_puntos" product={product} variant="secondary" className="w-full">
                  {r.name}
                </RetailerLink>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
