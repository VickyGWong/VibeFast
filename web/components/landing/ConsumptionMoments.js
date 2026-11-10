import ProductImage from "@/components/landing/ProductImage"

const moments = [
  {
    title: "Mañana activa",
    body: "Una idea: kéfir natural con granola o en un smoothie. Cremoso y vivo para quienes quieren empezar el día con algo suave.",
    accent: "bg-sky/15 text-sky",
    image: "/images/momento-manana.jpg",
    alt: "Bowl de kéfir con fresa, mango y granola sobre mesa azul",
  },
  {
    title: "Tarde con calor",
    body: "Puedes probar tíbicos bien fríos después de moverte o en la terraza. Ligero, frutal y refrescante — si ese es tu momento.",
    accent: "bg-orange/15 text-orange",
    image: "/images/textura-fermento.jpg",
    alt: "Textura viva y ámbar de un fermento The Good Co.",
  },
  {
    title: "Comida o snack",
    body: "Hay quien acompaña la comida o la media tarde con kombucha. Es solo una sugerencia: elige el fermento que más te apetezca.",
    accent: "bg-yellow/20 text-deep",
    image: "/images/momento-comida.jpg",
    alt: "Vaso de fermento ámbar con tostadas de aguacate en mesa azul",
  },
  {
    title: "Noche tranquila",
    body: "Si te gusta un ritual pequeño antes de descansar, el kéfir de fresa sin endulzar, frío y suave, puede ser una opción.",
    accent: "bg-deep/10 text-deep",
    image: "/images/kefir-fresa.jpg",
    alt: "Kéfir de fresa cremoso con fresas frescas",
  },
]

export default function ConsumptionMoments() {
  return (
    <section className="bg-sky/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
            Sugerencias de consumo
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-5xl">
            Momentos en los que pueden acompañarte
          </h2>
          <p className="mt-4 text-deep/70">
            Estas son ideas, no reglas. Cada persona encuentra su ritmo; úsalas como inspiración
            para integrar los fermentos a tu día.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {moments.map((moment) => (
            <article
              key={moment.title}
              className="card-lift overflow-hidden rounded-[1.5rem] border border-sky/20 bg-white"
            >
              <div className="relative aspect-[16/10]">
                <ProductImage
                  src={moment.image}
                  alt={moment.alt}
                  category="kefir"
                  temporary={false}
                />
              </div>
              <div className="p-6">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${moment.accent}`}
                >
                  {moment.title}
                </span>
                <p className="mt-4 leading-relaxed text-deep/75">{moment.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
