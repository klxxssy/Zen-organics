"use client";

import { useEffect, useState } from "react";
import { lider } from "@/content/zen";
import { BuyButton } from "./BuyButton";

/** Botón de compra fijo en mobile: aparece al pasar el hero y se oculta en el footer. */
export function StickyBuy() {
  const [afterHero, setAfterHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const foot = document.querySelector("[data-final-cta]");
    const a = new IntersectionObserver(([e]) => setAfterHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const b = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting));
    if (hero) a.observe(hero);
    if (foot) b.observe(foot);
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, []);

  const show = afterHero && !atFooter;
  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 lg:hidden ${show ? "translate-y-0" : "translate-y-[150%]"}`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <BuyButton store={lider} location="sticky_mobile" size="lg" className="w-full">
        Comprar en Líder
      </BuyButton>
    </div>
  );
}
