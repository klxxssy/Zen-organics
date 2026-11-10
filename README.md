# Tiger Tear Reveal

Next.js + Tailwind CSS v4 + TypeScript, with the shadcn project structure (`components.json`, `@/components/ui`, `@/lib/utils`).

- Component: `src/components/ui/tiger-tear-reveal.tsx` (from 21st.dev, unchanged)
- Demo: `src/components/demo.tsx`, rendered at `/`

```bash
npm install
npm run dev
```

## Animación (mejoras)

- **Entrada al cargar:** la frase baja y la palabra crece con un leve rebote.
- **En reposo:** el póster respira y cada ~5 s el tigre golpea desde atrás (temblor + grietita que asoma y se cierra).
- **Scroll:** la animación persigue al scroll con velocidad máxima, así que aunque bajes rápido la rotura se ve completa (~2 s) en vez de saltar a los ojos. Al subir, el papel se cierra.
- **Tigre:** sube con un leve rebote; luego los ojos siguen el puntero, parpadean y entrecierran al hacer clic.
- **Reducir movimiento:** sin animaciones; muestra el estado final.
