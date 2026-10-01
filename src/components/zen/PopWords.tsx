import type { CSSProperties } from "react";

/** Título que sube palabra por palabra (se activa con un <Reveal> padre o con `auto`). */
export function PopWords({ text, auto = false }: { text: string; auto?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={`pop-words ${auto ? "shown" : ""}`}>
      {words.map((w, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
