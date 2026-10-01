"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// El bundle de three.js solo se descarga cuando decidimos montar la escena
const TofuScene = dynamic(() => import("./TofuScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Solo desktop con WebGL. En mobile no se descarga nada de 3D.
    if (!window.matchMedia("(min-width: 1024px)").matches || !supportsWebGL()) return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const start = () => setLoad(true);
    // Safari no tiene requestIdleCallback: se usa un timeout como respaldo
    const hasIdle = typeof window.requestIdleCallback === "function";
    const id = hasIdle ? window.requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 1200);
    return () => {
      if (hasIdle) window.cancelIdleCallback(id as number);
      else clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Poster mientras carga (y fallback si no hay WebGL) */}
      <div
        aria-hidden
        className={`absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_40%_35%,var(--color-bone),transparent_70%)] transition-opacity duration-700 ${
          ready ? "opacity-60" : "opacity-100"
        }`}
      />
      {load && (
        <div
          aria-hidden
          className={`absolute -inset-[6%] transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <TofuScene active={inView} reducedMotion={reducedMotion} onReady={() => setReady(true)} />
        </div>
      )}
      <p className="sr-only">Modelo 3D de un bloque de tofu Zen Organics girando lentamente.</p>
    </div>
  );
}
