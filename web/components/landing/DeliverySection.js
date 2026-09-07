const zones = [
  {
    title: "Entrega en casa",
    body: "Coordinamos zona y horario por WhatsApp. Los fermentos salen refrigerados desde Chihuahua.",
  },
  {
    title: "Pago como prefieras",
    body: "Puedes pagar en línea con Mercado Pago o confirmar el pedido y pagar al coordinar la entrega.",
  },
  {
    title: "Producto vivo",
    body: "Llegan fríos, listos para el refri. Te decimos hasta cuándo disfrutarlos mejor.",
  },
]

export default function DeliverySection() {
  return (
    <section id="entrega" className="bg-yellow py-16 text-deep md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-deep/70">
          Entrega
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">
          Cómo llega a tu refri
        </h2>
        <p className="mt-4 max-w-2xl text-deep/75">
          Hoy entregamos en Chihuahua. Tú eliges la zona y la hora; nosotros armamos el pedido y te
          confirmamos por WhatsApp.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {zones.map((zone) => (
            <article key={zone.title} className="rounded-[1.5rem] bg-cream p-6">
              <h3 className="font-display text-xl font-bold text-deep">{zone.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep/70">{zone.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
