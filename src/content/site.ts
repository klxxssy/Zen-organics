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

// El header divide los links a ambos lados del logo (izquierda / derecha)
export const nav = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Aprende", href: "#aprende" },
  { label: "Productos", href: "#productos" },
  { label: "Recetas", href: "#recetas" },
  { label: "Dónde comprar", href: "#donde-comprar" },
  { label: "Preguntas", href: "#preguntas" },
];

/** Links del header de escritorio: 2 a cada lado del logo centrado (el resto va en menú móvil y footer). */
export const headerNav = {
  left: [nav[1], nav[2]],
  right: [nav[3], nav[5]],
};

/** Hero tipo carrusel sobre fondo forest. `tone` es el color del círculo detrás de los envases. */
export const heroSlides = [
  {
    id: "organico",
    title: "Tofu orgánico hecho en Chile",
    text: "Proteína vegetal, simple y honesta, para tu cocina de todos los días.",
    cta: "Cómpralo en Líder",
    tone: "gold",
  },
  {
    id: "proteina",
    title: "Proteína vegetal sin complicaciones",
    text: "Salteado, al horno o revuelto: toma el sabor de lo que cocines.",
    cta: "Cómpralo en Líder",
    tone: "sage",
  },
  {
    id: "lider",
    title: "Ya está en Líder",
    text: "Búscalo en el refrigerado de tu supermercado.",
    cta: "Ir a Líder",
    tone: "terracotta",
  },
] as const;

export const intro = {
  kicker: "Orgánico · Proteína vegetal · Hecho en Chile",
  title: "Tofu como debe ser.",
  text: "Hacemos tofu orgánico en Chile para que comer rico y vegetal sea fácil. [PLACEHOLDER: historia breve de la marca, origen e ingredientes].",
};

/** Medios donde ha aparecido la marca. [PLACEHOLDER] hasta tener menciones reales. */
export const press = {
  title: "Nos han destacado en",
  items: ["[PLACEHOLDER] Medio 1", "[PLACEHOLDER] Medio 2", "[PLACEHOLDER] Medio 3", "[PLACEHOLDER] Medio 4", "[PLACEHOLDER] Medio 5"],
};

export type Product = {
  id: string;
  name: string;
  description: string;
  format: string;
  /** Categoría para los filtros de "Nuestra línea" */
  category: string;
  image: string | null; // [PLACEHOLDER] ruta de la foto en /public/images
};

/** Filtros de la sección de productos. "Todos" siempre va primero. */
export const productCategories = ["Todos", "[PLACEHOLDER] Categoría 1", "[PLACEHOLDER] Categoría 2"];

export const products: Product[] = [
  {
    id: "producto-1",
    name: "[PLACEHOLDER] Producto 1",
    description: "[PLACEHOLDER] Descripción breve: textura y mejor uso.",
    format: "[PLACEHOLDER] g",
    category: "[PLACEHOLDER] Categoría 1",
    image: null,
  },
  {
    id: "producto-2",
    name: "[PLACEHOLDER] Producto 2",
    description: "[PLACEHOLDER] Descripción breve: textura y mejor uso.",
    format: "[PLACEHOLDER] g",
    category: "[PLACEHOLDER] Categoría 1",
    image: null,
  },
  {
    id: "producto-3",
    name: "[PLACEHOLDER] Producto 3",
    description: "[PLACEHOLDER] Descripción breve: textura y mejor uso.",
    format: "[PLACEHOLDER] g",
    category: "[PLACEHOLDER] Categoría 2",
    image: null,
  },
];

export const recipes = [
  {
    id: "salteado",
    title: "Salteado de tofu con verduras",
    tag: "Sartén",
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
    tag: "Horno",
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
    tag: "Desayuno",
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

export const social = {
  title: "Síguenos",
  text: "Recetas, ideas y novedades de Zen Organics.",
};
