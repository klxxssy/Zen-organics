// Todo el texto y los links de la landing. [PLACEHOLDER] = dato por confirmar con la empresa.

export const PLACEHOLDER_URL = "#placeholder-link";

export type Store = { id: string; name: string; url: string; logo: string | null };

export const lider: Store = {
  id: "lider",
  name: "Líder",
  url: PLACEHOLDER_URL, // [PLACEHOLDER] URL de Zen Organics en lider.cl
  logo: null, // [PLACEHOLDER] logo con permiso
};

export const otherStores: Store[] = [
  { id: "punto-2", name: "[PLACEHOLDER] Punto de venta 2", url: PLACEHOLDER_URL, logo: null },
  { id: "punto-3", name: "[PLACEHOLDER] Punto de venta 3", url: PLACEHOLDER_URL, logo: null },
  { id: "punto-4", name: "[PLACEHOLDER] Punto de venta 4", url: PLACEHOLDER_URL, logo: null },
];

export const stores = [lider, ...otherStores];

export const menu = {
  left: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Aprende", href: "#aprende" },
    { label: "Productos", href: "#productos" },
  ],
  right: [
    { label: "Recetas", href: "#recetas" },
    { label: "Dónde comprar", href: "#donde-comprar" },
    { label: "Preguntas", href: "#preguntas" },
  ],
};

export const slides = [
  { id: "s1", title: "Tofu orgánico", text: "Hecho en Chile, listo para tu cocina.", cta: "Cómpralo ahora" },
  { id: "s2", title: "Proteína vegetal", text: "Simple, rica y versátil.", cta: "Cómpralo en Líder" },
  { id: "s3", title: "Ya está en Líder", text: "Búscalo en el refrigerado.", cta: "Ir a Líder" },
];

export const intro = {
  title: "Tofu como debe ser.",
  kicker: "Orgánico · Proteína vegetal · Hecho en Chile",
  text: "Empezamos haciendo tofu orgánico en Chile para que comer rico y vegetal sea fácil. [PLACEHOLDER: historia breve de la marca, origen e ingredientes].",
};

/** Stickers (textos [PLACEHOLDER] hasta confirmarlos). shape: forma del sticker. */
export const stickers = [
  { text: "[PLACEHOLDER] Alto en proteína", bg: "bg-terracotta text-bone", shape: "rounded-2xl" },
  { text: "[PLACEHOLDER] Sin conservantes", bg: "bg-forest text-cream", shape: "rounded-[2rem_0.5rem_2rem_0.5rem]" },
  { text: "[PLACEHOLDER] Fuente de calcio", bg: "bg-gold text-charcoal", shape: "rounded-full" },
  { text: "[PLACEHOLDER] Hecho en Chile", bg: "bg-cream text-forest", shape: "rounded-xl" },
  { text: "[PLACEHOLDER] Extra firme", bg: "bg-sage-deep text-cream", shape: "rounded-[0.5rem_2rem]" },
  { text: "[PLACEHOLDER] Apto vegano", bg: "bg-terracotta text-bone", shape: "rounded-full" },
  { text: "[PLACEHOLDER] Soya orgánica", bg: "bg-gold text-charcoal", shape: "rounded-2xl" },
];

export const press = ["[PLACEHOLDER] Medio 1", "[PLACEHOLDER] Medio 2", "[PLACEHOLDER] Medio 3", "[PLACEHOLDER] Medio 4", "[PLACEHOLDER] Medio 5", "[PLACEHOLDER] Medio 6"];

export const guides = {
  title: "Encuentra tu forma",
  text: "Prepararlo es fácil. Así lo sacas perfecto en segundos.",
  items: [
    {
      id: "preparar",
      tab: "Cómo prepararlo",
      label: "Escurrir",
      blob: "bg-gold",
      cta: "Cómo prepararlo",
      steps: ["Escurre el líquido del envase.", "Envuélvelo en un paño y pon peso encima 15 minutos.", "Córtalo en cubos, láminas o desmenúzalo."],
    },
    {
      id: "cocinar",
      tab: "Cómo cocinarlo",
      label: "Dorar",
      blob: "bg-terracotta",
      cta: "Cómo cocinarlo",
      steps: ["Sartén: aceite caliente, 3 a 4 minutos por lado.", "Horno: 200 °C por 25 minutos, dando vuelta a la mitad.", "Airfryer: 180 °C por 15 minutos."],
    },
    {
      id: "tips",
      tab: "Tips",
      label: "Tips",
      blob: "bg-sage",
      cta: "Ver tips",
      steps: ["Marínalo al menos 30 minutos.", "Pásalo por maicena para que quede crocante.", "Agrega la salsa al final."],
    },
  ],
};

export type Product = { id: string; name: string; type: string; format: string; image: string | null };

export const productTypes = ["Todos", "[PLACEHOLDER] Firme", "[PLACEHOLDER] Suave", "[PLACEHOLDER] Ahumado"];

export const products: Product[] = [
  { id: "p1", name: "[PLACEHOLDER] Producto 1", type: "[PLACEHOLDER] Firme", format: "[PLACEHOLDER] g", image: null },
  { id: "p2", name: "[PLACEHOLDER] Producto 2", type: "[PLACEHOLDER] Suave", format: "[PLACEHOLDER] g", image: null },
  { id: "p3", name: "[PLACEHOLDER] Producto 3", type: "[PLACEHOLDER] Ahumado", format: "[PLACEHOLDER] g", image: null },
];

export const recipes = [
  { id: "r1", title: "Salteado de tofu con verduras", tag: "Sartén", time: "15 min", bg: "bg-gold" },
  { id: "r2", title: "Bowl de tofu crocante", tag: "Horno", time: "25 min", bg: "bg-terracotta" },
  { id: "r3", title: "Revuelto de tofu", tag: "Desayuno", time: "10 min", bg: "bg-forest" },
  { id: "r4", title: "Tofu glaseado con sésamo", tag: "Sartén", time: "20 min", bg: "bg-sage-deep" },
  { id: "r5", title: "Ensalada tibia de tofu", tag: "Rápida", time: "15 min", bg: "bg-gold" },
];

export const buyBanner = {
  title: "Ya lo puedes encontrar en Líder",
  text: "Búscalo en la sección de refrigerados o pídelo online.",
  cta: "Comprar en Líder",
};

export const faqs = [
  { q: "¿Qué es el tofu?", a: "Es un alimento hecho de leche de soya que se coagula y se prensa en un bloque. Tiene sabor suave y toma el sabor de lo que cocines." },
  { q: "¿Cómo se guarda?", a: "Refrigerado. Una vez abierto, guárdalo cubierto con agua en un recipiente cerrado, cambia el agua a diario y consúmelo dentro de [PLACEHOLDER] días." },
  { q: "¿Dónde lo compro?", a: "En Líder y otros puntos de venta: [PLACEHOLDER lista de puntos de venta].", buy: true },
  { q: "¿Es orgánico?", a: "Sí, está hecho con soya orgánica. Certificación: [PLACEHOLDER]." },
];

export const social = {
  title: "Síguenos",
  text: "Recetas, ideas y novedades.",
  links: [
    { id: "instagram", label: "Instagram", href: PLACEHOLDER_URL },
    { id: "facebook", label: "Facebook", href: PLACEHOLDER_URL },
    { id: "tiktok", label: "TikTok", href: PLACEHOLDER_URL },
  ],
};

export const footerLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Productos", href: "#productos" },
  { label: "Recetas", href: "#recetas" },
  { label: "Preguntas", href: "#preguntas" },
  { label: "Contacto: [PLACEHOLDER] correo", href: PLACEHOLDER_URL },
];
