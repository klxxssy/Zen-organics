import Image from "next/image";

/** Foto real si existe; si no, placeholder con la proporción final. */
export function Photo({
  src,
  alt,
  ratio,
  label,
  sizes,
  kind = "food",
  priority,
  className = "",
}: {
  src: string | null;
  alt: string;
  ratio: string;
  label: string;
  sizes: string;
  kind?: "food" | "pack";
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className={`${kind === "pack" ? "pack-ph" : "photo-ph"} absolute inset-0 flex items-center justify-center p-3`}>
          <span className="rounded-full bg-bone/90 px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-wide text-charcoal/70">
            [PLACEHOLDER] {label}
          </span>
        </div>
      )}
    </div>
  );
}
