// Todo el copy y los links de la landing viven aquí.
// Los valores marcados con [PLACEHOLDER] deben reemplazarse con datos confirmados.

/** Link de relleno. Reemplazar por la URL real antes de publicar. */
export const PLACEHOLDER_URL = "#placeholder-link";

export type Retailer = {
  id: string;
  name: string;
  url: string;
  /** Ruta del logo en /public. null = sin permiso confirmado, se muestra el nombre en texto. */
  logo: string | null;
};

export const lider: Retailer = {
  id: "lider",
  name: "Líder",
  url: PLACEHOLDER_URL, // [PLACEHOLDER] URL de Zen Organics en lider.cl
  logo: null, // [PLACEHOLDER] logo pendiente de permiso
};

export const otherRetailers: Retailer[] = [
  { id: "proveedor-2", name: "[PLACEHOLDER] Punto de venta 2", url: PLACEHOLDER_URL, logo: null },
  { id: "proveedor-3", name: "[PLACEHOLDER] Punto de venta 3", url: PLACEHOLDER_URL, logo: null },
  { id: "proveedor-4", name: "[PLACEHOLDER] Punto de venta 4", url: PLACEHOLDER_URL, logo: null },
];

export const allRetailers: Retailer[] = [lider, ...otherRetailers];

export const nav = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Productos", href: "#productos" },
  { label: "Recetas", href: "#recetas" },
  { label: "Preguntas", href: "#preguntas" },
];

export const hero = {
  kicker: "Tofu orgánico · Hecho en Chile",
  title: "Proteína vegetal, simple y honesta.",
  subtitle:
    "Tofu orgánico elaborado en Chile, listo para tu cocina de todos los días. Encuéntralo en tu supermercado.",
  cta: "Cómpralo en Líder",
  secondary: "Ver productos",
};

export const benefits = [
  {
    icon: "leaf",
    title: "Proteína vegetal",
    text: "[PLACEHOLDER] g de proteína por cada 100 g. Una base nutritiva para tus comidas.",
  },
  {
    icon: "sprout",
    title: "Orgánico",
    text: "Elaborado con soya orgánica. Certificación: [PLACEHOLDER].",
  },
  {
    icon: "utensils",
    title: "Versátil",
    text: "Salteado, al horno, en ensaladas o revuelto. Toma el sabor de lo que cocines.",
  },
  {
    icon: "mapPin",
    title: "Hecho en Chile",
    text: "Producido localmente en [PLACEHOLDER: ciudad o región].",
  },
] as const;

export type Product = {
  id: string;
  name: string;
  description: string;
  format: string;
  image: string | null; // [PLACEHOLDER] ruta de la foto en /public/images
};

export const products: Product[] = [
  {
    id: "producto-1",
    name: "[PLACEHOLDER] Producto 1",
    description: "[PLACEHOLDER] Descripción breve: textura y mejor uso.",
    format: "[PLACEHOLDER] g",
    image: null,
  },
  {
    id: "producto-2",
    name: "[PLACEHOLDER] Producto 2",
    description: "[PLACEHOLDER] Descripción breve: textura y mejor uso.",
    format: "[PLACEHOLDER] g",
    image: null,
  },
  {
    id: "producto-3",
    name: "[PLACEHOLDER] Producto 3",
    description: "[PLACEHOLDER] Descripción breve: textura y mejor uso.",
    format: "[PLACEHOLDER] g",
    image: null,
  },
];

export const recipes = [
  {
    id: "salteado",
    title: "Salteado de tofu con verduras",
    time: "15 min",
    steps: [
      "Corta el tofu en cubos y sécalo con papel absorbente.",
      "Dóralo en un sartén caliente con un chorrito de aceite.",
      "Agrega verduras en tiras y salsa de soya. Saltea 5 minutos.",
    ],
    image: null as string | null,
  },
  {
    id: "bowl",
    title: "Bowl de tofu crocante",
    time: "25 min",
    steps: [
      "Presiona el tofu 10 minutos y córtalo en cubos.",
      "Pásalo por maicena y hornéalo a 200 °C hasta dorar.",
      "Sirve sobre arroz con palta, pepino y semillas.",
    ],
    image: null as string | null,
  },
  {
    id: "revuelto",
    title: "Revuelto de tofu",
    time: "10 min",
    steps: [
      "Desmenuza el tofu con un tenedor.",
      "Cocínalo en sartén con cebolla, cúrcuma, sal y pimienta.",
      "Termina con cebollín picado y sirve con pan tostado.",
    ],
    image: null as string | null,
  },
];

export const faqs = [
  {
    q: "¿Qué es el tofu?",
    a: "Es un alimento elaborado a partir de leche de soya que se coagula y se prensa hasta formar un bloque. Tiene sabor suave, por lo que absorbe los condimentos y se adapta a preparaciones dulces y saladas.",
  },
  {
    q: "¿Cómo se guarda?",
    a: "Mantenlo refrigerado. Una vez abierto, guárdalo en un recipiente cerrado cubierto con agua, cámbiala a diario y consúmelo dentro de [PLACEHOLDER] días. Revisa siempre la fecha de vencimiento en el envase.",
  },
  {
    q: "¿Dónde lo compro?",
    a: "Encuéntralo en Líder y en otros puntos de venta: [PLACEHOLDER lista de puntos de venta].",
    showRetailerLink: true,
  },
  {
    q: "¿Es orgánico?",
    a: "Sí, está elaborado con soya orgánica. Certificación: [PLACEHOLDER].",
  },
];

export const finalCta = {
  title: "Encuéntralo en Líder",
  text: "Llévate Zen Organics en tu próxima compra.",
  cta: "Comprar en Líder",
};

export const contact = {
  email: "[PLACEHOLDER] contacto@dominio.cl",
  phone: "[PLACEHOLDER] +56 9 XXXX XXXX",
  social: [
    { label: "Instagram", href: PLACEHOLDER_URL },
    { label: "Facebook", href: PLACEHOLDER_URL },
    { label: "TikTok", href: PLACEHOLDER_URL },
  ],
};

export const marquee = ["Orgánico", "Proteína vegetal", "Hecho en Chile"];
