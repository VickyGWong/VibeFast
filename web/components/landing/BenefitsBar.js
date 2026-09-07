const benefits = [
  { title: "Cultivo vivo", body: "Sin pasteurizar. Se siente en el sabor y en las burbujas." },
  { title: "Sin conservadores", body: "Ingredientes reales: leche, té, fruta y fermento." },
  { title: "Refrigerados", body: "Viajan fríos y se cuidan como producto vivo." },
  { title: "Hechos en Chihuahua", body: "Lotes pequeños, entrega local y cara conocida." },
]

export default function BenefitsBar() {
  return (
    <section className="bg-deep py-10 text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div key={benefit.title}>
            <p className="font-display text-lg font-bold">{benefit.title}</p>
            <p className="mt-1 text-sm text-cream/75">{benefit.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
