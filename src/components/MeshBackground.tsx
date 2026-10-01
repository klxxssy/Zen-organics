"use client";

import { useEffect, useRef } from "react";

/** Gradiente mesh animado en CSS (crema, salvia, dorado) con grano. Se pausa fuera de pantalla. */
export function MeshBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.paused = String(!e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={`grain pointer-events-none absolute inset-0 overflow-hidden bg-cream ${className}`}>
      <div
        className="mesh-blob mesh-blob--sage -left-[20%] -top-[25%] size-[90vmax] lg:size-[70vmax]"
        style={{ "--blob-anim": "drift-a", "--blob-dur": "28s" } as React.CSSProperties}
      />
      <div
        className="mesh-blob mesh-blob--gold -bottom-[35%] -right-[25%] size-[85vmax] lg:size-[65vmax]"
        style={{ "--blob-anim": "drift-b", "--blob-dur": "24s" } as React.CSSProperties}
      />
      {/* Tercer blob solo en desktop: mobile queda más liviano */}
      <div
        className="mesh-blob mesh-blob--bone left-[30%] top-[10%] hidden size-[45vmax] lg:block"
        style={{ "--blob-anim": "drift-c", "--blob-dur": "32s" } as React.CSSProperties}
      />
      <div
        className="mesh-blob mesh-blob--gold -left-[10%] bottom-[-30%] hidden size-[40vmax] opacity-60 lg:block"
        style={{ "--blob-anim": "drift-a", "--blob-dur": "36s" } as React.CSSProperties}
      />
    </div>
  );
}
