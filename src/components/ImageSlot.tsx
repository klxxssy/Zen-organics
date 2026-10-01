import Image from "next/image";

type Props = {
  src: string | null;
  alt: string;
  /** Proporción final, ej. "4/5" */
  ratio: string;
  label: string;
  sizes: string;
  priority?: boolean;
  /** "warm" para comida (recetas): tonos tostados en vez de neutros */
  tone?: "fresh" | "warm";
  /** Clases extra para la imagen/placeholder interno (ej. zoom en hover) */
  innerClassName?: string;
  className?: string;
};

/** Muestra la foto si existe; si no, un placeholder con la proporción final (sin saltos de layout). */
export function ImageSlot({
  src,
  alt,
  ratio,
  label,
  sizes,
  priority,
  tone = "fresh",
  innerClassName = "",
  className = "",
}: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${innerClassName}`} />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`placeholder-img ${tone === "warm" ? "placeholder-img--warm" : ""} absolute inset-0 flex items-center justify-center p-4 text-center ${innerClassName}`}
        >
          <span className="rounded-full bg-bone/90 px-3 py-1 text-xs tracking-wide text-charcoal/70">
            [PLACEHOLDER] {label} · {ratio.replace("/", ":")}
          </span>
        </div>
      )}
    </div>
  );
}
