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
  { label: "Aprende", href: "#aprende" },
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

/** Badges tipo sticker. [PLACEHOLDER] hasta confirmarlos con la empresa. */
export const badges = [
  { label: "[PLACEHOLDER] Alto en proteína", tone: "gold", icon: "dumbbell" },
  { label: "[PLACEHOLDER] Orgánico certificado", tone: "forest", icon: "sprout" },
  { label: "[PLACEHOLDER] Hecho en Chile", tone: "sage", icon: "mapPin" },
  { label: "[PLACEHOLDER] Sin conservantes", tone: "bone", icon: "leaf" },
  { label: "[PLACEHOLDER] Apto vegano", tone: "gold", icon: "heart" },
  { label: "[PLACEHOLDER] Fuente de calcio", tone: "forest", icon: "sparkles" },
] as const;

/** "Aprende a prepararlo": guías rápidas antes de productos. Borrador para revisar. */
export const learn = {
  eyebrow: "Aprende a prepararlo",
  title: "Del envase a tu plato.",
  text: "Tres guías rápidas para sacarle el máximo sabor a tu tofu.",
  cards: [
    {
      id: "preparar",
      tag: "Cómo prepararlo",
      title: "Escurre, presiona y corta",
      text: "Quitarle el agua es el secreto para una textura firme y dorada.",
      steps: [
        "Escurre el líquido del envase.",
        "Envuélvelo en un paño y pon peso encima 15 minutos.",
        "Córtalo en cubos, láminas o desmenúzalo.",
      ],
      image: null as string | null,
    },
    {
      id: "cocinar",
      tag: "Cómo cocinarlo",
      title: "Sartén, horno o airfryer",
      text: "Elige el método según la textura que buscas.",
      steps: [
        "Sartén: aceite caliente, 3 a 4 minutos por lado.",
        "Horno: 200 °C por 25 minutos, dando vuelta a la mitad.",
        "Airfryer: 180 °C por 15 minutos, agitando una vez.",
      ],
      image: null as string | null,
    },
    {
      id: "tips",
      tag: "Tips",
      title: "Más sabor, más crocante",
      text: "Pequeños trucos que hacen una gran diferencia.",
      steps: [
        "Marínalo al menos 30 minutos antes de cocinar.",
        "Pásalo por maicena para un exterior crocante.",
        "Agrega la salsa al final para que no se ablande.",
      ],
      image: null as string | null,
    },
  ],
};

/** Crédito obligatorio del modelo 3D (licencia CC BY 4.0, datos del propio archivo .glb). */
export const modelCredit = {
  title: "Tofu",
  author: "tqezzz",
  authorUrl: "https://sketchfab.com/tqezzz",
  sourceUrl: "https://sketchfab.com/3d-models/tofu-b5313d4d66c4489a9b127be72a1c22e5",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
};
