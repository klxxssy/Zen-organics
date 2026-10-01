"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { lider, nav } from "@/content/site";
import { RetailerLink } from "./RetailerLink";

/**
 * Arriba de todo: barra verde bosque a todo el ancho, alta y con presencia.
 * Al hacer scroll: se achica y flota como cápsula redondeada con sombra.
 * Las transiciones se anulan con prefers-reduced-motion (globals.css).
 */
export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setCompact(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ease = "duration-500 ease-[var(--ease-soft)]";

  return (
    <header
      className={`header-forest fixed inset-x-0 top-0 z-40 transition-[padding] ${ease} ${
        compact ? "px-3 pt-3 md:px-6 md:pt-4" : "px-0 pt-0"
      }`}
    >
      <div
        className={`mx-auto bg-forest text-cream transition-[max-width,border-radius,box-shadow] ${ease} ${
          compact
            ? "max-w-6xl rounded-[1.75rem] shadow-[0_18px_40px_-18px_rgb(31_42_32/0.65)]"
            : "max-w-full rounded-none shadow-none"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between transition-[height,padding] ${ease} ${
            compact ? "h-16 px-4 md:h-[4.5rem] md:px-6" : "h-20 px-5 md:px-10 lg:h-28"
          }`}
        >
          <a
            href="#inicio"
            className={`font-display leading-none transition-[font-size] ${ease} ${
              compact ? "text-2xl md:text-[1.75rem]" : "text-[1.9rem] md:text-4xl lg:text-[2.75rem]"
            }`}
          >
            Zen Organics
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul
              className={`flex items-center transition-[gap,font-size] ${ease} ${
                compact ? "gap-8 text-base" : "gap-12 text-lg"
              }`}
            >
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-semibold text-cream underline decoration-2 underline-offset-[6px] [text-decoration-color:transparent] transition-[text-decoration-color] duration-200 hover:[text-decoration-color:var(--color-gold)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <RetailerLink
              retailer={lider}
              location="header"
              className={`max-sm:!hidden ${compact ? "!min-h-11 !px-5 !text-sm" : "lg:!min-h-14 lg:!px-7 lg:!text-base"}`}
            >
              Comprar en Líder
            </RetailerLink>
            <button
              type="button"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="menu-movil" aria-label="Móvil" className="px-5 pb-6 lg:hidden">
            <ul className="flex flex-col border-t border-cream/15">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-cream/15 py-4 font-display text-2xl text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <RetailerLink retailer={lider} location="menu_movil" className="mt-6 w-full">
              Comprar en Líder
            </RetailerLink>
          </nav>
        )}
      </div>
    </header>
  );
}
