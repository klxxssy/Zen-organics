"use client";

import { useEffect, useState } from "react";
import { lider } from "@/content/site";
import { RetailerLink } from "./RetailerLink";

/** A: barra fija en mobile. Aparece al pasar el hero y se oculta al llegar al CTA final. */
export function StickyMobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atFinal, setAtFinal] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const final = document.querySelector("[data-final-cta]");
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const finalIo = new IntersectionObserver(([e]) => setAtFinal(e.isIntersecting));
    if (hero) heroIo.observe(hero);
    if (final) finalIo.observe(final);
    return () => {
      heroIo.disconnect();
      finalIo.disconnect();
    };
  }, []);

  const visible = pastHero && !atFinal;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-bone/95 px-4 pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <RetailerLink retailer={lider} location="sticky_mobile" className="w-full">
        Comprar en Líder
      </RetailerLink>
    </div>
  );
}
