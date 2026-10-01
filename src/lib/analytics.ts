declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Evento de conversión: click hacia Líder u otro punto de venta (GTM → GA4 / Meta Pixel). */
export function trackBuyClick(retailer: string, location: string, product?: string) {
  if (typeof window === "undefined") return;
  const payload = { event: "click_lider", retailer, location, product: product ?? null };
  (window.dataLayer ||= []).push(payload);
  if (process.env.NODE_ENV !== "production") console.info("[click_lider]", payload);
}
