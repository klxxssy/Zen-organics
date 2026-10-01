"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { headerNav, lider, nav } from "@/content/site";
import { RetailerLink } from "./RetailerLink";

/**
 * Arriba de todo: barra verde bosque a todo el ancho, alta y con presencia.
 * Al hacer scroll: se achica y flota como cápsula redondeada con sombra.
 * Las transiciones se anulan con prefers-reduced-motion (globals.css).
 */
const leftNav = headerNav.left;
const rightNav = headerNav.right;

function NavLinks({
  items,
  compact,
  label,
  className = "",
}: {
  items: typeof nav;
  compact: boolean;
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ul className={`flex items-center transition-[gap,font-size] duration-500 ${compact ? "gap-6 text-[15px]" : "gap-5 text-base xl:gap-7 xl:text-[17px]"}`}>
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="whitespace-nowrap font-bold text-cream underline decoration-2 underline-offset-[6px] [text-decoration-color:transparent] transition-[text-decoration-color] duration-200 hover:[text-decoration-color:var(--color-gold)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

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
        {/* Desktop (xl): links a ambos lados del logo centrado, como tofoo.co.uk */}
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between transition-[height,padding] lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4 xl:gap-8 ${ease} ${
            compact ? "h-16 px-4 md:h-[4.5rem] md:px-6" : "h-20 px-5 md:px-10 lg:h-28 lg:px-6 xl:px-10"
          }`}
        >
          <NavLinks items={leftNav} compact={compact} label="Principal" className="hidden lg:flex" />

          <a
            href="#inicio"
            aria-label="Zen Organics, ir al inicio"
            className={`inline-flex items-center justify-center rounded-full bg-cream font-display leading-none text-forest shadow-[0_6px_16px_-8px_rgb(0_0_0/0.5)] transition-[font-size,padding] ${ease} ${
              compact ? "px-4 py-2 text-xl md:text-2xl" : "px-5 py-2.5 text-2xl md:text-3xl lg:px-6 lg:py-3 lg:text-[2.1rem] xl:px-7 xl:py-4 xl:text-[2.6rem]"
            }`}
          >
            Zen Organics
          </a>

          <div className="flex items-center justify-end gap-2 lg:justify-between lg:gap-4 xl:gap-6">
            <NavLinks items={rightNav} compact={compact} label="Principal (continuación)" className="hidden lg:flex" />
            <RetailerLink
              retailer={lider}
              location="header"
              className={`whitespace-nowrap max-sm:!hidden ${compact ? "!min-h-11 !px-5 !text-sm" : "lg:!px-4 lg:!text-sm xl:!min-h-14 xl:!px-7 xl:!text-base"}`}
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
