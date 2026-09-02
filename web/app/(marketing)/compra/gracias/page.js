"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { products } from "@/data/products"
import { formatPrice, getGeneralWhatsAppUrl } from "@/lib/whatsapp"
import { trackPurchase } from "@/lib/analytics/track"
import WhatsAppButton from "@/components/landing/WhatsAppButton"

function PurchaseSuccessContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  const variantId = searchParams.get("variant")
  const status = searchParams.get("status")

  const product = products.find((p) => p.id === productId)
  const variant = product?.variants.find((v) => v.id === variantId) ?? null

  useEffect(() => {
    if (product && status === "approved") {
      trackPurchase(product, variant)
    }
  }, [product, variant, status])

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="size-9" aria-hidden />
      </div>

      <h1 className="font-display mt-6 text-3xl font-bold text-deep md:text-4xl">
        ¡Gracias por tu compra!
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-deep/75">
        {status === "approved"
          ? "Tu pago fue procesado por Mercado Pago. En breve te contactamos para coordinar la entrega en Chihuahua."
          : "Recibimos tu solicitud. Revisa tu correo o la app de Mercado Pago para el estado del pago."}
      </p>

      {product && (
        <div className="mt-8 rounded-3xl border border-base-300 bg-base-100 p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-sky">Resumen</p>
          <p className="font-display mt-2 text-xl font-bold text-deep">{product.name}</p>
          {variant && (
            <p className="mt-1 text-sm text-deep/70">Variante: {variant.label}</p>
          )}
          <p className="mt-2 text-deep/70">
            {product.size} · ${formatPrice(product.priceCents)} MXN
          </p>
        </div>
      )}

      <div className="mt-8 space-y-3">
        <p className="text-sm font-medium text-deep/80">¿Siguiente paso?</p>
        <p className="text-sm text-deep/60">
          Te escribiremos por WhatsApp para confirmar dirección y horario de entrega. Si tienes dudas,
          escríbenos directamente.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <WhatsAppButton source="purchase_success" />
        <Link href="/#productos" className="btn btn-ghost min-h-11 rounded-full font-display font-bold">
          Seguir comprando
        </Link>
      </div>

      <p className="mt-8 text-xs text-deep/50">
        ¿Problemas con el pago?{" "}
        <Link href={getGeneralWhatsAppUrl()} className="text-sky underline">
          Escríbenos por WhatsApp
        </Link>{" "}
        o intenta de nuevo desde el catálogo.
      </p>
    </section>
  )
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-deep/60">Cargando…</div>}>
      <PurchaseSuccessContent />
    </Suspense>
  )
}
