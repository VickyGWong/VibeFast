import { NextResponse } from "next/server"
import config from "@/config"
import { annotateSlots, formatDateKey, generateBaseSlots, parseSlotId } from "@/lib/checkout/schedule"
import { buildOxxoReference, getTransferInstructions, PAYMENT_METHODS } from "@/lib/checkout/payments"
import { listBlockedSlots, listBookedSlotIds, saveOrder } from "@/lib/checkout/store"
import { quoteDeliveryFee } from "@/lib/delivery/zones"

export const runtime = "nodejs"

function createOrderId() {
  const now = new Date()
  const stamp = new Intl.DateTimeFormat("en-CA", {
    timeZone: config.checkout.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now)
    .replaceAll("-", "")
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `TGC-${stamp}-${rand}`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const items = Array.isArray(body?.items) ? body.items : []
    if (!items.length) {
      return NextResponse.json({ ok: false, error: "Tu pedido está vacío." }, { status: 400 })
    }

    const fulfillment = body?.fulfillment === "pickup" ? "pickup" : "delivery"
    const paymentMethod = String(body?.paymentMethod || "")
    const method = PAYMENT_METHODS.find((item) => item.id === paymentMethod)
    if (!method || method.id === "whatsapp") {
      return NextResponse.json(
        { ok: false, error: "Elige un método de pago válido para completar en la página." },
        { status: 400 }
      )
    }

    const customer = {
      name: String(body?.customer?.name || "").trim(),
      phone: String(body?.customer?.phone || "").trim(),
      email: String(body?.customer?.email || "").trim(),
    }
    if (customer.name.length < 2 || customer.phone.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Necesitamos tu nombre y un teléfono válido." },
        { status: 400 }
      )
    }

    const slotId = String(body?.slotId || "")
    const [blocked, booked] = await Promise.all([listBlockedSlots(), listBookedSlotIds()])
    const slots = annotateSlots(generateBaseSlots(formatDateKey()), blocked, booked)
    const slot = slots.find((item) => item.id === slotId)
    if (!slot?.available) {
      return NextResponse.json(
        { ok: false, error: "Ese horario ya no está disponible. Elige otro." },
        { status: 409 }
      )
    }

    let deliveryFeeCents = 0
    let delivery = null
    if (fulfillment === "delivery") {
      const address = String(body?.delivery?.address || "").trim()
      const postalCode = String(body?.delivery?.postalCode || "").trim()
      const instructions = String(body?.delivery?.instructions || "").trim()
      const distanceKm =
        body?.delivery?.distanceKm == null ? null : Number(body.delivery.distanceKm)

      if (address.length < 5) {
        return NextResponse.json(
          { ok: false, error: "Agrega una dirección de entrega." },
          { status: 400 }
        )
      }

      const quote =
        distanceKm != null && Number.isFinite(distanceKm)
          ? quoteDeliveryFee(distanceKm)
          : { deliverable: true, feeCents: 0, feeLabel: "Por confirmar", status: "paid" }

      if (quote.status === "out_of_zone" || quote.deliverable === false) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Esa dirección está fuera de la zona de entrega regular. Elige recolección o escríbenos por WhatsApp para una entrega especial.",
          },
          { status: 400 }
        )
      }

      deliveryFeeCents = quote.feeCents || 0
      delivery = {
        address,
        postalCode: postalCode || null,
        instructions: instructions || null,
        distanceKm,
        feeCents: deliveryFeeCents,
        feeLabel: quote.feeLabel,
      }
    }

    const subtotalCents = items.reduce(
      (sum, item) => sum + Number(item.priceCents || 0) * Number(item.quantity || 0),
      0
    )
    const totalCents = subtotalCents + deliveryFeeCents
    const id = createOrderId()
    const { dateKey, start } = parseSlotId(slotId)

    const order = {
      id,
      createdAt: new Date().toISOString(),
      status: method.status,
      fulfillment,
      paymentMethod: method.id,
      paymentLabel: method.label,
      customer,
      delivery,
      pickup: fulfillment === "pickup" ? config.checkout.pickup : null,
      slotId,
      slotDate: dateKey,
      slotStart: start,
      slotEnd: slot.end,
      slotLabel: `${slot.displayDate} · ${slot.label}`,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        variantLabel: item.variantLabel || null,
        quantity: Number(item.quantity || 1),
        priceCents: Number(item.priceCents || 0),
      })),
      subtotalCents,
      deliveryFeeCents,
      totalCents,
      currency: "MXN",
      transfer: method.id === "transfer" ? getTransferInstructions(id) : null,
      oxxo:
        method.id === "oxxo"
          ? {
              reference: buildOxxoReference(id),
              instructions: config.checkout.oxxo.instructions,
            }
          : null,
    }

    await saveOrder(order)

    return NextResponse.json({ ok: true, order })
  } catch (error) {
    console.error("[orders]", error)
    return NextResponse.json(
      { ok: false, error: "No pudimos crear el pedido. Intenta de nuevo." },
      { status: 500 }
    )
  }
}
