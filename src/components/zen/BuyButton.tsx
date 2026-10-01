"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { trackBuyClick } from "@/lib/analytics";
import type { Store } from "@/content/zen";

type Props = {
  store: Store;
  location: string;
  product?: string;
  children: ReactNode;
  /** dark: pill negra (estilo Tofoo). light: pill crema para fondos oscuros. bare: sin estilo. */
  look?: "dark" | "light" | "bare";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const looks = {
  dark: "bg-charcoal text-cream hover:bg-black",
  light: "bg-cream text-charcoal hover:bg-bone",
  bare: "",
};
const sizes = {
  sm: "min-h-11 pl-5 pr-4 text-xs",
  md: "min-h-12 pl-6 pr-5 text-sm",
  lg: "min-h-14 pl-7 pr-6 text-sm md:min-h-16 md:pl-8 md:text-base",
};

/** Único link de compra: pestaña nueva + evento click_lider. */
export function BuyButton({ store, location, product, children, look = "dark", size = "md", className = "" }: Props) {
  const styled =
    look === "bare"
      ? className
      : `group inline-flex items-center justify-center gap-3 rounded-2xl font-bold uppercase tracking-wide shadow-[0_8px_0_-2px_rgb(0_0_0/0.18)] transition-[translate,background-color,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${looks[look]} ${sizes[size]} ${className}`;
  return (
    <a
      href={store.url}
      target="_blank"
      rel="noopener noreferrer"
      data-store={store.id}
      onClick={() => trackBuyClick(store.id, location, product)}
      className={styled}
    >
      {children}
      {look !== "bare" && <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />}
      <span className="sr-only"> (abre en una pestaña nueva)</span>
    </a>
  );
}
