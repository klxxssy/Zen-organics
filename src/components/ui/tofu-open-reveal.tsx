"use client";

import * as React from "react";
import { reveal, tienda } from "@/content/tienda";
import { trackTienda } from "@/lib/track";

/**
 * Tofu Open Reveal: un bloque de tofu que se abre al hacer scroll y deja salir
 * la información de la tienda.
 *
 * Etapas (una sola variable `p` de 0 a 1):
 *  - antes de empezar: el tofu "respira" y se inclina un poco hacia el puntero;
 *  - grieta: una fisura recorre la cara de arriba y el frente, con un pequeño temblor;
 *  - apertura: el bloque se parte en dos mitades que giran hacia afuera y sueltan migas;
 *  - tarjeta: desde el centro sube la tarjeta con los datos de la tienda.
 *
 * `p` no salta con el scroll: persigue al scroll con velocidad máxima, así que aunque
 * bajes rápido la animación se ve completa (~1.3 s). Al subir, el tofu se vuelve a cerrar.
 * Todo es SVG generado con números: sin imágenes ni librerías.
 */

type Pt = [number, number];

// ------------------------------------------------------------------ utilidades

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOutBack = (t: number) => {
  const c = 1.4;
  const u = clamp01(t) - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
};
const path = (pts: Pt[], close = true) => "M" + pts.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + (close ? "Z" : "");

function scrollProgress(top: number, height: number, viewport: number) {
  const range = height - viewport;
  if (range <= 0) return top <= 0 ? 1 : 0;
  return clamp01(-top / range);
}

/** Una sola variable de progreso maneja todas las etapas. */
function stages(p: number) {
  return {
    intro: 1 - smooth(0.02, 0.22, p), // título y pista se van
    crack: smooth(0.04, 0.22, p), // la grieta recorre el bloque
    shake: smooth(0.14, 0.2, p) * (1 - smooth(0.22, 0.3, p)), // temblor al romperse
    open: smooth(0.2, 0.7, p), // las mitades se separan
    crumbs: smooth(0.2, 0.62, p), // migas que caen
    card: smooth(0.42, 0.86, p), // la tarjeta sube
  };
}

// ------------------------------------------------------------------ geometría

const VIEW = "0 0 1000 720";
// Pantallas verticales (celular): encuadre más cerrado para que el tofu se vea grande
const VIEW_TALL = "190 170 700 560";
// Bloque en perspectiva: frente, cara de arriba y lado derecho
const FRONT: Pt[] = [
  [260, 360],
  [740, 360],
  [740, 565],
  [260, 565],
];
const TOP: Pt[] = [
  [260, 360],
  [350, 278],
  [830, 278],
  [740, 360],
];
const SIDE: Pt[] = [
  [740, 360],
  [830, 278],
  [830, 482],
  [740, 565],
];
const PIVOT: Pt = [500, 565];

/** La grieta: cruza la cara de arriba en diagonal y baja por el frente, con bordes irregulares. */
function crackLine(): Pt[] {
  const r = rng(17);
  const out: Pt[] = [];
  const a: Pt = [590, 278];
  const b: Pt = [500, 360];
  const c: Pt = [500, 565];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const w = i === 0 || i === 10 ? 0 : (r() - 0.5) * 12;
    out.push([a[0] + (b[0] - a[0]) * t + w * 0.7, a[1] + (b[1] - a[1]) * t + w * 0.7]);
  }
  for (let i = 1; i <= 20; i++) {
    const t = i / 20;
    const w = i === 20 ? 0 : (r() - 0.5) * 14 + Math.sin(i * 1.3) * 4;
    out.push([b[0] + w, b[1] + (c[1] - b[1]) * t]);
  }
  return out;
}

/** Poros del tofu: puntitos más oscuros repartidos en cada cara. */
function buildPores(seed: number, face: Pt[], n: number) {
  const r = rng(seed);
  const [p0, p1, , p3] = face;
  const out: { x: number; y: number; rx: number; ry: number; o: number }[] = [];
  for (let i = 0; i < n; i++) {
    const u = 0.06 + r() * 0.88;
    const v = 0.08 + r() * 0.84;
    // punto dentro del paralelogramo p0 + u*(p1-p0) + v*(p3-p0)
    const x = p0[0] + u * (p1[0] - p0[0]) + v * (p3[0] - p0[0]);
    const y = p0[1] + u * (p1[1] - p0[1]) + v * (p3[1] - p0[1]);
    out.push({ x, y, rx: 1.4 + r() * 3.2, ry: 1 + r() * 2.2, o: 0.18 + r() * 0.3 });
  }
  return out;
}

type Crumb = { x: number; y: number; vx: number; vy: number; r: number; side: -1 | 1; spin: number };
function buildCrumbs(line: Pt[]): Crumb[] {
  const r = rng(43);
  return Array.from({ length: 22 }, (_, i) => {
    const [x, y] = line[Math.floor(r() * line.length)];
    const side: -1 | 1 = i % 2 ? 1 : -1;
    return { x, y, vx: side * (40 + r() * 140), vy: -(40 + r() * 120), r: 3 + r() * 6, side, spin: (r() - 0.5) * 2 };
  });
}

// ------------------------------------------------------------------ bloque

const Block = React.memo(function Block({ id }: { id: string }) {
  const pores = React.useMemo(
    () => ({ front: buildPores(3, FRONT, 70), top: buildPores(5, TOP, 45), side: buildPores(7, SIDE, 26) }),
    [],
  );
  return (
    <g strokeLinejoin="round">
      <path d={path(TOP)} fill={`url(#${id}-top)`} stroke="#F4EBDB" strokeWidth={16} />
      <path d={path(SIDE)} fill={`url(#${id}-side)`} stroke="#D9CBB2" strokeWidth={16} />
      <path d={path(FRONT)} fill={`url(#${id}-front)`} stroke="#EDE2CE" strokeWidth={16} />
      {(["top", "side", "front"] as const).map((k) =>
        pores[k].map((p, i) => <ellipse key={k + i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill="#B9A688" opacity={p.o} />),
      )}
      {/* brillo suave en la arista superior */}
      <path d="M268 358 L352 284 L826 284" fill="none" stroke="#FFFDF8" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
    </g>
  );
});

function Half({ id, side, line, open }: { id: string; side: -1 | 1; line: Pt[]; open: number }) {
  // Región de esta mitad: todo lo que queda a un lado de la grieta
  const far = side === -1 ? -600 : 1600;
  const region: Pt[] = [[far, -600], [line[0][0], -600], ...line, [line[line.length - 1][0], 1400], [far, 1400]];
  const dx = side * (40 + 230 * open) * open;
  const dy = 18 * open;
  const rot = side * 15 * open;
  const clip = `${id}-half${side}`;
  return (
    <g transform={`translate(${dx.toFixed(2)} ${dy.toFixed(2)}) rotate(${rot.toFixed(2)} ${PIVOT[0]} ${PIVOT[1]})`}>
      <clipPath id={clip}>
        <path d={path(region)} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <Block id={id} />
        {/* interior del tofu a la vista en el corte */}
        {open > 0 && (
          <path d={path(line, false)} fill="none" stroke="#E7DAC2" strokeWidth={4 + 22 * Math.min(1, open * 2)} strokeLinejoin="round" />
        )}
        {open > 0 && (
          <path d={path(line, false)} fill="none" stroke="#C9B494" strokeWidth={2} opacity={0.6} transform={`translate(${-side * 6} 0)`} />
        )}
      </g>
    </g>
  );
}

// ------------------------------------------------------------------ componente

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

type Frame = { p: number; breath: number; tilt: Pt };

export interface TofuOpenRevealProps {
  /** Alto del escenario fijo. */
  height?: string;
  /** Recorrido extra de scroll durante el cual se abre el tofu. */
  scrollDistance?: string;
  className?: string;
}

export default function TofuOpenReveal({ height = "100svh", scrollDistance = "150svh", className = "" }: TofuOpenRevealProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const id = "tor" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const line = React.useMemo(crackLine, []);
  const crumbs = React.useMemo(() => buildCrumbs(line), [line]);
  const [f, setF] = React.useState<Frame>({ p: 0, breath: 0, tilt: [0, 0] });
  const reducedRef = React.useRef(reduced);
  reducedRef.current = reduced;
  const pointer = React.useRef<Pt | null>(null);
  const [tall, setTall] = React.useState(false);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([e]) => setTall(e.contentRect.width / e.contentRect.height < 0.8));
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    let raf = 0;
    let visible = true;
    let p = 0;
    let tilt: Pt = [0, 0];
    let last = performance.now();
    let prev: Frame | null = null;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(root);

    function tick(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const reducedNow = reducedRef.current;
      const target = scrollProgress(root!.getBoundingClientRect().top, root!.offsetHeight, stage!.offsetHeight);

      if (reducedNow) {
        // Sin animación: cerrado arriba, abierto apenas se baja
        p = target > 0.15 ? 1 : 0;
      } else {
        // Persigue al scroll con suavizado y velocidad máxima: nunca salta de golpe
        const diff = target - p;
        const maxStep = 0.75 * dt;
        p += Math.max(-maxStep, Math.min(maxStep, diff * 0.12 + Math.sign(diff) * 0.002));
        if (Math.abs(target - p) < 0.0008) p = target;
      }

      // Antes de abrir: respira y se inclina hacia el puntero
      const idle = reducedNow ? 0 : 1 - smooth(0, 0.08, p);
      const breath = idle * Math.sin(now / 650);
      let want: Pt = [0, 0];
      if (pointer.current && idle > 0) {
        const r = stage!.getBoundingClientRect();
        want = [
          Math.max(-1, Math.min(1, (pointer.current[0] - r.left - r.width / 2) / (r.width / 2))),
          Math.max(-1, Math.min(1, (pointer.current[1] - r.top - r.height / 2) / (r.height / 2))),
        ];
      }
      tilt = [tilt[0] + (want[0] * idle - tilt[0]) * 0.08, tilt[1] + (want[1] * idle - tilt[1]) * 0.08];

      const next: Frame = { p, breath, tilt };
      if (
        !prev ||
        Math.abs(next.p - prev.p) > 1e-4 ||
        Math.abs(next.breath - prev.breath) > 2e-3 ||
        Math.abs(next.tilt[0] - prev.tilt[0]) > 1e-3 ||
        Math.abs(next.tilt[1] - prev.tilt[1]) > 1e-3
      ) {
        prev = next;
        setF(next);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const s = stages(f.p);
  const shake = reduced ? 0 : Math.sin(f.p * 1100) * 5 * s.shake;
  const crackLen = Math.round(s.crack * line.length);
  const crackPts = line.slice(0, Math.max(2, crackLen));
  const card = reduced ? (f.p > 0.5 ? 1 : 0) : s.card;
  const cardPop = reduced ? card : easeOutBack(card);
  const cardOpen = card > 0.55;

  // Respiración + inclinación hacia el puntero antes de abrir
  const lift = f.breath * 6;
  const idleTransform = `translate(${(f.tilt[0] * 14).toFixed(2)} ${(lift + f.tilt[1] * 8).toFixed(2)}) rotate(${(f.tilt[0] * 3).toFixed(2)} 545 420)`;

  return (
    <section
      ref={rootRef}
      aria-label="Abre el tofu para conocer la tienda"
      className={`relative w-full bg-forest ${className}`}
      style={{ height: `calc(${height} + ${scrollDistance})` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height }}
        onPointerMove={(e) => (pointer.current = [e.clientX, e.clientY])}
        onPointerLeave={() => (pointer.current = null)}
      >
        {/* Luz cálida detrás del tofu */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 50% at 50% 58%, rgba(200,132,58,${(0.22 + 0.25 * s.open).toFixed(3)}) 0%, rgba(47,64,48,0) 70%)`,
          }}
        />

        {/* Título antes de abrir */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[9%] z-10 px-6 text-center text-cream"
          style={{ opacity: s.intro, transform: `translateY(${(-30 * (1 - s.intro)).toFixed(1)}px)` }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cream/80 md:text-sm">{reveal.kicker}</p>
          <p className="mt-2 font-display text-6xl leading-none md:text-8xl">{reveal.title}</p>
        </div>

        <svg viewBox={tall ? VIEW_TALL : VIEW} preserveAspectRatio="xMidYMid meet" aria-hidden className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F3EAD8" />
              <stop offset="1" stopColor="#E4D6BC" />
            </linearGradient>
            <linearGradient id={`${id}-top`} x1="0" y1="1" x2="0.3" y2="0">
              <stop offset="0" stopColor="#FBF6EC" />
              <stop offset="1" stopColor="#F2E8D6" />
            </linearGradient>
            <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#DCCDB2" />
              <stop offset="1" stopColor="#C9B798" />
            </linearGradient>
            <radialGradient id={`${id}-shadow`}>
              <stop offset="0" stopColor="#000" stopOpacity={0.45} />
              <stop offset="1" stopColor="#000" stopOpacity={0} />
            </radialGradient>
          </defs>

          <g transform={`translate(${shake.toFixed(2)} ${(shake * 0.4).toFixed(2)})`}>
            {/* Sombra en la mesa: una sola, que se parte con el tofu */}
            {[-1, 1].map((side) => (
              <ellipse
                key={side}
                cx={545 + side * (120 + 230 * s.open * s.open + 40 * s.open)}
                cy={598}
                rx={190 - 50 * s.open}
                ry={26}
                fill={`url(#${id}-shadow)`}
                opacity={0.9 - 0.3 * s.open}
              />
            ))}

            <g transform={idleTransform}>
              {s.open > 0 ? (
                <>
                  <Half id={id} side={-1} line={line} open={s.open} />
                  <Half id={id} side={1} line={line} open={s.open} />
                </>
              ) : (
                <Block id={id} />
              )}

              {/* La grieta avanzando antes de que se abra */}
              {s.crack > 0 && s.open < 0.12 && (
                <path
                  d={path(crackPts, false)}
                  fill="none"
                  stroke="#8C7556"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={1 - s.open / 0.12}
                />
              )}
            </g>

            {/* Migas que saltan al abrirse */}
            {!reduced &&
              s.crumbs > 0 &&
              s.crumbs < 1 &&
              crumbs.map((c, i) => {
                const t = s.crumbs;
                const x = c.x + c.vx * t * 1.4;
                const y = c.y + c.vy * t + 520 * t * t;
                return (
                  <rect
                    key={i}
                    x={x - c.r}
                    y={y - c.r}
                    width={c.r * 2}
                    height={c.r * 1.6}
                    rx={c.r * 0.6}
                    fill={i % 3 ? "#F1E7D4" : "#DCCDB2"}
                    opacity={1 - smooth(0.7, 1, t)}
                    transform={`rotate(${(c.spin * t * 220).toFixed(1)} ${x} ${y})`}
                  />
                );
              })}
          </g>
        </svg>

        {/* La tarjeta de la tienda sale desde dentro del tofu */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <article
            inert={!cardOpen}
            aria-hidden={!cardOpen}
            className="w-full max-w-md rounded-[2rem] bg-bone p-7 text-charcoal shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] md:p-9"
            style={{
              opacity: card,
              transform: `translateY(${((1 - cardPop) * 90).toFixed(1)}px) scale(${(0.55 + 0.45 * cardPop).toFixed(3)})`,
              transformOrigin: "50% 80%",
              visibility: card > 0.01 ? "visible" : "hidden",
            }}
          >
            <p className="inline-block -rotate-2 rounded-lg bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-charcoal">
              Te esperamos
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-forest md:text-5xl">{tienda.name}</h2>
            <p className="mt-3 leading-relaxed text-charcoal/80">{tienda.tagline}</p>
            <dl className="mt-6 space-y-3 border-t border-sand pt-5">
              {tienda.details.map((d, i) => (
                <div
                  key={d.id}
                  className="grid grid-cols-[6.5rem_1fr] gap-3"
                  style={{ opacity: smooth(0.55 + i * 0.1, 0.8 + i * 0.1, card), transform: `translateY(${((1 - smooth(0.55 + i * 0.1, 0.8 + i * 0.1, card)) * 10).toFixed(1)}px)` }}
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-sage-deep">{d.label}</dt>
                  <dd className="font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {tienda.actions.map((a) => (
                <a
                  key={a.id}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTienda(a.id)}
                  className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-full px-6 font-bold transition-transform hover:-translate-y-0.5 ${
                    a.primary ? "bg-gold text-charcoal" : "border-2 border-charcoal text-charcoal"
                  }`}
                >
                  {a.label}
                  <span className="sr-only"> (abre en una pestaña nueva)</span>
                </a>
              ))}
            </div>
          </article>
        </div>

        {/* Pista de scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-cream"
          style={{ opacity: s.intro * 0.85 }}
        >
          {reveal.hint}
          <svg width="18" height="26" viewBox="0 0 18 26" className="animate-bounce motion-reduce:animate-none">
            <path d="M9 2v20M2 15l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
