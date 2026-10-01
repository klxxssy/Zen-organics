"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Fila en movimiento infinito con botón de pausa; se detiene en hover, fuera de pantalla y con reducir movimiento. */
export function Ticker({ label, speed = 40, children, reverse = false }: { label: string; speed?: number; children: ReactNode; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} role="region" aria-label={label} data-paused={paused || offscreen} className="ticker relative overflow-hidden">
      <div
        className="ticker-track flex w-max"
        style={{ "--speed": `${speed}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        <ul className="flex shrink-0 items-center">{children}</ul>
        <ul aria-hidden inert className="flex shrink-0 items-center">
          {children}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-label={paused ? `Reanudar ${label}` : `Pausar ${label}`}
        className="absolute bottom-1 right-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-lg bg-charcoal text-cream md:right-4"
      >
        {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
      </button>
    </div>
  );
}
