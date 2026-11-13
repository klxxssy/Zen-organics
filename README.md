# Zen Organics · Landing animada

Al abrir la página se ve el **envase de Zen Organics entero**. Al deslizar, el envase se raja, se rompe y **asoma el tofu** (con brillo, temblor de tofu y destellos dorados); después sigue la landing.

- Componente: `src/components/ui/zen-tofu-reveal.tsx` (basado en Tiger Tear Reveal)
- Página: `src/app/page.tsx` (la sección de abajo es provisoria, falta la info de Felipe)
- Colores y tipografías: `src/app/globals.css` y `src/app/layout.tsx` (Lilita One + DM Sans)
- En celular el envase se arma en dos líneas ("Zen" / "Organics") y la rotura queda entre ambas.
- Respeta "reducir movimiento" del sistema.

## Ver en local
```
npm install
npm run dev
```
Abrir http://localhost:3000

## Pendiente
- Foto/diseño real del envase y gramaje (`detail` dice `[PLACEHOLDER]`).
- Contenido de la landing (objetivos e info de Felipe).
- Hosting de Felipe (export estático).
