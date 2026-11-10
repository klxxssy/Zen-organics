import TofuOpenReveal from "@/components/ui/tofu-open-reveal";

export default function Page() {
  return (
    <main>
      <TofuOpenReveal />
      {/* Cierre: deja espacio para que el escenario fijo termine de pasar */}
      <section className="flex min-h-[50svh] items-center justify-center bg-cream px-6 text-center">
        <p className="font-display text-3xl text-forest md:text-4xl">Zen Organics · Tofu orgánico hecho en Chile</p>
      </section>
    </main>
  );
}
