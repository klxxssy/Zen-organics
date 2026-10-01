# Zen Organics — Landing

Landing de Zen Organics, marca chilena de tofu orgánico. **La web no vende directo**: su único objetivo es derivar a comprar en Líder y otros puntos de venta. Toda decisión de diseño y copy se evalúa por cuánto facilita ese click.

Stack: Next.js (App Router) + Tailwind CSS. Contenido en `src/content/zen.ts`, componentes en `src/components/zen/`.

## Identidad visual

- **Lenguaje visual de tofoo.co.uk, con los colores y la tipografía de Zen Organics**:
  - hero y header del mismo color (`gold`);
  - secciones de borde a borde con cortes en diagonal;
  - bloques de color levemente inclinados (±1–1.5°) con el contenido recto;
  - stickers girados, etiquetas tipo pestaña, botones negros con flecha y cuadraditos de navegación.
- **No se copia** de Tofoo: textos, logos, fotos, ilustraciones ni su tipografía.
- **Tono**: cercano pero profesional. Tuteo, frases claras, sin chistes ni juegos de palabras.
- **Fotos**: grandes, con luz natural y tonos cálidos de comida. Los envases, idealmente en PNG recortado.
- **Animación**:
  - títulos que suben palabra por palabra, entradas al hacer scroll y hovers que elevan o enderezan;
  - todo lo continuo (carrusel, filas en movimiento) tiene botón de pausa, se detiene fuera de pantalla y con `prefers-reduced-motion`.

### Paleta (tokens únicos, no usar otros colores)

| Token            | Hex       | Uso                                                                  |
|------------------|-----------|----------------------------------------------------------------------|
| `cream`          | `#F5F1EA` | Base: fondo principal                                                |
| `bone`           | `#FAF8F4` | Base: tarjetas y secciones claras alternas                           |
| `forest`         | `#2F4030` | Secciones de contraste (beneficios, franja, CTA final)               |
| `gold`           | `#C8843A` | Acento "tofu salteado": CTA de compra, badges, números, detalles, hovers |
| `sage`           | `#7A8B6F` | Acentos decorativos e íconos                                         |
| `sage-deep`      | `#5E6E55` | Links y texto de acento sobre fondos claros                          |
| `charcoal`       | `#2B2B2B` | Textos y títulos sobre fondos claros; texto sobre `gold`             |
| `sand`           | `#D9CFC1` | Bordes, divisores, detalles                                          |
| `sage-tint`      | `color-mix(sage 25%, cream)` | Fondo de bloques claros alternos (texto `forest`, 7.6:1) |
| `terracotta`     | `#B4603A` | Solo fondo de tarjetas de receta (tono de comida). Nunca con texto encima |

En placeholders de comida se permiten tonos naturales de alimento (verde edamame, tostados) derivados de esta paleta.

**Contraste (WCAG AA), verificado:**
- `charcoal` sobre `gold`: 4.6:1. Es el texto obligatorio dentro de botones y badges dorados.
- `bone` sobre `forest`: 10.4:1. Es el texto en secciones oscuras.
- `gold` sobre `forest`: 3.6:1. Solo sirve para texto grande (≥ 24px) o detalles no textuales.
- `gold` sobre `cream` o `bone`: 2.7:1. **Nunca como texto**, solo superficies, líneas y fondos de badge.
- `sage` sobre blanco: 3.65:1. No sirve para texto normal; para links usa `sage-deep` (4.9:1 sobre `cream`).
- `sand` es solo decorativo; nunca va como color de texto sobre fondos claros.
- Sobre `sage-tint`, el texto de acento va en `forest`, no en `sage-deep` (3.9:1).

### Tipografía

- Títulos: **Lilita One** (Google Fonts): gruesa, redondeada y con personalidad. Tiene un solo peso (400); no usar negrita sintética. Tracking normal, nunca en mayúsculas completas. Soporta acentos, ñ y ¿¡.
- Textos, botones y UI: **DM Sans**, pesos 400–700.
- Cargar ambas con `next/font/google` (self-hosted, `display: swap`). Nada de `@import` de Google Fonts.
- Clases: `font-display` para títulos y `font-sans` para el resto.
- Cuerpo mínimo 16px, interlineado 1.6, líneas de 60–75 caracteres.
- Los títulos grandes entran palabra por palabra (`PopWords`). Con reducir movimiento se muestran completos y quietos.

## Reglas de contenido

- **No inventar datos.** Cifras nutricionales, certificaciones, precios, links, dirección, teléfono, redes y nombres de puntos de venta distintos de Líder van como `[PLACEHOLDER]`.
- Nunca afirmar "certificado orgánico" ni ningún sello sin tener el dato. Usa `[PLACEHOLDER: certificación]`.
- Todo el copy y los links van en `src/content/zen.ts`.

## Conversión y medición

- Todo botón que lleva a Líder o a otro proveedor:
  - abre en pestaña nueva: `target="_blank" rel="noopener noreferrer"`;
  - dispara el evento `click_lider` con `{ retailer, location, product }` vía `window.dataLayer.push` (compatible con GTM → GA4 / Meta Pixel);
  - pasa por un único componente `<BuyButton>`. No crear links de compra ad hoc.
- El botón de compra es una píldora `charcoal` con texto `cream` en mayúsculas, flecha y sombra dura. Sobre fondos `forest` va en `cream`. Es el elemento con más contraste de cada pantalla.

## Estructura de la página (`src/components/zen/`)

1. **`SiteHeader`**: fondo `gold`, links en mayúsculas a ambos lados y el logo en una burbuja `cream` al centro que sobresale, más el botón de compra con ícono. Se compacta al hacer scroll. En mobile: menú, logo y botón.
2. **`HeroCarousel`**: `gold` a todo el ancho con corte diagonal abajo, título gigante, botón negro, envases girados a la derecha, cuadraditos de navegación y botón de pausa.
3. **Intro, stickers y prensa**: intro, fila de stickers en movimiento (`Ticker`) y "Nos han destacado en" (`[PLACEHOLDER]`).
4. **"Encuentra tu forma"**: bloque inclinado `forest` con 3 tarjetas (pestaña, foto sobre una mancha de color y pasos desplegables).
5. **"Nuestra línea"**: bloque inclinado `sage-deep`, filtros tipo chip y tarjetas giradas.
6. **Puntos de venta**: dos filas en movimiento.
7. **Recetas**: `sage` a todo el ancho con cortes diagonales y carrusel con flechas cuadradas.
8. **Banner "Ya lo puedes encontrar en Líder"**: bloque inclinado `forest`.
9. **Preguntas**: bloque inclinado `terracotta`. El texto `bone` va solo en el título grande.
10. **Redes y footer**: footer `gold` con corte diagonal arriba.

## Performance y mobile

- **Mobile first**: diseñar primero en 375px y luego ampliar a 768, 1024 y 1440.
- Imágenes siempre con `next/image`, en AVIF/WebP, con `sizes` correctos. Solo la imagen del hero lleva `priority`.
- Objetivos: LCP < 2.5s en mobile 4G, CLS < 0.1 y JS inicial mínimo.

## Accesibilidad

- Foco visible en todos los elementos interactivos. Usar HTML semántico (`header`, `main`, `section`, `footer`).
- El acordeón de FAQ va con `<details>/<summary>` o con ARIA correcto.
- Todas las imágenes llevan `alt` descriptivo en español. 
