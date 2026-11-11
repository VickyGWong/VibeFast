import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle2, MessageCircle } from "lucide-react"
import { getOrderById } from "@/lib/checkout/store"
import { formatPrice, getGeneralWhatsAppUrl } from "@/lib/whatsapp"

export async function generateMetadata({ params }) {
  const { orderId } = await params
  return { title: `Pedido ${orderId} | The Good Co.` }
}

export default async function OrderConfirmationPage({ params }) {
  const { orderId } = await params
  const order = await getOrderById(orderId)
  if (!order) notFound()

  return (
    <section className="bg-cream py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-[2rem] border border-base-300 bg-white p-6 md:p-8">
          <div className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="font-display mt-5 text-3xl font-bold text-deep md:text-4xl">
            ¡Pedido recibido!
          </h1>
          <p className="mt-3 text-deep/75">
            Guardamos tu compra en la página. Número de pedido:{" "}
            <strong className="text-deep">{order.id}</strong>
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-sky">Agenda</dt>
              <dd className="mt-1 font-ui font-bold text-deep">{order.slotLabel}</dd>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-sky">Fulfillment</dt>
              <dd className="mt-1 font-ui font-bold text-deep">
                {order.fulfillment === "pickup" ? "Recolección" : "Entrega a domicilio"}
              </dd>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-sky">Pago</dt>
              <dd className="mt-1 font-ui font-bold text-deep">{order.paymentLabel}</dd>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-sky">Total</dt>
              <dd className="mt-1 font-ui font-bold text-deep">
                ${formatPrice(order.totalCents)} MXN
              </dd>
            </div>
          </dl>

          {order.fulfillment === "delivery" && order.delivery && (
            <div className="mt-6 rounded-2xl border border-base-200 p-4">
              <p className="font-display font-bold text-deep">Entrega</p>
              <p className="mt-2 text-sm text-deep/75">{order.delivery.address}</p>
              {order.delivery.instructions && (
                <p className="mt-2 text-sm text-deep/65">
                  Instrucciones: {order.delivery.instructions}
                </p>
              )}
              <p className="mt-2 text-sm text-deep/65">
                Envío: {order.delivery.feeLabel || `$${formatPrice(order.deliveryFeeCents)} MXN`}
              </p>
            </div>
          )}

          {order.transfer && (
            <div className="mt-6 rounded-2xl border border-sky/30 bg-sky/10 p-4">
              <p className="font-display font-bold text-deep">Datos para transferencia SPEI</p>
              <ul className="mt-3 space-y-1 text-sm text-deep/80">
                <li>Banco: {order.transfer.bank}</li>
                <li>Beneficiario: {order.transfer.holder}</li>
                <li>CLABE: {order.transfer.clabe}</li>
                <li>Concepto: {order.transfer.concept}</li>
              </ul>
              <p className="mt-3 text-xs text-deep/60">{order.transfer.hint}</p>
            </div>
          )}

          {order.oxxo && (
            <div className="mt-6 rounded-2xl border border-orange/30 bg-orange/10 p-4">
              <p className="font-display font-bold text-deep">Pago en Oxxo</p>
              <p className="mt-2 text-sm text-deep/80">{order.oxxo.instructions}</p>
              <p className="mt-3 font-ui text-lg font-bold text-deep">
                Referencia: {order.oxxo.reference}
              </p>
            </div>
          )}

          {order.paymentMethod === "on_delivery" && (
            <div className="mt-6 rounded-2xl border border-yellow/40 bg-yellow/15 p-4 text-sm text-deep/80">
              Pagarás al recibir el pedido. Ten listo efectivo o transferencia al momento de la
              entrega/recolección.
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#productos" className="btn rounded-full bg-deep font-ui font-bold text-cream">
              Seguir comprando
            </Link>
            <Link
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn gap-2 rounded-full border-0 bg-yellow font-ui font-bold text-deep"
            >
              <MessageCircle className="size-4" />
              Dudas por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
