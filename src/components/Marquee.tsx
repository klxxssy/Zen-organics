"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { marquee } from "@/content/site";

/** Franja en movimiento infinito. Pausa: botón, hover/foco, fuera de pantalla y reduced-motion. */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Se repite el grupo para que el loop -50% sea continuo
  const group = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: 3 }).flatMap((_, r) =>
        marquee.map((word, i) => (
          <li key={`${r}-${i}`} className="flex items-center">
            <span className="px-6 font-display text-2xl text-bone md:px-10 md:text-4xl">{word}</span>
            <span aria-hidden className="size-2 rotate-45 bg-gold md:size-2.5" />
          </li>
        )),
      )}
    </ul>
  );

  return (
    <div className="px-3 py-1.5 md:px-6 md:py-3">
    <div
      ref={ref}
      data-paused={userPaused || offscreen}
      className="marquee relative overflow-hidden rounded-[2rem] bg-forest py-6 md:rounded-[3rem] md:py-8"
    >
      <p className="sr-only">{marquee.join(" · ")}</p>
      {/* Bordes difuminados; el lado derecho deja espacio al botón de pausa */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_88%,transparent_96%)]">
        <div aria-hidden className="marquee-track flex w-max">
          {group(false)}
          {group(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setUserPaused((v) => !v)}
        aria-label={userPaused ? "Reanudar animación de la franja" : "Pausar animación de la franja"}
        className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bone/30 bg-forest text-bone transition-colors hover:border-gold hover:text-gold md:right-6"
      >
        {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      </button>
    </div>
    </div>
  );
}
