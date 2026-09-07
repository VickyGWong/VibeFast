import ProductImage from "@/components/landing/ProductImage"

const steps = [
  {
    title: "Cultivos vivos",
    body: "Mantenemos nuestros cultivos madre con cuidado constante. Cada lote parte de fermento activo y saludable.",
    image: "/images/proceso-cultivos.jpg",
    alt: "Cultivos vivos de fermento en The Good Co.",
  },
  {
    title: "Ingredientes reales",
    body: "Utilizamos ingredientes de calidad y naturales: té, leche y fermento, con frutas orgánicas. Sin conservadores ni atajos. Lo que ves en la etiqueta es lo que fermenta en la botella.",
    image: "/images/proceso-ingredientes.jpg",
    alt: "Ingredientes naturales para fermentos The Good Co.",
  },
  {
    title: "Lotes pequeños",
    body: "Producimos en lotes controlados para cuidar sabor, textura y frescura. Cada entrega sale reciente de nuestro taller. Por ser una elaboración artesanal, el color, la acidez o las burbujas pueden variar ligeramente entre lotes.",
    image: "/images/proceso-lotes.jpg",
    alt: "Elaboración artesanal de lotes pequeños en The Good Co.",
  },
]

export default function ArtisanProcess() {
  return (
    <section id="proceso" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="max-w-2xl">
        <p className="font-ui text-sm font-bold uppercase tracking-wider text-sky">
          Proceso artesanal
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
          De cultivo a botella, sin prisa
        </h2>
        <p className="mt-4 text-deep/70">
          Fermentar bien toma tiempo. Respetamos ese ritmo para que cada producto llegue vivo a tu mesa.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="card-lift overflow-hidden rounded-[2rem] border border-base-300/70 bg-white shadow-sm">
            <div className="relative aspect-[4/3]">
              <ProductImage src={step.image} alt={step.alt} category="kefir" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-deep">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep/70">{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
