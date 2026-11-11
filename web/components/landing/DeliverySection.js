import DeliveryZoneChecker from "@/components/landing/DeliveryZoneChecker"

const zones = [
  {
    title: "Entrega en casa",
    body: "Coordinamos zona y horario. Los fermentos salen refrigerados desde Chihuahua.",
    tone: "bg-deep text-cream",
  },
  {
    title: "Pago como prefieras",
    body: "SPEI, Oxxo, pago al recibir o Mercado Pago. Tú eliges al completar tu compra.",
    tone: "bg-sky text-cream",
  },
  {
    title: "Producto vivo",
    body: "Llegan fríos, listos para el refri. Te decimos hasta cuándo disfrutarlos mejor.",
    tone: "bg-orange text-cream",
  },
]

export default function DeliverySection() {
  return (
    <section id="entrega" className="bg-yellow py-16 text-deep md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Entrega
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">
          Revisa tu zona
        </h2>
        <p className="mt-4 max-w-2xl text-deep/75">
          Entregamos hasta la puerta de tu casa. Nos importa tu comodidad: tú consultas tu colonia,
          nosotros nos encargamos del resto.
        </p>

        <DeliveryZoneChecker />

        <div className="mt-10">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-deep/55">
            Cómo llega a tu refri
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {zones.map((zone) => (
              <article
                key={zone.title}
                className={`rounded-2xl px-4 py-4 shadow-sm ${zone.tone}`}
              >
                <h3 className="font-display text-base font-bold md:text-lg">{zone.title}</h3>
                <p className="mt-2 text-xs leading-relaxed opacity-90 md:text-sm">{zone.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
