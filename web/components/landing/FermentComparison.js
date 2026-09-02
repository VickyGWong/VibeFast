const rows = [
  {
    trait: "Textura",
    kefir: "Cremosa, tipo yogurt bebible",
    kombucha: "Burbujeante, ligera",
    tibicos: "Muy ligera, refrescante",
  },
  {
    trait: "Base",
    kefir: "Leche fermentada",
    kombucha: "Té fermentado",
    tibicos: "Agua de kefir de frutos",
  },
  {
    trait: "Sabor",
    kefir: "Suave, ácido equilibrado",
    kombucha: "Ácido, té, burbujas",
    tibicos: "Frutal, suave, hidratante",
  },
  {
    trait: "Ideal para",
    kefir: "Desayuno, smoothies, snack",
    kombucha: "Tarde, comida, digestión",
    tibicos: "Calor, hidratación, tarde",
  },
]

export default function FermentComparison() {
  return (
    <section className="bg-deep py-16 text-cream md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
            Comparativa
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold md:text-4xl">
            ¿Kéfir, kombucha o tíbicos?
          </h2>
          <p className="mt-4 text-cream/75">
            Tres fermentos, tres personalidades. Así se diferencian para que elijas con confianza.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-cream/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-cream/10 bg-cream/5">
                <th className="p-4 font-display font-bold">Característica</th>
                <th className="p-4 font-display font-bold">Kéfir</th>
                <th className="p-4 font-display font-bold">Kombucha</th>
                <th className="p-4 font-display font-bold">Tíbicos</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.trait} className="border-b border-cream/10 last:border-0">
                  <th className="p-4 font-medium text-sky">{row.trait}</th>
                  <td className="p-4 text-cream/85">{row.kefir}</td>
                  <td className="p-4 text-cream/85">{row.kombucha}</td>
                  <td className="p-4 text-cream/85">{row.tibicos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
