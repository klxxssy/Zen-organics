# Zen Organics · Tofu que se abre

Next.js + Tailwind CSS v4 + TypeScript (estructura shadcn: `components.json`, `@/components/ui`).

Al hacer scroll, un bloque de tofu (SVG, sin imágenes) se agrieta, se parte en dos y desde adentro sube la tarjeta con la información de la tienda. Al volver a subir, se cierra.

- Animación: `src/components/ui/tofu-open-reveal.tsx`
- **Datos de la tienda (los entrega Felipe)**: `src/content/tienda.ts`. Busca `[PLACEHOLDER]`.
- Clicks en los botones de la tienda: evento `click_tienda` en `window.dataLayer` (GTM → GA4 / Meta Pixel).

```bash
npm install
npm run dev
```
