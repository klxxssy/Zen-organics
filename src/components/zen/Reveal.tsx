"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Aparece al entrar en pantalla (y activa la animación de títulos que contiene). */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "li" | "header";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement & HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal className={className} style={delay ? ({ "--delay": `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
