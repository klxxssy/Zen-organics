import ZenTofuReveal from "@/components/ui/zen-tofu-reveal";

export default function Page() {
  return (
    <main>
      <ZenTofuReveal />

      {/* Landing provisoria: el contenido real llega cuando Felipe mande objetivos e info */}
      <section className="bg-cream px-4 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Tofu orgánico · Hecho en Chile</p>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-forest md:text-7xl">
          Tofu de verdad, hecho con calma.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-charcoal/80">
          [PLACEHOLDER] Aquí va la propuesta de valor de Zen Organics cuando Felipe nos mande sus objetivos.
        </p>
        <a
          href="#"
          className="mt-10 inline-flex min-h-12 items-center rounded-full bg-forest px-8 font-bold text-cream transition hover:bg-sage-deep"
        >
          Comprar ahora
        </a>
      </section>
    </main>
  );
}
