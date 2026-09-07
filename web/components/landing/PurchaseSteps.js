import Link from "next/link"
import { CreditCard, MapPin } from "lucide-react"
import config from "@/config"
import WhatsAppButton from "@/components/landing/WhatsAppButton"

export default function PurchaseSteps() {
  const { eyebrow, title, subtitle, intro, steps } = config.landing.purchaseSteps

  return (
    <section id="como-comprar" className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="font-ui text-sm font-bold uppercase tracking-wider text-sky">
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">{title}</h2>
          <p className="mt-4 text-deep/70">{subtitle}</p>
        </div>

        {intro && (
          <div className="mt-10 rounded-[1.5rem] border border-sky/25 bg-sky/10 p-6 md:p-7">
            <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-sky">
              Antes de pedir
            </p>
            <h3 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
              {intro.title}
            </h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-deep/75">{intro.body}</p>
          </div>
        )}

        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-[1.5rem] border border-base-300/70 bg-cream p-5"
            >
              <span className="font-price text-2xl font-bold text-sky">{step.number}</span>
              <h3 className="font-display mt-2 text-lg font-bold text-deep">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-deep/70">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#entrega"
            className="btn min-h-11 gap-2 rounded-full border-0 bg-sky px-5 font-ui font-bold text-cream hover:bg-sky/90"
          >
            <MapPin className="size-4" aria-hidden />
            Descubre las zonas de entrega
          </Link>
          <WhatsAppButton source="purchase_steps" label="WhatsApp" />
          <Link
            href="/#productos"
            className="btn min-h-11 gap-2 rounded-full border-0 bg-deep px-5 font-ui font-bold text-cream hover:bg-deep/90"
          >
            <CreditCard className="size-4" aria-hidden />
            Mercado Pago
          </Link>
        </div>
      </div>
    </section>
  )
}
