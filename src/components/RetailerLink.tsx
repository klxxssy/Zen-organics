"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Retailer } from "@/content/site";
import { trackRetailerClick } from "@/lib/track";

type Variant = "primary" | "secondary" | "inverse" | "plain";

const variants: Record<Variant, string> = {
  primary: "bg-sage-deep text-white hover:bg-charcoal",
  secondary: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-bone",
  inverse: "bg-bone text-charcoal hover:bg-sand",
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
      : `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ${
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
      {variant !== "plain" && <ArrowUpRight aria-hidden className="size-4 shrink-0" />}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}
