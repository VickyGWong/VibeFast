import Link from "next/link"
import { Clock, MessageCircle } from "lucide-react"
import WhatsAppButton from "@/components/landing/WhatsAppButton"

export const metadata = {
  title: "Pago en proceso",
}

export default function PurchasePendingPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-warning/20 text-deep">
        <Clock className="size-9" aria-hidden />
      </div>

      <h1 className="font-display mt-6 text-3xl font-bold text-deep">Pago en proceso</h1>

      <p className="mt-4 text-lg leading-relaxed text-deep/75">
        Tu pago está pendiente de confirmación en Mercado Pago. Revisa tu correo o la app de Mercado Pago
        para ver el estado. Cuando se apruebe, te contactamos para coordinar la entrega.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <WhatsAppButton source="purchase_pending" />
        <Link href="/#productos" className="btn btn-ghost min-h-11 rounded-full font-display font-bold">
          Volver al catálogo
        </Link>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-sm text-deep/60">
        <MessageCircle className="size-4" />
        ¿Prefieres pedir directo? WhatsApp siempre está disponible.
      </p>
    </section>
  )
}
