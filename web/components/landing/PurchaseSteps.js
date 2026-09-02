import config from "@/config"

export default function PurchaseSteps() {
  const { eyebrow, title, subtitle, steps } = config.landing.purchaseSteps

  return (
    <section id="como-comprar" className="border-y border-base-300 bg-base-100 py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">{title}</h2>
          <p className="mt-4 text-deep/70">{subtitle}</p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <li
              key={step.number}
              className="card-lift rounded-3xl border border-base-300 bg-base-200/50 p-5"
            >
              <span className="font-display text-2xl font-bold text-sky">{step.number}</span>
              <h3 className="font-display mt-2 text-lg font-bold text-deep">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-deep/70">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="inline-flex min-h-11 items-center rounded-full bg-deep px-4 text-sm font-medium text-cream">
            Mercado Pago — compra en línea
          </span>
          <span className="inline-flex min-h-11 items-center rounded-full bg-coral px-4 text-sm font-medium text-cream">
            WhatsApp — atención personalizada
          </span>
        </div>
      </div>
    </section>
  )
}
