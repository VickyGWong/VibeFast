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
          <p className="font-ui text-sm font-bold uppercase tracking-wider text-sky">
            Comparativa
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">
            Conoce y compara
          </h2>
          <p className="mt-4 text-cream/75">
            Tres fermentos, tres personalidades. Así se diferencian para que elijas con confianza.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-cream/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr>
                <th className="bg-cream/10 p-4 font-display font-bold">Característica</th>
                <th className="bg-sky p-4 font-display font-bold text-cream">Kéfir</th>
                <th className="bg-yellow p-4 font-display font-bold text-deep">Kombucha</th>
                <th className="bg-orange p-4 font-display font-bold text-cream">Tíbicos</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.trait} className="border-b border-cream/10 last:border-0">
                  <th className="bg-cream/5 p-4 font-ui font-medium text-sky">{row.trait}</th>
                  <td className="bg-sky/15 p-4 text-cream">{row.kefir}</td>
                  <td className="bg-yellow/15 p-4 text-cream">{row.kombucha}</td>
                  <td className="bg-orange/20 p-4 text-cream">{row.tibicos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
