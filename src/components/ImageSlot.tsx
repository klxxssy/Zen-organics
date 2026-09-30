import Image from "next/image";

type Props = {
  src: string | null;
  alt: string;
  /** Proporción final, ej. "4/5" */
  ratio: string;
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Muestra la foto si existe; si no, un placeholder con la proporción final (sin saltos de layout). */
export function ImageSlot({ src, alt, ratio, label, sizes, priority, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="placeholder-img absolute inset-0 flex items-center justify-center p-4 text-center"
        >
          <span className="rounded-full border border-sand bg-bone/90 px-3 py-1 text-xs tracking-wide text-charcoal/70">
            [PLACEHOLDER] {label} · {ratio.replace("/", ":")}
          </span>
        </div>
      )}
    </div>
  );
}
