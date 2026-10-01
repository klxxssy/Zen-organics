# Zen Organics · Landing

Landing de Zen Organics hecha con Next.js, Tailwind y React Three Fiber. Las reglas de marca y construcción están en [`CLAUDE.md`](./CLAUDE.md).

## Verla en tu computador

Necesitas Node.js 20 o superior.

```bash
git clone https://github.com/klxxssy/mK.git
cd mK
git checkout claude/install-ui-ux-pro-max-skill-fu0tu1
npm install
npm run dev
```

Después abre http://localhost:3000.

## Qué editar

| Qué | Dónde |
|---|---|
| Textos, productos, recetas, FAQ, links y redes | `src/content/site.ts` |
| Fotos | `public/images/`; en `site.ts` cambias `image: null` por `"/images/archivo.jpg"` |
| Logos de puntos de venta (solo con permiso) | `public/images/`; en `site.ts` cambias `logo: null` por la ruta |
| Foto del hero (TEMPORAL, Unsplash) | `src/content/site.ts` → `hero.backgroundImage` |
| Colores y tipografías | `src/app/globals.css` (bloque `@theme`) |

Busca `[PLACEHOLDER]` para ver todo lo que falta confirmar.

## Medición

Todos los botones hacia Líder o hacia otros proveedores envían a `window.dataLayer`:

```js
{ event: "click_lider", retailer: "lider", location: "hero", product: "producto-1" }
```

- `location` puede ser `header`, `hero`, `producto`, `otros_puntos`, `recetas`, `faq`, `donde_comprar`, `cta_final` o `sticky_mobile`.
- Para activar GTM, define `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` en `.env.local` o en Vercel.
- En desarrollo cada evento también se imprime en la consola del navegador.
