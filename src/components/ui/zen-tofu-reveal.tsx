"use client"

import * as React from "react"

/**
 * Zen Tofu Reveal: el envase de Zen Organics se rompe al hacer scroll y deja ver el tofu.
 *
 * Basado en el componente Tiger Tear Reveal (misma mecánica de rotura del papel):
 *  - al cargar: el envase entra suave; en reposo "respira" y cada ~5 s se tensa
 *    (temblor + una grietita que asoma y se vuelve a cerrar);
 *  - al deslizar: una grieta cruza el envase, se rompe en dos y las mitades se separan;
 *  - por la rotura sube el tofu (solo una parte), tiembla como tofu y brilla;
 *  - al seguir bajando aparece la landing. Al subir, el envase se vuelve a cerrar.
 *
 * La animación persigue al scroll con velocidad máxima: aunque bajes rápido se ve completa.
 * Todo es SVG generado con números: sin imágenes. El envase es provisorio hasta tener el diseño real.
 */

export interface ZenTofuRevealProps {
  /** Marca grande del envase (la palabra que se rompe). */
  brand?: string
  /** Línea superior del envase. */
  tagline?: string
  /** Línea inferior del envase (variedad / gramaje). */
  detail?: string
  /** Texto del sticker redondo. */
  sticker?: [string, string]
  /** Color del envase. */
  packColor?: string
  /** Color de la marca y textos del envase. */
  ink?: string
  /** Color de acentos (líneas y sticker). */
  accent?: string
  /** Fuente de la marca. */
  fontFamily?: string
  height?: string
  scrollDistance?: string
  hint?: boolean
  className?: string
}

// #region tear
export type Pt = [number, number]

/** Seeded PRNG (mulberry32), so the tear and the fur are the same every visit. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x)

export function smooth(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/** Overshoot ease: the eyes open a little too wide, then settle. */
export function easeOutBack(t: number) {
  const c = 1.70158
  const u = clamp01(t) - 1
  return 1 + (c + 1) * u * u * u + c * u * u
}

/** How far through the pinned scroll we are: 0 at the top, 1 when the stage lets go. */
export function scrollProgress(top: number, height: number, viewport: number) {
  const range = height - viewport
  if (range <= 0) return top <= 0 ? 1 : 0
  return clamp01(-top / range)
}

/** One scroll value drives five beats. */
export function stages(p: number) {
  return {
    crack: smooth(0.03, 0.2, p), // a crack runs out from the middle of the word
    open: smooth(0.18, 0.62, p), // the sheet tears and the halves pull apart
    rise: smooth(0.26, 0.74, p), // the tiger comes up from behind
    pop: smooth(0.58, 0.88, p), // and opens its eyes
    shake: smooth(0.16, 0.22, p) * (1 - smooth(0.26, 0.36, p)), // the jolt of the rip
  }
}

/**
 * The tear, left to right across the whole sheet: a slight rising diagonal,
 * a slow wander, fine fibres and the odd big tooth. `x` always increases.
 */
export function tearLine(seed = 11, from = -800, to = 1800, step = 9, cx = 500, cy = 318, angle = -7): Pt[] {
  const r = rng(seed)
  const slope = Math.tan((angle * Math.PI) / 180)
  const out: Pt[] = []
  for (let x = from; x <= to; x += step) {
    const fibre = (r() - 0.5) * 5
    const tooth = r() < 0.09 ? (r() - 0.5) * 26 : 0
    const wander = Math.sin(x * 0.019 + seed) * 10 + Math.sin(x * 0.053 + seed * 2) * 4
    out.push([x, cy + (x - cx) * slope + wander + fibre + tooth])
  }
  return out
}

/** Where each half goes as the tear opens. Both are still at open = 0. */
export function pieceMotion(open: number) {
  return {
    top: { dx: -10 * open, dy: -82 * open, rot: -2.6 * open },
    bottom: { dx: 12 * open, dy: 78 * open, rot: 2.1 * open },
  }
}

/** Width of the white paper core exposed along a torn edge. */
export function fibreWidths(n: number, open: number, seed = 5) {
  const r = rng(seed)
  const k = Math.min(1, open * 4)
  return Array.from({ length: n }, (_, i) => k * (2.5 + 6 * (0.5 + 0.5 * Math.sin(i * 0.37 + seed)) * (0.6 + r() * 0.8)))
}
// #endregion

// ---------------------------------------------------------------- geometría

const VIEW_W = 1000
const CX = 500
const CY = 318
const FAR = 4000 // the paper halves reach well past any screen
// the visible frame: cropped to the artwork, with room for the halves to part
const FRAME = "36 44 928 468"

const d = (pts: Pt[], close = true) =>
  "M" + pts.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + (close ? "Z" : "")

// ---------------------------------------------------------------- the paper

// Where the paper curls back over the gap: [x along the tear, half-width, depth].
const CURLS: Record<"top" | "bottom", [number, number, number][]> = {
  top: [
    [300, 44, 30],
    [575, 30, 20],
    [790, 52, 34],
  ],
  bottom: [
    [205, 50, 32],
    [470, 34, 22],
    [690, 40, 28],
  ],
}

function Half({
  id,
  side,
  line,
  open,
  spread = 1,
  children,
}: {
  id: string
  side: "top" | "bottom"
  line: Pt[]
  open: number
  /** cuánto se separan las mitades (más en móvil para que se vea el tofu) */
  spread?: number
  children: React.ReactNode
}) {
  const up = side === "top"
  const base = pieceMotion(open)[side]
  const m = { dx: base.dx, dy: base.dy * spread, rot: base.rot }
  const shape = up
    ? [[line[0][0], -FAR] as Pt, [line[line.length - 1][0], -FAR] as Pt, ...[...line].reverse()]
    : [...line, [line[line.length - 1][0], FAR] as Pt, [line[0][0], FAR] as Pt]
  const widths = fibreWidths(line.length, open, up ? 5 : 8)
  // the white paper core along the edge, on this half's side of it
  const core = line.concat(line.map(([x, y], i) => [x, y + (up ? -widths[i] : widths[i])] as Pt).reverse())
  const curls = CURLS[side].map(([cx, hw, depth]) => {
    const pts = line.filter(([x]) => Math.abs(x - cx) <= hw)
    const back = pts.map(([x, y]) => {
      const s = Math.cos(((x - cx) / hw) * (Math.PI / 2))
      return [x + (up ? 6 : -6) * s * open, y + (up ? 1 : -1) * depth * s * s * Math.min(1, open * 2.5)] as Pt
    })
    return d(pts.concat(back.reverse()))
  })
  const transform =
    "translate(" + m.dx.toFixed(2) + " " + m.dy.toFixed(2) + ") rotate(" + m.rot.toFixed(3) + " " + CX + " " + CY + ")"
  const clip = id + "-" + side
  return (
    <g transform={transform}>
      {/* the half's own shadow on the tiger */}
      {open > 0 ? (
        <path
          d={d(line, false)}
          fill="none"
          stroke="#000"
          strokeOpacity={0.32 * Math.min(1, open * 3)}
          strokeWidth={22}
          transform={"translate(0 " + (up ? 10 : -10) + ")"}
          filter={"url(#" + id + "-soft)"}
        />
      ) : null}
      <clipPath id={clip}>
        <path d={d(shape)} />
      </clipPath>
      <g clipPath={"url(#" + clip + ")"}>{children}</g>
      {open > 0 ? (
        <>
          <path d={d(core)} fill="#ffffff" />
          {curls.map((c, i) => (
            <path key={i} d={c} fill={"url(#" + id + "-curl-" + side + ")"} stroke="#fff" strokeWidth={1} />
          ))}
        </>
      ) : null}
    </g>
  )
}

// ---------------------------------------------------------------- el tofu

/** Poros del tofu: puntitos más oscuros, siempre iguales (semilla fija). */
function buildPores() {
  const r = rng(91)
  let dots = ""
  for (let i = 0; i < 900; i++) {
    const x = (r() - 0.5) * 2600
    const y = -48 + r() * 420
    const rx = 1.2 + r() * 3.4
    const ry = 0.8 + r() * 2.2
    // elipse como dos arcos (un solo path liviano)
    dots += "M" + (x - rx).toFixed(1) + " " + y.toFixed(1) + "a" + rx.toFixed(1) + " " + ry.toFixed(1) + " 0 1 0 " + (rx * 2).toFixed(1) + " 0a" + rx.toFixed(1) + " " + ry.toFixed(1) + " 0 1 0 " + (-rx * 2).toFixed(1) + " 0"
  }
  return dots
}

/** Brillos de humedad sobre la superficie. */
const GLINTS: [number, number, number, number][] = [
  [-420, 40, 70, 10],
  [-170, 120, 46, 8],
  [90, 20, 90, 12],
  [330, 140, 60, 9],
  [560, 60, 80, 11],
  [-640, 160, 54, 8],
]

const Tofu = React.memo(function Tofu({ id }: { id: string }) {
  const pores = React.useMemo(buildPores, [])
  return (
    <g>
      {/* cara de arriba del bloque (se ve el borde al subir) */}
      <rect x={-2600} y={-160} width={5200} height={102} fill={`url(#${id}-tofu-top)`} />
      {/* cara frontal */}
      <rect x={-2600} y={-60} width={5200} height={700} fill={`url(#${id}-tofu-front)`} />
      <path d={pores} fill="#B8A383" opacity={0.32} />
      {/* arista redondeada con brillo */}
      <path d="M-2600 -60 H2600" stroke="#FFFDF7" strokeWidth={7} opacity={0.9} />
      <path d="M-2600 -52 H2600" stroke="#D9C9AC" strokeWidth={4} opacity={0.6} />
      <g filter={`url(#${id}-soft)`} fill="#FFFFFF">
        {GLINTS.map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} opacity={0.35} />
        ))}
      </g>
    </g>
  )
})

/** Destello dorado (estrella de 4 puntas) que aparece cuando el tofu ya está afuera. */
const sparkle = "M0 -14 C2 -3 3 -2 14 0 C3 2 2 3 0 14 C-2 3 -3 2 -14 0 C-3 -2 -2 -3 0 -14Z"
const SPARKLES: [number, number, number][] = [
  [-300, 30, 1.3],
  [-60, 70, 0.9],
  [210, 20, 1.5],
  [420, 80, 1],
  [-470, 90, 0.8],
]

// ---------------------------------------------------------------- componente

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])
  return reduced
}

/** true cuando la pantalla es vertical (celular): el envase se arma en dos líneas. */
function usePortrait() {
  const [portrait, setPortrait] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 4/5)")
    setPortrait(mq.matches)
    const h = (e: MediaQueryListEvent) => setPortrait(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])
  return portrait
}

/** Rebote suave para la subida del tofu. */
function easeOutSoftBack(t: number) {
  const c = 1.1
  const u = clamp01(t) - 1
  return 1 + (c + 1) * u * u * u + c * u * u
}

type Frame = { p: number; shine: number; intro: number; knock: number; knockShake: number; breath: number }

export default function ZenTofuReveal({
  brand = "Zen Organics",
  tagline = "TOFU ORGÁNICO · HECHO EN CHILE",
  detail = "Tofu firme · [PLACEHOLDER] g",
  sticker = ["Proteína", "vegetal"],
  packColor = "#2F4030",
  ink = "#F5F1EA",
  accent = "#C8843A",
  fontFamily = 'var(--font-lilita), "Arial Rounded MT Bold", system-ui, sans-serif',
  height = "100svh",
  scrollDistance = "260svh",
  hint = true,
  className = "",
}: ZenTofuRevealProps) {
  const rootRef = React.useRef<HTMLElement | null>(null)
  const stageRef = React.useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const portrait = usePortrait()
  const id = "ztr" + React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const line = React.useMemo(() => tearLine(), [])
  const [f, setF] = React.useState<Frame>({ p: 0, shine: 0, intro: 0, knock: 0, knockShake: 0, breath: 0 })
  const reducedRef = React.useRef(reduced)
  reducedRef.current = reduced
  const pointer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return
    let raf = 0
    let visible = true
    let p = 0
    let shine = 0
    let last: Frame | null = null
    const t0 = performance.now()
    let lastT = t0

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        lastT = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(root)

    function tick(now: number) {
      raf = 0
      if (!visible) return
      const red = reducedRef.current
      const dt = Math.min(0.05, (now - lastT) / 1000)
      lastT = now
      const target = scrollProgress(root!.getBoundingClientRect().top, root!.offsetHeight, stage!.offsetHeight)
      if (red) {
        p = target > 0.3 ? 1 : 0
      } else {
        // Persigue al scroll con velocidad máxima: nunca salta de golpe al final
        const diff = target - p
        const maxStep = 0.55 * dt
        p += Math.max(-maxStep, Math.min(maxStep, diff * 0.1 + Math.sign(diff) * 0.0015))
      }
      if (Math.abs(target - p) < 0.0005) p = target

      // El brillo del tofu sigue al puntero (o se mueve solo)
      let want = Math.sin((now - t0) / 1800) * 0.6
      if (pointer.current !== null) {
        const r = stage!.getBoundingClientRect()
        want = Math.max(-1, Math.min(1, (pointer.current - r.left - r.width / 2) / (r.width / 2)))
      }
      shine += (want - shine) * 0.06

      const intro = red ? 1 : clamp01((now - t0) / 1400)
      const resting = !red && p < 0.015
      const breath = resting ? Math.sin((now - t0) / 900) : 0
      let knock = 0
      let knockShake = 0
      if (resting && now - t0 > 2400) {
        const phase = ((now - t0 - 2400) % 5200) / 700
        if (phase < 1) {
          knock = Math.sin(Math.PI * phase)
          knockShake = Math.sin(phase * 42) * 3.2 * knock
        }
      }

      const next: Frame = { p, shine: red ? 0 : shine, intro, knock, knockShake, breath }
      if (
        !last ||
        Math.abs(next.p - last.p) > 1e-4 ||
        Math.abs(next.shine - last.shine) > 2e-3 ||
        Math.abs(next.intro - last.intro) > 1e-3 ||
        Math.abs(next.knock - last.knock) > 1e-3 ||
        Math.abs(next.breath - last.breath) > 2e-3
      ) {
        last = next
        setF(next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  // 0 → 0.72: se raja, se rompe y sale el tofu. 0.72 → 1: las mitades salen volando
  // y la cámara entra en el tofu hasta que todo queda color crema = arranca la landing.
  const s = stages(Math.min(1, f.p / 0.72))
  const exit = reduced ? 0 : smooth(0.72, 1, f.p)
  const fade = reduced ? 0 : smooth(0.86, 1, f.p)
  const spread = (portrait ? 2.2 : 1.35) + exit * exit * 9
  const pop = reduced ? s.pop : easeOutBack(s.pop)
  // El tofu sube con un leve rebote y, al quedar afuera, tiembla como tofu
  const rise = (1 - easeOutSoftBack(s.rise)) * 170
  const jiggle = reduced ? 0 : Math.sin(s.pop * Math.PI * 5) * (1 - s.pop) * 0.07 * Math.min(1, s.pop * 6)
  const shake = reduced ? 0 : Math.sin(f.p * 900) * 6 * s.shake + f.knockShake
  const crackAmount = Math.max(s.crack, f.knock * 0.09)
  const crack = line.filter(([x]) => Math.abs(x - CX) <= crackAmount * 620)
  const zoom = 1.3 * (1 + exit * exit * 2.2)
  const tofu =
    "translate(" + CX + " " + (CY + rise + exit * 60).toFixed(2) + ") rotate(" + (-7 * (1 - exit)).toFixed(3) + ") scale(" +
    zoom.toFixed(4) + " " + (zoom * (1 + jiggle)).toFixed(4) + ")"

  // Entrada del envase: la línea baja, la marca crece con rebote; en reposo respira
  const tIn = smooth(0, 0.55, f.intro)
  const wIn = smooth(0.15, 1, f.intro)
  const brandScale = (0.86 + 0.14 * easeOutBack(wIn)) * (1 + f.breath * 0.006)
  const brandTransform =
    "translate(" + CX + " 290) rotate(" + (f.breath * 0.35).toFixed(3) + ") scale(" + brandScale.toFixed(4) + ") translate(" + -CX + " -290)"

  // El envase: provisorio, dibujado con los colores de Zen Organics
  const sheet = (
    <>
      <rect x={-FAR} y={-FAR} width={FAR * 2 + VIEW_W} height={FAR * 2} fill={packColor} />
      {/* reflejo del plástico del envase */}
      <rect x={-FAR} y={-FAR} width={FAR * 2 + VIEW_W} height={FAR * 2} fill={`url(#${id}-gloss)`} />
      <g opacity={tIn} transform={"translate(0 " + ((portrait ? -170 : 0) + (1 - tIn) * -24).toFixed(2) + ")"}>
        <path d="M120 96 H880" stroke={accent} strokeWidth={3} />
        <text x={CX} y={138} textAnchor="middle" fill={accent} style={{ font: '700 26px "DM Sans", system-ui, sans-serif', letterSpacing: "0.32em" }}>
          {tagline}
        </text>
      </g>
      {portrait ? (
        <g opacity={wIn} transform={brandTransform}>
          {/* en celular: "Zen" arriba de la rotura y "Organics" abajo */}
          <text x={CX} y={262} textAnchor="middle" textLength={520} lengthAdjust="spacingAndGlyphs" fill={ink} style={{ fontFamily, fontSize: 300 }}>
            {brand.split(" ")[0]}
          </text>
          <text x={CX} y={560} textAnchor="middle" textLength={780} lengthAdjust="spacingAndGlyphs" fill={ink} style={{ fontFamily, fontSize: 230 }}>
            {brand.split(" ").slice(1).join(" ") || brand}
          </text>
        </g>
      ) : (
        <text
          x={CX}
          y={350}
          opacity={wIn}
          transform={brandTransform}
          textAnchor="middle"
          textLength={800}
          lengthAdjust="spacingAndGlyphs"
          fill={ink}
          style={{ fontFamily, fontSize: 190, letterSpacing: 0 }}
        >
          {brand}
        </text>
      )}
      <g opacity={tIn} transform={portrait ? "translate(0 230)" : undefined}>
        <text x={CX} y={448} textAnchor="middle" fill={ink} opacity={0.85} style={{ font: '600 26px "DM Sans", system-ui, sans-serif', letterSpacing: "0.08em" }}>
          {detail}
        </text>
        <path d="M120 482 H880" stroke={accent} strokeWidth={3} />
        {/* sticker */}
        <g transform={"translate(" + (portrait ? "790 -130" : "842 196") + ") rotate(-12) scale(" + (portrait ? 1.35 : 1) + ") scale(" + (0.6 + 0.4 * easeOutBack(smooth(0.4, 1, f.intro))).toFixed(3) + ")"}>
          <circle r={62} fill={accent} />
          <circle r={54} fill="none" stroke={ink} strokeWidth={2} strokeDasharray="4 5" opacity={0.7} />
          <text y={-4} textAnchor="middle" fill="#2B2B2B" style={{ font: '800 19px "DM Sans", system-ui, sans-serif' }}>
            {sticker[0]}
          </text>
          <text y={20} textAnchor="middle" fill="#2B2B2B" style={{ font: '800 19px "DM Sans", system-ui, sans-serif' }}>
            {sticker[1]}
          </text>
        </g>
      </g>
    </>
  )

  return (
    <section
      ref={rootRef}
      aria-label={`Envase de ${brand} que se rompe y deja ver el tofu`}
      className={"relative w-full " + className}
      style={{ height: "calc(" + height + " + " + scrollDistance + ")", background: packColor, overflow: "clip" }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height }}
        onPointerMove={(e) => (pointer.current = e.clientX)}
        onPointerLeave={() => (pointer.current = null)}
      >
        <svg
          viewBox={portrait ? "60 -230 880 1080" : FRAME}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${brand}: el envase se rompe y aparece el tofu`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", display: "block" }}
        >
          <defs>
            <linearGradient id={id + "-tofu-front"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F6EEDF" />
              <stop offset="0.5" stopColor="#EDE2CD" />
              <stop offset="1" stopColor="#DCCCAE" />
            </linearGradient>
            <linearGradient id={id + "-tofu-top"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E9DDC6" />
              <stop offset="1" stopColor="#FBF6EC" />
            </linearGradient>
            <radialGradient id={id + "-shine"}>
              <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.55} />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
            </radialGradient>
            <linearGradient id={id + "-gloss"} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0.25" stopColor="#FFFFFF" stopOpacity={0} />
              <stop offset="0.4" stopColor="#FFFFFF" stopOpacity={0.07} />
              <stop offset="0.48" stopColor="#FFFFFF" stopOpacity={0} />
              <stop offset="0.58" stopColor="#FFFFFF" stopOpacity={0.05} />
              <stop offset="0.64" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={id + "-curl-top"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <linearGradient id={id + "-curl-bottom"} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <filter id={id + "-soft"} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          <g transform={"translate(" + shake.toFixed(2) + " " + (shake * 0.4).toFixed(2) + ")"}>
            {/* detrás del envase: el tofu, que sube por la rotura */}
            {s.open > 0 ? (
              <g transform={tofu}>
                <Tofu id={id} />
                {/* brillo que sigue al puntero */}
                <ellipse cx={f.shine * 420} cy={40} rx={260} ry={60} fill={`url(#${id}-shine)`} />
                {SPARKLES.map(([x, y, k], i) => {
                  const a = smooth(0.1 + i * 0.12, 0.5 + i * 0.1, s.pop)
                  return a > 0 ? (
                    <path
                      key={i}
                      d={sparkle}
                      fill="#E3A65C"
                      opacity={a * (1 - 0.4 * smooth(0.8, 1, s.pop))}
                      transform={"translate(" + x + " " + y + ") scale(" + (k * easeOutBack(a)).toFixed(3) + ")"}
                    />
                  ) : null
                })}
              </g>
            ) : null}

            {/* el envase: entero hasta que se rompe; después, dos mitades que se separan */}
            {s.open > 0 ? (
              <>
                <Half id={id} side="top" line={line} open={s.open} spread={spread}>
                  {sheet}
                </Half>
                <Half id={id} side="bottom" line={line} open={s.open} spread={spread}>
                  {sheet}
                </Half>
              </>
            ) : (
              sheet
            )}

            {/* la grieta que asoma antes de romperse */}
            {crackAmount > 0 && s.open < 0.15 && crack.length > 1 ? (
              <path d={d(crack, false)} fill="none" stroke="#0F1A10" strokeWidth={2.6} strokeLinejoin="bevel" opacity={1 - s.open / 0.15} />
            ) : null}
          </g>
          {/* fundido final al color de la landing */}
          {fade > 0 ? <rect x={-FAR} y={-FAR} width={FAR * 2 + VIEW_W} height={FAR * 2} fill="#F5F1EA" opacity={fade} /> : null}
        </svg>

        {hint ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em]"
            style={{ color: ink, opacity: Math.max(0, 0.8 - s.crack * 3) * smooth(0.5, 1, f.intro) }}
          >
            Desliza
            <span className="block h-7 w-px animate-pulse motion-reduce:animate-none" style={{ background: ink }} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
