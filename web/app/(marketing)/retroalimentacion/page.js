import Link from "next/link"
import config from "@/config"
import FeedbackForm from "@/components/landing/FeedbackForm"

export const metadata = {
  title: "Retroalimentación",
  description:
    "Cuéntanos qué te pareció el sabor y la presentación de tus fermentos The Good Co., y cómo fue tu compra y entrega en Chihuahua.",
}

export default function FeedbackPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky/15 via-cream to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 py-14 md:py-20">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Tu opinión
        </p>
        <h1 className="font-display mt-3 text-balance text-4xl font-bold text-deep md:text-5xl">
          Retroalimentación
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-deep/70">
          Nos importa el sabor y cómo se presenta cada botella. También queremos
          saber cómo compraste y cómo llegó tu pedido. Con eso afinamos lotes y
          entregas en {config.contact.city}.
        </p>
        <p className="mt-3 text-sm text-deep/55">
          ¿Aún no has pedido?{" "}
          <Link href="/#productos" className="font-medium text-sky underline underline-offset-2">
            Mira el catálogo
          </Link>
          .
        </p>

        <div className="mt-10">
          <FeedbackForm />
        </div>
      </div>
    </div>
  )
}
