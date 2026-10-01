# Zen Organics — Landing

Landing de Zen Organics, marca chilena de tofu orgánico. **La web no vende directo**: su único objetivo es derivar a comprar en Líder y otros puntos de venta. Toda decisión de diseño y copy se evalúa por cuánto facilita ese click.

Stack: Next.js (App Router) + Tailwind CSS. Estructura de página inspirada en tofoo.co.uk (rama `zen-tofoo`), con la identidad de Zen Organics.

## Identidad de marca (obligatorio)

- **Estilo**: marca de comida premium y moderna, con vida, color y títulos con personalidad, sin perder la seriedad. Debe despertar apetito. Nada caricaturesco: sin emojis ni ilustraciones cartoon.
- **Tono**: cercano pero profesional. Tuteo, frases claras, sin chistes ni juegos de palabras.
- **Ritmo**: las secciones son **bloques de color con bordes redondeados** (radio 32–48px), separados del borde de la pantalla (12px en mobile, 24px en desktop) sobre el fondo `cream`. Alternan bloques claros (`bone`, `sage-tint`) y oscuros (`forest`). Mucho aire, máximo 1 idea por bloque.
- **Personalidad (inspiración tofoo.co.uk, adaptada)**: títulos gruesos y redondeados, badges tipo sticker, bloques de color redondeados y tarjetas de receta con la comida sobre color sólido. **Nunca**: su tipografía, bloques inclinados, sus colores, textos o imágenes.
- **Fotos**: grandes, protagonistas, luz natural y tonos cálidos de comida. Los placeholders de comida usan tonos cálidos (dorado/arena), nunca grises.
- **Animación**: viva pero suave. Entradas escalonadas, fade + desplazamiento corto (400–700 ms, `ease-out`), hovers con elevación y zoom suave. Nada de rebotes ni parallax agresivo. Toda animación continua (como la franja) **se pausa fuera de pantalla** y se detiene con `prefers-reduced-motion`.

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
- Los títulos grandes (h1/h2) entran palabra por palabra al hacer scroll (fade + subida corta, ~70 ms entre palabras). Con reducir movimiento se muestran completos y quietos.

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

## Estructura de la página (inspirada en tofoo.co.uk)

1. Hero en carrusel (`HeroSlider`): bloque `forest`, título gigante, CTA de compra y envases sobre un círculo de color (`gold`, `sage` o `terracotta` según el slide). Autoplay con botón de pausa; se detiene con hover, foco, fuera de pantalla y reducir movimiento.
2. Intro: título grande, kicker en mayúsculas pequeñas y párrafo de marca.
3. Fila de stickers en movimiento (`MarqueeRow`).
4. "Nos han destacado en": medios `[PLACEHOLDER]`.
5. Aprende a prepararlo: bloque `gold` con 3 tarjetas `bone` (etiqueta tipo sticker y pasos desplegables).
6. Nuestra línea: bloque `sage-tint` con filtros tipo chip y tarjetas de producto.
7. Encuéntranos en: puntos de venta en movimiento.
8. Recetas: bloque `forest` con carrusel (scroll nativo, flechas y puntos); la comida va sobre `gold`, `terracotta` o `sage`.
9. Preguntas: bloque `terracotta` con preguntas en tarjetas `bone` (el texto `bone` sobre `terracotta` solo en el título grande).
10. Síguenos: redes sociales.
11. Footer: bloque `forest` con logo grande, CTA de compra, links y plato que asoma.

## Header

- Fondo `forest`; logo centrado en una cápsula `cream`, con 2 links a cada lado (escritorio) y el botón "Comprar en Líder" en `gold` a la derecha. En mobile: logo, botón y menú hamburguesa (el menú incluye todos los links).
- **Arriba de todo** (sin scroll): ocupa todo el ancho, es alto (≈112px en desktop y 80px en mobile), con el logo grande, los links en letra grande y mucho espacio entre ellos.
- **Al hacer scroll**: se achica con una transición suave (menos alto y logo más chico) y se convierte en una barra flotante con bordes redondeados, separada de los bordes de la pantalla y con sombra. Al volver arriba recupera su tamaño grande.
- **Mobile**: el mismo comportamiento con menú hamburguesa; el menú desplegado también va en `forest`.
- El hero reserva siempre la altura del header grande, así nunca tapa el título. Con reducir movimiento el cambio es instantáneo.
- Hover de links: subrayado `gold` (el texto se mantiene en `cream`, porque `gold` sobre `forest` no da contraste para texto normal). El foco visible en el header va en `gold`.

## Vida en la página

- Tarjetas con entrada escalonada y títulos palabra por palabra.
- Hover: las tarjetas se elevan y las fotos hacen zoom suave.
- Toda fila en movimiento tiene botón de pausa, se pausa en hover y fuera de pantalla, y queda quieta con reducir movimiento.

## Performance y mobile

- **Mobile first**: diseñar primero en 375px y luego ampliar a 768, 1024 y 1440.
- Imágenes siempre con `next/image`, en AVIF/WebP, con `sizes` correctos. Solo la imagen del hero lleva `priority`.
- Objetivos: LCP < 2.5s en mobile 4G, CLS < 0.1 y JS inicial mínimo.

## Accesibilidad

- Foco visible en todos los elementos interactivos. Usar HTML semántico (`header`, `main`, `section`, `footer`).
- El acordeón de FAQ va con `<details>/<summary>` o con ARIA correcto.
- Todas las imágenes llevan `alt` descriptivo en español. 
