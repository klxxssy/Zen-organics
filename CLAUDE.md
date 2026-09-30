# Zen Organics — Landing

Landing de Zen Organics, marca chilena de tofu orgánico. **La web no vende directo**: su único objetivo es derivar a comprar en Líder y otros puntos de venta. Toda decisión de diseño y copy se evalúa por cuánto facilita ese click.

Stack: Next.js (App Router) + Tailwind CSS + React Three Fiber.

## Identidad de marca (obligatorio)

- **Estilo**: serio, limpio, premium, confiable. Nada infantil, chillón ni "divertido". Sin emojis, sin ilustraciones tipo cartoon, sin tipografías display juguetonas.
- **Tono**: cercano pero profesional. Tuteo, frases claras, sin chistes ni juegos de palabras.
- **Espacio**: mucho aire. Secciones con padding vertical generoso, máximo 1 idea por bloque.
- **Fotos**: grandes, protagonistas, luz natural. Nada de stock genérico sobreexpuesto.
- **Animación**: suave y lenta (fade + desplazamiento corto, 400–700 ms, easing `ease-out`). Nada de rebotes, giros ni parallax agresivo. Respetar siempre `prefers-reduced-motion`.

### Paleta (tokens únicos, no usar otros colores)

| Token            | Hex       | Uso                                                        |
|------------------|-----------|------------------------------------------------------------|
| `cream`          | `#F5F1EA` | Fondo principal de página                                  |
| `bone`           | `#FAF8F4` | Fondo de tarjetas y secciones alternas                     |
| `sage`           | `#7A8B6F` | Acentos, íconos, fondos de botones con texto grande        |
| `sage-deep`      | `#5E6E55` | Botones con texto normal, links, hover (ver contraste)     |
| `charcoal`       | `#2B2B2B` | Textos y títulos                                           |
| `sand`           | `#D9CFC1` | Bordes, divisores, detalles                                |

**Contraste (WCAG AA)**: `sage` sobre blanco da 3.65:1, así que **no sirve para texto normal**. Úsalo con texto blanco solo en tamaño grande (≥ 24px o ≥ 18.66px bold) o como acento decorativo. Para botones y links con texto normal, usa `sage-deep` (5.47:1 sobre blanco). `sand` es solo decorativo (1.37:1 sobre `cream`) y nunca va como color de texto.

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
- La jerarquía de CTAs es fija: principal "Cómprala/Cómpralo en Líder" (sólido `sage-deep`) y secundario "Otros puntos de venta" (outline `charcoal`).

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
