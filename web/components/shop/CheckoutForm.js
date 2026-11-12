"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  Loader2,
  MapPin,
  MessageCircle,
  Store,
  Truck,
} from "lucide-react"
import config from "@/config"
import { useCart } from "@/lib/cart/CartProvider"
import { PAYMENT_METHODS } from "@/lib/checkout/payments"
import { formatPrice, getCartWhatsAppUrl } from "@/lib/whatsapp"
import { trackEvent } from "@/lib/analytics/track"
import SlotCalendar from "@/components/shop/SlotCalendar"

const fulfillmentOptions = [
  {
    id: "delivery",
    title: "Entrega a domicilio",
    body: "Llevamos tu pedido refrigerado a tu colonia en Chihuahua.",
    icon: Truck,
  },
  {
    id: "pickup",
    title: "Recoger en punto de entrega",
    body: config.checkout.pickup.address,
    icon: Store,
  },
]

const paymentIcons = {
  transfer: Building2,
  oxxo: Store,
  on_delivery: Banknote,
}

const PAGE_PAYMENT_METHODS = PAYMENT_METHODS.filter((method) => method.id !== "whatsapp")

export default function CheckoutForm() {
  const router = useRouter()
  const { items, totalCents, clear, setOpen } = useCart()
  const [step, setStep] = useState(1)
  const [fulfillment, setFulfillment] = useState("delivery")
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" })
  const [delivery, setDelivery] = useState({
    address: "",
    postalCode: "",
    instructions: "",
    distanceKm: null,
    feeCents: 0,
    feeLabel: "—",
    quoteStatus: null,
  })
  const [zoneLoading, setZoneLoading] = useState(false)
  const [zoneError, setZoneError] = useState("")
  const [availability, setAvailability] = useState({ dates: [], byDate: {} })
  const [availabilityLoading, setAvailabilityLoading] = useState(true)
  const [availabilityError, setAvailabilityError] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [slotId, setSlotId] = useState("")
  const [checkoutChannel, setCheckoutChannel] = useState(null) // 'page' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState("transfer")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  const loadAvailability = useCallback(async () => {
    setAvailabilityLoading(true)
    setAvailabilityError("")
    try {
      const response = await fetch("/api/availability", { cache: "no-store" })
      const data = await response.json()
      if (!response.ok || !data.ok) {
        setAvailability({ dates: [], byDate: {} })
        setAvailabilityError(data.error || "No pudimos cargar el calendario.")
        return
      }
      setAvailability({ dates: data.dates, byDate: data.byDate })
      const firstOpen = data.dates.find((dateKey) =>
        (data.byDate[dateKey] || []).some((slot) => slot.available)
      )
      if (firstOpen) setSelectedDate(firstOpen)
    } catch {
      setAvailability({ dates: [], byDate: {} })
      setAvailabilityError("Hubo un problema al cargar horarios.")
    } finally {
      setAvailabilityLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAvailability()
  }, [loadAvailability])

  const deliveryFeeCents = fulfillment === "delivery" ? delivery.feeCents || 0 : 0
  const grandTotal = totalCents + deliveryFeeCents

  const whatsappHref = useMemo(
    () => getCartWhatsAppUrl(items, grandTotal),
    [items, grandTotal]
  )

  async function checkZone() {
    const query = delivery.postalCode.trim() || delivery.address.trim()
    if (!query) {
      setZoneError("Escribe CP o dirección para cotizar la entrega.")
      return
    }
    setZoneLoading(true)
    setZoneError("")
    try {
      const response = await fetch("/api/delivery/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      if (!data.ok) {
        setZoneError(data.error || "No pudimos cotizar esa zona.")
        return
      }
      setDelivery((prev) => ({
        ...prev,
        postalCode: data.location?.postalCode || prev.postalCode,
        distanceKm: data.distanceKm,
        feeCents: data.quote?.feeCents || 0,
        feeLabel: data.quote?.feeLabel || "—",
        quoteStatus: data.quote?.status || null,
        address: prev.address.trim() || data.location?.label || prev.address,
      }))
      if (data.quote?.status === "out_of_zone") {
        setZoneError(data.quote.message)
      }
    } catch {
      setZoneError("Error al consultar la zona.")
    } finally {
      setZoneLoading(false)
    }
  }

  function validateStep(current) {
    if (current === 1) {
      if (!customer.name.trim() || customer.phone.trim().length < 8) {
        return "Completa tu nombre y teléfono."
      }
    }
    if (current === 2) {
      if (fulfillment === "delivery") {
        if (delivery.address.trim().length < 5) return "Agrega la dirección de entrega."
        if (!delivery.quoteStatus) return "Cotiza tu zona de entrega para continuar."
        if (delivery.quoteStatus === "out_of_zone") {
          return "Esa zona no tiene entrega regular. Elige recolección."
        }
      }
    }
    if (current === 3 && !slotId) return "Elige fecha y horario en el calendario."
    if (current === 4 && !checkoutChannel) {
      return "Elige si continúas en la página o por WhatsApp."
    }
    if (current === 4 && checkoutChannel === "page" && !paymentMethod) {
      return "Elige un método de pago."
    }
    return null
  }

  function goNext() {
    const message = validateStep(step)
    if (message) {
      setError(message)
      return
    }
    setError("")
    setStep((value) => Math.min(4, value + 1))
  }

  async function submitOrder() {
    const message = validateStep(4) || validateStep(3) || validateStep(1) || validateStep(2)
    if (message) {
      setError(message)
      return
    }

    if (checkoutChannel === "whatsapp") {
      trackEvent("checkout_whatsapp_redirect", { items: items.length })
      window.open(whatsappHref, "_blank", "noopener,noreferrer")
      return
    }

    setSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          fulfillment,
          paymentMethod,
          customer,
          slotId,
          delivery:
            fulfillment === "delivery"
              ? {
                  address: delivery.address,
                  postalCode: delivery.postalCode,
                  instructions: delivery.instructions,
                  distanceKm: delivery.distanceKm,
                }
              : null,
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) {
        setError(data.error || "No se pudo crear el pedido.")
        return
      }
      trackEvent("checkout_completed", {
        order_id: data.order.id,
        payment_method: paymentMethod,
        fulfillment,
        total: data.order.totalCents / 100,
      })
      clear()
      router.push(`/compra/${data.order.id}`)
    } catch {
      setError("Hubo un problema de conexión. Intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-base-300 bg-white p-8 text-center">
        <p className="font-display text-2xl font-bold text-deep">Tu carrito está vacío</p>
        <p className="mt-2 text-deep/70">Agrega productos para continuar con la compra.</p>
        <Link href="/#productos" className="btn mt-6 rounded-full bg-deep font-ui font-bold text-cream">
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {["Tus datos", "Entrega", "Horario", "Confirmar"].map((label, index) => {
            const n = index + 1
            const active = step === n
            const done = step > n
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (n <= step) setStep(n)
                }}
                className={`rounded-full px-4 py-2 text-sm font-ui font-bold ${
                  active
                    ? "bg-deep text-cream"
                    : done
                      ? "bg-sky/15 text-sky"
                      : "bg-white text-deep/50"
                }`}
              >
                {n}. {label}
              </button>
            )
          })}
        </div>

        {step === 1 && (
          <section className="rounded-[2rem] border border-base-300 bg-white p-6">
            <h2 className="font-display text-2xl font-bold text-deep">¿Quién recibe el pedido?</h2>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-1 text-sm">
                <span className="font-ui font-bold text-deep">Nombre</span>
                <input
                  className="input input-bordered rounded-2xl"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Tu nombre"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-ui font-bold text-deep">WhatsApp / teléfono</span>
                <input
                  className="input input-bordered rounded-2xl"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="614 000 0000"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-ui font-bold text-deep">Correo (opcional)</span>
                <input
                  type="email"
                  className="input input-bordered rounded-2xl"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </label>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-[2rem] border border-base-300 bg-white p-6">
            <h2 className="font-display text-2xl font-bold text-deep">¿Cómo lo quieres?</h2>
            <div className="mt-5 grid gap-3">
              {fulfillmentOptions.map((option) => {
                const Icon = option.icon
                const selected = fulfillment === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFulfillment(option.id)}
                    className={`flex gap-4 rounded-[1.5rem] border p-4 text-left transition ${
                      selected ? "border-deep bg-deep/5" : "border-base-300 hover:border-deep/30"
                    }`}
                  >
                    <Icon className="mt-0.5 size-5 text-sky" />
                    <span>
                      <span className="font-display block text-lg font-bold text-deep">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-sm text-deep/70">{option.body}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            {fulfillment === "delivery" && (
              <div className="mt-6 space-y-4 border-t border-base-200 pt-6">
                <label className="grid gap-1 text-sm">
                  <span className="font-ui font-bold text-deep">Código postal</span>
                  <input
                    className="input input-bordered rounded-2xl"
                    value={delivery.postalCode}
                    onChange={(e) =>
                      setDelivery({ ...delivery, postalCode: e.target.value, quoteStatus: null })
                    }
                    placeholder="31216"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-ui font-bold text-deep">Dirección</span>
                  <textarea
                    className="textarea textarea-bordered rounded-2xl"
                    rows={3}
                    value={delivery.address}
                    onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    placeholder="Calle, número, colonia, referencias"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-ui font-bold text-deep">Instrucciones de entrega</span>
                  <textarea
                    className="textarea textarea-bordered rounded-2xl"
                    rows={3}
                    value={delivery.instructions}
                    onChange={(e) => setDelivery({ ...delivery, instructions: e.target.value })}
                    placeholder="Ej. dejar en recepción a nombre de…, tocar el interfón, dejar en la entrada…"
                  />
                </label>
                <button
                  type="button"
                  onClick={checkZone}
                  disabled={zoneLoading}
                  className="btn min-h-11 gap-2 rounded-full border-0 bg-sky font-ui font-bold text-cream"
                >
                  {zoneLoading ? <Loader2 className="size-4 animate-spin" /> : <MapPin className="size-4" />}
                  Cotizar envío
                </button>
                {delivery.quoteStatus && delivery.quoteStatus !== "out_of_zone" && (
                  <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-deep">
                    Envío: <strong>{delivery.feeLabel}</strong>
                  </p>
                )}
                {zoneError && (
                  <p className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-deep" role="alert">
                    {zoneError}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {step === 3 && (
          <section className="rounded-[2rem] border border-base-300 bg-white p-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5 text-sky" />
              <h2 className="font-display text-2xl font-bold text-deep">Elige día y hora</h2>
            </div>
            <p className="mt-2 text-sm text-deep/70">
              Horario base: lun–vie 7:00–20:00 · sáb 9:00–20:00 · dom 12:00–17:00. Los espacios
              bloqueados no aparecen disponibles.
            </p>

            <SlotCalendar
              loading={availabilityLoading}
              error={availabilityError}
              dates={availability.dates}
              byDate={availability.byDate}
              selectedDate={selectedDate}
              slotId={slotId}
              onSelectDate={(dateKey) => {
                setSelectedDate(dateKey)
                setSlotId("")
              }}
              onSelectSlot={setSlotId}
              onRetry={loadAvailability}
            />
          </section>
        )}

        {step === 4 && (
          <section className="rounded-[2rem] border border-base-300 bg-white p-6">
            <h2 className="font-display text-2xl font-bold text-deep">¿Cómo quieres continuar?</h2>
            <p className="mt-2 text-sm text-deep/70">
              Ya tienes entrega, zona y horario listos. Elige completar el pedido aquí o por WhatsApp.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setCheckoutChannel("page")}
                className={`rounded-[1.5rem] border p-4 text-left ${
                  checkoutChannel === "page" ? "border-deep bg-deep/5" : "border-base-300"
                }`}
              >
                <span className="font-display block text-lg font-bold text-deep">En la página</span>
                <span className="mt-1 block text-sm text-deep/70">
                  Paga por SPEI, Oxxo o al recibir, sin salir del sitio.
                </span>
              </button>
              <button
                type="button"
                onClick={() => setCheckoutChannel("whatsapp")}
                className={`rounded-[1.5rem] border p-4 text-left ${
                  checkoutChannel === "whatsapp" ? "border-deep bg-deep/5" : "border-base-300"
                }`}
              >
                <span className="font-display flex items-center gap-2 text-lg font-bold text-deep">
                  <MessageCircle className="size-5 text-sky" />
                  Por WhatsApp
                </span>
                <span className="mt-1 block text-sm text-deep/70">
                  Te llevamos el resumen del pedido al chat para coordinar.
                </span>
              </button>
            </div>

            {checkoutChannel === "page" && (
              <div className="mt-6 space-y-3 border-t border-base-200 pt-6">
                <h3 className="font-display text-xl font-bold text-deep">Método de pago</h3>
                {PAGE_PAYMENT_METHODS.map((method) => {
                  const Icon = paymentIcons[method.id] || Banknote
                  const selected = paymentMethod === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex w-full gap-4 rounded-[1.5rem] border p-4 text-left ${
                        selected ? "border-deep bg-deep/5" : "border-base-300"
                      }`}
                    >
                      <Icon className="mt-0.5 size-5 text-sky" />
                      <span>
                        <span className="font-display block text-lg font-bold text-deep">
                          {method.label}
                        </span>
                        <span className="mt-1 block text-sm text-deep/70">{method.description}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {error && (
          <p className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-deep" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {step > 1 && (
            <button
              type="button"
              className="btn min-h-12 rounded-full border-deep/20 bg-white font-ui font-bold text-deep"
              onClick={() => setStep((value) => value - 1)}
            >
              Atrás
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="btn min-h-12 rounded-full border-0 bg-deep font-ui font-bold text-cream"
              onClick={goNext}
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting || !checkoutChannel}
              className="btn min-h-12 gap-2 rounded-full border-0 bg-coral font-ui font-bold text-cream disabled:opacity-50"
              onClick={submitOrder}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creando pedido…
                </>
              ) : checkoutChannel === "whatsapp" ? (
                <>
                  <MessageCircle className="size-4" />
                  Continuar por WhatsApp
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Confirmar pedido
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <aside className="h-fit rounded-[2rem] border border-base-300 bg-white p-6 lg:sticky lg:top-24">
        <h3 className="font-display text-xl font-bold text-deep">Resumen</h3>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.key} className="flex justify-between gap-3 text-sm">
              <span className="text-deep/80">
                {item.quantity}× {item.name}
                {item.variantLabel ? ` · ${item.variantLabel}` : ""}
                {item.size ? ` · ${item.size}` : ""}
              </span>
              <span className="font-ui font-bold text-deep">
                ${formatPrice(item.priceCents * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-base-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${formatPrice(totalCents)} MXN</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>
              {fulfillment === "pickup"
                ? "Gratis (recolección)"
                : delivery.feeLabel && delivery.feeLabel !== "—"
                  ? delivery.feeLabel
                  : "Por cotizar"}
            </span>
          </div>
          <div className="flex justify-between font-display text-lg font-bold text-deep">
            <span>Total</span>
            <span>${formatPrice(grandTotal)} MXN</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
