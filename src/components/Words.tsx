import type { CSSProperties } from "react";

/**
 * Divide un título en palabras para animarlas una por una (ver .words en globals.css).
 * auto = anima al pintar (hero); si no, se activa cuando un <Reveal> padre entra en pantalla.
 */
export function Words({ text, auto = false }: { text: string; auto?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={`words ${auto ? "words--auto" : ""}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
