const moments = [
  {
    title: "Mañana activa",
    body: "Kéfir natural con granola o en smoothie. Cremoso, probiótico y listo para arrancar el día.",
    accent: "bg-sky/15 text-sky",
  },
  {
    title: "Tarde con calor",
    body: "Tíbicos bien fríos después del gym o en la terraza. Ligero, frutal y súper refrescante.",
    accent: "bg-orange/15 text-orange",
  },
  {
    title: "Comida o snack",
    body: "Kombucha burbujeante para acompañar tu comida o esa pausa de media tarde con personalidad.",
    accent: "bg-yellow/20 text-deep",
  },
  {
    title: "Noche tranquila",
    body: "Kéfir de fresa sin endulzar, frío y suave. Un ritual pequeño antes de descansar.",
    accent: "bg-deep/10 text-deep",
  },
]

export default function ConsumptionMoments() {
  return (
    <section className="bg-base-200/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
            Momentos
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
            Cuándo tomarlos
          </h2>
          <p className="mt-4 text-deep/70">
            No hay un solo momento perfecto — hay el fermento perfecto para cada momento.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {moments.map((moment) => (
            <article
              key={moment.title}
              className="card-lift rounded-3xl border border-base-300 bg-base-100 p-6"
            >
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${moment.accent}`}
              >
                {moment.title}
              </span>
              <p className="mt-4 leading-relaxed text-deep/75">{moment.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
