"use client";

// Hero de 21st.dev ("Prisma Hero"), adaptado a Zen Organics:
// - textos, CTA y fondo llegan por props (el contenido vive en src/content/)
// - colores de la paleta (forest / cream / gold) y títulos en Lilita One
// - video de fondo reemplazado por una foto (ver `backgroundImage`)
// - nav interna opcional (la landing ya tiene su propio header)
// La animación (palabras que suben, entrada escalonada) se mantiene igual que el original.

import { MotionConfig, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </span>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </span>
  );
};

/* ---------------- Hero ---------------- */
export interface PrismaHeroProps {
  title: string;
  description: string;
  /** Botón de acción (en Zen Organics: el link de compra con tracking). */
  cta: ReactNode;
  backgroundImage: { src: string; alt: string };
  /** Links de la pestaña superior del componente original. Vacío = sin nav. */
  navItems?: { label: string; href: string }[];
  id?: string;
  className?: string;
  /** Atributos data-* (ej. data-hero para la barra fija de mobile). */
  sectionProps?: Record<`data-${string}`, string | boolean>;
}

const PrismaHero = ({
  title,
  description,
  cta,
  backgroundImage,
  navItems = [],
  id,
  className = "",
  sectionProps,
}: PrismaHeroProps) => {
  return (
    // reducedMotion="user": con "reducir movimiento" se omiten los desplazamientos
    <MotionConfig reducedMotion="user">
      <section id={id} className={`h-screen w-full ${className}`} {...sectionProps}>
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-forest md:rounded-[2rem]">
          {/* Fondo (el original usaba un video) */}
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />

          {/* Noise overlay */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

          {/* Gradient overlay (negro del original → verde bosque) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/85" />

          {/* Navbar (opcional) */}
          {navItems.length > 0 && (
            <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
              <div className="flex items-center gap-3 rounded-b-2xl bg-forest px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[10px] text-cream/80 transition-colors hover:text-cream sm:text-xs md:text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 items-end gap-4">
              <div className="col-span-12 pb-1 lg:col-span-8 lg:pb-6">
                <h1 className="font-display leading-[0.9] tracking-[-0.01em] text-cream text-[14vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[7.2vw] xl:text-[6.8vw]">
                  <WordsPullUp text={title} />
                </h1>
              </div>

              <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                  className="text-base text-cream/85 md:text-lg"
                  style={{ lineHeight: 1.35 }}
                >
                  {description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                  className="self-start"
                >
                  {cta}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export { PrismaHero };
