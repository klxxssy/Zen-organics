"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { lider, nav } from "@/content/site";
import { RetailerLink } from "./RetailerLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Se oculta al bajar (no tapa títulos mientras lees) y reaparece al subir
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 120 || y < lastY - 4) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      lastY = y;
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

  const visible = !hidden || open;

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-40 transition-[translate,background-color,border-color] duration-300 ease-[var(--ease-soft)] ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled || open ? "border-b border-sand bg-bone/95 backdrop-blur" : "border-b border-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#inicio" className="font-serif text-xl font-medium tracking-tight md:text-2xl">
          Zen Organics
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-charcoal/80 transition-colors hover:text-charcoal">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <RetailerLink retailer={lider} location="header" className="!min-h-10 !px-5 text-sm max-sm:!hidden">
            Comprar en Líder
          </RetailerLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Móvil" className="border-t border-sand px-5 pb-6 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-sand/70 py-4 font-serif text-xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
