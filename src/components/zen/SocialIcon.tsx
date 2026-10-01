/** Íconos simples de redes (trazos propios, sin dependencias). */
export function SocialIcon({ id, small = false }: { id: string; small?: boolean }) {
  const size = small ? 18 : 22;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "instagram")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    );
  if (id === "facebook")
    return (
      <svg {...common}>
        <path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .4-1.8 1.9-1.8H18V3.1c-.4-.1-1.6-.2-3-.2-3 0-4.6 1.7-4.6 4.8v1.8H7.5V13h2.9v8" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2.4 4.6 5 5" />
    </svg>
  );
}
