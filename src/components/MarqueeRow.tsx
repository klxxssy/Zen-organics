"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fila en movimiento infinito (stickers, puntos de venta, etc.).
 * Se pausa con el botón, con hover/foco, fuera de pantalla y con reducir movimiento (globals.css).
 */
export function MarqueeRow({
  label,
  children,
  duration = 40,
  className = "",
  buttonClassName = "bg-cream text-forest",
}: {
  /** Texto para lectores de pantalla y para el botón de pausa */
  label: string;
  children: ReactNode;
  /** Segundos por vuelta */
  duration?: number;
  className?: string;
  buttonClassName?: string;
}) {
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

  return (
    <div
      ref={ref}
      data-paused={userPaused || offscreen}
      aria-label={label}
      role="region"
      className={`marquee relative overflow-hidden ${className}`}
    >
      <div className="[mask-image:linear-gradient(to_right,transparent,black_5%,black_90%,transparent)]">
        <div className="marquee-track flex w-max" style={{ animationDuration: `${duration}s` }}>
          <ul className="flex shrink-0 items-center">{children}</ul>
          <ul aria-hidden className="flex shrink-0 items-center" inert>
            {children}
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setUserPaused((v) => !v)}
        aria-label={userPaused ? `Reanudar ${label}` : `Pausar ${label}`}
        className={`absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow-sm md:right-4 ${buttonClassName}`}
      >
        {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      </button>
    </div>
  );
}
