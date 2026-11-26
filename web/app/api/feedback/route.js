import { NextResponse, after } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendFeedbackNotification } from "@/lib/resend/send"
import { getAvailableProducts } from "@/data/products"

const PURCHASE_METHODS = new Set(["mercadopago", "whatsapp", "otro"])
const FERMENTED_BEFORE = new Set(["si", "no"])
const AVAILABLE_PRODUCTS = getAvailableProducts()
const PRODUCT_IDS = new Set(AVAILABLE_PRODUCTS.map((p) => p.id))

function asRating(value) {
  const n = Number(value)
  if (!Number.isInteger(n) || n < 1 || n > 10) return null
  return n
}

function asOptionalText(value, max = 1000) {
  if (value == null) return null
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, max)
}

export async function POST(request) {
  try {
    const body = await request.json()

    const productId = typeof body.productId === "string" ? body.productId.trim() : ""
    if (!PRODUCT_IDS.has(productId)) {
      return NextResponse.json({ error: "Producto inválido o no disponible." }, { status: 400 })
    }

    const product = AVAILABLE_PRODUCTS.find((p) => p.id === productId)

    const fermentedBefore =
      typeof body.fermentedBefore === "string" ? body.fermentedBefore.trim() : ""
    if (!FERMENTED_BEFORE.has(fermentedBefore)) {
      return NextResponse.json(
        { error: "Indica si habías consumido fermentados antes." },
        { status: 400 }
      )
    }

    const tasteRating = asRating(body.tasteRating)
    const presentationRating = asRating(body.presentationRating)

    if (!tasteRating || !presentationRating) {
      return NextResponse.json(
        { error: "Califica sabor y presentación del 1 al 10." },
        { status: 400 }
      )
    }

    const purchaseMethod =
      typeof body.purchaseMethod === "string" ? body.purchaseMethod.trim() : ""
    if (!PURCHASE_METHODS.has(purchaseMethod)) {
      return NextResponse.json(
        { error: "Indica cómo compraste el producto." },
        { status: 400 }
      )
    }

    const deliveryRating =
      body.deliveryRating === "" || body.deliveryRating == null
        ? null
        : asRating(body.deliveryRating)

    if (body.deliveryRating != null && body.deliveryRating !== "" && !deliveryRating) {
      return NextResponse.json(
        { error: "La calificación de entrega debe ser del 1 al 10." },
        { status: 400 }
      )
    }

    const row = {
      product_id: productId,
      product_name: product.name,
      fermented_before: fermentedBefore,
      taste_rating: tasteRating,
      taste_comment: asOptionalText(body.tasteComment),
      presentation_rating: presentationRating,
      presentation_comment: asOptionalText(body.presentationComment),
      purchase_method: purchaseMethod,
      delivery_rating: deliveryRating,
      delivery_comment: asOptionalText(body.deliveryComment),
      name: asOptionalText(body.name, 120),
      contact: asOptionalText(body.contact, 160),
      extra_comment: asOptionalText(body.extraComment),
      source: "retroalimentacion",
    }

    // Preferimos persistir en Supabase; si no hay proyecto configurado
    // (o falla el insert), igual notificamos por correo al equipo.
    let persisted = false
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient()
      const { error } = await supabase.from("product_feedback").insert(row)
      if (error) {
        console.error("[feedback] insert error:", error.message)
      } else {
        persisted = true
      }
    }

    after(() => sendFeedbackNotification(row))

    if (!persisted && !process.env.RESEND_API_KEY) {
      console.warn("[feedback] sin Supabase ni Resend: feedback solo en logs", row)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[feedback] unexpected:", err)
    return NextResponse.json(
      { error: "Error procesando la solicitud." },
      { status: 500 }
    )
  }
}
