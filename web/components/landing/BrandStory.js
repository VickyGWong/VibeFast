import config from "@/config"

export default function BrandStory() {
  return (
    <section id="historia" className="bg-orange py-20 text-cream md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-balance text-3xl font-bold leading-tight md:text-5xl">
          Nacimos porque cuidarse no debería sentirse aburrido
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/90">
          The Good Co. nació en Chihuahua para hacer fermentos honestos, ricos y con personalidad.
          Respetamos los tiempos de fermentación, usamos ingredientes reales y producimos en lotes
          pequeños. Sin estética fría ni promesas vacías: lo bueno se nota en el sabor.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/90">
          Evitamos ingredientes y procesos industrializados para preservar, en la medida de lo
          posible, los beneficios propios de los fermentos vivos. Lo hacemos porque nos importa la
          salud de nuestra comunidad: preferimos el cuidado artesanal a los atajos de la producción
          masiva.
        </p>
        <p className="font-display mt-10 text-2xl font-bold md:text-3xl">{config.app.tagline}</p>
      </div>
    </section>
  )
}
