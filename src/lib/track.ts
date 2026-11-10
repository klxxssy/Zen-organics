declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Evento para medir clicks en los botones de la tienda (GTM → GA4 / Meta Pixel). */
export function trackTienda(action: string) {
  if (typeof window === "undefined") return;
  const payload = { event: "click_tienda", action };
  (window.dataLayer ||= []).push(payload);
  if (process.env.NODE_ENV !== "production") console.info("[click_tienda]", payload);
}
