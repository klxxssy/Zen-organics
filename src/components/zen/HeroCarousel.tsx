"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { lider, slides } from "@/content/zen";
import { BuyButton } from "./BuyButton";
import { Photo } from "./Photo";
import { PopWords } from "./PopWords";

const AUTOPLAY = 6000;
// Envases escalonados y girados como en una vitrina
const packs = [
  { cls: "left-[2%] top-[14%] w-[34%] -rotate-6 z-10", delay: "0ms" },
  { cls: "left-[33%] top-[4%] w-[36%] rotate-2 z-20", delay: "90ms" },
  { cls: "left-[64%] top-[22%] w-[34%] rotate-6 z-10", delay: "180ms" },
];

/** Hero tipo cartel: dorado a todo el ancho, corte diagonal abajo y carrusel con pausa. */
export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false); // hover / foco / fuera de pantalla / reducir movimiento
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setPaused(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHold(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || hold) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), AUTOPLAY);
    return () => clearTimeout(t);
  }, [i, paused, hold]);

  return (
    <section
      ref={ref}
      id="inicio"
      data-hero
      aria-roledescription="carrusel"
      aria-label="Destacados"
      className="cut-bottom relative -mt-px overflow-x-clip bg-gold pb-[10vw] [--cut:9vw] lg:pb-[7vw] lg:[--cut:7vw]"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <div className="mx-auto grid max-w-[90rem] px-5 pt-14 lg:px-12 lg:pt-20">
        {slides.map((s, n) => {
          const on = n === i;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${n + 1} de ${slides.length}`}
              aria-hidden={!on}
              inert={!on}
              className={`col-start-1 row-start-1 grid items-center gap-6 transition-opacity duration-500 lg:grid-cols-[1.05fr_1fr] ${
                on ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div>
                {n === 0 ? (
                  <h1 className="font-display text-[19vw] leading-[0.82] text-charcoal sm:text-[14vw] lg:text-[9.5vw] xl:text-[8.5rem]">
                    <PopWords text={s.title} auto={on} />
                  </h1>
                ) : (
                  <h2 className="font-display text-[19vw] leading-[0.82] text-charcoal sm:text-[14vw] lg:text-[9.5vw] xl:text-[8.5rem]">
                    <PopWords text={s.title} auto={on} />
                  </h2>
                )}
                <p className="mt-5 max-w-sm text-lg font-bold text-charcoal md:text-xl">{s.text}</p>
                <BuyButton store={lider} location={`hero_${n + 1}`} size="lg" className="mt-8">
                  {s.cta}
                </BuyButton>
              </div>

              {/* [PLACEHOLDER] packshots recortados (PNG) */}
              <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
                {packs.map((p, k) => (
                  <div
                    key={k}
                    className={`absolute ${p.cls} transition-[translate,opacity] duration-700 ease-[var(--ease-out-soft)] ${on ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}
                    style={{ transitionDelay: p.delay }}
                  >
                    <Photo
                      src={null}
                      alt={`Envase de tofu Zen Organics ${k + 1}`}
                      ratio="3/4"
                      label="Envase"
                      kind="pack"
                      sizes="(min-width: 1024px) 16vw, 32vw"
                      priority={n === 0 && k === 1}
                      className="rounded-xl border-4 border-charcoal/10 shadow-[10px_14px_0_-2px_rgb(0_0_0/0.18)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Navegación: cuadraditos + pausa */}
        <div className="mt-8 flex items-center gap-3 lg:mt-4">
          {slides.map((s, n) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Ver destacado ${n + 1}`}
              aria-current={n === i}
              className={`size-4 cursor-pointer rounded-[4px] transition-[background-color,rotate] ${n === i ? "rotate-12 bg-cream" : "bg-charcoal hover:bg-charcoal/70"}`}
            />
          ))}
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
            className="ml-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border-2 border-charcoal text-charcoal"
          >
            {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
