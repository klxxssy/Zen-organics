"use client";

import { Menu, ShoppingBasket, X } from "lucide-react";
import { useEffect, useState } from "react";
import { lider, menu } from "@/content/zen";
import { BuyButton } from "./BuyButton";

const linkCls =
  "whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.08em] text-charcoal underline decoration-2 underline-offset-[6px] [text-decoration-color:transparent] transition-[text-decoration-color] hover:[text-decoration-color:currentColor] xl:text-sm";

/**
 * Header del mismo color que el hero (como tofoo.co.uk): links a ambos lados
 * y el logo en una "burbuja" crema que sobresale hacia abajo. Al hacer scroll se compacta.
 */
export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-gold transition-shadow duration-300 ${compact ? "shadow-[0_6px_0_-1px_rgb(0_0_0/0.12)]" : ""}`}
    >
      <div
        className={`relative mx-auto grid max-w-[90rem] grid-cols-[auto_1fr_auto] items-center px-4 transition-[height] duration-300 lg:grid-cols-[1fr_auto_1fr] lg:px-8 ${
          compact ? "h-16" : "h-20 lg:h-28"
        }`}
      >
        {/* Izquierda: menú móvil / links */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-zen"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl bg-charcoal text-cream lg:hidden"
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {menu.left.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Centro: logo en burbuja, sobresale del header */}
        <a
          href="#inicio"
          aria-label="Zen Organics, inicio"
          className={`relative z-10 mx-auto flex flex-col items-center justify-center bg-cream text-center font-display leading-[0.85] text-forest shadow-[0_6px_0_-1px_rgb(0_0_0/0.15)] transition-[width,height,font-size,translate] duration-300 [border-radius:58%_42%_55%_45%/52%_48%_52%_48%] ${
            compact
              ? "h-14 w-28 translate-y-0 text-xl"
              : "h-20 w-36 translate-y-3 text-2xl lg:h-36 lg:w-48 lg:translate-y-8 lg:text-[2.6rem]"
          }`}
        >
          <span>Zen</span>
          <span className={compact ? "text-xs" : "text-sm lg:text-xl"}>Organics</span>
        </a>

        {/* Derecha: links + comprar */}
        <div className="flex items-center justify-end gap-6 xl:gap-9">
          <nav aria-label="Principal (continuación)" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-9">
              {menu.right.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <BuyButton store={lider} location="header" look="bare" className="inline-flex size-11 items-center justify-center rounded-xl bg-charcoal text-cream transition-transform hover:-translate-y-0.5">
            <ShoppingBasket aria-hidden className="size-5" />
            <span className="sr-only">Comprar en Líder</span>
          </BuyButton>
        </div>
      </div>

      {open && (
        <nav id="menu-zen" aria-label="Menú" className="border-t-2 border-charcoal/10 bg-gold px-6 pb-8 pt-8 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...menu.left, ...menu.right].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-display text-4xl text-charcoal">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <BuyButton store={lider} location="menu_movil" size="lg" className="mt-6 w-full">
            Comprar en Líder
          </BuyButton>
        </nav>
      )}
    </header>
  );
}
