"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, lider } from "@/content/site";
import { ImageSlot } from "./ImageSlot";
import { RetailerLink } from "./RetailerLink";

const AUTOPLAY_MS = 6500;

// Color del círculo detrás de los envases en cada slide
const stageBg = { gold: "bg-gold", sage: "bg-sage", terracotta: "bg-terracotta" } as const;
// Envases levemente girados, como recién puestos sobre la mesa
const packTilt = ["-rotate-6", "rotate-3", "-rotate-2"];

/**
 * Hero en carrusel (estructura tipo tofoo.co.uk): título grande + CTA a la izquierda,
 * envases a la derecha y puntos de navegación. Autoplay con pausa (botón, hover, foco,
 * fuera de pantalla y reducir movimiento).
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = userPaused || hovering || offscreen || reduced;
  const go = useCallback((i: number) => setIndex((i + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      ref={ref}
      id="inicio"
      data-hero
      aria-roledescription="carrusel"
      aria-label="Destacados de Zen Organics"
      // pt = altura del header grande: el header nunca tapa el hero
      className="px-3 pb-1.5 pt-20 md:px-6 md:pb-3 lg:pt-28"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-forest text-cream md:rounded-[3rem]">
        <div className="relative grid min-h-[calc(100svh-6.5rem)] lg:min-h-[calc(100svh-8.5rem)]">
          {heroSlides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${heroSlides.length}`}
                aria-hidden={!active}
                inert={!active}
                className={`col-start-1 row-start-1 grid items-center gap-8 px-6 pb-24 pt-10 transition-opacity duration-700 ease-[var(--ease-soft)] md:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:px-16 lg:pb-20 ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className={`max-w-2xl transition-transform duration-700 ease-[var(--ease-soft)] ${active ? "translate-y-0" : "translate-y-6"}`}>
                  {i === 0 ? (
                    <h1 className="font-display text-[3.2rem] leading-[0.95] text-balance sm:text-7xl lg:text-[6.5rem]">{s.title}</h1>
                  ) : (
                    <h2 className="font-display text-[3.2rem] leading-[0.95] text-balance sm:text-7xl lg:text-[6.5rem]">{s.title}</h2>
                  )}
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/90 md:text-xl">{s.text}</p>
                  <RetailerLink retailer={lider} location={`hero_slide_${i + 1}`} size="lg" className="mt-9">
                    {s.cta}
                  </RetailerLink>
                </div>

                {/* Envases sobre un círculo de color (fotos: [PLACEHOLDER] packshots PNG recortados) */}
                <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:max-w-xl">
                  <div
                    aria-hidden
                    className={`absolute inset-[6%] rounded-full transition-transform duration-1000 ease-[var(--ease-soft)] ${stageBg[s.tone]} ${
                      active ? "scale-100" : "scale-75"
                    }`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2].map((k) => (
                      <ImageSlot
                        key={k}
                        src={null}
                        alt={`Envase de tofu Zen Organics ${k + 1}`}
                        ratio="3/4"
                        label="Envase"
                        sizes="(min-width: 1024px) 14vw, 30vw"
                        priority={i === 0 && k === 1}
                        className={`-mx-3 w-[34%] rounded-2xl shadow-[0_24px_40px_-18px_rgb(0_0_0/0.55)] ring-4 ring-bone/80 transition-transform duration-700 ease-[var(--ease-soft)] ${packTilt[k]} ${
                          k === 1 ? "z-10 w-[38%]" : ""
                        } ${active ? "translate-y-0" : "translate-y-8"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles: puntos + pausa */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 md:bottom-8 md:left-12 lg:left-16">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir al destacado ${i + 1}`}
              aria-current={i === index}
              className={`h-3 cursor-pointer rounded-full transition-[width,background-color] duration-300 ${
                i === index ? "w-9 bg-gold" : "w-3 bg-cream/60 hover:bg-cream"
              }`}
            />
          ))}
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={userPaused ? "Reanudar carrusel" : "Pausar carrusel"}
            className="ml-2 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-gold"
          >
            {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
