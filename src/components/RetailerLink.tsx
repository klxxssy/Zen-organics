"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Retailer } from "@/content/site";
import { trackRetailerClick } from "@/lib/track";

type Variant = "primary" | "secondary" | "secondaryDark" | "plain";

const variants: Record<Variant, string> = {
  // Dorado + charcoal (4.6:1): el elemento con más peso visual en cada pantalla
  primary:
    "cta-shadow bg-gold text-charcoal hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.98]",
  secondary: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-bone",
  secondaryDark: "border border-bone/70 text-bone hover:bg-bone hover:text-forest",
  plain: "",
};

type Props = {
  retailer: Retailer;
  location: string;
  product?: string;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
};

/** Único componente para links de compra: pestaña nueva + evento click_lider. */
export function RetailerLink({
  retailer,
  location,
  product,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: Props) {
  const base =
    variant === "plain"
      ? ""
      : `group/cta inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-[translate,scale,background-color,color,filter] duration-200 ${
          size === "lg" ? "min-h-14 px-8 text-base" : "min-h-12 px-6 text-[15px]"
        }`;

  return (
    <a
      href={retailer.url}
      target="_blank"
      rel="noopener noreferrer"
      data-retailer={retailer.id}
      onClick={() => trackRetailerClick({ retailer: retailer.id, location, product })}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {variant !== "plain" && <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}
