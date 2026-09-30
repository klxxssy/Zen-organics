export type RetailerClick = {
  retailer: string;
  /** Sección de la página donde está el botón (hero, producto, faq, sticky, etc.) */
  location: string;
  product?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Envía el evento click_lider a dataLayer (GTM → GA4 / Meta Pixel). */
export function trackRetailerClick({ retailer, location, product }: RetailerClick) {
  if (typeof window === "undefined") return;
  const payload = { event: "click_lider", retailer, location, product: product ?? null };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (process.env.NODE_ENV !== "production") console.info("[track]", payload);
}
