// Datos de la tienda que aparecen al abrirse el tofu.
// [PLACEHOLDER] = dato pendiente: lo entrega Felipe.

export const PLACEHOLDER_URL = "#placeholder-link";

export const reveal = {
  /** Texto sobre el tofu antes de abrirlo */
  kicker: "Zen Organics",
  title: "Ábrelo",
  hint: "Desliza para abrir",
};

export const tienda = {
  name: "[PLACEHOLDER] Nombre de la tienda",
  tagline: "[PLACEHOLDER] Frase corta de la tienda: qué venden y por qué ir.",
  details: [
    { id: "direccion", label: "Dirección", value: "[PLACEHOLDER] Calle 123, Comuna, Ciudad" },
    { id: "horario", label: "Horario", value: "[PLACEHOLDER] Lun a Sáb, 10:00 a 20:00" },
    { id: "contacto", label: "Contacto", value: "[PLACEHOLDER] +56 9 XXXX XXXX" },
  ],
  actions: [
    { id: "como_llegar", label: "Cómo llegar", href: PLACEHOLDER_URL, primary: true }, // [PLACEHOLDER] link de Google Maps
    { id: "whatsapp", label: "Escríbenos", href: PLACEHOLDER_URL, primary: false }, // [PLACEHOLDER] link de WhatsApp
  ],
};
