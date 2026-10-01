# Zen Organics — Landing

Landing de Zen Organics, marca chilena de tofu orgánico. **La web no vende directo**: su único objetivo es derivar a comprar en Líder y otros puntos de venta. Toda decisión de diseño y copy se evalúa por cuánto facilita ese click.

Stack: Next.js (App Router) + Tailwind CSS + React Three Fiber.

## Identidad de marca (obligatorio)

- **Estilo**: marca de comida premium y moderna, con vida y color, sin perder la seriedad. Debe despertar apetito. Nada infantil ni caricaturesco: sin emojis, sin ilustraciones cartoon, sin tipografías display juguetonas.
- **Tono**: cercano pero profesional. Tuteo, frases claras, sin chistes ni juegos de palabras.
- **Ritmo**: alternar secciones claras (crema/hueso) y oscuras (verde bosque). Mucho aire, máximo 1 idea por bloque.
- **Fotos**: grandes, protagonistas, luz natural y tonos cálidos de comida. Los placeholders de comida usan tonos cálidos (dorado/arena), nunca grises.
- **Animación**: viva pero suave. Entradas escalonadas, fade + desplazamiento corto (400–700 ms, `ease-out`), hovers con elevación y zoom suave. Nada de rebotes ni parallax agresivo. Toda animación continua (gradiente, franja, 3D) **se pausa fuera de pantalla** y se detiene con `prefers-reduced-motion`.

### Paleta (tokens únicos, no usar otros colores)

| Token            | Hex       | Uso                                                                  |
|------------------|-----------|----------------------------------------------------------------------|
| `cream`          | `#F5F1EA` | Base: fondo principal                                                |
| `bone`           | `#FAF8F4` | Base: tarjetas y secciones claras alternas                           |
| `forest`         | `#2F4030` | Secciones de contraste (beneficios, franja, CTA final)               |
| `gold`           | `#C8843A` | Acento "tofu salteado": CTA de compra, badges, números, detalles, hovers |
| `sage`           | `#7A8B6F` | Acentos decorativos e íconos, gradiente del hero                     |
| `sage-deep`      | `#5E6E55` | Links y texto de acento sobre fondos claros                          |
| `charcoal`       | `#2B2B2B` | Textos y títulos sobre fondos claros; texto sobre `gold`             |
| `sand`           | `#D9CFC1` | Bordes, divisores, detalles                                          |

En materiales 3D y placeholders de comida se permiten tonos naturales de alimento (verde edamame, tostados) derivados de esta paleta.

**Contraste (WCAG AA), verificado:**
- `charcoal` sobre `gold`: 4.6:1. Es el texto obligatorio dentro de botones y badges dorados.
- `bone` sobre `forest`: 10.4:1. Es el texto en secciones oscuras.
- `gold` sobre `forest`: 3.6:1. Solo sirve para texto grande (≥ 24px) o detalles no textuales.
- `gold` sobre `cream` o `bone`: 2.7:1. **Nunca como texto**, solo superficies, líneas y fondos de badge.
- `sage` sobre blanco: 3.65:1. No sirve para texto normal; para links usa `sage-deep` (4.9:1 sobre `cream`).
- `sand` es solo decorativo; nunca va como color de texto sobre fondos claros.

### Tipografía

- Títulos: **Fraunces** (serif), pesos 400–600. Nunca en mayúsculas completas.
- Textos, botones y UI: **Inter**, pesos 400–600.
- Cargar ambas con `next/font/google` (self-hosted, `display: swap`). Nada de `@import` de Google Fonts.
- Cuerpo mínimo 16px, interlineado 1.6, líneas de 60–75 caracteres.

## Reglas de contenido

- **No inventar datos.** Cifras nutricionales, certificaciones, precios, links, dirección, teléfono, redes y nombres de puntos de venta distintos de Líder van como `[PLACEHOLDER]`.
- Nunca afirmar "certificado orgánico" ni ningún sello sin tener el dato. Usa `[PLACEHOLDER: certificación]`.
- Centralizar todo el copy y los links en `src/content/` para que se editen sin tocar componentes.

## Referencia (tofoo.co.uk)

Se usa **solo** como referencia de estructura y ritmo: orden de secciones, cómo presentan los beneficios, cómo resuelven dudas y cómo derivan a los supermercados.
**Prohibido copiar** sus textos, colores, tipografías, ilustraciones, formas inclinadas o elementos de marca. Zen Organics debe verse como una marca distinta.

## Conversión y medición

- Todo botón que lleva a Líder o a otro proveedor:
  - abre en pestaña nueva: `target="_blank" rel="noopener noreferrer"`;
  - dispara el evento `click_lider` con `{ retailer, location, product }` vía `window.dataLayer.push` (compatible con GTM → GA4 / Meta Pixel);
  - pasa por un único componente `<RetailerLink>`. No crear links de compra ad hoc.
- **"Comprar en Líder" es lo que más resalta en cada pantalla.** Va como botón sólido `gold` con texto `charcoal`, sombra cálida y flecha que se mueve en hover. Ningún otro elemento dorado puede tener más peso visual que el botón en la misma pantalla.
- El CTA secundario "Otros puntos de venta" va en outline (`charcoal` en fondos claros, `bone` en fondos oscuros).

## Hero

- Fondo con gradiente animado tipo mesh (crema, salvia y dorado suaves), movimiento lento (20 s o más) y grano sutil. Va en CSS y se mueve solo con `transform`.
- **Desktop**: tofu principal en 3D rodeado de cubos de tofu pequeños y granos de edamame flotando en distintas profundidades, con parallax suave según el mouse.
- **Mobile**: el mismo gradiente CSS en versión liviana más la imagen del producto, sin WebGL.
- El gradiente y el 3D se pausan cuando el hero sale de pantalla.

## Vida en el resto de la página

- Tarjetas con entrada escalonada.
- Productos: en hover la tarjeta se eleva y la foto hace zoom suave.
- Franja de texto en movimiento infinito entre secciones: "Orgánico · Proteína vegetal · Hecho en Chile". Se pausa en hover y fuera de pantalla, tiene botón de pausa y queda quieta con reducir movimiento.

## Performance y mobile

- **Mobile first**: diseñar primero en 375px y luego ampliar a 768, 1024 y 1440.
- En mobile (< 1024px o sin WebGL) **no se carga el 3D**: se muestra una imagen del producto.
- El modelo `/public/models/tofu.glb` se carga de forma diferida (`next/dynamic` con `ssr: false`), solo en desktop y después del primer render. Comprimirlo con Draco o Meshopt y usar un poster como fallback.
- Imágenes siempre con `next/image`, en AVIF/WebP, con `sizes` correctos. Solo la imagen del hero lleva `priority`.
- Objetivos: LCP < 2.5s en mobile 4G, CLS < 0.1 y JS inicial mínimo.

## Accesibilidad

- Foco visible en todos los elementos interactivos. Usar HTML semántico (`header`, `main`, `section`, `footer`).
- El acordeón de FAQ va con `<details>/<summary>` o con ARIA correcto.
- Todas las imágenes llevan `alt` descriptivo en español. El canvas 3D lleva `aria-hidden` y texto alternativo.
